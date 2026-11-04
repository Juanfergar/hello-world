/* Profesor de idiomas gamificado — lógica de la aplicación (sin dependencias). */
(function () {
  'use strict';

  const ROLE = 'profesor de idiomas gamificado';
  const STORE_KEY = 'gamilingo-v1';
  const XP_PER_LEVEL = 100;
  const RANKS = ['Aprendiz', 'Explorador', 'Aventurero', 'Conversador', 'Políglota en ciernes', 'Maestro lingüista'];
  const BADGES = {
    first: '🎯 Primer acierto',
    streak5: '🔥 Racha de 5',
    perfect: '💯 Ronda perfecta',
    survivor: '⏱️ Superviviente',
    writer: '✍️ Pluma de oro',
    explorer: '🧭 Explorador total'
  };
  const SURVIVAL_SECONDS = 45;

  const app = document.getElementById('app');
  const toastBox = document.getElementById('toasts');

  /* ---------- Utilidades ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const subjectById = (id) => SUBJECTS.find((s) => s.id === id);
  const pct = (c, t) => (t ? Math.round((c / t) * 100) : 0);

  function loadStore() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { profiles: {}, last: null }; }
    catch (e) { return { profiles: {}, last: null }; }
  }
  function saveStore() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* almacenamiento no disponible */ }
  }

  const store = loadStore();
  let profile = null;   // progreso del idioma+nivel activo
  let course = null;    // contenido del idioma+nivel activo
  let session = null;   // sesión de aprendizaje en curso

  function getProfile(lang, level) {
    const key = lang + ':' + level;
    if (!store.profiles[key]) {
      store.profiles[key] = { lang, level, xp: 0, streak: 0, bestStreak: 0, stats: {}, badges: [] };
    }
    return store.profiles[key];
  }

  function speak(text) {
    try {
      if (!('speechSynthesis' in window)) return toast('🔇 Tu navegador no permite la lectura en voz alta.');
      const u = new SpeechSynthesisUtterance(text.replace(/___/g, '…'));
      u.lang = COURSES[profile.lang].voice;
      u.rate = profile.level === 'A' ? 0.85 : 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) { /* sin voz */ }
  }

  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    toastBox.appendChild(t);
    setTimeout(() => t.classList.add('out'), 2600);
    setTimeout(() => t.remove(), 3100);
  }

  /* ---------- Gamificación ---------- */
  const playerLevel = (xp) => 1 + Math.floor(xp / XP_PER_LEVEL);
  const rankName = (xp) => RANKS[Math.min(playerLevel(xp) - 1, RANKS.length - 1)];
  const isUnlocked = (s) => profile.xp >= s.unlockXp;

  function award(points) {
    if (points <= 0) return;
    const beforeLvl = playerLevel(profile.xp);
    const lockedBefore = SUBJECTS.filter((s) => !isUnlocked(s));
    profile.xp += points;
    if (session) session.xp += points;
    if (playerLevel(profile.xp) > beforeLvl) toast('🎉 ¡Subes a nivel ' + playerLevel(profile.xp) + ': ' + rankName(profile.xp) + '!');
    lockedBefore.filter(isUnlocked).forEach((s) => toast('🔓 ¡Desbloqueada: ' + s.emoji + ' ' + s.name + '!'));
    saveStore();
    updateHud();
  }

  function giveBadge(id) {
    if (profile.badges.includes(id)) return;
    profile.badges.push(id);
    if (session) session.badges.push(id);
    toast('🏅 Insignia: ' + BADGES[id]);
    saveStore();
  }

  /** Registra una respuesta y devuelve los puntos ganados. */
  function registerAnswer(ok, base) {
    const st = profile.stats[session.subject] || (profile.stats[session.subject] = { correct: 0, total: 0, sessions: 0 });
    st.total++;
    session.total++;
    if (ok) {
      st.correct++;
      session.correct++;
      profile.streak++;
      profile.bestStreak = Math.max(profile.bestStreak, profile.streak);
      const bonus = profile.streak >= 3 ? 5 : 0;
      award(base + bonus);
      giveBadge('first');
      if (profile.streak >= 5) giveBadge('streak5');
      return base + bonus;
    }
    profile.streak = 0;
    saveStore();
    updateHud();
    return 0;
  }

  function hudHtml() {
    const lvl = playerLevel(profile.xp);
    const into = profile.xp % XP_PER_LEVEL;
    const c = COURSES[profile.lang];
    return `
      <header class="hud">
        <button class="hud-course" data-action="home" title="Volver a las asignaturas">${c.flag} ${esc(c.name)} · ${esc(LEVELS[profile.level].name)}</button>
        <div class="hud-stats">
          <span class="pill" title="Puntos de experiencia">⭐ <b id="hud-xp">${profile.xp}</b> XP</span>
          <span class="pill" title="Racha de respuestas correctas">🔥 <b id="hud-streak">${profile.streak}</b></span>
          <span class="pill" title="Nivel del jugador">🏆 Nv. <b id="hud-lvl">${lvl}</b> · <span id="hud-rank">${esc(rankName(profile.xp))}</span></span>
        </div>
        <div class="bar" title="${into}/${XP_PER_LEVEL} XP para el siguiente nivel"><div id="hud-bar" style="width:${into}%"></div></div>
      </header>`;
  }

  function updateHud() {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('hud-xp', profile.xp);
    set('hud-streak', profile.streak);
    set('hud-lvl', playerLevel(profile.xp));
    set('hud-rank', rankName(profile.xp));
    const bar = document.getElementById('hud-bar');
    if (bar) bar.style.width = (profile.xp % XP_PER_LEVEL) + '%';
  }

  /* ---------- Pantalla 1: bienvenida y las dos preguntas ---------- */
  function renderWelcome() {
    session = null;
    const last = store.last || {};
    let lang = last.lang || null;
    let level = last.level || null;

    app.innerHTML = `
      <section class="card welcome">
        <p class="lead">👋 Soy tu ${esc(ROLE)} de <a href="https://gptzone.net" target="_blank" rel="noopener">GptZone.net</a>.
        Vamos a comenzar tu viaje de aprendizaje de idiomas. Para ofrecerte la mejor experiencia, necesito hacerte algunas preguntas.</p>

        <h2>🌍 1. ¿Qué idioma deseas aprender?</h2>
        <div class="choices" id="lang-choices">
          ${Object.entries(COURSES).map(([k, c]) => `
            <button class="choice ${k === lang ? 'selected' : ''}" data-lang="${k}">
              <span class="big">${c.flag}</span><span>${esc(c.name)}</span>
            </button>`).join('')}
        </div>

        <h2>📈 2. ¿Cuál es tu nivel actual en el idioma seleccionado?</h2>
        <div class="choices" id="level-choices">
          ${Object.entries(LEVELS).map(([k, l]) => `
            <button class="choice ${k === level ? 'selected' : ''}" data-level="${k}">
              <span class="big">${l.emoji}</span><span><b>${esc(l.name)}</b> <small>(${l.cefr})</small></span>
              <small class="muted">${esc(l.hint)}</small>
            </button>`).join('')}
        </div>

        <button class="btn primary" id="start" ${lang && level ? '' : 'disabled'}>🚀 Comenzar mi aventura</button>
        <p class="muted">👧🧒 ¿Es para un niño o una niña de Infantil o Primaria? Prueba <a href="kids.html">Inglés con Bubo</a>, la versión para niños.</p>
      </section>`;

    const startBtn = document.getElementById('start');
    const refresh = () => { startBtn.disabled = !(lang && level); };
    app.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => {
      lang = b.dataset.lang;
      app.querySelectorAll('[data-lang]').forEach((x) => x.classList.toggle('selected', x === b));
      refresh();
    }));
    app.querySelectorAll('[data-level]').forEach((b) => b.addEventListener('click', () => {
      level = b.dataset.level;
      app.querySelectorAll('[data-level]').forEach((x) => x.classList.toggle('selected', x === b));
      refresh();
    }));
    startBtn.addEventListener('click', () => selectCourse(lang, level));
  }

  function selectCourse(lang, level) {
    store.last = { lang, level };
    profile = getProfile(lang, level);
    course = COURSES[lang].levels[level];
    saveStore();
    renderHub();
  }

  /* ---------- Pantalla 2: asignaturas de aprendizaje ---------- */
  function renderHub() {
    session = null;
    const c = COURSES[profile.lang];
    app.innerHTML = hudHtml() + `
      <section class="card">
        <h2>🎓 Asignaturas de Aprendizaje</h2>
        <p>Plan personalizado para <b>${esc(c.name)}</b>, nivel <b>${esc(LEVELS[profile.level].name)} (${LEVELS[profile.level].cefr})</b>.
        Las explicaciones están en español y los ejemplos y ejercicios en ${esc(c.name.toLowerCase())}. Gana XP para desbloquear nuevas asignaturas.</p>
        <div class="subjects">
          ${SUBJECTS.map((s) => {
            const open = isUnlocked(s);
            const st = profile.stats[s.id];
            return `
              <button class="subject ${open ? '' : 'locked'}" data-subject="${s.id}" ${open ? '' : 'aria-disabled="true"'}>
                <span class="subject-emoji">${open ? s.emoji : '🔒'}</span>
                <span class="subject-body">
                  <b>${esc(s.name)}</b>
                  <small class="tag">${esc(s.skill)}</small>
                  <span class="muted">${esc(s.desc)}</span>
                  <small class="subject-meta">${open
                    ? (st ? `✅ ${st.sessions} sesión(es) · ${pct(st.correct, st.total)}% de aciertos` : '✨ ¡Nueva!')
                    : `Se desbloquea con ${s.unlockXp} XP (te faltan ${s.unlockXp - profile.xp})`}</small>
                </span>
              </button>`;
          }).join('')}
        </div>
      </section>
      <section class="card small">
        <h3>🌐 Pista cultural</h3>
        <p>${esc(c.culture)}</p>
        ${profile.badges.length ? `<h3>🏅 Tus insignias</h3><p>${profile.badges.map((b) => `<span class="pill">${esc(BADGES[b])}</span>`).join(' ')}</p>` : ''}
        <p><button class="btn ghost" data-action="welcome">🔁 Cambiar idioma o nivel</button></p>
      </section>`;

    app.querySelectorAll('[data-subject]').forEach((b) => b.addEventListener('click', () => {
      const s = subjectById(b.dataset.subject);
      if (!isUnlocked(s)) return toast(`🔒 Necesitas ${s.unlockXp} XP para "${s.name}". ¡Sigue practicando!`);
      startSubject(s.id, true);
    }));
  }

  /* ---------- Sesiones ---------- */
  function startSubject(id, fresh) {
    if (fresh || !session || session.subject !== id) {
      session = { subject: id, correct: 0, total: 0, xp: 0, rounds: 0, mistakes: [], badges: [], notes: [] };
    }
    session.rounds++;
    const st = profile.stats[id] || (profile.stats[id] = { correct: 0, total: 0, sessions: 0 });
    if (session.rounds === 1) st.sessions++;
    if (SUBJECTS.every((s) => profile.stats[s.id] && profile.stats[s.id].sessions > 0)) giveBadge('explorer');
    saveStore();

    ({ vocab: runVocab, grammar: runGrammar, dialogue: runDialogue, survival: runSurvival, story: runStory, writing: runWriting })[id]();
  }

  function shell(subjectId, inner) {
    const s = subjectById(subjectId);
    app.innerHTML = hudHtml() + `
      <section class="card">
        <div class="crumbs"><button class="link" data-action="home">← Asignaturas</button> · Ronda ${session.rounds}</div>
        <h2>${s.emoji} ${esc(s.name)}</h2>
        <h3 class="activity">🎮 Actividad: ${esc(s.activity)}</h3>
        <div id="stage">${inner}</div>
      </section>`;
    return document.getElementById('stage');
  }

  /**
   * Motor genérico de preguntas.
   * items: [{ context?, question, options[] (primera = correcta), explanation, speakText? }]
   */
  function runQuiz(items, { practiceTitle, base = 10, chat = false, onDone }) {
    let i = 0;
    let roundCorrect = 0;
    const stage = document.getElementById('stage');
    const log = [];

    function show() {
      const it = items[i];
      const correct = it.options[0];
      const opts = shuffle(it.options);
      const history = chat ? log.map((l) => l).join('') : '';
      stage.innerHTML = `
        <p class="practice">🏋️‍♂️ Práctica: ${esc(practiceTitle)}</p>
        <div class="progress-dots">${items.map((_, k) => `<span class="${k < i ? 'done' : k === i ? 'now' : ''}"></span>`).join('')}</div>
        ${chat ? `<div class="chat">${history}${bubble('them', it.context)}</div>` : (it.context ? `<div class="context target">${esc(it.context)} ${speakBtn(it.speakText || it.context)}</div>` : '')}
        <p class="question ${chat ? '' : 'target'}"><b>${esc(it.question)}</b>${!chat && !it.context ? ' ' + speakBtn(it.speakText || it.question) : ''}</p>
        <div class="options">${opts.map((o) => `<button class="opt target" data-opt="${esc(o)}">${esc(o)}</button>`).join('')}</div>
        <div id="fb" aria-live="polite"></div>`;
      bindSpeak(stage);

      stage.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
        const chosen = b.dataset.opt;
        const ok = chosen === correct;
        stage.querySelectorAll('.opt').forEach((x) => {
          x.disabled = true;
          if (x.dataset.opt === correct) x.classList.add('right');
        });
        if (!ok) b.classList.add('wrong');
        const pts = registerAnswer(ok, base);
        if (ok) roundCorrect++;
        else session.mistakes.push({ q: (it.context ? (it.context.length > 120 ? it.context.slice(0, 117) + '…' : it.context) + ' — ' : '') + it.question, you: chosen, right: correct, why: it.explanation });
        if (chat) log.push(bubble('them', it.context) + bubble('me', correct));

        document.getElementById('fb').innerHTML = `
          <div class="feedback ${ok ? 'ok' : 'ko'}">
            <b>${ok ? `✅ ¡Correcto! +${pts} XP${profile.streak >= 3 ? ' (bonus de racha 🔥)' : ''}` : `❌ Casi. La respuesta adecuada es: <span class="target">«${esc(correct)}»</span>`}</b>
            <p>💡 ${esc(it.explanation)}</p>
          </div>
          <button class="btn primary" id="next">${i < items.length - 1 ? 'Siguiente ➜' : 'Ver resultado 🏁'}</button>`;
        const next = document.getElementById('next');
        next.focus();
        next.addEventListener('click', () => {
          i++;
          if (i < items.length) show();
          else {
            if (roundCorrect === items.length) giveBadge('perfect');
            onDone ? onDone(roundCorrect, items.length) : roundEnd(roundCorrect, items.length);
          }
        });
      }));
    }
    show();
  }

  function bubble(who, text) {
    return `<div class="bubble ${who} target">${who === 'them' ? '🧑‍🍳 ' : '🙂 '}${esc(text)}${who === 'them' ? ' ' + speakBtn(text) : ''}</div>`;
  }
  function speakBtn(text) { return `<button class="speak" data-speak="${esc(text)}" title="Escuchar pronunciación" aria-label="Escuchar">🔊</button>`; }
  function bindSpeak(root) { root.querySelectorAll('[data-speak]').forEach((b) => b.addEventListener('click', () => speak(b.dataset.speak))); }

  /** Final de ronda: feedback + pregunta de continuar (Sí / No). */
  function roundEnd(correct, total, extraHtml) {
    const stage = document.getElementById('stage');
    const p = pct(correct, total);
    const msg = p === 100 ? '🌟 ¡Perfecto! Dominas este contenido.'
      : p >= 75 ? '💪 ¡Muy bien! Solo quedan pequeños detalles.'
      : p >= 50 ? '👍 Vas por buen camino. Repasa las explicaciones y vuelve a intentarlo.'
      : '🌱 Cada error es aprendizaje. Te recomiendo repetir la ronda con calma.';
    stage.innerHTML = `
      <div class="result">
        <div class="score">${correct}/${total}</div>
        <p><b>${msg}</b></p>
        ${extraHtml || ''}
      </div>
      <p class="continue">¿Quieres continuar con otro ejercicio en esta asignatura? Responde <b>'Sí'</b> para continuar o <b>'No'</b> para cambiar de asignatura.</p>
      <div class="row">
        <button class="btn primary" id="yes">Sí</button>
        <button class="btn" id="no">No</button>
      </div>`;
    document.getElementById('yes').addEventListener('click', () => startSubject(session.subject, false));
    document.getElementById('no').addEventListener('click', renderSummary);
  }

  /* ---------- Asignatura: Expansión de Vocabulario ---------- */
  function runVocab() {
    const words = shuffle(course.vocab);
    const stage = shell('vocab', `
      <p>Voy a presentarte un conjunto de palabras en ${esc(COURSES[profile.lang].name.toLowerCase())}, con su significado en español y ejemplos. Después las practicarás en oraciones.</p>
      <div class="flashcards">
        ${words.map(([w, m, ex]) => `
          <div class="flash">
            <div class="flash-word target">${esc(w)} ${speakBtn(w)}</div>
            <div class="flash-meaning">🇪🇸 ${esc(m)}</div>
            <div class="flash-example target">“${esc(ex)}” ${speakBtn(ex)}</div>
          </div>`).join('')}
      </div>
      <button class="btn primary" id="go">¡Listo, a practicar! 🏋️‍♂️</button>`);
    bindSpeak(stage);
    document.getElementById('go').addEventListener('click', () => {
      const all = words.map((v) => v[0]);
      const items = shuffle(words).map(([w, m, , cloze]) => ({
        question: cloze,
        options: [w].concat(shuffle(all.filter((x) => x !== w)).slice(0, 3)),
        explanation: `«${w}» significa "${m}".`
      }));
      runQuiz(items, { practiceTitle: 'Completa las siguientes oraciones con la palabra correcta.' });
    });
  }

  /* ---------- Asignatura: Desafíos Gramaticales ---------- */
  function runGrammar() {
    shell('grammar', '');
    const items = shuffle(course.grammar).map(([q, opts, exp]) => ({ question: q, options: opts, explanation: exp }));
    runQuiz(items, { practiceTitle: 'Escoge la estructura gramatical correcta para completar las siguientes oraciones.' });
  }

  /* ---------- Asignatura: Diálogos Interactivos ---------- */
  function runDialogue() {
    const stage = shell('dialogue', '');
    const intro = profile.level === 'C'
      ? 'Situación: el servicio de esta mañana fue un desastre y hablas con el gerente del café. Responde con diplomacia y precisión.'
      : profile.level === 'B'
        ? 'Situación: llegas a un café-restaurante con reserva y surgen algunos imprevistos. Responde de forma natural y cortés.'
        : 'Situación: entras en un café y el camarero te atiende. Elige la respuesta adecuada para hacer tu pedido.';
    stage.innerHTML = `<p class="context">🎬 ${esc(intro)}</p><button class="btn primary" id="go">Entrar al café ☕</button>`;
    document.getElementById('go').addEventListener('click', () => {
      const items = course.dialogue.map(([line, opts, tip]) => ({ context: line, question: '¿Qué respondes?', options: opts, explanation: tip }));
      runQuiz(items, {
        practiceTitle: 'Responde a las preguntas del camarero usando las opciones disponibles.',
        chat: true,
        onDone: (c, t) => roundEnd(c, t, '<p>🗣️ Consejo: lee en voz alta tus respuestas (o usa 🔊) para entrenar la pronunciación y la entonación.</p>')
      });
    });
  }

  /* ---------- Asignatura: Historias Interactivas ---------- */
  function runStory() {
    const stage = shell('story', '');
    const cities = { en: ['Londres', 'Nueva York', 'Chicago'], fr: ['París', 'Lyon', 'Marsella'], de: ['Berlín', 'Hamburgo', 'Múnich'] };
    const city = cities[profile.lang][{ A: 0, B: 1, C: 2 }[profile.level]];
    stage.innerHTML = `<p class="context">🗺️ Tu aventura transcurre en <b>${esc(city)}</b>. Lee cada escena con atención: tus decisiones deciden cómo avanza la historia.</p>
      <button class="btn primary" id="go">Comenzar la aventura 🧭</button>`;
    document.getElementById('go').addEventListener('click', () => {
      const items = course.story.map(([text, q, opts, exp]) => ({ context: text, question: q, options: opts, explanation: exp }));
      runQuiz(items, {
        practiceTitle: 'Elige las respuestas que creas más apropiadas para avanzar en la historia.',
        base: 15,
        onDone: (c, t) => {
          const ending = c === t ? '🏆 Final épico: resolviste cada situación como un nativo.'
            : c >= t - 1 ? '😊 Buen final: superaste la aventura con algún tropiezo.'
            : '😅 Final accidentado: algunas decisiones te desviaron. ¡Vuelve a intentarlo!';
          roundEnd(c, t, `<p>${ending}</p>`);
        }
      });
    });
  }

  /* ---------- Asignatura: Juegos de Supervivencia Lingüística ---------- */
  function survivalPool() {
    const words = course.vocab.map((v) => v[0]);
    const pool = [];
    course.vocab.forEach(([w, m, , cloze]) => {
      pool.push({ question: `¿Cómo se dice «${m}»?`, options: [w].concat(shuffle(words.filter((x) => x !== w)).slice(0, 3)), explanation: `«${w}» = ${m}.` });
      pool.push({ question: cloze, options: [w].concat(shuffle(words.filter((x) => x !== w)).slice(0, 3)), explanation: `«${w}» = ${m}.` });
    });
    course.grammar.forEach(([q, opts, exp]) => pool.push({ question: q, options: opts, explanation: exp }));
    return shuffle(pool);
  }

  function runSurvival() {
    const stage = shell('survival', `
      <p>Tienes <b>${SURVIVAL_SECONDS} segundos</b>. Cada acierto suma <b>+3 s</b> y XP; cada error resta <b>5 s</b>. ¿Cuánto aguantarás?</p>
      <button class="btn primary" id="go">¡Empezar! ⏱️</button>`);
    document.getElementById('go').addEventListener('click', () => {
      let time = SURVIVAL_SECONDS;
      let pool = survivalPool();
      let hits = 0, answered = 0;
      const roundMistakes = [];
      stage.innerHTML = `
        <p class="practice">🏋️‍♂️ Práctica: Responde rápidamente a las preguntas presentadas. ¡El tiempo corre!</p>
        <div class="timer"><div id="tbar"></div><span id="tnum">${time}s</span></div>
        <p class="question target" id="sq"></p>
        <div class="options" id="sopts"></div>
        <p class="flashfb" id="sfb" aria-live="polite"></p>`;
      const tick = setInterval(() => { time--; paint(); if (time <= 0) end(); }, 1000);
      let ended = false;

      function paint() {
        const t = Math.max(0, time);
        document.getElementById('tnum').textContent = t + 's';
        const bar = document.getElementById('tbar');
        bar.style.width = Math.min(100, (t / SURVIVAL_SECONDS) * 100) + '%';
        bar.className = t <= 10 ? 'danger' : '';
      }
      function ask() {
        if (!pool.length) pool = survivalPool();
        const it = pool.pop();
        document.getElementById('sq').textContent = it.question;
        const box = document.getElementById('sopts');
        box.innerHTML = shuffle(it.options).map((o) => `<button class="opt target" data-opt="${esc(o)}">${esc(o)}</button>`).join('');
        box.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
          if (ended) return;
          const ok = b.dataset.opt === it.options[0];
          answered++;
          registerAnswer(ok, 5);
          const fb = document.getElementById('sfb');
          if (ok) { hits++; time += 3; fb.textContent = '✅ +3 s'; fb.className = 'flashfb ok'; }
          else {
            time -= 5; fb.textContent = '❌ −5 s · Correcta: ' + it.options[0]; fb.className = 'flashfb ko';
            roundMistakes.push({ q: it.question, you: b.dataset.opt, right: it.options[0], why: it.explanation });
          }
          paint();
          if (time <= 0) end(); else ask();
        }));
      }
      function end() {
        if (ended) return;
        ended = true;
        clearInterval(tick);
        app.removeEventListener('click', stop);
        session.mistakes.push(...roundMistakes);
        if (hits >= 8) giveBadge('survivor');
        const review = roundMistakes.length
          ? `<h3>🔎 Revisión de tus errores</h3><ul class="review">${roundMistakes.map((m) => `<li><span class="target">${esc(m.q)}</span><br>❌ ${esc(m.you)} → ✅ <b class="target">${esc(m.right)}</b><br><small>💡 ${esc(m.why)}</small></li>`).join('')}</ul>`
          : '<p>🎯 ¡Ni un solo error!</p>';
        roundEnd(hits, answered || 1, `<p>⏱️ Sobreviviste respondiendo <b>${answered}</b> preguntas.</p>${review}
          <p>💡 Consejo: en el próximo intento, lee primero las opciones y descarta las imposibles; la velocidad llega con la práctica.</p>`);
      }
      // Si el usuario abandona la pantalla, detener el temporizador.
      function stop(e) { if (e.target.closest('[data-action]')) { ended = true; clearInterval(tick); app.removeEventListener('click', stop); } }
      app.addEventListener('click', stop);
      paint();
      ask();
    });
  }

  /* ---------- Asignatura: Redacción y Composición ---------- */
  function runWriting() {
    const w = course.writing;
    const topic = w.topics[(session.rounds - 1) % w.topics.length];
    const lname = COURSES[profile.lang].name.toLowerCase();
    const stage = shell('writing', `
      <p class="practice">🏋️‍♂️ Práctica: Escribe un ensayo en ${esc(lname)} sobre el tema siguiente:</p>
      <p class="context"><b>📝 ${esc(topic)}</b></p>
      <ul class="hints">
        <li>Extensión mínima: <b>${w.min} palabras</b>.</li>
        <li>Conectores recomendados: ${w.connectors.map((c) => `<span class="pill target">${esc(c)}</span>`).join(' ')}</li>
        <li>Vocabulario sugerido: ${w.words.map((c) => `<span class="pill target">${esc(c)}</span>`).join(' ')}</li>
        <li>Estructura: introducción → desarrollo (con ejemplos) → conclusión.</li>
      </ul>
      <textarea id="essay" rows="10" lang="${profile.lang}" placeholder="Escribe aquí tu texto en ${esc(lname)}…"></textarea>
      <div class="row"><span id="wc" class="muted">0 / ${w.min} palabras</span><button class="btn primary" id="send">Enviar para revisión 📬</button></div>`);
    const ta = document.getElementById('essay');
    const wc = document.getElementById('wc');
    ta.addEventListener('input', () => { wc.textContent = countWords(ta.value) + ' / ' + w.min + ' palabras'; });
    document.getElementById('send').addEventListener('click', () => {
      if (countWords(ta.value) < 5) return toast('✍️ Escribe un poco más antes de enviar.');
      const r = analyseEssay(ta.value, w);
      const st = profile.stats.writing || (profile.stats.writing = { correct: 0, total: 0, sessions: 0 });
      st.total++; session.total++;
      if (r.score >= 60) { st.correct++; session.correct++; }
      award(Math.round(r.score * 0.6));
      if (r.score >= 80) giveBadge('writer');
      session.notes.push(`Redacción: ${r.score}/100`);
      stage.innerHTML = `
        <div class="result"><div class="score">${r.score}/100</div><p>+${Math.round(r.score * 0.6)} XP</p></div>
        <table class="rubric">${r.rows.map((x) => `<tr><td>${x.ok ? '✅' : '⚠️'}</td><td><b>${esc(x.name)}</b><br><small>${x.msg}</small></td><td>${x.pts}/${x.max}</td></tr>`).join('')}</table>
        ${r.tips.length ? `<h3>🛠️ Cómo mejorar</h3><ul>${r.tips.map((t) => `<li>${t}</li>`).join('')}</ul>` : ''}
        <p class="muted"><small>ℹ️ Esta revisión automática evalúa extensión, estructura, conectores, vocabulario y puntuación. Para corregir la gramática frase a frase, compara tu texto con las reglas de "Desafíos Gramaticales".</small></p>
        <p class="continue">¿Deseas escribir otro ensayo? Responde <b>'Sí'</b> para continuar o <b>'No'</b> para cambiar de asignatura.</p>
        <div class="row"><button class="btn primary" id="yes">Sí</button><button class="btn" id="no">No</button></div>`;
      document.getElementById('yes').addEventListener('click', () => startSubject('writing', false));
      document.getElementById('no').addEventListener('click', renderSummary);
    });
  }

  function tokens(text) { return text.match(/[\p{L}\p{M}'’-]+/gu) || []; }
  function countWords(text) { return tokens(text).length; }
  function hasPhrase(text, phrase) {
    const p = phrase.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "['’]");
    return new RegExp('(^|[^\\p{L}])' + p + '($|[^\\p{L}])', 'iu').test(text.toLowerCase());
  }

  function analyseEssay(text, w) {
    const words = tokens(text);
    const n = words.length;
    const sentences = text.split(/[.!?…]+/).map((s) => s.trim()).filter(Boolean);
    const paragraphs = text.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
    const usedConn = w.connectors.filter((c) => hasPhrase(text, c));
    const usedWords = w.words.filter((c) => hasPhrase(text, c));
    const capsOk = sentences.filter((s) => /^[\p{Lu}0-9"«„“¿¡(]/u.test(s)).length;
    const lower = words.map((x) => x.toLowerCase());
    const unique = new Set(lower).size;
    const variety = n ? unique / n : 0;
    const freq = {};
    lower.filter((x) => x.length > 4).forEach((x) => { freq[x] = (freq[x] || 0) + 1; });
    const repeated = Object.entries(freq).filter(([, c]) => c >= 4).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const avgLen = sentences.length ? n / sentences.length : n;

    const rows = [];
    const tips = [];
    const add = (name, pts, max, msg) => rows.push({ name, pts: Math.round(pts), max, ok: pts >= max * 0.8, msg });

    add('Extensión', Math.min(1, n / w.min) * 25, 25, `${n} palabras (mínimo ${w.min}).`);
    if (n < w.min) tips.push(`Amplía tu texto hasta al menos ${w.min} palabras: añade un ejemplo personal o un contraargumento.`);

    add('Estructura', paragraphs.length >= 3 ? 15 : paragraphs.length === 2 ? 9 : 4, 15, `${paragraphs.length} párrafo(s). Lo ideal: introducción, desarrollo y conclusión (deja una línea en blanco entre párrafos).`);
    if (paragraphs.length < 3) tips.push('Organiza el texto en al menos 3 párrafos separados por una línea en blanco.');

    add('Conectores', Math.min(1, usedConn.length / 3) * 20, 20, usedConn.length ? `Usaste: ${usedConn.map((c) => `<span class="target">${esc(c)}</span>`).join(', ')}.` : 'No se detectaron conectores de la lista.');
    if (usedConn.length < 3) tips.push(`Une tus ideas con conectores como ${w.connectors.filter((c) => !usedConn.includes(c)).slice(0, 3).map((c) => `<b class="target">${esc(c)}</b>`).join(', ')}.`);

    add('Vocabulario del nivel', Math.min(1, usedWords.length / 2) * 15, 15, usedWords.length ? `Incluiste: ${usedWords.map((c) => `<span class="target">${esc(c)}</span>`).join(', ')}.` : 'Aún no usaste el vocabulario sugerido.');
    if (usedWords.length < 2) tips.push('Incorpora al menos dos palabras del vocabulario sugerido para consolidarlas.');

    add('Riqueza léxica', Math.min(1, variety / 0.55) * 15, 15, `Variedad de palabras: ${Math.round(variety * 100)}%.`);
    if (repeated.length) tips.push(`Evita repetir: ${repeated.map(([x, c]) => `<span class="target">${esc(x)}</span> (${c}×)`).join(', ')}. Busca sinónimos.`);

    const capsScore = sentences.length ? (capsOk / sentences.length) * 6 : 0;
    const endScore = /[.!?…]["»“”]?\s*$/.test(text.trim()) ? 4 : 0;
    add('Mayúsculas y puntuación', capsScore + endScore, 10, `${capsOk}/${sentences.length} oraciones empiezan con mayúscula${endScore ? '' : '; falta el punto final'}.`);
    if (capsOk < sentences.length) tips.push('Empieza cada oración con mayúscula.');
    if (profile.lang === 'de') tips.push('Recuerda: en alemán <b>todos los sustantivos</b> se escriben con mayúscula (das Haus, die Arbeit).');

    if (avgLen > 30) tips.push('Tus oraciones son muy largas (media de ' + Math.round(avgLen) + ' palabras). Divide algunas para ganar claridad.');
    if (avgLen < 7 && profile.level !== 'A') tips.push('Tus oraciones son muy cortas. Combínalas con subordinadas para mostrar tu nivel.');

    // Un texto demasiado corto no puede obtener la máxima nota en el resto de criterios.
    const lengthFactor = Math.min(1, n / w.min);
    rows.slice(1).forEach((r) => { r.pts = Math.round(r.pts * lengthFactor); r.ok = r.pts >= r.max * 0.8; });
    const score = Math.min(100, rows.reduce((a, r) => a + r.pts, 0));
    return { score, rows, tips };
  }

  /* ---------- Resumen de la sesión (regla 8) ---------- */
  function suggestNext(current) {
    const open = SUBJECTS.filter((s) => isUnlocked(s) && s.id !== current);
    const untried = open.find((s) => !profile.stats[s.id] || !profile.stats[s.id].sessions);
    if (untried) return { s: untried, why: 'todavía no la has probado y trabaja una competencia distinta.' };
    const weakest = open.slice().sort((a, b) => {
      const sa = profile.stats[a.id], sb = profile.stats[b.id];
      return pct(sa.correct, sa.total) - pct(sb.correct, sb.total);
    })[0];
    return weakest ? { s: weakest, why: `es tu asignatura con menor porcentaje de aciertos (${pct(profile.stats[weakest.id].correct, profile.stats[weakest.id].total)}%).` } : null;
  }

  function renderSummary() {
    const s = subjectById(session.subject);
    const p = pct(session.correct, session.total);
    const next = suggestNext(session.subject);
    const nextLocked = SUBJECTS.find((x) => !isUnlocked(x));
    const levelKeys = Object.keys(LEVELS);
    const nextLevel = levelKeys[levelKeys.indexOf(profile.level) + 1];
    const canLevelUp = nextLevel && session.total >= 4 && p >= 80;
    const mistakes = session.mistakes.slice(-6);

    app.innerHTML = hudHtml() + `
      <section class="card">
        <h2>📊 Resumen de tu sesión</h2>
        <div class="summary-grid">
          <div><span class="big">${s.emoji}</span><small>${esc(s.name)}</small></div>
          <div><span class="big">${session.rounds}</span><small>ronda(s)</small></div>
          <div><span class="big">${p}%</span><small>aciertos (${session.correct}/${session.total})</small></div>
          <div><span class="big">+${session.xp}</span><small>XP ganados</small></div>
        </div>
        ${session.notes.length ? `<p>${session.notes.map(esc).join(' · ')}</p>` : ''}
        ${session.badges.length ? `<p>🏅 Nuevas insignias: ${session.badges.map((b) => `<span class="pill">${esc(BADGES[b])}</span>`).join(' ')}</p>` : ''}
        ${mistakes.length ? `<h3>🔁 Para repasar</h3><ul class="review">${mistakes.map((m) => `<li><span class="target">${esc(m.q)}</span><br>✅ <b class="target">${esc(m.right)}</b> — <small>${esc(m.why)}</small></li>`).join('')}</ul>` : ''}

        <h3>🧭 Próximo paso recomendado</h3>
        ${canLevelUp ? `<p>🚀 Con un ${p}% de aciertos estás listo/a para el nivel <b>${esc(LEVELS[nextLevel].name)} (${LEVELS[nextLevel].cefr})</b>.</p>
          <p><button class="btn primary" id="levelup">Subir a ${esc(LEVELS[nextLevel].name)} ${LEVELS[nextLevel].emoji}</button></p>` : ''}
        ${p < 60 && session.total ? `<p>🔄 Te sugiero repetir <b>${esc(s.name)}</b> para consolidar lo aprendido antes de avanzar.</p>` : ''}
        ${next ? `<p>👉 Continúa con <b>${next.s.emoji} ${esc(next.s.name)}</b>: ${esc(next.why)}</p>
          <p><button class="btn ${canLevelUp ? '' : 'primary'}" id="gonext">Ir a ${esc(next.s.name)}</button></p>` : ''}
        ${nextLocked ? `<p class="muted">🔒 Próximo desbloqueo: ${nextLocked.emoji} ${esc(nextLocked.name)} — te faltan ${nextLocked.unlockXp - profile.xp} XP.</p>` : ''}
        <p><button class="btn ghost" data-action="home">🎓 Ver todas las asignaturas</button></p>
      </section>`;

    if (canLevelUp) document.getElementById('levelup').addEventListener('click', () => selectCourse(profile.lang, nextLevel));
    if (next) document.getElementById('gonext').addEventListener('click', () => startSubject(next.s.id, true));
  }

  /* ---------- Navegación global ---------- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-action]');
    if (!a) return;
    if (a.dataset.action === 'home') renderHub();
    if (a.dataset.action === 'welcome') renderWelcome();
  });

  renderWelcome();
})();
