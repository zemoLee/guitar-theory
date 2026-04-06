// Main application - routing, chapter rendering, sidebar navigation
import { CHAPTERS, PHASES } from './data/chapters.js';
import { renderChordGrid } from './chord-diagram.js';
import { renderFretboard, renderInteractiveFretboard, renderMajorScalePicker } from './scale-visualizer.js';
import { renderCircleOfFifths } from './circle-of-fifths.js';
import { initAudio } from './audio.js';
import { getDisplayMode, toggleDisplayMode } from './data/theory.js';
import { renderTuner } from './tuner.js';

class App {
  constructor() {
    this.currentChapter = null;
    this.progress = this.loadProgress();
    this.init();
  }

  init() {
    initAudio();
    this.buildSidebar();
    this.updateProgressBar();
    this.bindEvents();

    // Route from hash or default to chapter 1
    const hash = location.hash.replace('#/chapter/', '');
    const chapter = CHAPTERS.find(c => c.slug === hash);
    this.loadChapter(chapter || CHAPTERS[0]);
  }

  buildSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';

    for (const phase of PHASES) {
      const phaseEl = document.createElement('div');
      phaseEl.className = 'sidebar__phase';

      const title = document.createElement('div');
      title.className = 'sidebar__phase-title';
      title.textContent = `${phase.name}`;
      phaseEl.appendChild(title);

      for (const chId of phase.chapters) {
        const ch = CHAPTERS.find(c => c.id === chId);
        if (!ch) continue;

        const item = document.createElement('a');
        item.className = 'sidebar__item';
        item.href = `#/chapter/${ch.slug}`;
        item.dataset.chapterId = ch.id;

        const completed = this.progress.includes(ch.id);
        if (completed) item.classList.add('sidebar__item--completed');

        item.innerHTML = `
          <span class="sidebar__item-num">${completed ? '&#10003;' : (ch.id === 0 ? '🎤' : ch.id)}</span>
          <span>${ch.title}</span>
        `;
        phaseEl.appendChild(item);
      }

      sidebar.appendChild(phaseEl);
    }
  }

  loadChapter(chapter) {
    this.currentChapter = chapter;
    location.hash = `#/chapter/${chapter.slug}`;

    // Update sidebar active state
    document.querySelectorAll('.sidebar__item').forEach(item => {
      item.classList.toggle('sidebar__item--active',
        parseInt(item.dataset.chapterId) === chapter.id);
    });

    const content = document.getElementById('content');
    content.innerHTML = '';

    const chapterEl = document.createElement('div');
    chapterEl.className = 'chapter';

    // Header
    const header = document.createElement('div');
    header.className = 'chapter__header';
    const phase = PHASES.find(p => p.chapters.includes(chapter.id));
    header.innerHTML = `
      <div class="chapter__phase-label">${phase ? phase.name : ''} — 第 ${chapter.id} 章</div>
      <h1 class="chapter__title">${chapter.title}</h1>
      <p class="chapter__subtitle">${chapter.subtitle}</p>
    `;
    chapterEl.appendChild(header);

    // Sections
    for (const section of chapter.sections) {
      const sectionEl = document.createElement('div');
      sectionEl.className = 'section';

      if (section.title) {
        const titleEl = document.createElement('h2');
        titleEl.className = 'section__title';
        titleEl.textContent = section.title;
        sectionEl.appendChild(titleEl);
      }

      this.renderSection(sectionEl, section);
      chapterEl.appendChild(sectionEl);
    }

    // Mark as complete button
    const completeBtn = document.createElement('button');
    const isCompleted = this.progress.includes(chapter.id);
    completeBtn.className = `btn ${isCompleted ? 'btn--ghost' : 'btn--primary'}`;
    completeBtn.textContent = isCompleted ? '已完成 ✓' : '标记为已完成';
    completeBtn.style.marginTop = '24px';
    completeBtn.addEventListener('click', () => {
      this.toggleComplete(chapter.id);
      const completed = this.progress.includes(chapter.id);
      completeBtn.className = `btn ${completed ? 'btn--ghost' : 'btn--primary'}`;
      completeBtn.textContent = completed ? '已完成 ✓' : '标记为已完成';
    });
    chapterEl.appendChild(completeBtn);

    // Navigation
    const nav = this.buildNavigation(chapter);
    chapterEl.appendChild(nav);

    content.appendChild(chapterEl);
    content.scrollTop = 0;
  }

  renderSection(container, section) {
    switch (section.type) {
      case 'text':
        this.renderText(container, section);
        break;
      case 'table':
        this.renderTable(container, section);
        break;
      case 'chord-grid':
        renderChordGrid(container, section.chords);
        break;
      case 'scale':
        renderFretboard(container, section.scale);
        break;
      case 'circle-of-fifths':
        const cofContainer = document.createElement('div');
        container.appendChild(cofContainer);
        renderCircleOfFifths(cofContainer, section.mode || 'basic');
        break;
      case 'tuner':
        const tunerContainer = document.createElement('div');
        container.appendChild(tunerContainer);
        renderTuner(tunerContainer);
        break;
      case 'scale-interactive':
        const siContainer = document.createElement('div');
        container.appendChild(siContainer);
        renderInteractiveFretboard(siContainer, section.options || {});
        break;
      case 'scale-major-picker':
        const smpContainer = document.createElement('div');
        container.appendChild(smpContainer);
        renderMajorScalePicker(smpContainer);
        break;
      case 'info':
        this.renderInfo(container, section);
        break;
      case 'exercise':
        this.renderExercise(container, section);
        break;
      case 'progression':
        this.renderProgressionPlayer(container, section);
        break;
    }
  }

  renderText(container, section) {
    const div = document.createElement('div');
    div.className = 'section__text';
    div.innerHTML = section.content;
    container.appendChild(div);
  }

  renderTable(container, section) {
    const table = document.createElement('table');
    table.className = 'theory-table';

    if (section.headers) {
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      for (const h of section.headers) {
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
      }
      thead.appendChild(tr);
      table.appendChild(thead);
    }

    const tbody = document.createElement('tbody');
    for (const row of section.rows) {
      const tr = document.createElement('tr');
      for (const cell of row) {
        const td = document.createElement('td');
        td.innerHTML = cell;
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    container.appendChild(table);
  }

  renderInfo(container, section) {
    const card = document.createElement('div');
    card.className = 'info-card info-card--highlight';
    card.innerHTML = `
      <div class="info-card__title">${section.title || '提示'}</div>
      <div class="info-card__body"><pre style="white-space:pre-wrap;font-family:inherit;margin:0;">${section.content}</pre></div>
    `;
    container.appendChild(card);
  }

  renderExercise(container, section) {
    const exercise = document.createElement('div');
    exercise.className = 'exercise';

    const question = document.createElement('div');
    question.className = 'exercise__question';
    question.textContent = '🎸 练习：' + section.question;
    exercise.appendChild(question);

    const btn = document.createElement('button');
    btn.className = 'exercise__reveal-btn';
    btn.textContent = '显示答案';
    exercise.appendChild(btn);

    const answer = document.createElement('div');
    answer.className = 'exercise__answer';
    answer.textContent = section.answer;
    exercise.appendChild(answer);

    btn.addEventListener('click', () => {
      answer.classList.toggle('exercise__answer--visible');
      btn.textContent = answer.classList.contains('exercise__answer--visible') ? '隐藏答案' : '显示答案';
    });

    container.appendChild(exercise);
  }

  renderProgressionPlayer(container, section) {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin:16px 0;';

    for (const name of section.progressions) {
      const btn = document.createElement('button');
      btn.className = 'play-btn';
      btn.innerHTML = `&#9654; ${name}`;
      btn.addEventListener('click', () => {
        // Simple audio feedback - play chord tones
        if (window.guitarAudio) {
          const baseFreqs = { 'C': 261.63, 'D': 293.66, 'E': 329.63, 'F': 349.23, 'G': 392.00, 'A': 440.00, 'B': 493.88 };
          // Just play a sequence of root notes for demo
          const roots = { 'I': 'C', 'ii': 'D', 'iii': 'E', 'IV': 'F', 'V': 'G', 'vi': 'A' };
          const parts = name.split('-');
          parts.forEach((part, i) => {
            const note = roots[part];
            if (note) {
              setTimeout(() => {
                window.guitarAudio.playNote(baseFreqs[note], 0.6);
              }, i * 500);
            }
          });
        }
      });
      div.appendChild(btn);
    }

    container.appendChild(div);
  }

  buildNavigation(chapter) {
    const nav = document.createElement('div');
    nav.className = 'chapter__nav';

    const prevCh = CHAPTERS.find(c => c.id === chapter.id - 1);
    const nextCh = CHAPTERS.find(c => c.id === chapter.id + 1);

    const prevBtn = document.createElement('a');
    prevBtn.className = `chapter__nav-btn ${!prevCh ? 'chapter__nav-btn--disabled' : ''}`;
    prevBtn.href = prevCh ? `#/chapter/${prevCh.slug}` : '#';
    prevBtn.innerHTML = `← ${prevCh ? prevCh.title : ''}`;
    if (prevCh) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.loadChapter(prevCh);
      });
    }

    const nextBtn = document.createElement('a');
    nextBtn.className = `chapter__nav-btn ${!nextCh ? 'chapter__nav-btn--disabled' : ''}`;
    nextBtn.href = nextCh ? `#/chapter/${nextCh.slug}` : '#';
    nextBtn.innerHTML = `${nextCh ? nextCh.title : ''} →`;
    if (nextCh) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.loadChapter(nextCh);
      });
    }

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    return nav;
  }

  // === Progress tracking ===
  loadProgress() {
    try {
      return JSON.parse(localStorage.getItem('guitar-theory-progress') || '[]');
    } catch {
      return [];
    }
  }

  saveProgress() {
    localStorage.setItem('guitar-theory-progress', JSON.stringify(this.progress));
  }

  toggleComplete(chapterId) {
    const idx = this.progress.indexOf(chapterId);
    if (idx >= 0) {
      this.progress.splice(idx, 1);
    } else {
      this.progress.push(chapterId);
    }
    this.saveProgress();
    this.buildSidebar();
    this.updateProgressBar();
    // Re-highlight active
    document.querySelectorAll('.sidebar__item').forEach(item => {
      item.classList.toggle('sidebar__item--active',
        parseInt(item.dataset.chapterId) === this.currentChapter.id);
    });
  }

  updateProgressBar() {
    const total = CHAPTERS.length;
    const done = this.progress.length;
    const pct = Math.round((done / total) * 100);
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');
    if (fill) fill.style.width = `${pct}%`;
    if (text) text.textContent = `${done}/${total}`;
  }

  // === Events ===
  bindEvents() {
    // Global display mode toggle (音名/唱名)
    const globalToggle = document.getElementById('global-mode-toggle');
    if (globalToggle) {
      const updateLabel = () => {
        globalToggle.textContent = getDisplayMode() === 'note' ? '音名' : '唱名';
      };
      globalToggle.addEventListener('click', () => {
        toggleDisplayMode();
        updateLabel();
        // Re-render current chapter to update all static fretboards
        if (this.currentChapter) this.loadChapter(this.currentChapter);
      });
      window.addEventListener('display-mode-change', updateLabel);
    }

    // Hash change
    window.addEventListener('hashchange', () => {
      const slug = location.hash.replace('#/chapter/', '');
      const chapter = CHAPTERS.find(c => c.slug === slug);
      if (chapter && chapter !== this.currentChapter) {
        this.loadChapter(chapter);
      }
    });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar--open');
      });
    }

    // Close sidebar on link click (mobile)
    sidebar.addEventListener('click', (e) => {
      if (e.target.closest('.sidebar__item')) {
        sidebar.classList.remove('sidebar--open');
      }
    });

    // Circle of Fifths modal
    const cofBtn = document.getElementById('cof-modal-btn');
    const cofOverlay = document.getElementById('cof-modal-overlay');
    const cofClose = document.getElementById('cof-modal-close');

    if (cofBtn && cofOverlay) {
      cofBtn.addEventListener('click', () => {
        cofOverlay.classList.add('modal-overlay--active');
        // Render CoF in modal if not already
        const modalBody = document.getElementById('cof-modal-body');
        if (modalBody && !modalBody.hasChildNodes()) {
          renderCircleOfFifths(modalBody, 'relatives');
        }
      });
    }

    if (cofClose && cofOverlay) {
      cofClose.addEventListener('click', () => {
        cofOverlay.classList.remove('modal-overlay--active');
      });
      cofOverlay.addEventListener('click', (e) => {
        if (e.target === cofOverlay) {
          cofOverlay.classList.remove('modal-overlay--active');
        }
      });
    }

    // Donate modal
    const donateBtn = document.getElementById('donate-btn');
    const donateOverlay = document.getElementById('donate-modal-overlay');
    const donateClose = document.getElementById('donate-modal-close');

    if (donateBtn && donateOverlay) {
      donateBtn.addEventListener('click', () => {
        donateOverlay.classList.add('modal-overlay--active');
      });
    }
    if (donateClose && donateOverlay) {
      donateClose.addEventListener('click', () => {
        donateOverlay.classList.remove('modal-overlay--active');
      });
      donateOverlay.addEventListener('click', (e) => {
        if (e.target === donateOverlay) {
          donateOverlay.classList.remove('modal-overlay--active');
        }
      });
    }
  }
}

// Start app
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
