// Chapter definitions - metadata and content for all 20 chapters
// Content is structured as arrays of section objects, rendered by app.js

export const PHASES = [
  { id: 'tools', name: '实用工具', chapters: [0] },
  { id: 'phase1', name: '基础入门', chapters: [1, 2, 3, 4] },
  { id: 'phase2', name: '和声进阶', chapters: [5, 6, 7, 8] },
  { id: 'phase3', name: '五度圈专题', chapters: [9, 10, 11, 12] },
  { id: 'phase4', name: 'CAGED与和弦拓展', chapters: [13, 21, 14, 15, 16, 17] },
  { id: 'phase5', name: '高级理论', chapters: [18, 19, 22, 23, 20] },
];

export const CHAPTERS = [
  // ========== Tools ==========
  {
    id: 0,
    slug: 'tuner',
    title: '吉他调音器',
    subtitle: '使用麦克风实时检测音高，为你的吉他精确调音',
    phase: 0,
    sections: [
      {
        type: 'text',
        title: '使用说明',
        content: `<p>1. 点击 <strong>"开始调音"</strong> 按钮，浏览器会请求麦克风权限</p>
<p>2. 对着麦克风<strong>弹一根弦</strong>，调音器会自动检测音高</p>
<p>3. 观察仪表盘：指针在<strong>绿色中间区域</strong>表示音准了</p>
<p>4. 偏高（指针偏右）→ <strong>松弦</strong>；偏低（指针偏左）→ <strong>紧弦</strong></p>
<p>5. 可以点击上方的弦号手动选择目标弦，或保持"自动"模式</p>
<p>6. 点击下方参考音按钮可以播放标准音，用耳朵辅助调音</p>`
      },
      {
        type: 'tuner',
      },
      {
        type: 'table',
        title: '标准调音 (Standard Tuning)',
        headers: ['弦号', '音名', '频率', '说明'],
        rows: [
          ['6弦（最粗）', 'E2', '82.41 Hz', '最低音，低音E'],
          ['5弦', 'A2', '110.00 Hz', ''],
          ['4弦', 'D3', '146.83 Hz', ''],
          ['3弦', 'G3', '196.00 Hz', ''],
          ['2弦', 'B3', '246.94 Hz', ''],
          ['1弦（最细）', 'E4', '329.63 Hz', '最高音，高音E'],
        ]
      },
      {
        type: 'info',
        title: '调音小技巧',
        content: `• 调音顺序建议：6弦 → 5弦 → 4弦 → 3弦 → 2弦 → 1弦（从粗到细）
• 如果一根弦偏差很大，先松弦再慢慢紧到目标音（避免断弦）
• 新弦需要反复调几次才能稳定，因为弦会慢慢松
• 调音时尽量在安静的环境中，避免背景噪音干扰
• 每次弹弦后等指针稳定再判断，不要急着转旋钮`,
      },
    ],
  },

  // ========== Phase 1: Foundation ==========
  {
    id: 1,
    slug: 'c-major-chords',
    title: 'C大调开放和弦',
    subtitle: '学习吉他的第一步：掌握C大调六个基础和弦的按法与转换',
    phase: 1,
    sections: [
      {
        type: 'text',
        title: '什么是和弦？',
        content: `<p>和弦（Chord）是指<strong>三个或三个以上不同音高的音</strong>按照一定的音程关系同时发响。在吉他上，我们通过同时按住多根弦来演奏和弦。</p>
<p>C大调是最基础、也是最常用的调性之一。它不包含任何升降号，由 C-D-E-F-G-A-B 七个自然音组成。在C大调中，我们会遇到以下六个基础和弦：</p>`
      },
      {
        type: 'table',
        title: 'C大调顺阶三和弦',
        headers: ['级数', '和弦', '类型', '组成音'],
        rows: [
          ['I', 'C', '大三和弦', 'C - E - G'],
          ['ii', 'Dm', '小三和弦', 'D - F - A'],
          ['iii', 'Em', '小三和弦', 'E - G - B'],
          ['IV', 'F', '大三和弦', 'F - A - C'],
          ['V', 'G', '大三和弦', 'G - B - D'],
          ['vi', 'Am', '小三和弦', 'A - C - E'],
        ]
      },
      {
        type: 'chord-grid',
        title: '和弦指法图',
        chords: ['C', 'Dm', 'Em', 'F', 'G', 'Am'],
      },
      {
        type: 'text',
        title: '练习建议',
        content: `<p>1. 先单独练习每个和弦的按法，确保每根弦都能清晰发声</p>
<p>2. 练习两个和弦之间的转换，目标是<strong>不间断切换</strong></p>
<p>3. 推荐练习顺序：Em→Am→Dm→C→G→F（由易到难）</p>
<p>4. F和弦需要横按技巧（Barre），是初学者最大的挑战，需要耐心练习</p>`
      },
      {
        type: 'exercise',
        question: '在C大调中，哪些和弦是大三和弦，哪些是小三和弦？',
        answer: '大三和弦：C (I)、F (IV)、G (V)；小三和弦：Dm (ii)、Em (iii)、Am (vi)',
      },
    ],
  },

  {
    id: 2,
    slug: 'c-major-scale',
    title: 'C大调音阶',
    subtitle: '理解全音半音的排列规律，在指板上找到每一个音的位置',
    phase: 1,
    sections: [
      {
        type: 'text',
        title: '大调音阶的构造',
        content: `<p>大调音阶由<strong>七个音</strong>按照特定的全音（Whole step, W）和半音（Half step, H）关系排列而成：</p>
<p><code>全-全-半-全-全-全-半 (W-W-H-W-W-W-H)</code></p>
<p>以C大调为例：C→<em>(全)</em>→D→<em>(全)</em>→E→<em>(半)</em>→F→<em>(全)</em>→G→<em>(全)</em>→A→<em>(全)</em>→B→<em>(半)</em>→C</p>
<p>注意 <strong>E-F</strong> 和 <strong>B-C</strong> 之间是半音关系（相邻品格），其余相邻音之间都是全音关系（间隔一个品格）。</p>`
      },
      {
        type: 'scale-major-picker',
        title: '大调音阶在指板上的位置',
      },
      {
        type: 'text',
        title: '音阶度数与唱名',
        content: `<p>音阶中的每个音都有对应的<strong>度数</strong>（Scale Degree）和唱名：</p>`
      },
      {
        type: 'table',
        headers: ['度数', '1', '2', '3', '4', '5', '6', '7'],
        rows: [
          ['唱名', 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
          ['C大调', 'C', 'D', 'E', 'F', 'G', 'A', 'B'],
          ['音程', '根音', '大二度', '大三度', '纯四度', '纯五度', '大六度', '大七度'],
        ]
      },
      {
        type: 'exercise',
        question: 'E和F之间是什么关系？在吉他上相隔几品？',
        answer: 'E和F之间是半音关系，在吉他上相隔1品（相邻品格）。',
      },
    ],
  },

  {
    id: 3,
    slug: 'triads',
    title: '三和弦构造',
    subtitle: '从音程关系理解大三和弦、小三和弦、减三和弦、增三和弦的构造原理',
    phase: 1,
    sections: [
      {
        type: 'text',
        title: '什么是三和弦？',
        content: `<p>三和弦（Triad）是由<strong>根音、三度音、五度音</strong>三个音叠置而成的和弦。根据三度音和五度音与根音之间的音程关系不同，三和弦分为四种类型：</p>`
      },
      {
        type: 'table',
        title: '四种三和弦',
        headers: ['类型', '音程公式', '示例 (C为根音)', '音程结构', '听感'],
        rows: [
          ['大三和弦 (Major)', '1 - 3 - 5', 'C - E - G', '大三度 + 小三度', '明亮、开朗'],
          ['小三和弦 (Minor)', '1 - b3 - 5', 'C - Eb - G', '小三度 + 大三度', '柔和、忧伤'],
          ['减三和弦 (Diminished)', '1 - b3 - b5', 'C - Eb - Gb', '小三度 + 小三度', '紧张、不稳定'],
          ['增三和弦 (Augmented)', '1 - 3 - #5', 'C - E - G#', '大三度 + 大三度', '梦幻、悬浮'],
        ]
      },
      {
        type: 'chord-grid',
        title: '四种三和弦指法对比',
        chords: ['C', 'Am', 'Bdim', 'Caug'],
      },
      {
        type: 'info',
        title: '记忆技巧',
        content: `大三和弦 = 大三度（4个半音）+ 小三度（3个半音）= 根音到五度共7个半音（纯五度）
小三和弦 = 小三度（3个半音）+ 大三度（4个半音）= 同样是纯五度
减三和弦 = 小三度 + 小三度 = 6个半音（减五度/三全音）
增三和弦 = 大三度 + 大三度 = 8个半音（增五度）`,
      },
      {
        type: 'exercise',
        question: '请说出G大三和弦和G小三和弦的组成音',
        answer: 'G大三和弦：G - B - D（大三度+小三度）；G小三和弦：G - Bb - D（小三度+大三度）',
      },
    ],
  },

  {
    id: 4,
    slug: 'chord-functions',
    title: '和弦功能',
    subtitle: '理解主功能、下属功能、属功能——和声运动的基本动力',
    phase: 1,
    sections: [
      {
        type: 'text',
        title: '三大和弦功能',
        content: `<p>在调性音乐中，每个和弦都有其特定的<strong>功能</strong>（Function），决定了它在音乐进行中的角色和"重力方向"。三大基本功能是：</p>
<p><strong>主功能 (Tonic, T)</strong> — 稳定、归属感，像是"家"。代表和弦：<strong>I</strong> (C大调中的C和弦)</p>
<p><strong>下属功能 (Subdominant, S)</strong> — 离开，产生运动感。代表和弦：<strong>IV</strong> (C大调中的F和弦)</p>
<p><strong>属功能 (Dominant, D)</strong> — 紧张，强烈想要回到主和弦。代表和弦：<strong>V</strong> (C大调中的G和弦)</p>`
      },
      {
        type: 'table',
        title: 'C大调各级和弦的功能归属',
        headers: ['级数', '和弦', '功能', '说明'],
        rows: [
          ['I', 'C', '主功能 (T)', '最稳定的和弦，乐段的终点'],
          ['ii', 'Dm', '下属功能 (S)', 'IV的替代，常用于ii-V-I进行'],
          ['iii', 'Em', '主功能 (T)', 'I的替代，较少独立使用'],
          ['IV', 'F', '下属功能 (S)', '经典下属和弦'],
          ['V', 'G', '属功能 (D)', '最强的"回家"倾向'],
          ['vi', 'Am', '主功能 (T)', 'I的替代，常用于阻碍终止(V-vi)'],
        ]
      },
      {
        type: 'info',
        title: '和声运动的基本规律',
        content: `T → S → D → T（主 → 下属 → 属 → 主）

这是最基本的和声运动方向：
• 从稳定出发 (I)
• 产生运动 (IV 或 ii)
• 制造紧张 (V 或 V7)
• 回归稳定 (I)

例如：C → F → G → C 就是最经典的 T-S-D-T 进行`,
      },
      {
        type: 'exercise',
        question: '在和弦进行 Am → Dm → G → C 中，各和弦分别属于什么功能？',
        answer: 'Am (vi) = 主功能T → Dm (ii) = 下属功能S → G (V) = 属功能D → C (I) = 主功能T，完美的 T-S-D-T 进行！',
      },
    ],
  },

  // ========== Phase 2: Harmony Intermediate ==========
  {
    id: 5,
    slug: 'seventh-chords',
    title: '七和弦',
    subtitle: '在三和弦的基础上叠加七度音，让和声色彩更加丰富',
    phase: 2,
    sections: [
      {
        type: 'text',
        title: '七和弦的构造',
        content: `<p>七和弦（Seventh Chord）是在三和弦的基础上，再叠加一个<strong>七度音</strong>而成的四音和弦。七度音有两种：大七度（Major 7th, 11个半音）和小七度（Minor 7th, 10个半音）。</p>
<p>不同的三和弦底座 + 不同的七度音，组合出五种常用的七和弦类型：</p>`
      },
      {
        type: 'table',
        title: '五种七和弦类型',
        headers: ['名称', '符号', '公式', '示例', '听感'],
        rows: [
          ['大七和弦', 'Maj7', '1-3-5-7', 'C-E-G-B', '温暖、梦幻、爵士感'],
          ['小七和弦', 'm7', '1-b3-5-b7', 'D-F-A-C', '柔和、流动'],
          ['属七和弦', '7 (dom7)', '1-3-5-b7', 'G-B-D-F', '有张力、想要解决'],
          ['半减七和弦', 'm7b5 (ø7)', '1-b3-b5-b7', 'B-D-F-A', '暗淡、不稳定'],
          ['减七和弦', 'dim7 (°7)', '1-b3-b5-bb7', 'B-D-F-Ab', '极度紧张'],
        ]
      },
      {
        type: 'chord-grid',
        title: 'C大调顺阶七和弦',
        chords: ['Cmaj7', 'Dm7', 'Em7', 'Fmaj7', 'G7', 'Am7', 'Bm7b5'],
      },
      {
        type: 'info',
        title: '关键记忆点',
        content: `C大调顺阶七和弦的质量规律：
Imaj7 - ii7 - iii7 - IVmaj7 - V7 - vi7 - viiø7

• I 和 IV 级是大七和弦 (Maj7)
• ii、iii、vi 级是小七和弦 (m7)
• V 级是属七和弦 (dom7) — 最有"解决"倾向
• vii 级是半减七和弦 (m7b5)`,
      },
      {
        type: 'exercise',
        question: '属七和弦（如G7）为什么有强烈的解决倾向？',
        answer: 'G7 (G-B-D-F) 中包含一个三全音（Tritone）：B和F之间恰好是6个半音。三全音是最不稳定的音程，B想要上行到C，F想要下行到E，所以G7自然地解决到C和弦。',
      },
    ],
  },

  {
    id: 6,
    slug: 'cadences',
    title: '终止式',
    subtitle: '音乐的"标点符号"——不同的终止方式带来不同的结束感',
    phase: 2,
    sections: [
      {
        type: 'text',
        title: '什么是终止式？',
        content: `<p>终止式（Cadence）是和声进行中具有<strong>结束感</strong>的和弦连接，相当于音乐中的标点符号。不同的终止式带来不同程度的结束感和情绪色彩。</p>`
      },
      {
        type: 'table',
        title: '四种基本终止式',
        headers: ['终止式', '和弦进行', 'C大调示例', '效果'],
        rows: [
          ['正格终止 (Authentic)', 'V → I', 'G → C', '最强结束感，"句号"'],
          ['变格终止 (Plagal)', 'IV → I', 'F → C', '庄严、教堂感，"阿门终止"'],
          ['半终止 (Half)', '? → V', '任何 → G', '悬而未决，"逗号"'],
          ['阻碍终止 (Deceptive)', 'V → vi', 'G → Am', '意外转折，"省略号"'],
        ]
      },
      {
        type: 'text',
        content: `<p><strong>正格终止</strong>是最常用的终止，V→I 的"回家"感最强。如果用 V7→I（如 G7→C），效果更加明显。</p>
<p><strong>变格终止</strong>常在正格终止之后补充使用（IV→I），在教堂音乐中尤为常见，也被称为"阿门终止"。</p>
<p><strong>半终止</strong>停在V级上，给人"话还没说完"的感觉，常用于乐句的中间。</p>
<p><strong>阻碍终止</strong>本应回到I，却去了vi（Am），产生"出乎意料"的效果，是作曲中常用的手法。</p>`
      },
      {
        type: 'exercise',
        question: '在一首C大调的歌中，和弦进行是 C-Am-Dm-G，最后的G停住了。这是什么终止式？',
        answer: '这是半终止 (Half Cadence)。进行停在了V级（G）上，给人"未完成"的感觉，通常后面还会有新的乐句。',
      },
    ],
  },

  {
    id: 7,
    slug: 'progressions',
    title: '和弦进行',
    subtitle: '从万能四和弦到爵士ii-V-I，掌握最常用的和弦走向',
    phase: 2,
    sections: [
      {
        type: 'text',
        title: '和弦进行的逻辑',
        content: `<p>和弦进行（Chord Progression）是按照一定的功能逻辑串联起来的和弦序列。好的和弦进行让音乐有<strong>方向感</strong>和<strong>叙事性</strong>。</p>
<p>下面是流行音乐中最常见的几种和弦进行：</p>`
      },
      {
        type: 'table',
        title: '经典和弦进行',
        headers: ['名称', '级数', 'C大调和弦', '代表歌曲风格'],
        rows: [
          ['卡农进行', 'I-V-vi-IV', 'C-G-Am-F', '大量流行歌曲（《Let It Be》前奏型）'],
          ['50年代进行', 'I-vi-IV-V', 'C-Am-F-G', '经典摇滚、Doo-Wop'],
          ['悲伤进行', 'vi-IV-I-V', 'Am-F-C-G', '抒情流行（《Someone Like You》）'],
          ['爵士 ii-V-I', 'ii-V-I', 'Dm-G-C', '爵士标准进行'],
          ['经典三和弦', 'I-IV-V-I', 'C-F-G-C', '民谣、乡村、蓝调'],
          ['下行五度圈', 'iii-vi-ii-V-I', 'Em-Am-Dm-G-C', '爵士/Bossa Nova'],
          ['12小节布鲁斯', 'I-I-I-I-IV-IV-I-I-V-IV-I-V', 'C-C-C-C-F-F-C-C-G-F-C-G', '蓝调/摇滚'],
        ]
      },
      {
        type: 'progression',
        title: '试听和弦进行',
        progressions: ['I-IV-V-I', 'I-V-vi-IV', 'ii-V-I', 'vi-IV-I-V'],
      },
      {
        type: 'info',
        title: '为什么 I-V-vi-IV 如此万能？',
        content: `这个进行覆盖了三大功能：
I (主) → V (属) → vi (主的替代) → IV (下属)

它的魔力在于：
1. I→V 产生运动
2. V→vi 是阻碍终止，制造意外和情感
3. vi→IV 从忧伤滑向温暖
4. IV 又自然地准备回到 I，形成循环

全球无数热门歌曲都使用了这个进行的某种变体！`,
      },
      {
        type: 'exercise',
        question: '如果一首歌的和弦是 Am-F-C-G，它使用的是哪种进行？请用级数表示。',
        answer: 'vi-IV-I-V（悲伤进行）。虽然从Am开始，但它仍然是C大调，只是从vi级和弦开始。这种进行常见于抒情/流行歌曲。',
      },
    ],
  },

  {
    id: 8,
    slug: 'g-major-chords',
    title: 'G大调和弦体系',
    subtitle: '从C大调到G大调——理解移调的概念，掌握第二个调性',
    phase: 2,
    sections: [
      {
        type: 'text',
        title: '为什么要学G大调？',
        content: `<p>G大调是吉他上第二常用的调性。它只有一个升号（F#），与C大调共享大部分和弦，是<strong>理解移调概念</strong>的最佳跳板。</p>
<p>G大调音阶：G - A - B - C - D - E - F# - G</p>
<p>对比C大调：C - D - E - F - G - A - B - C</p>
<p>唯一的区别：F 变成了 <strong>F#</strong>（升高半音）</p>`
      },
      {
        type: 'scale',
        title: 'G大调音阶',
        scale: 'g_major',
      },
      {
        type: 'table',
        title: 'C大调 vs G大调顺阶和弦对比',
        headers: ['级数', 'C大调', 'G大调', '和弦类型'],
        rows: [
          ['I', 'C', 'G', '大三和弦'],
          ['ii', 'Dm', 'Am', '小三和弦'],
          ['iii', 'Em', 'Bm', '小三和弦'],
          ['IV', 'F', 'C', '大三和弦'],
          ['V', 'G', 'D', '大三和弦'],
          ['vi', 'Am', 'Em', '小三和弦'],
          ['vii°', 'Bdim', 'F#dim', '减三和弦'],
        ]
      },
      {
        type: 'chord-grid',
        title: 'G大调常用和弦',
        chords: ['G_open', 'Am_open', 'Bm_barre', 'C', 'D', 'Em'],
      },
      {
        type: 'info',
        title: '移调的本质',
        content: `移调就是把所有和弦按照相同的级数关系，平移到新的调上。

C大调的 I-V-vi-IV = C-G-Am-F
G大调的 I-V-vi-IV = G-D-Em-C

和弦的"名字"变了，但"关系"（级数）不变！
这就是为什么理解级数比记住和弦名更重要。`,
      },
      {
        type: 'exercise',
        question: '如果C大调的一首歌使用 C-Am-F-G 进行，移到G大调后和弦是什么？',
        answer: 'C大调 I-vi-IV-V = C-Am-F-G → G大调 I-vi-IV-V = G-Em-C-D',
      },
    ],
  },

  // ========== Phase 3: Circle of Fifths ==========
  {
    id: 9,
    slug: 'cof-intro',
    title: '五度圈：认识与构造',
    subtitle: '音乐理论中最强大的工具——五度圈是怎么来的，又为什么如此重要',
    phase: 3,
    sections: [
      {
        type: 'text',
        title: '什么是五度圈？',
        content: `<p><strong>五度圈</strong>（Circle of Fifths）是将12个调性按照<strong>纯五度</strong>（7个半音）的间隔排列成一个圆环的图示。它是理解调性关系、和弦功能、转调的核心工具。</p>
<p>为什么叫"五度"？因为从任意音出发，向上数<strong>纯五度</strong>（经过7个半音），就到达了圆环上的下一个位置。例如：C→G→D→A→E→B→F#→Db→Ab→Eb→Bb→F→回到C。</p>`
      },
      {
        type: 'text',
        title: '升号与降号的规律',
        content: `<p><strong>顺时针方向</strong>（升号增加）：每向右走一步，调号多一个升号。</p>
<p>C(0#) → G(1#) → D(2#) → A(3#) → E(4#) → B(5#) → F#(6#)</p>
<p><strong>逆时针方向</strong>（降号增加）：每向左走一步，调号多一个降号。</p>
<p>C(0b) → F(1b) → Bb(2b) → Eb(3b) → Ab(4b) → Db(5b) → Gb(6b)</p>
<p>在底部，F#(6#) 和 Gb(6b) 是<strong>等音异名调</strong>——听起来完全一样，只是记谱方式不同。</p>`
      },
      {
        type: 'circle-of-fifths',
        title: '交互五度圈',
        mode: 'basic',
      },
      {
        type: 'info',
        title: '五度圈的记忆口诀',
        content: `升号方向（顺时针）的升号顺序：F-C-G-D-A-E-B
口诀：Father Charles Goes Down And Ends Battle

降号方向（逆时针）的降号顺序：B-E-A-D-G-C-F（刚好反过来）
口诀：Battle Ends And Down Goes Charles' Father`,
      },
      {
        type: 'exercise',
        question: 'D大调有几个升号？分别是什么？',
        answer: 'D大调有2个升号：F# 和 C#。从C开始顺时针走两步就到了D，升号按顺序累加：先F#（G大调的升号），再C#。',
      },
    ],
  },

  {
    id: 10,
    slug: 'cof-relatives',
    title: '五度圈：关系大小调与调号速查',
    subtitle: '用五度圈秒查任意调的升降号，理解大小调的关系网络',
    phase: 3,
    sections: [
      {
        type: 'text',
        title: '关系大小调',
        content: `<p>五度圈的<strong>外圈</strong>是大调，<strong>内圈</strong>是小调。同一位置的大调和小调互为<strong>关系调</strong>（Relative Keys），它们共享完全相同的调号！</p>
<p>例如：C大调和A小调都没有任何升降号，但 C大调以C为主音（明亮），A小调以A为主音（忧伤）。</p>
<p>规律：关系小调的主音比大调低一个<strong>小三度</strong>（3个半音）。即：大调主音 - 3半音 = 关系小调主音。</p>`
      },
      {
        type: 'table',
        title: '关系大小调速查表',
        headers: ['大调', '升/降号数', '关系小调'],
        rows: [
          ['C', '0', 'Am'],
          ['G', '1#', 'Em'],
          ['D', '2#', 'Bm'],
          ['A', '3#', 'F#m'],
          ['E', '4#', 'C#m'],
          ['F', '1b', 'Dm'],
          ['Bb', '2b', 'Gm'],
          ['Eb', '3b', 'Cm'],
        ]
      },
      {
        type: 'text',
        title: '近关系调',
        content: `<p><strong>近关系调</strong>（Closely Related Keys）是指五度圈上<strong>相邻</strong>的调。它们之间只差一个升号或降号，转调时最自然流畅。</p>
<p>例如，C大调的近关系调有：</p>
<p>• 右邻：G大调（多1#）和其关系小调 Em</p>
<p>• 左邻：F大调（多1b）和其关系小调 Dm</p>
<p>• 自身的关系小调：Am</p>
<p>总共5个近关系调：<strong>G, Em, F, Dm, Am</strong></p>`
      },
      {
        type: 'circle-of-fifths',
        title: '关系调高亮模式',
        mode: 'relatives',
      },
      {
        type: 'exercise',
        question: 'A大调的近关系调有哪些？',
        answer: 'A大调(3#)的近关系调：右邻E大调(4#)和C#m、左邻D大调(2#)和Bm、自身关系小调F#m。共5个：E, C#m, D, Bm, F#m。',
      },
    ],
  },

  {
    id: 11,
    slug: 'cof-progressions',
    title: '五度圈：和弦功能与进行推导',
    subtitle: '用五度圈定位I-IV-V，可视化常见和弦进行的路径',
    phase: 3,
    sections: [
      {
        type: 'text',
        title: '用五度圈找 I-IV-V',
        content: `<p>五度圈上有一个极其实用的规律：选中任意一个调，它的<strong>左边邻居就是IV级（下属）</strong>，<strong>右边邻居就是V级（属）</strong>。</p>
<p>例如，选中C：左边是F（IV级），右边是G（V级）。</p>
<p>选中G：左边是C（IV级），右边是D（V级）。</p>
<p>这三个和弦 (IV-I-V) 在五度圈上形成一个<strong>三角形</strong>，是任何调最核心的三个和弦！</p>`
      },
      {
        type: 'text',
        title: '和弦进行在五度圈上的路径',
        content: `<p>许多经典和弦进行在五度圈上呈现出清晰的几何路径：</p>
<p><strong>ii-V-I 进行</strong>：在五度圈上是连续三步<strong>逆时针</strong>移动。Dm→G→C，每一步都是向左（四度上行/五度下行）。这就是为什么 ii-V-I 听起来如此自然——它顺着五度圈的"重力"滑动。</p>
<p><strong>下行五度圈进行 (iii-vi-ii-V-I)</strong>：Em→Am→Dm→G→C，连续五步逆时针，每步都是纯四度上行，是最具"归家感"的进行。</p>
<p><strong>I-V-vi-IV（卡农进行）</strong>：C→G→Am→F，在五度圈上画出一个"Z"字型路径。</p>`
      },
      {
        type: 'circle-of-fifths',
        title: '和弦进行路径可视化',
        mode: 'progressions',
      },
      {
        type: 'info',
        title: '五度圈运动的听感规律',
        content: `• 逆时针运动（下行五度/上行四度）= 最强的"解决"感
  每一步都像 V→I，所以 ii-V-I 就是两次"解决"

• 顺时针运动（上行五度/下行四度）= "打开"、"探索"的感觉
  I→V 给人"出发"的感觉

• 对角运动（隔6步）= 三全音关系，最大张力
  如 C→F#，这是最"远"的调性距离`,
      },
      {
        type: 'exercise',
        question: '为什么爵士乐如此青睐 ii-V-I 进行？用五度圈的角度解释。',
        answer: 'ii-V-I 是五度圈上连续三步逆时针运动，每一步都是"下行五度"（最强的和声解决方向）。Dm→G 是一次下行五度，G→C 又是一次下行五度。这种双重解决产生了极其强烈的归属感和方向感，是和声运动中最"顺理成章"的路径。',
      },
    ],
  },

  {
    id: 12,
    slug: 'cof-transposition',
    title: '五度圈：转调与实战运用',
    subtitle: '用五度圈实现即时移调，结合Capo变调夹的实战技巧',
    phase: 3,
    sections: [
      {
        type: 'text',
        title: '用五度圈转调',
        content: `<p><strong>转调</strong>（Transposition）就是把一段旋律或和弦进行从一个调移到另一个调。五度圈让这个过程变得直观：只需"旋转"五度圈，让新的调对准原来的位置即可。</p>
<p>例如：把C大调的 C-Am-F-G (I-vi-IV-V) 转到D大调：</p>
<p>在五度圈上，D比C顺时针偏移2步。将每个和弦都顺时针移2步：</p>
<p>C→D, Am→Bm, F→G, G→A</p>
<p>结果：<strong>D-Bm-G-A</strong> (仍然是 I-vi-IV-V)</p>`
      },
      {
        type: 'text',
        title: '近关系转调 vs 远关系转调',
        content: `<p><strong>近关系转调</strong>：转到五度圈上相邻的调（差1个升降号）。过渡自然，听感流畅。</p>
<p>例：C大调 → G大调（常通过 D/D7 作为"桥梁"和弦）</p>
<p><strong>远关系转调</strong>：转到五度圈上较远的调（差3个以上升降号）。效果戏剧性，需要精心安排。</p>
<p>例：C大调 → E大调（差4个升号），常见于歌曲高潮的"升key"。</p>`
      },
      {
        type: 'text',
        title: 'Capo（变调夹）与五度圈',
        content: `<p>Capo 本质上就是在五度圈上旋转！每夹一品，实际音高升高半音。</p>
<p>吉他手可以用简单的开放和弦指法，通过 Capo 变换实际调性：</p>`
      },
      {
        type: 'table',
        title: 'Capo 转调速查（以C调指法为例）',
        headers: ['Capo 品位', '实际调性', '五度圈位移'],
        rows: [
          ['0 (不夹)', 'C大调', '0'],
          ['2', 'D大调', '顺时针2步'],
          ['4', 'E大调', '顺时针4步'],
          ['5', 'F大调', '逆时针1步'],
          ['7', 'G大调', '顺时针1步'],
        ]
      },
      {
        type: 'circle-of-fifths',
        title: '转调对照模式',
        mode: 'transposition',
      },
      {
        type: 'exercise',
        question: '一首歌原调是G大调，和弦是 G-Em-C-D。歌手希望降一个全音到F大调，和弦变成什么？（也可以用Capo解决吗？）',
        answer: 'G大调 I-vi-IV-V = G-Em-C-D → F大调 I-vi-IV-V = F-Dm-Bb-C。如果想用Capo：用C调指法(C-Am-F-G)夹第5品就得到F调实际音高。或者用G调指法夹第10品（不实际），所以Capo方案建议用C调指法+Capo 5。',
      },
    ],
  },

  // ========== Phase 4: CAGED & Chord Extensions ==========
  {
    id: 13,
    slug: 'caged-system',
    title: 'CAGED 系统：五种手型与指板地图',
    subtitle: '用5种开放和弦手型解锁整个指板——吉他手最重要的进阶工具',
    phase: 4,
    sections: [
      {
        type: 'text',
        title: '为什么需要 CAGED 系统？',
        content: `<p>学完开放和弦后，你可能会发现一个问题：<strong>只会在前3品弹和弦</strong>，高把位就完全不知道怎么弹了。</p>
<p>CAGED 系统就是解决这个问题的"终极武器"。它的核心思想很简单：</p>
<p>把吉他指板想象成一条长街道。你已经知道了 5 个"入口"（C、A、G、E、D 五种开放和弦手型）。<strong>每个入口都能带你进入同一个"房间"（同一个和弦）</strong>，只是位置不同。</p>
<p>掌握 CAGED，你就能在指板的<strong>任何位置</strong>弹出<strong>任何和弦</strong>。</p>`
      },
      {
        type: 'text',
        title: '五种开放和弦手型',
        content: `<p>CAGED 的名字来自 5 种开放大三和弦：<strong>C - A - G - E - D</strong>。这 5 种手型是一切的基础。</p>
<p>请仔细观察每种手型的<strong>手指形状</strong>，记住这个"形状"，因为接下来我们要把它移动到指板的各个位置。</p>`
      },
      {
        type: 'chord-grid',
        title: '五种 CAGED 开放手型',
        chords: ['C', 'A_open', 'G', 'E_open', 'D'],
      },
      {
        type: 'text',
        title: '关键：根音在哪里？',
        content: `<p>每种手型的<strong>根音位置</strong>不同，这决定了移动手型时怎么找到目标音：</p>`
      },
      {
        type: 'table',
        title: '各手型的根音位置',
        headers: ['手型', '根音所在弦', '开放时的根音', '特点'],
        rows: [
          ['C 型', '5弦 (A弦)', '5弦3品 = C', '根音在手型中间偏上'],
          ['A 型', '5弦 (A弦)', '5弦空弦 = A', '根音在横按位置，最常用'],
          ['G 型', '6弦 (低E弦)', '6弦3品 = G', '手型较大，常简化使用'],
          ['E 型', '6弦 (低E弦)', '6弦空弦 = E', '最常用的横按手型（F和弦就是它）'],
          ['D 型', '4弦 (D弦)', '4弦空弦 = D', '根音在高音区，适合小范围和弦'],
        ]
      },
      {
        type: 'info',
        title: '你已经在用 CAGED 了！',
        content: `还记得 F 和弦吗？它就是 E 型手型移到第 1 品！

F 和弦 = E手型 + 1品横按
• 食指横按第1品（代替琴枕/nut）
• 其他手指保持 E 和弦的"形状"

这就是 CAGED 的原理：横按 = 移动琴枕，手型不变！`,
      },
      {
        type: 'text',
        title: '手型移动原理',
        content: `<p>移动手型的方法：</p>
<p>1. <strong>保持手型不变</strong>（手指之间的相对位置不变）</p>
<p>2. <strong>整体向高品移动</strong>到目标根音的位置</p>
<p>3. <strong>食指横按</strong>（代替原来空弦的角色）</p>
<p>例如：想用 E 型弹 G 和弦，G 在 6 弦第 3 品，所以把 E 型移到第 3 品横按 → 得到 G 和弦！</p>`
      },
      {
        type: 'text',
        title: 'C 和弦的 5 种弹法',
        content: `<p>这是 CAGED 的精髓：<strong>同一个 C 和弦</strong>，可以用 5 种不同的手型在指板上的 5 个位置弹出来：</p>`
      },
      {
        type: 'chord-grid',
        title: 'C 和弦 × 5 种 CAGED 手型',
        chords: ['C_caged_C', 'C_caged_A', 'C_caged_G', 'C_caged_E', 'C_caged_D'],
      },
      {
        type: 'table',
        title: 'C 和弦 5 种把位详解',
        headers: ['手型', '把位', '根音位置', '难度', '使用场景'],
        rows: [
          ['C 型', '开放位置', '5弦3品', '★', '最基本的C和弦'],
          ['A 型', '第3品', '5弦3品', '★★', '常用的横按和弦形'],
          ['G 型', '第5品', '6弦8品', '★★★', '较少用，手型较大'],
          ['E 型', '第8品', '6弦8品', '★★', '非常常用的横按形'],
          ['D 型', '第10品', '4弦10品', '★★', '高把位小和弦形'],
        ]
      },
      {
        type: 'text',
        title: 'CAGED 的循环顺序',
        content: `<p>5 种手型在指板上<strong>按固定顺序循环</strong>排列，从低把位到高把位：</p>
<p><strong>→ C → A → G → E → D → C → A → G → ...</strong></p>
<p>这个顺序永远不变！无论你弹什么调，手型的排列顺序都是 CAGED。</p>
<p>你可以从任何一个手型开始，向高把位移动时，下一个手型就是 CAGED 顺序中的下一个。例如：</p>
<p>• 从 E 型开始 → 下一个是 D 型 → 再下一个是 C 型 → A 型 → G 型 → 回到 E 型</p>`
      },
      {
        type: 'info',
        title: '练习方法（每天10分钟）',
        content: `Week 1: 复习5种开放手型，确保每个都能清晰发声

Week 2: 选 C 和弦，找到5个把位，依次弹奏
• C型(开放) → A型(3品) → G型(5品) → E型(8品) → D型(10品)
• 每个位置弹4下，然后切换到下一个

Week 3: 换 G 和弦，重复上面的练习

Week 4: 尝试 A、D、E 等其他调

Tips:
• 一开始不求快，重要的是手型准确
• G型最难，可以先跳过，等其他4个熟练了再练
• 注意每次切换时根音在哪根弦上`,
      },
      {
        type: 'exercise',
        question: '如果要用 E 型手型弹一个 A 和弦，横按应该在第几品？（提示：A 在6弦的什么位置？）',
        answer: 'A 音在6弦第5品，所以用 E 型在第5品横按就是 A 和弦。这就是我们常见的 A 横按和弦！验证：E 型开放时根音在6弦空弦(E)，移到5品就变成了 A。',
      },
    ],
  },

  // Chapter 21: CAGED Advanced
  {
    id: 21,
    slug: 'caged-advanced',
    title: 'CAGED 系统：和弦推导与实战运用',
    subtitle: '用 CAGED 推导任意调的和弦，掌握小和弦变体与即兴伴奏技巧',
    phase: 4,
    sections: [
      {
        type: 'text',
        title: '用 CAGED 推导任意调的大三和弦',
        content: `<p>掌握了 CAGED 原理后，你可以推导出<strong>任何调</strong>的大三和弦在指板上的 5 个位置。方法：</p>
<p>1. 确定目标音（如 G）在 5 弦和 6 弦上的位置</p>
<p>2. 根据根音所在弦选择对应的手型</p>
<p>3. 把手型移到根音所在的品位</p>
<p>以 <strong>G 大三和弦</strong>为例：</p>`
      },
      {
        type: 'chord-grid',
        title: 'G 和弦 × 5 种 CAGED 手型',
        chords: ['G_caged_G', 'G_caged_E', 'G_caged_D', 'G_caged_C', 'G_caged_A'],
      },
      {
        type: 'table',
        title: 'G 和弦 5 种把位',
        headers: ['手型', '把位', '根音位置', '推导过程'],
        rows: [
          ['G 型', '开放', '6弦3品', '开放G和弦本身'],
          ['E 型', '3品', '6弦3品', 'E型手型移到3品（G在6弦3品）'],
          ['D 型', '5品', '4弦5品', 'D型手型移到5品（G在4弦5品）'],
          ['C 型', '7品', '5弦10品', 'C型手型移到7品'],
          ['A 型', '10品', '5弦10品', 'A型手型移到10品（G在5弦10品）'],
        ]
      },
      {
        type: 'info',
        title: '快速推导公式',
        content: `任意大三和弦的 CAGED 推导：

1. 找到目标音在6弦上的品位 → E型 和 G型的把位
2. 找到目标音在5弦上的品位 → A型 和 C型的把位
3. 找到目标音在4弦上的品位 → D型的把位

举例推导 D 和弦：
• D 在6弦10品 → E型在10品 (太高可用开放D)
• D 在5弦5品  → A型在5品, C型在2品
• D 在4弦0品  → D型在开放位置
• G型在7品（从6弦10品倒推）`,
      },
      {
        type: 'text',
        title: 'CAGED 与小和弦',
        content: `<p>大三和弦的 CAGED 手型可以轻松改成<strong>小三和弦</strong>：只需要把手型中的<strong>大三度音降低半音</strong>（即减少一品）。</p>
<p>最常用的小和弦移动手型有 3 种：</p>
<p>• <strong>Em 型</strong>（E 型的小和弦版）— 根音在6弦，最常用</p>
<p>• <strong>Am 型</strong>（A 型的小和弦版）— 根音在5弦，非常常用</p>
<p>• <strong>Dm 型</strong>（D 型的小和弦版）— 根音在4弦</p>`
      },
      {
        type: 'chord-grid',
        title: '小和弦移动手型示例',
        chords: ['Am_caged_Am', 'Bm_caged_Am', 'Fm_caged_Em', 'Gm_caged_Em', 'Dm_caged_Dm', 'Em_caged_Dm'],
      },
      {
        type: 'table',
        title: '大 → 小和弦变化规则',
        headers: ['大和弦手型', '→ 小和弦手型', '变化的音', '变化方式'],
        rows: [
          ['E 型', 'Em 型', '3弦上的音', '降低1品（去掉1指）'],
          ['A 型', 'Am 型', '2弦上的音', '降低1品'],
          ['D 型', 'Dm 型', '1弦上的音', '降低1品'],
          ['C 型', 'Cm 型', '2弦上的音', '降低1品（较难按）'],
          ['G 型', 'Gm 型', '多个音', '较复杂，实际少用'],
        ]
      },
      {
        type: 'text',
        title: 'CAGED 与七和弦',
        content: `<p>在 CAGED 手型的基础上，还可以加入<strong>七度音</strong>来得到七和弦：</p>
<p>• <strong>大七和弦 (Maj7)</strong>：在手型中找到根音的高八度，降低1品</p>
<p>• <strong>属七和弦 (dom7)</strong>：在手型中找到根音的高八度，降低2品</p>
<p>• <strong>小七和弦 (m7)</strong>：先变成小和弦，再加属七的方法</p>
<p>例如：E 型大三和弦 → E7 型（松开4弦的手指）→ 移到任意品位就是属七和弦</p>`
      },
      {
        type: 'text',
        title: 'CAGED 与音阶',
        content: `<p>CAGED 不仅用于和弦，每种手型都对应一个<strong>大调音阶的指型</strong>（Scale Pattern）。</p>
<p>当你用某个 CAGED 手型弹和弦时，周围的音阶音就按照对应的指型分布。这意味着：</p>
<p>• 弹和弦伴奏时，可以在同一位置加入<strong>旋律音</strong>和<strong>装饰音</strong></p>
<p>• 即兴 solo 时，看到和弦手型就能找到可用的音阶</p>
<p>• 编曲时，可以在和弦和旋律之间自如切换</p>`
      },
      {
        type: 'info',
        title: '实战运用：即兴伴奏中的 CAGED',
        content: `场景：一首歌的和弦进行是 G - C - D - G

方法1：全部在开放位置弹（初学者做法）
G(开放) - C(开放) - D(开放) - G(开放)
→ 手要大幅跳动

方法2：用 CAGED 找就近把位（进阶做法）
G(E型,3品) - C(A型,3品) - D(A型,5品) - G(E型,3品)
→ 手几乎不用移动！都在3-5品区域

这就是 CAGED 的实战价值：让你在指板的任何区域都能找到需要的和弦，减少不必要的移动。`,
      },
      {
        type: 'info',
        title: '进阶练习计划',
        content: `Level 1: E型 + A型横按（覆盖所有调的大三和弦）
• 这两种最常用，先练到自如

Level 2: 加入 D型（三种手型覆盖大部分需求）

Level 3: 加入 C型（拓展中把位选择）

Level 4: 加入 G型（完整CAGED，最难但最自由）

Level 5: 小和弦 + 七和弦变体

每个Level至少练习2周再进入下一个！`,
      },
      {
        type: 'exercise',
        question: '一首歌的和弦是 Am - F - C - G，如果你想在第5品附近弹，每个和弦应该用什么 CAGED 手型？',
        answer: 'Am: Em型在5品（A在6弦5品）；F: A型在8品或E型在1品... 更好的方案：Am(Em型,5品) - F(E型,1品太远... C型,5品) - C(A型,3品) - G(E型,3品)。实际操作中会根据把位灵活选择最近的手型。',
      },
    ],
  },

  {
    id: 14,
    slug: 'inversions',
    title: '转位和弦',
    subtitle: '改变低音——第一转位、第二转位如何改变和弦的色彩和声部进行',
    phase: 4,
    sections: [
      {
        type: 'text',
        title: '转位和弦的概念',
        content: `<p><strong>转位</strong>（Inversion）是将和弦的非根音放到最低声部。转位改变了和弦的"底色"，使声部进行更加流畅。</p>
<p>以C和弦（C-E-G）为例：</p>
<p>• <strong>原位</strong>：C 在低音（C-E-G）— 最稳定</p>
<p>• <strong>第一转位</strong>：E 在低音（E-G-C）— 较轻盈，写作 C/E</p>
<p>• <strong>第二转位</strong>：G 在低音（G-C-E）— 有悬浮感，写作 C/G</p>`
      },
      {
        type: 'chord-grid',
        title: 'C和弦三种位置对比',
        chords: ['C', 'C_1st_inv', 'C_2nd_inv'],
      },
      {
        type: 'text',
        title: '转位在声部进行中的作用',
        content: `<p>转位最重要的用途是创造<strong>平滑的低音线</strong>。例如：</p>
<p>C → C/E → F → F 的低音线是：C → E → F，形成上行级进，比 C → F 的跳进更加流畅。</p>
<p>经典的行进低音（Walking Bass）：C → C/B → Am → Am/G → F</p>
<p>低音线：C → B → A → G → F — 一条优美的下行音阶！</p>`
      },
      {
        type: 'exercise',
        question: 'G/B 中的低音是什么？它通常出现在什么场景？',
        answer: 'G/B 的低音是B（G和弦的三音）。它常出现在 C → G/B → Am 进行中，创造下行低音线 C → B → A，非常流畅。',
      },
    ],
  },

  {
    id: 15,
    slug: 'slash-chords',
    title: '斜线和弦',
    subtitle: '指定低音的和弦写法——创造行进低音线与丰富的和声层次',
    phase: 4,
    sections: [
      {
        type: 'text',
        title: '斜线和弦 vs 转位',
        content: `<p><strong>斜线和弦</strong>（Slash Chord）的写法是 <code>和弦/低音</code>，表示在某个和弦上方指定一个特定的低音。</p>
<p>转位是斜线和弦的一个子集——当低音恰好是和弦内音时，就是转位（如 C/E, C/G）。但斜线和弦的低音也可以是和弦外音（如 C/Bb），这时它就不是传统的转位了。</p>`
      },
      {
        type: 'chord-grid',
        title: '常用斜线和弦',
        chords: ['C/G', 'C/E', 'Am/E', 'G/B'],
      },
      {
        type: 'text',
        title: '经典斜线和弦用法',
        content: `<p><strong>下行低音线</strong>（最常见的用法）：</p>
<p>C → C/B → Am → Am/G → F → G → C</p>
<p>低音：C → B → A → G → F → G → C</p>
<p>这种"低音阶梯"在流行音乐中无处不在，它让简单的和弦进行变得更加有层次。</p>
<p><strong>踏板低音</strong>：保持低音不变，上方和弦变化。如 C/G → D/G → Em → G，低音一直是G。</p>`
      },
      {
        type: 'exercise',
        question: '在进行 C → G/B → Am → Am/G → F 中，低音线是什么？',
        answer: '低音线是 C → B → A → G → F，一条完美的下行音阶（级进下行）。这就是斜线和弦最经典的用法。',
      },
    ],
  },

  {
    id: 16,
    slug: 'sus-chords',
    title: '挂留和弦 (Sus2/Sus4)',
    subtitle: '暂时"挂起"三度音——创造悬浮、飘逸的和声效果',
    phase: 4,
    sections: [
      {
        type: 'text',
        title: '什么是挂留和弦？',
        content: `<p>挂留和弦（Suspended Chord）用<strong>二度音或四度音替代三度音</strong>，消除了大小调的明确性，产生"悬而未决"的效果。</p>
<p><strong>Sus4</strong>：1 - 4 - 5（三度音被四度音替代）。如 Csus4 = C-F-G</p>
<p><strong>Sus2</strong>：1 - 2 - 5（三度音被二度音替代）。如 Csus2 = C-D-G</p>
<p>之所以叫"挂留"，是因为四度音/二度音有强烈的倾向要<strong>解决</strong>回到三度音，像被"挂"在那里一样。</p>`
      },
      {
        type: 'chord-grid',
        title: '常用挂留和弦',
        chords: ['Csus2', 'Csus4', 'Dsus2', 'Dsus4', 'Asus2', 'Asus4'],
      },
      {
        type: 'text',
        title: '挂留和弦的用法',
        content: `<p><strong>装饰手法</strong>：Csus4 → C（先"挂"住再解决，增加趣味）</p>
<p><strong>模糊调性</strong>：连续使用sus和弦，刻意不解决，营造飘渺氛围（常见于后摇/氛围音乐）</p>
<p><strong>替代用法</strong>：用 Gsus4 替代 G，延迟解决到 G，增强属和弦的张力</p>`
      },
      {
        type: 'exercise',
        question: 'Dsus4 的组成音是什么？它最自然地解决到什么和弦？',
        answer: 'Dsus4 = D-G-A（1-4-5），四度音G倾向于下行半步到F#，所以Dsus4最自然地解决到D大三和弦 (D-F#-A)。',
      },
    ],
  },

  {
    id: 17,
    slug: 'extensions',
    title: '九/十一/十三和弦',
    subtitle: '超越七和弦——延伸音如何为和声增添色彩与深度',
    phase: 4,
    sections: [
      {
        type: 'text',
        title: '延伸音的概念',
        content: `<p>当我们在七和弦的基础上继续叠加三度，就得到了<strong>延伸和弦</strong>（Extended Chords）：</p>
<p>七和弦 (1-3-5-7) → <strong>九和弦</strong> (+9) → <strong>十一和弦</strong> (+11) → <strong>十三和弦</strong> (+13)</p>
<p>实际上：9度 = 2度高八度，11度 = 4度高八度，13度 = 6度高八度。</p>
<p>在吉他上，由于只有6根弦，通常会<strong>省略部分音</strong>（如5度音或根音），保留最有特色的延伸音。</p>`
      },
      {
        type: 'table',
        title: '延伸和弦类型',
        headers: ['和弦', '公式', '示例 (C)', '特色音', '常用场景'],
        rows: [
          ['Maj9', '1-3-5-7-9', 'C-E-G-B-D', '大七度+九度', '爵士/Neo Soul'],
          ['9 (dom9)', '1-3-5-b7-9', 'C-E-G-Bb-D', '属七+九度', '放克/R&B'],
          ['m9', '1-b3-5-b7-9', 'C-Eb-G-Bb-D', '小七+九度', '爵士小调'],
          ['11', '1-3-5-b7-9-11', 'C-E-G-Bb-D-F', '属+十一度', '放克'],
          ['13', '1-3-5-b7-9-13', 'C-E-G-Bb-D-A', '属+十三度', '爵士/蓝调'],
        ]
      },
      {
        type: 'chord-grid',
        title: '延伸和弦指法',
        chords: ['Cmaj9', 'Dm9', 'G9', 'G13'],
      },
      {
        type: 'exercise',
        question: 'G13和弦包含哪些音？在吉他上通常省略哪些音？',
        answer: 'G13 理论上包含 G-B-D-F-A-E（1-3-5-b7-9-13），共6个音。在吉他上通常省略5度音(D)和11度音(C)，保留根音、三度、七度和十三度这些最有特色的音。',
      },
    ],
  },

  // ========== Phase 5: Advanced ==========
  {
    id: 18,
    slug: 'drop-chords',
    title: 'Drop 和弦',
    subtitle: 'Drop 2 / Drop 3 声位——打开和弦排列，获得吉他友好的爵士声位',
    phase: 5,
    sections: [
      {
        type: 'text',
        title: '什么是 Drop 声位？',
        content: `<p>在<strong>密集排列</strong>（Close Voicing）的四音和弦中，所有音都在一个八度内。但在吉他上，密集排列常常很难按，于是我们使用 <strong>Drop</strong> 技术：</p>
<p><strong>Drop 2</strong>：将密集排列中从高到低的<strong>第2个音</strong>降低一个八度。</p>
<p><strong>Drop 3</strong>：将密集排列中从高到低的<strong>第3个音</strong>降低一个八度。</p>
<p>这样得到的<strong>开放排列</strong>（Open Voicing）在吉他上更容易按，音响也更宽广。</p>`
      },
      {
        type: 'text',
        title: 'Drop 2 示例',
        content: `<p>以 Cmaj7 密集排列为例（从高到低）：B - G - E - C</p>
<p>第2个音是 G，将 G 降低八度：</p>
<p>Drop 2 结果：B - E - C - G（低八度）</p>
<p>这种排列在吉他中声部的弦组上非常好按，是爵士吉他最常用的声位方式。</p>`
      },
      {
        type: 'info',
        title: 'Drop 2 的实用价值',
        content: `Drop 2 声位是爵士吉他的"面包和黄油"：
• 它在吉他4根相邻弦上排列自然
• 最高音（旋律音）清晰突出
• 内声部运动丰富
• 可以系统性地在指板上移动

练习方法：
1. 先掌握一种和弦类型（如maj7）的4个Drop 2转位
2. 在一组弦上（如2-5弦）练习所有转位
3. 然后移到另一组弦上重复`,
      },
      {
        type: 'exercise',
        question: '将 Dm7 的密集排列 C-A-F-D（从高到低）变成 Drop 2 声位。',
        answer: 'Drop 2：取从高到低第2个音（A），降低八度。结果：C-F-D-A（低八度）。在吉他上这是一个非常实用的 Dm7 声位。',
      },
    ],
  },

  {
    id: 19,
    slug: 'modes',
    title: '调式详解与指板练习',
    subtitle: '七种教会调式——每种调式的指板音阶、特征音与练习方法',
    phase: 5,
    sections: [
      {
        type: 'text',
        title: '调式的概念',
        content: `<p><strong>调式</strong>（Mode）是从大调音阶的不同音级开始演奏，获得不同的音响效果。C大调音阶的音是 C-D-E-F-G-A-B，如果从不同的音开始：</p>
<p>从 C 开始：C-D-E-F-G-A-B = <strong>Ionian</strong>（就是大调）</p>
<p>从 D 开始：D-E-F-G-A-B-C = <strong>Dorian</strong></p>
<p>从 E 开始：E-F-G-A-B-C-D = <strong>Phrygian</strong></p>
<p>以此类推...虽然音相同，但因为<strong>起点不同</strong>，全音半音的排列不同，听感完全不同！</p>`
      },
      {
        type: 'table',
        title: '七种调式总览',
        headers: ['调式', '起始度数', '全半音排列', '特征音', '听感/风格'],
        rows: [
          ['Ionian (伊奥尼安)', 'I', 'W-W-H-W-W-W-H', '无（标准大调）', '明亮、快乐'],
          ['Dorian (多利安)', 'II', 'W-H-W-W-W-H-W', '大六度 (#6)', '小调但不那么暗，放克/蓝调'],
          ['Phrygian (弗里几安)', 'III', 'H-W-W-W-H-W-W', '小二度 (b2)', '异域风情、西班牙/中东'],
          ['Lydian (利底安)', 'IV', 'W-W-W-H-W-W-H', '增四度 (#4)', '梦幻、飘逸、电影配乐'],
          ['Mixolydian (混合利底安)', 'V', 'W-W-H-W-W-H-W', '小七度 (b7)', '蓝调大调感、摇滚'],
          ['Aeolian (伊奥利安)', 'VI', 'W-H-W-W-H-W-W', '无（标准小调）', '忧伤、深沉'],
          ['Locrian (洛克里安)', 'VII', 'H-W-W-H-W-W-W', '小二度+减五度', '黑暗、极不稳定'],
        ]
      },
      {
        type: 'info',
        title: '调式分类记忆法',
        content: `"大调系"（包含大三度，明亮感）：
• Ionian = 标准大调
• Lydian = 大调 + #4（更明亮、梦幻）
• Mixolydian = 大调 + b7（蓝调味、摇滚味）

"小调系"（包含小三度，暗淡感）：
• Aeolian = 标准自然小调
• Dorian = 小调 + #6（更明亮的小调，放克首选）
• Phrygian = 小调 + b2（最暗的小调，西班牙风）

"特殊"：
• Locrian = 减和弦为主音，极少实际使用`,
      },
      {
        type: 'text',
        title: '各调式指板音阶',
        content: `<p>下面展示从 C 大调派生的 7 种调式在指板上的位置。注意观察<strong>特征音</strong>（用颜色标出的音）和标准大调/小调的区别。</p>`
      },
      { type: 'scale', title: 'D Dorian (多利安) — 放克/蓝调常用', scale: 'd_dorian' },
      { type: 'scale', title: 'E Phrygian (弗里几安) — 西班牙/金属风', scale: 'e_phrygian' },
      { type: 'scale', title: 'F Lydian (利底安) — 梦幻/电影配乐', scale: 'f_lydian' },
      { type: 'scale', title: 'G Mixolydian (混合利底安) — 蓝调/摇滚', scale: 'g_mixolydian' },
      { type: 'scale', title: 'A Aeolian (自然小调)', scale: 'a_aeolian' },
      { type: 'scale', title: 'B Locrian (洛克里安) — 理论性调式', scale: 'b_locrian' },
      {
        type: 'text',
        title: '自由探索：交互指板',
        content: `<p>使用下面的交互指板，自由选择<strong>任意根音</strong>和<strong>任意调式</strong>，查看它在指板上的分布。试试从不同根音出发感受调式的变化！</p>`
      },
      {
        type: 'scale-interactive',
        title: '调式指板探索器',
        options: { defaultRoot: 'D', defaultScale: 'dorian' },
      },
      {
        type: 'info',
        title: '调式练习方法',
        content: `1. 先用交互指板熟悉每种调式在指板上的"形状"
2. 选一种调式（推荐从 Dorian 开始），用一个固定根音反复弹
3. 在弹的时候特别注意"特征音"的位置和听感
4. 用一个和弦伴奏（如 Dm7）做背景，在上面弹 D Dorian
5. 对比：同样的 Dm7 伴奏，弹 D Aeolian（自然小调），感受区别

推荐练习顺序：
Dorian → Mixolydian → Lydian → Phrygian → Locrian`,
      },
      {
        type: 'exercise',
        question: 'D Dorian 和 D 自然小调（Aeolian）在指板上只差一个音，是哪个？',
        answer: '第6级：Dorian 是 B（大六度），Aeolian 是 Bb（小六度）。这一个音的差异就让 Dorian 听起来比 Aeolian 更明亮、更有放克感。',
      },
    ],
  },

  // Chapter 22: Pentatonic Scales
  {
    id: 22,
    slug: 'pentatonic',
    title: '五声音阶——最实用的即兴工具',
    subtitle: '去掉两个音，获得最百搭的音阶：五声大调与五声小调的指板练习',
    phase: 5,
    sections: [
      {
        type: 'text',
        title: '什么是五声音阶？',
        content: `<p>五声音阶（Pentatonic Scale）只有<strong>5个音</strong>，是从7音大调/小调中去掉2个"容易出错"的音得到的。因为没有半音关系，所以<strong>怎么弹都好听</strong>，是即兴入门的最佳选择。</p>
<p><strong>大调五声</strong>：从大调中去掉 4 级和 7 级 → 1-2-3-5-6</p>
<p>例：C 大调五声 = C-D-E-G-A（没有 F 和 B）</p>
<p><strong>小调五声</strong>：从自然小调中去掉 2 级和 6 级 → 1-b3-4-5-b7</p>
<p>例：A 小调五声 = A-C-D-E-G（没有 B 和 F）</p>
<p>有趣的是：<strong>C 大调五声和 A 小调五声包含完全相同的 5 个音</strong>！只是根音不同。它们是关系大小调的五声版本。</p>`
      },
      {
        type: 'text',
        title: 'A 小调五声音阶——吉他手的"第一条音阶"',
        content: `<p>A 小调五声是吉他上<strong>最常用</strong>的音阶，90% 的摇滚/蓝调 solo 都基于它。它的指板分布非常"吉他友好"——每根弦上只有2个音，手指移动小。</p>`
      },
      { type: 'scale', title: 'A 小调五声音阶', scale: 'a_pentatonic_minor' },
      {
        type: 'text',
        title: 'C 大调五声音阶',
        content: `<p>C 大调五声和 A 小调五声是同一组音（C-D-E-G-A），但以 C 为根音时听感完全不同——更明亮、更欢快。</p>`
      },
      { type: 'scale', title: 'C 大调五声音阶', scale: 'c_pentatonic_major' },
      {
        type: 'text',
        title: '五声音阶的 5 种指型 (Pattern)',
        content: `<p>五声音阶在指板上有 <strong>5 种指型</strong>，它们和 CAGED 系统完美对应：</p>`
      },
      {
        type: 'table',
        title: '五声小调 5 种指型（以 A 小调五声为例）',
        headers: ['指型', '起始品位', '对应 CAGED', '特点', '常用场景'],
        rows: [
          ['Pattern 1', '5品', 'E 型', '最常用！根音在6弦', '蓝调/摇滚 solo 首选'],
          ['Pattern 2', '8品', 'D 型', '根音在4弦', 'Pattern 1 的上方延伸'],
          ['Pattern 3', '10品/开放', 'C 型', '跨越较大', '高把位旋律'],
          ['Pattern 4', '12品/开放', 'A 型', '根音在5弦', '连接高低把位'],
          ['Pattern 5', '3品', 'G 型', '根音在6弦（低八度）', '低把位 riff'],
        ]
      },
      {
        type: 'text',
        title: '用不同根音练习',
        content: `<p>用交互指板切换不同的根音，观察五声音阶的"形状"在指板上如何移动。记住：<strong>形状不变，只是位置移动</strong>。</p>`
      },
      {
        type: 'scale-interactive',
        title: '五声音阶指板探索器',
        options: { defaultRoot: 'A', defaultScale: 'pentatonic_minor' },
      },
      {
        type: 'info',
        title: '五声音阶练习计划',
        content: `Week 1: A 小调五声 Pattern 1（5品）
• 上行下行各练 10 遍，配节拍器 60 BPM
• 注意每个音的清晰度

Week 2: Pattern 1 + Pattern 2 连接
• 从 Pattern 1 的最高音滑到 Pattern 2

Week 3: 加入 Pattern 5（低把位）
• Pattern 5 → Pattern 1 → Pattern 2 连续弹

Week 4: 换到 E 小调五声，重复以上练习
• 验证"形状不变，位置移动"的原理

进阶：在一首歌的伴奏上用五声音阶即兴
推荐曲目背景：Am → Dm → Em → Am（慢速蓝调节奏）`,
      },
      {
        type: 'exercise',
        question: '如果要弹 E 小调五声的 Pattern 1（E型），起始品位在哪里？',
        answer: 'E 在6弦的位置是：开放弦(0品) 或 12品。Pattern 1 的根音在6弦，所以 E 小调五声 Pattern 1 可以在开放位置弹（0-3品区域）或在12品弹。最常用的是开放位置。',
      },
    ],
  },

  // Chapter 23: Blues Scale
  {
    id: 23,
    slug: 'blues-scale',
    title: '布鲁斯音阶与即兴入门',
    subtitle: '五声小调 + 蓝调音——一个音的加入带来灵魂的味道',
    phase: 5,
    sections: [
      {
        type: 'text',
        title: '什么是布鲁斯音阶？',
        content: `<p>布鲁斯音阶（Blues Scale）= <strong>五声小调 + 一个"蓝调音"(Blue Note)</strong></p>
<p>蓝调音就是 <strong>b5</strong>（减五度/增四度），也叫<strong>三全音</strong>（Tritone）。它是音乐中最不稳定、最有张力的音程。</p>
<p>五声小调：1 - b3 - 4 - 5 - b7</p>
<p>布鲁斯音阶：1 - b3 - 4 - <strong>b5</strong> - 5 - b7</p>
<p>以 A 为例：A - C - D - <strong>D#/Eb</strong> - E - G</p>
<p>多出来的这个 D#/Eb 就是布鲁斯的"灵魂之音"。</p>`
      },
      { type: 'scale', title: 'A 布鲁斯音阶', scale: 'a_blues' },
      { type: 'scale', title: 'E 布鲁斯音阶', scale: 'e_blues' },
      {
        type: 'text',
        title: '蓝调音的用法',
        content: `<p>蓝调音（b5）<strong>不要停留</strong>在上面！它是一个<strong>过渡音/经过音</strong>，应该快速滑过或弯到相邻的音：</p>
<p>• 从 4 级滑到 5 级，经过 b5：<strong>4 → b5 → 5</strong>（最经典的蓝调乐句）</p>
<p>• 从 5 级弯下来到 b5 再回去：<strong>5 → b5 → 5</strong>（弯音技巧）</p>
<p>• 从 b5 解决到 4：<strong>b5 → 4</strong>（向下解决）</p>`
      },
      {
        type: 'text',
        title: '12 小节布鲁斯上的即兴',
        content: `<p>12 小节布鲁斯是蓝调的标准曲式：</p>
<p><code>| I  | I  | I  | I  | IV | IV | I  | I  | V  | IV | I  | V  |</code></p>
<p>以 A 调为例：</p>
<p><code>| A  | A  | A  | A  | D  | D  | A  | A  | E  | D  | A  | E  |</code></p>
<p>最简单的即兴方法：<strong>整首歌只用 A 布鲁斯音阶</strong>。不需要跟着和弦变化切换音阶！这就是五声/蓝调音阶的魔力。</p>`
      },
      {
        type: 'info',
        title: '蓝调即兴技巧',
        content: `基础蓝调乐句模式（以 A 布鲁斯为例）：

乐句1（经典开场）：
5弦: 5品(A) → 7品(B♭反复弯到C) → 5弦5品(A)

乐句2（蓝调音经过）：
3弦: 5品(D) → 6品(D#) → 7品(E) — 经典的 4→b5→5

乐句3（收束）：
1弦: 8品(C) → 5品(A) — 从 b3 解决到根音

关键技巧：
• 弯音（Bend）：2弦7品 弯一格 = 蓝调的灵魂
• 滑音（Slide）：在相邻品格之间滑动
• 锤击/勾弦（Hammer-on/Pull-off）：让音连贯流畅
• 闷音（Mute）：增加节奏感`,
      },
      {
        type: 'scale-interactive',
        title: '布鲁斯音阶探索器',
        options: { defaultRoot: 'A', defaultScale: 'blues' },
      },
      {
        type: 'exercise',
        question: 'E 布鲁斯音阶包含哪些音？蓝调音是什么？',
        answer: 'E 布鲁斯 = E - G - A - A#/Bb - B - D。蓝调音是 A#/Bb（b5，E的减五度）。在指板上，它在 A（4级，6弦5品）和 B（5级，6弦7品）之间的 6弦6品。',
      },
    ],
  },

  {
    id: 20,
    slug: 'comprehensive',
    title: '综合实战',
    subtitle: '分析真实歌曲的和声结构——综合运用五度圈、和弦知识进行音乐分析',
    phase: 5,
    sections: [
      {
        type: 'text',
        title: '如何分析一首歌的和声',
        content: `<p>现在你已经掌握了丰富的乐理工具，来综合运用它们分析真实音乐：</p>
<p><strong>Step 1：确定调性</strong> — 找到主和弦（通常是开头/结尾的和弦），或用五度圈匹配升降号。</p>
<p><strong>Step 2：标注级数</strong> — 将每个和弦转化为罗马数字，识别和弦功能。</p>
<p><strong>Step 3：识别进行模式</strong> — 看看是否包含经典进行（I-V-vi-IV, ii-V-I 等）。</p>
<p><strong>Step 4：分析特殊和弦</strong> — 转位、斜线和弦、挂留和弦、借用和弦等的运用。</p>
<p><strong>Step 5：在五度圈上画路径</strong> — 可视化和声运动的方向和距离。</p>`
      },
      {
        type: 'text',
        title: '分析示例：《Let It Be》',
        content: `<p>和弦进行：C - G - Am - F | C - G - F - C</p>
<p><strong>调性</strong>：C大调</p>
<p><strong>级数</strong>：I - V - vi - IV | I - V - IV - I</p>
<p><strong>分析</strong>：</p>
<p>• 前四个和弦：经典的 I-V-vi-IV"卡农进行"</p>
<p>• 后四个和弦：I-V 打开 → IV-I 变格终止收束</p>
<p>• 整首歌只用了4个和弦，全部是C大调顺阶和弦</p>
<p>• 在五度圈上：C和G相邻（属关系），F是C的另一侧邻居（下属关系），Am是C的关系小调</p>`
      },
      {
        type: 'text',
        title: '分析示例：更复杂的和声',
        content: `<p>和弦进行：Cmaj7 - Dm7 - Em7 - A7 - Dm7 - G7 - Cmaj7</p>
<p><strong>调性</strong>：C大调</p>
<p><strong>级数</strong>：Imaj7 - ii7 - iii7 - <strong>V7/ii</strong> - ii7 - V7 - Imaj7</p>
<p><strong>分析</strong>：</p>
<p>• Cmaj7→Dm7→Em7：顺阶上行（I→ii→iii）</p>
<p>• <strong>A7</strong>：这不是C大调的顺阶和弦！它是 Dm 的属七（V7/ii），叫做<strong>副属和弦</strong></p>
<p>• A7→Dm7→G7→Cmaj7：连续的 V-I 解决链（下行五度圈！）</p>
<p>• 在五度圈上画路径：A→D→G→C 是连续四步逆时针运动</p>`
      },
      {
        type: 'circle-of-fifths',
        title: '用五度圈分析和弦进行',
        mode: 'progressions',
      },
      {
        type: 'info',
        title: '继续学习的方向',
        content: `恭喜你完成了基础到进阶的乐理学习之旅！接下来可以探索：

• 副属和弦 (Secondary Dominants)
• 借用和弦 (Borrowed Chords / Modal Interchange)
• 代理和弦 (Tritone Substitution)
• 和声节奏 (Harmonic Rhythm)
• 即兴演奏基础

记住：理论是工具，耳朵是指南。多听、多弹、多分析真实音乐！`,
      },
      {
        type: 'exercise',
        question: '分析这个进行的和弦功能：Am - Dm - G - C - F - Bdim - Em - Am',
        answer: '调性 A小调（C大调的关系小调）。级数：i - iv - VII - III - VI - ii° - v - i。这是一个扩展的小调下行五度圈进行！在五度圈上：Am→Dm→G→C→F 是连续逆时针运动。Bdim→Em→Am 是最后的收束（ii°→v→i）。',
      },
    ],
  },
];
