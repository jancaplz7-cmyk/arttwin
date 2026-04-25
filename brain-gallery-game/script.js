const $ = (selector) => document.querySelector(selector);

const moods = [
  { id: "calm", label: "平静", tone: "你以平静入馆，像带着一杯刚放凉的水。" },
  { id: "anxious", label: "焦虑", tone: "你把一点焦虑带进展馆，它让每束光都更清醒。" },
  { id: "excited", label: "兴奋", tone: "你带着兴奋入馆，像有人提前打开了聚光灯。" },
  { id: "lost", label: "迷茫", tone: "你以迷茫入馆，但迷雾本身也是一种路线。" },
  { id: "tired", label: "疲惫", tone: "你把疲惫放在入口，它仍然陪你走完整场展。" },
  { id: "curious", label: "好奇", tone: "你带着好奇入馆，于是每个展品都多了一层回声。" },
];

const scoreLabels = {
  Memory: "记忆型",
  Expression: "表达型",
  Insight: "洞察型",
  Repair: "修复型",
  Creator: "创造型",
  Rebel: "反抗型",
};

const resultMap = {
  Memory: {
    title: "记忆园丁",
    en: "Memory Gardener",
    text: "你擅长在过去里找到继续生长的证据。你不是困在回忆里，而是在替它们寻找新的土壤。",
    keywords: ["旧光", "生长", "温柔保存"],
  },
  Expression: {
    title: "噪音诗人",
    en: "Noise Poet",
    text: "你不只是承受世界的声音，也会把混乱重新编曲。你的表达不是表演，而是自我确认。",
    keywords: ["发声", "编曲", "自我确认"],
  },
  Insight: {
    title: "镜中侦探",
    en: "Mirror Detective",
    text: "你习惯观察自己，也敢于拆开复杂的身份。你不急着给自己下定义，因为你知道真实需要时间显影。",
    keywords: ["观察", "显影", "清醒"],
  },
  Repair: {
    title: "星光修复师",
    en: "Star Repairer",
    text: "你相信破损不是终点，而是新的结构开始。你总能在裂缝旁边找到修复的入口。",
    keywords: ["修复", "裂缝", "再出发"],
  },
  Creator: {
    title: "梦境建造者",
    en: "Dream Builder",
    text: "你不满足于接受已有答案。你更愿意把碎片重新组合，造出一种属于自己的可能性。",
    keywords: ["重组", "想象", "造物"],
  },
  Rebel: {
    title: "温柔反叛者",
    en: "Gentle Rebel",
    text: "你不一定用很大的声音反抗，但你一直在拒绝被单一标准定义。你的温柔本身就是一种力量。",
    keywords: ["边界", "改写", "柔软力量"],
  },
};

const rooms = [
  {
    id: "greenhouse",
    className: "room-greenhouse",
    title: "记忆温室",
    en: "Memory Greenhouse",
    intro: "玻璃穹顶下，旧光斑落在木桌和照片墙上。",
    core: {
      id: "camera",
      className: "object-camera",
      name: "旧相机",
      kicker: "CORE EXHIBIT",
      story: "快门亮起的一瞬间，你看见过去的自己站在温室尽头，手里攥着一张没有显影的照片。",
      fragment: "过曝相纸：那时的你没有消失，只是换了一种方式保护现在。",
      question: "你在旧相机里看见过去的自己，你会？",
      choices: [
        { text: "把照片收好，记住它曾经保护过你", reply: "你把旧光收进掌心，它没有变重，反而安静了。", scores: { Memory: 2 } },
        { text: "把照片埋进土里，让它长成新的东西", reply: "相纸落进泥土，边缘长出一点亮色的新芽。", scores: { Repair: 1, Creator: 1 } },
        { text: "把照片翻到背面，写下真正想说的话", reply: "你终于把没有说出口的话写给了自己。", scores: { Expression: 1, Insight: 1 } },
      ],
    },
    optional: [
      {
        id: "postcard",
        className: "object-postcard",
        name: "未寄出的明信片",
        story: "纸角被阳光烫得卷起，地址栏空着，像一条还没有决定终点的路。",
        fragment: "有些话没有寄出，但它并没有消失。",
      },
      {
        id: "plant",
        className: "object-plant",
        name: "枯萎植物",
        story: "它的叶子低垂着，但根部有一点不肯熄灭的绿。",
        fragment: "干枯不是终点，只是春天还没抵达。",
      },
    ],
    portalText: "玻璃门亮起",
    event: "照片墙短暂换成了你的名字，然后又被光擦掉。",
  },
  {
    id: "theater",
    className: "room-theater",
    title: "噪音剧场",
    en: "Noise Theater",
    intro: "红幕半开，观众席像一片正在窃窃私语的海。",
    core: {
      id: "microphone",
      className: "object-microphone",
      name: "麦克风",
      kicker: "CORE EXHIBIT",
      story: "聚光灯突然落下，麦克风把你的呼吸放大。那些评价混在一起，像没有调好的电台。",
      fragment: "未调频声波：混乱不是结论，它只是还没被你重新命名。",
      question: "聚光灯照向你，观众席传来杂乱评价，你会？",
      choices: [
        { text: "拿起麦克风，把自己的声音放大", reply: "你的声音穿过噪点，剧场第一次听见了真正的主旋律。", scores: { Expression: 2 } },
        { text: "关掉音箱，让剧场安静下来", reply: "灯光仍在，但安静替你夺回了呼吸的节奏。", scores: { Insight: 2 } },
        { text: "拉开幕布，让所有噪音暴露在光下", reply: "幕布被你拉开，杂音失去了躲藏的位置。", scores: { Rebel: 2 } },
      ],
    },
    optional: [
      {
        id: "speaker",
        className: "object-speaker",
        name: "坏掉音箱",
        story: "音箱里闪过一串失真的蓝紫色电流，像某些没有被理解的压力。",
        fragment: "噪音有时不是敌人，而是还没有被理解的信号。",
      },
      {
        id: "audience",
        className: "object-audience",
        name: "观众席剪影",
        story: "你听见几句模糊评价，但它们很快变成没有署名的回声。",
        fragment: "不是所有目光都有资格决定你的形状。",
      },
    ],
    portalText: "红幕通道打开",
    event: "一束聚光灯落在你刚刚选择的位置。",
  },
  {
    id: "archive",
    className: "room-archive",
    title: "镜像档案室",
    en: "Mirror Archive",
    intro: "冷蓝色灯光照着档案柜，地面反射出多个版本的你。",
    core: {
      id: "mirror",
      className: "object-mirror",
      name: "破碎镜子",
      kicker: "CORE EXHIBIT",
      story: "镜面裂开，却没有碎落。每一道裂纹都映出一个不同语气、不同姿态的你。",
      fragment: "裂纹索引：真实不是单数，它常常以复数抵达。",
      question: "破碎镜子里出现多个版本的你，你会？",
      choices: [
        { text: "逐个观察它们，不急着判断", reply: "你没有急着选择答案，镜子因此变得更清晰。", scores: { Insight: 2 } },
        { text: "选一个最真实的自己留下", reply: "你把最熟悉的那束反光保留下来，像保留一枚坐标。", scores: { Memory: 1, Insight: 1 } },
        { text: "把身份卡重新改写", reply: "档案系统短暂闪烁，新的姓名栏开始呼吸。", scores: { Rebel: 1, Creator: 1 } },
      ],
    },
    optional: [
      {
        id: "archiveBox",
        className: "object-archive-box",
        name: "档案盒",
        story: "盒盖掀开，几张纸像浅蓝色的鸟一样飞出又落回桌面。",
        fragment: "你不是一个固定答案，而是一组正在更新的记录。",
      },
      {
        id: "idCard",
        className: "object-id-card",
        name: "身份卡",
        story: "卡片翻面，背后没有编号，只有一行小字：允许重写。",
        fragment: "身份不是标签，是你临时借住的一间房。",
      },
    ],
    portalText: "档案柜间出现光门",
    event: "远处传来一声翻页，好像有人替你合上旧档案。",
  },
  {
    id: "repair",
    className: "room-repair",
    title: "星空修复间",
    en: "Star Repair Room",
    intro: "舷窗外漂着星尘，中央工作台上停着一只未完成的机械鸟。",
    core: {
      id: "mechanicalBird",
      className: "object-mechanical-bird",
      name: "机械鸟",
      kicker: "CORE EXHIBIT",
      story: "机械鸟的胸口缺少最后一块核心。它没有坠落，只是安静地等待你决定它的下一种形态。",
      fragment: "微光核心：没有完成，也可以是一种正在发生。",
      question: "机械鸟缺少最后一块核心，你会？",
      choices: [
        { text: "修好它，让它继续飞", reply: "你把核心嵌回胸口，翅膀发出柔和的启动声。", scores: { Repair: 2 } },
        { text: "改造它，让它变成新的生命", reply: "你重新排列零件，机械鸟长出从未设计过的翅膀。", scores: { Creator: 2 } },
        { text: "放它停在窗边，不强迫它飞", reply: "它停在星光旁边，沉默也终于被允许成为答案。", scores: { Insight: 1, Repair: 1 } },
      ],
    },
    optional: [
      {
        id: "starMap",
        className: "object-star-map",
        name: "星图",
        story: "星线一段段连接，像把散落的念头重新排成可以出发的航路。",
        fragment: "迷路时，微弱的光也可以成为路线。",
      },
      {
        id: "glowBottle",
        className: "object-glow-bottle",
        name: "发光瓶",
        story: "瓶口浮出几粒蓝色光尘，在你靠近时绕着手腕转了一圈。",
        fragment: "你收藏过的微光，会在迟到的夜里替你照明。",
      },
    ],
    portalText: "最终展厅开启",
    event: "星尘从工作台升起，在空中拼出一条很短的航线。",
  },
];

const randomEvents = [
  "墙上的画短暂换成了你的名字。",
  "某个展品像是轻轻呼吸了一下。",
  "地面出现一行很快消失的字：继续走。",
  "空气里传来一声很轻的快门。",
  "一束光落在你刚刚选择的地方。",
];

const state = {
  playerName: "",
  mood: "",
  roomIndex: 0,
  scores: {},
  choices: [],
  fragments: [],
  explored: {},
  completed: {},
  lastResult: null,
};

Object.keys(scoreLabels).forEach((key) => {
  state.scores[key] = 0;
});

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("is-active", screen.id === id);
  });
}

function getMoodLabel() {
  const mood = moods.find((item) => item.id === state.mood);
  return mood ? mood.label : "未选择";
}

function renderMoods() {
  const grid = $("#moodGrid");
  grid.innerHTML = moods
    .map((mood) => `<button class="mood-chip" type="button" data-mood="${mood.id}">${mood.label}</button>`)
    .join("");
}

function selectMood(id) {
  state.mood = id;
  document.querySelectorAll(".mood-chip").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.mood === id);
  });
}

function resetState(keepIdentity = false) {
  const playerName = keepIdentity ? state.playerName : "";
  const mood = keepIdentity ? state.mood : "";
  state.playerName = playerName;
  state.mood = mood;
  state.roomIndex = 0;
  state.choices = [];
  state.fragments = [];
  state.explored = {};
  state.completed = {};
  state.lastResult = null;
  Object.keys(state.scores).forEach((key) => {
    state.scores[key] = 0;
  });
}

function startGame() {
  const name = $("#playerName").value.trim();
  if (!name) {
    $("#ticketError").textContent = "请先在入场券上写下你的昵称。";
    return;
  }
  if (!state.mood) {
    $("#ticketError").textContent = "请选择今天带进展馆的心情。";
    return;
  }
  state.playerName = name;
  resetState(true);
  $("#ticketError").textContent = "";
  showScreen("gameScreen");
  renderRoom(0);
}

function renderRoom(index) {
  state.roomIndex = index;
  const room = rooms[index];
  const roomEl = $("#room");
  roomEl.className = `room ${room.className} is-entering`;
  $("#roomTitle").textContent = `${room.title} ${room.en}`;
  $("#roomIntro").textContent = room.intro;
  $("#visitorInfo").textContent = `${state.playerName} / ${getMoodLabel()}`;
  $("#roomIndex").textContent = `Room ${index + 1} / ${rooms.length}`;
  $("#fragmentCount").textContent = `Fragments ${state.fragments.length}`;
  $("#coreState").textContent = state.completed[room.id] ? "核心选择已完成" : "触碰核心展品完成选择";
  $("#fragmentState").textContent = `已收集 ${state.fragments.length} 枚碎片`;
  renderObjects(room);
  updatePortal(room);
  window.setTimeout(() => roomEl.classList.remove("is-entering"), 640);
  showEvent(room.event);
}

function renderObjects(room) {
  const coreDone = Boolean(state.completed[room.id]);
  const core = room.core;
  const optionalObjects = room.optional
    .map((object) => {
      const collected = Boolean(state.explored[object.id]);
      return `
        <button class="scene-object optional-object ${object.className} ${collected ? "is-collected" : ""}" type="button" data-kind="optional" data-id="${object.id}" aria-label="${object.name}">
          <span class="model" aria-hidden="true"></span>
          <span class="object-label">${collected ? "已收集" : object.name}</span>
        </button>
      `;
    })
    .join("");
  $("#objectsLayer").innerHTML = `
    <button class="scene-object core-object ${core.className} ${coreDone ? "is-complete" : ""}" type="button" data-kind="core" data-id="${core.id}" aria-label="${core.name}">
      <span class="model" aria-hidden="true"></span>
      <span class="object-label">${coreDone ? "核心已完成" : core.name}</span>
    </button>
    ${optionalObjects}
  `;
}

function updatePortal(room) {
  const portal = $("#portalBtn");
  const done = Boolean(state.completed[room.id]);
  portal.disabled = !done;
  portal.classList.toggle("is-open", done);
  portal.querySelector("b").textContent = done ? room.portalText : "核心选择后开启";
}

function openStoryForObject(kind, id) {
  const room = rooms[state.roomIndex];
  if (kind === "core") {
    openCorePanel(room);
    return;
  }
  const object = room.optional.find((item) => item.id === id);
  if (object) openOptionalPanel(room, object);
}

function openCorePanel(room) {
  const alreadyDone = Boolean(state.completed[room.id]);
  const core = room.core;
  $("#panelKicker").textContent = core.kicker;
  $("#panelTitle").textContent = core.name;
  $("#panelText").textContent = alreadyDone ? "这个核心展品已经回应过你。你可以从亮起的入口继续前进。" : `${core.story} ${core.question}`;
  $("#panelFragment").textContent = alreadyDone ? "核心选择已记录在你的展览档案里。" : `将获得碎片：${core.fragment}`;
  $("#choiceArea").innerHTML = alreadyDone
    ? `<button class="choice-btn close-choice" type="button">返回房间</button>`
    : core.choices
        .map((choice, index) => `<button class="choice-btn" type="button" data-choice="${index}">${choice.text}</button>`)
        .join("");
  openPanel();
}

function openOptionalPanel(room, object) {
  const alreadyCollected = Boolean(state.explored[object.id]);
  if (!alreadyCollected) {
    state.explored[object.id] = true;
    state.fragments.push({ room: room.title, name: object.name, text: object.fragment });
    renderObjects(room);
    $("#fragmentCount").textContent = `Fragments ${state.fragments.length}`;
    $("#fragmentState").textContent = `已收集 ${state.fragments.length} 枚碎片`;
    $("#room").classList.add(`effect-${object.id}`);
    window.setTimeout(() => $("#room").classList.remove(`effect-${object.id}`), 900);
  }
  $("#panelKicker").textContent = alreadyCollected ? "ARCHIVED FRAGMENT" : "NEW FRAGMENT";
  $("#panelTitle").textContent = object.name;
  $("#panelText").textContent = alreadyCollected ? "这个展品已经回应过你，它的碎片安静地躺在档案里。" : object.story;
  $("#panelFragment").textContent = alreadyCollected ? object.fragment : `获得碎片：${object.fragment}`;
  $("#choiceArea").innerHTML = `<button class="choice-btn close-choice" type="button">继续探索</button>`;
  openPanel();
}

function makeChoice(choiceIndex) {
  const room = rooms[state.roomIndex];
  if (state.completed[room.id]) return;
  const choice = room.core.choices[choiceIndex];
  Object.entries(choice.scores).forEach(([key, value]) => {
    state.scores[key] += value;
  });
  state.completed[room.id] = true;
  state.choices.push({
    room: room.title,
    question: room.core.question,
    choice: choice.text,
    reply: choice.reply,
    scores: choice.scores,
  });
  state.fragments.push({ room: room.title, name: room.core.name, text: room.core.fragment });
  $("#panelText").textContent = choice.reply;
  $("#panelFragment").textContent = `已记录人格倾向：${formatScores(choice.scores)}`;
  $("#choiceArea").innerHTML = `<button class="choice-btn close-choice" type="button">看见亮起的入口</button>`;
  renderObjects(room);
  updatePortal(room);
  $("#coreState").textContent = "核心选择已完成";
  $("#fragmentCount").textContent = `Fragments ${state.fragments.length}`;
  $("#fragmentState").textContent = `已收集 ${state.fragments.length} 枚碎片`;
  $("#room").classList.add("core-flash");
  window.setTimeout(() => $("#room").classList.remove("core-flash"), 950);
  showEvent(randomEvents[Math.floor(Math.random() * randomEvents.length)]);
}

function formatScores(scores) {
  return Object.entries(scores)
    .map(([key, value]) => `${scoreLabels[key]} +${value}`)
    .join(" / ");
}

function openPanel() {
  $("#storyPanel").classList.add("is-open");
}

function closePanel() {
  $("#storyPanel").classList.remove("is-open");
}

function goNextRoom() {
  const room = rooms[state.roomIndex];
  if (!state.completed[room.id]) return;
  const roomEl = $("#room");
  roomEl.classList.add("is-leaving");
  window.setTimeout(() => {
    if (state.roomIndex < rooms.length - 1) {
      renderRoom(state.roomIndex + 1);
      roomEl.classList.remove("is-leaving");
    } else {
      roomEl.classList.remove("is-leaving");
      showResult();
    }
  }, 650);
}

function getTopDimension() {
  const ordered = Object.entries(state.scores).sort((a, b) => b[1] - a[1]);
  return ordered[0][0];
}

function getHiddenTitle() {
  const score = state.scores;
  if (score.Expression >= 2 && score.Rebel >= 2) return "隐藏称号：噪音诗人";
  if (score.Insight >= 2 && score.Memory >= 2) return "隐藏称号：夜间策展人";
  if (score.Repair >= 2 && score.Creator >= 2) return "隐藏称号：星光工程师";
  if (score.Memory >= 2 && score.Repair >= 2) return "隐藏称号：记忆修复师";
  if (score.Rebel >= 2 && score.Creator >= 2) return "隐藏称号：规则改写者";
  return "隐藏称号：临时策展人";
}

function showResult() {
  const top = getTopDimension();
  const result = resultMap[top];
  const mood = moods.find((item) => item.id === state.mood);
  const complete = Math.round((state.fragments.length / (rooms.length * 3)) * 100);
  const hiddenTitle = getHiddenTitle();
  const scoreSummary = Object.entries(state.scores)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => `${scoreLabels[key]} ${value}`)
    .join("、");
  const choiceSummary = state.choices.map((item) => item.choice).join("；");
  const reason = `${mood.tone}你的四次核心选择中，最强的倾向是「${scoreLabels[top]}」。这些选择包括：${choiceSummary}。因此系统把你的展览归档为「${result.title}」。当前分数结构：${scoreSummary}。`;
  state.lastResult = {
    title: result.title,
    hiddenTitle,
    text: result.text,
    share: `我在《脑内美术馆》生成了内心展览：${result.title}。${result.text}`,
  };

  $("#posterNo").textContent = `NO.${String(Math.floor(1000 + Math.random() * 9000))}`;
  $("#posterDate").textContent = new Date().toLocaleDateString("zh-CN");
  $("#posterVisitor").textContent = `${state.playerName} 的内心展览`;
  $("#resultTitle").textContent = `${result.title} / ${result.en}`;
  $("#hiddenTitle").textContent = hiddenTitle;
  $("#keywordTags").innerHTML = result.keywords.map((keyword) => `<span>${keyword}</span>`).join("");
  $("#shareText").textContent = result.text;
  $("#posterMood").textContent = getMoodLabel();
  $("#posterFragments").textContent = `${state.fragments.length}`;
  $("#posterComplete").textContent = `${complete}%`;
  $("#resultReason").textContent = reason;
  $("#choiceReview").innerHTML = state.choices
    .map(
      (item, index) => `
        <div class="review-item">
          <b>${index + 1}. ${item.room}</b>
          <p>${item.choice}</p>
          <small>${formatScores(item.scores)}</small>
        </div>
      `
    )
    .join("");
  $("#fragmentReview").innerHTML = state.fragments.length
    ? state.fragments
        .slice(0, 6)
        .map(
          (item) => `
            <div class="fragment-pill">
              <b>${item.name}</b>
              <span>${item.text}</span>
            </div>
          `
        )
        .join("")
    : `<p class="empty-fragments">你把主线展览走完了，碎片留给下一次回看。</p>`;
  showScreen("resultScreen");
}

async function copyResult() {
  const text = state.lastResult
    ? state.lastResult.share
    : "我在《脑内美术馆》完成了一场内心展览。";
  try {
    await navigator.clipboard.writeText(text);
    $("#copyHint").textContent = "结果文案已复制，海报区域可直接截图分享。";
  } catch (error) {
    $("#copyHint").textContent = text;
  }
}

function restart() {
  resetState(false);
  $("#playerName").value = "";
  $("#ticketError").textContent = "";
  selectMood("");
  showScreen("homeScreen");
}

function reviewExhibition() {
  if (!state.playerName) return;
  showScreen("gameScreen");
  renderRoom(0);
}

function showEvent(text) {
  const toast = $("#eventToast");
  toast.textContent = text;
  toast.classList.add("is-visible");
  window.clearTimeout(showEvent.timer);
  showEvent.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}

function bindEvents() {
  $("#startBtn").addEventListener("click", () => showScreen("ticketScreen"));
  $("#backHomeBtn").addEventListener("click", () => showScreen("homeScreen"));
  $("#enterBtn").addEventListener("click", startGame);
  $("#moodGrid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-mood]");
    if (button) selectMood(button.dataset.mood);
  });
  $("#objectsLayer").addEventListener("click", (event) => {
    const object = event.target.closest(".scene-object");
    if (!object) return;
    openStoryForObject(object.dataset.kind, object.dataset.id);
  });
  $("#choiceArea").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.classList.contains("close-choice")) {
      closePanel();
      return;
    }
    const index = Number(button.dataset.choice);
    if (Number.isInteger(index)) makeChoice(index);
  });
  $("#closePanelBtn").addEventListener("click", closePanel);
  $("#storyPanel").addEventListener("click", (event) => {
    if (event.target.id === "storyPanel") closePanel();
  });
  $("#portalBtn").addEventListener("click", goNextRoom);
  $("#copyBtn").addEventListener("click", copyResult);
  $("#restartBtn").addEventListener("click", restart);
  $("#reviewBtn").addEventListener("click", reviewExhibition);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePanel();
  });
}

renderMoods();
bindEvents();
