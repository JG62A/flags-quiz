const QUESTIONS_PER_GAME = 10;
const NEXT_QUESTION_DELAY = 600;

const COUNTRIES = [
  { code: "al", name: "Албания", europe: true },
  { code: "ad", name: "Андорра", europe: true },
  { code: "at", name: "Австрия", europe: true },
  { code: "by", name: "Беларусь", europe: true },
  { code: "be", name: "Бельгия", europe: true },
  { code: "ba", name: "Босния и Герцеговина", europe: true },
  { code: "bg", name: "Болгария", europe: true },
  { code: "hr", name: "Хорватия", europe: true },
  { code: "cy", name: "Кипр", europe: true },
  { code: "cz", name: "Чехия", europe: true },
  { code: "dk", name: "Дания", europe: true },
  { code: "ee", name: "Эстония", europe: true },
  { code: "fi", name: "Финляндия", europe: true },
  { code: "fr", name: "Франция", europe: true },
  { code: "de", name: "Германия", europe: true },
  { code: "gr", name: "Греция", europe: true },
  { code: "hu", name: "Венгрия", europe: true },
  { code: "is", name: "Исландия", europe: true },
  { code: "ie", name: "Ирландия", europe: true },
  { code: "it", name: "Италия", europe: true },
  { code: "lv", name: "Латвия", europe: true },
  { code: "li", name: "Лихтенштейн", europe: true },
  { code: "lt", name: "Литва", europe: true },
  { code: "lu", name: "Люксембург", europe: true },
  { code: "mt", name: "Мальта", europe: true },
  { code: "md", name: "Молдова", europe: true },
  { code: "mc", name: "Монако", europe: true },
  { code: "me", name: "Черногория", europe: true },
  { code: "nl", name: "Нидерланды", europe: true },
  { code: "mk", name: "Северная Македония", europe: true },
  { code: "no", name: "Норвегия", europe: true },
  { code: "pl", name: "Польша", europe: true },
  { code: "pt", name: "Португалия", europe: true },
  { code: "ro", name: "Румыния", europe: true },
  { code: "ru", name: "Россия", europe: true },
  { code: "sm", name: "Сан-Марино", europe: true },
  { code: "rs", name: "Сербия", europe: true },
  { code: "sk", name: "Словакия", europe: true },
  { code: "si", name: "Словения", europe: true },
  { code: "es", name: "Испания", europe: true },
  { code: "se", name: "Швеция", europe: true },
  { code: "ch", name: "Швейцария", europe: true },
  { code: "ua", name: "Украина", europe: true },
  { code: "gb", name: "Великобритания", europe: true },
  { code: "va", name: "Ватикан", europe: true },
  { code: "us", name: "США", europe: false },
  { code: "ca", name: "Канада", europe: false },
  { code: "mx", name: "Мексика", europe: false },
  { code: "br", name: "Бразилия", europe: false },
  { code: "ar", name: "Аргентина", europe: false },
  { code: "cl", name: "Чили", europe: false },
  { code: "jp", name: "Япония", europe: false },
  { code: "cn", name: "Китай", europe: false },
  { code: "in", name: "Индия", europe: false },
  { code: "kr", name: "Южная Корея", europe: false },
  { code: "au", name: "Австралия", europe: false },
  { code: "nz", name: "Новая Зеландия", europe: false },
  { code: "eg", name: "Египет", europe: false },
  { code: "za", name: "ЮАР", europe: false },
  { code: "ng", name: "Нигерия", europe: false },
  { code: "ke", name: "Кения", europe: false },
  { code: "tr", name: "Турция", europe: false },
  { code: "il", name: "Израиль", europe: false },
  { code: "sa", name: "Саудовская Аравия", europe: false },
  { code: "ae", name: "ОАЭ", europe: false },
  { code: "th", name: "Таиланд", europe: false },
  { code: "id", name: "Индонезия", europe: false },
  { code: "vn", name: "Вьетнам", europe: false },
  { code: "ph", name: "Филиппины", europe: false },
  { code: "ma", name: "Марокко", europe: false },
];

const SAY_RU = {
  al: "Алба́ния",
  ad: "Андо́рра",
  at: "А́встрия",
  by: "Белару́сь",
  be: "Бе́льгия",
  ba: "Бо́сния и Герцегови́на",
  bg: "Болга́рия",
  hr: "Хорва́тия",
  cy: "Кипр",
  cz: "Че́хия",
  dk: "Да́ния",
  ee: "Эсто́ния",
  fi: "Финля́ндия",
  fr: "Фра́нция",
  de: "Герма́ния",
  gr: "Гре́ция",
  hu: "Ве́нгрия",
  is: "Исла́ндия",
  ie: "Ирла́ндия",
  it: "Ита́лия",
  lv: "Ла́твия",
  li: "Лихтенште́йн",
  lt: "Литва́",
  lu: "Люксембу́рг",
  mt: "Ма́льта",
  md: "Молдо́ва",
  mc: "Мона́ко",
  me: "Черного́рия",
  nl: "Нидерла́нды",
  mk: "Се́верная Македо́ния",
  no: "Норве́гия",
  pl: "По́льша",
  pt: "Португа́лия",
  ro: "Румы́ния",
  ru: "Росси́я",
  sm: "Сан Мари́но",
  rs: "Се́рбия",
  sk: "Слова́кия",
  si: "Слове́ния",
  es: "Испа́ния",
  se: "Шве́ция",
  ch: "Швейца́рия",
  ua: "Украи́на",
  gb: "Великобрита́ния",
  va: "Ватика́н",
  us: "Соединённые Шта́ты Аме́рики",
  ca: "Кана́да",
  mx: "Ме́ксика",
  br: "Брази́лия",
  ar: "Аргенти́на",
  cl: "Чи́ли",
  jp: "Япо́ния",
  cn: "Кита́й",
  in: "И́ндия",
  kr: "Ю́жная Коре́я",
  au: "Австра́лия",
  nz: "Но́вая Зела́ндия",
  eg: "Еги́пет",
  za: "Ю́жно Африка́нская Респу́блика",
  ng: "Ниге́рия",
  ke: "Ке́ния",
  tr: "Ту́рция",
  il: "Изра́иль",
  sa: "Сау́довская Ара́вия",
  ae: "Объединённые Ара́бские Эмира́ты",
  th: "Таила́нд",
  id: "Индоне́зия",
  vn: "Вьетна́м",
  ph: "Филиппи́ны",
  ma: "Маро́кко",
};

const screens = {
  start: document.getElementById("start-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen"),
};

const els = {
  modeLabel: document.getElementById("mode-label"),
  score: document.getElementById("score"),
  countryName: document.getElementById("country-name"),
  speak: document.getElementById("speak-btn"),
  feedback: document.getElementById("feedback"),
  options: document.getElementById("options"),
  resultTitle: document.getElementById("result-title"),
  resultScore: document.getElementById("result-score"),
  resultText: document.getElementById("result-text"),
  replay: document.getElementById("replay-btn"),
};

const state = {
  mode: "europe",
  pool: [],
  questions: [],
  index: 0,
  correctCount: 0,
  locked: false,
  utterance: null,
  nextTimer: null,
};

function flagUrl(code) {
  return new URL(`flags/${code}.png`, document.baseURI).href;
}

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    const active = key === name;
    screen.classList.toggle("is-active", active);
    screen.hidden = !active;
    screen.setAttribute("aria-hidden", String(!active));
  });
}

function poolForMode(mode) {
  if (mode === "europe") {
    return COUNTRIES.filter((country) => country.europe);
  }
  return COUNTRIES.slice();
}

function buildQuestions(pool) {
  const selected = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
  return selected.map((country) => {
    const others = shuffle(pool.filter((item) => item.code !== country.code)).slice(0, 3);
    return {
      country,
      options: shuffle([country, ...others]),
    };
  });
}

function startGame(mode) {
  if (state.nextTimer) window.clearTimeout(state.nextTimer);
  stopSpeech();
  state.mode = mode;
  state.pool = poolForMode(mode);
  state.questions = buildQuestions(state.pool);
  state.index = 0;
  state.correctCount = 0;
  state.locked = false;
  els.modeLabel.textContent = mode === "europe" ? "Европа" : "Весь мир";
  showScreen("quiz");
  renderQuestion();
}

function voiceLang(voice) {
  return (voice.lang || "").toLowerCase().replace("_", "-");
}

function pickVoice(prefix) {
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  const matches = voices.filter((voice) => voiceLang(voice).startsWith(prefix));
  const preferred = ["milena", "katya", "yuri", "mikhail", "irina"];
  for (const name of preferred) {
    const found = matches.find((voice) => voice.name.toLowerCase().includes(name));
    if (found) return found;
  }
  return matches.find((voice) => voice.localService) || matches[0] || null;
}

function stopSpeech() {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  state.utterance = null;
  els.speak.classList.remove("is-speaking");
}

function speakText(text, { rate = 0.82, highlight = false } = {}) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      els.speak.classList.remove("is-speaking");
      state.utterance = null;
      resolve();
    };

    if (!window.speechSynthesis || !text) {
      finish();
      return;
    }

    window.speechSynthesis.getVoices();
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const ruVoice = pickVoice("ru");
    utterance.lang = "ru-RU";
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;
    if (ruVoice) {
      utterance.voice = ruVoice;
      utterance.lang = ruVoice.lang;
    }

    state.utterance = utterance;
    if (highlight) els.speak.classList.add("is-speaking");
    utterance.onend = finish;
    utterance.onerror = finish;

    window.setTimeout(() => {
      window.speechSynthesis.speak(utterance);
      window.speechSynthesis.resume();
    }, 80);
    window.setTimeout(finish, 4500);
  });
}

function speakCountry(country) {
  if (!country) return Promise.resolve();
  const text = SAY_RU[country.code] || country.name;
  return speakText(text, { rate: 0.78, highlight: true });
}

function goToNextQuestion() {
  const nextIndex = state.index + 1;
  if (nextIndex >= QUESTIONS_PER_GAME) {
    showResult();
    return;
  }
  state.index = nextIndex;
  renderQuestion();
}

function renderQuestion() {
  const current = state.questions[state.index];
  state.locked = false;
  els.score.textContent = `${state.correctCount} / ${QUESTIONS_PER_GAME}`;
  els.countryName.textContent = current.country.name;
  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.speak.classList.remove("is-speaking");
  els.options.replaceChildren();

  current.options.forEach((option) => {
    const card = document.createElement("div");
    card.className = "flag-btn";
    card.dataset.code = option.code;
    card.setAttribute("role", "button");
    card.tabIndex = 0;
    card.setAttribute("aria-label", "Флаг");

    const image = document.createElement("img");
    image.src = flagUrl(option.code);
    image.alt = "";
    image.width = 320;
    image.height = 192;
    image.decoding = "sync";
    image.draggable = false;

    const caption = document.createElement("span");
    caption.className = "flag-caption";
    caption.setAttribute("aria-hidden", "true");

    card.append(image, caption);
    card.addEventListener("click", () => answer(option.code, card));
    els.options.appendChild(card);
  });
}

function answer(code, clicked) {
  if (state.locked) return;
  state.locked = true;

  const current = state.questions[state.index];
  const isCorrect = code === current.country.code;
  const buttons = [...els.options.querySelectorAll(".flag-btn")];

  buttons.forEach((card) => {
    card.classList.add("is-disabled");
    card.setAttribute("aria-disabled", "true");
    card.tabIndex = -1;
    card.classList.add("is-revealed");
    const caption = card.querySelector(".flag-caption");
    const option = current.options.find((item) => item.code === card.dataset.code);
    if (caption && option) {
      caption.textContent = option.name;
      caption.removeAttribute("aria-hidden");
    }
    card.setAttribute("aria-label", option ? option.name : "Флаг");
    if (card.dataset.code === current.country.code) {
      card.classList.add("is-correct");
    }
  });

  if (isCorrect) {
    state.correctCount += 1;
    els.feedback.textContent = "✅ Правильно!";
    els.feedback.classList.add("is-correct");
  } else {
    clicked.classList.add("is-wrong");
    els.feedback.textContent = "Правильный флаг выделен зелёным";
    els.feedback.classList.add("is-wrong");
  }

  els.score.textContent = `${state.correctCount} / ${QUESTIONS_PER_GAME}`;

  const countrySay = SAY_RU[current.country.code] || current.country.name;
  const spoken = isCorrect ? "Пра́вильно!" : `Непра́вильно. Пра́вильный флаг — ${countrySay}.`;

  speakText(spoken, { rate: isCorrect ? 0.92 : 0.84 }).then(() => {
    state.nextTimer = window.setTimeout(goToNextQuestion, NEXT_QUESTION_DELAY);
  });
}

function showResult() {
  const score = state.correctCount;
  let title = "Есть куда расти";
  let text = "Сыграйте ещё раз — флаги запоминаются быстро.";
  if (score === 10) {
    title = "Идеально!";
    text = "Все 10 флагов угаданы.";
  } else if (score >= 8) {
    title = "Отличный результат!";
    text = "Вы отлично ориентируетесь во флагах.";
  } else if (score >= 5) {
    title = "Хорошая игра";
    text = "Уже уверенно, ещё пара раундов — и будет отлично.";
  }

  els.resultTitle.textContent = title;
  els.resultScore.textContent = `${score} / ${QUESTIONS_PER_GAME}`;
  els.resultText.textContent = text;
  showScreen("result");
}

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => startGame(button.dataset.mode));
});

els.speak.addEventListener("click", () => {
  const current = state.questions[state.index];
  if (!current) return;
  speakCountry(current.country);
});

if (window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", () => pickVoice("ru"));
}

els.replay.addEventListener("click", () => {
  if (state.nextTimer) window.clearTimeout(state.nextTimer);
  stopSpeech();
  showScreen("start");
});

function setOfflineStatus(text) {
  const status = document.getElementById("offline-status");
  if (status) status.textContent = text;
}

async function prepareOffline() {
  COUNTRIES.forEach((country) => {
    const preload = new Image();
    preload.src = flagUrl(country.code);
  });

  if (!("serviceWorker" in navigator) || !("caches" in window)) {
    setOfflineStatus("Офлайн-режим в этом браузере недоступен. Откройте игру в Safari.");
    return;
  }

  try {
    setOfflineStatus("Сохраняем игру на iPad…");
    const registration = await navigator.serviceWorker.register("./service-worker.js?v=6", { scope: "./" });
    await navigator.serviceWorker.ready;
    if (registration.update) registration.update();

    const keys = await caches.keys();
    const cache = keys.length ? await caches.open(keys[keys.length - 1]) : null;
    const cached = cache ? await cache.keys() : [];
    const flagCount = cached.filter((request) => request.url.includes("/flags/")).length;

    if (flagCount >= 50) {
      setOfflineStatus("Игра сохранена. Можно играть без интернета.");
    } else {
      setOfflineStatus("Оставьте страницу открытой на минуту, пока флаги сохраняются.");
      window.setTimeout(async () => {
        const laterKeys = await caches.keys();
        const laterCache = laterKeys.length ? await caches.open(laterKeys[laterKeys.length - 1]) : null;
        const laterCached = laterCache ? await laterCache.keys() : [];
        const laterFlags = laterCached.filter((request) => request.url.includes("/flags/")).length;
        setOfflineStatus(
          laterFlags >= 50
            ? "Игра сохранена. Можно играть без интернета."
            : "Сохранение ещё идёт. Обновите страницу в Safari и подождите."
        );
      }, 2500);
    }
  } catch (error) {
    setOfflineStatus("Не удалось сохранить офлайн. Откройте сайт в Safari по Wi‑Fi.");
  }
}

prepareOffline();
