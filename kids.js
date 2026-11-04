/* Bubo, el búho profe de inglés — versión para niños (sin dependencias). */
(function () {
  'use strict';

  const STORE_KEY = 'gamilingo-kids-v1';
  const STARS_PER_STICKER = 8;
  const ROUND_SIZE = 6;
  const PRAISE_EN = ['Well done!', 'Great job!', 'Super!', 'Excellent!', 'Fantastic!', 'Brilliant!'];
  const PRAISE_ES = ['¡Muy bien!', '¡Genial!', '¡Eres un crack!', '¡Fantástico!', '¡Lo has clavado!', '¡Bravo!'];
  const RETRY_ES = ['¡Casi! Prueba otra vez.', '¡Uy! Inténtalo de nuevo.', '¡Tú puedes! Prueba otra.'];

  const app = document.getElementById('app');
  const fx = document.getElementById('fx');

  /* ---------- Utilidades ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* sin almacenamiento */ } }

  const store = Object.assign({ avatar: null, grade: null, stars: 0, best: {}, rounds: 0 }, load());
  let grade = null;
  let roundsThisVisit = 0;

  /* ---------- Voz ---------- */
  function voiceFor(lang) {
    try {
      const vs = window.speechSynthesis.getVoices();
      return vs.find((v) => v.lang === lang) || vs.find((v) => v.lang && v.lang.slice(0, 2) === lang.slice(0, 2)) || null;
    } catch (e) { return null; }
  }
  /** parts: [[texto, 'es-ES' | 'en-GB'], ...] — se leen en orden. */
  function say(parts) {
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      parts.forEach(([text, lang]) => {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = lang;
        const v = voiceFor(lang);
        if (v) u.voice = v;
        u.rate = grade && grade.stage === 'inf' ? 0.8 : 0.9;
        u.pitch = 1.1;
        window.speechSynthesis.speak(u);
      });
    } catch (e) { /* sin voz */ }
  }
  const en = (t) => [t, 'en-GB'];
  const es = (t) => [t, 'es-ES'];

  /* ---------- Efectos ---------- */
  function confetti() {
    const bits = ['⭐', '🎉', '✨', '🎈', '🌟', '💫'];
    for (let i = 0; i < 26; i++) {
      const s = document.createElement('span');
      s.className = 'confetti';
      s.textContent = pick(bits);
      s.style.left = Math.random() * 100 + 'vw';
      s.style.animationDelay = Math.random() * 0.5 + 's';
      s.style.fontSize = 18 + Math.random() * 22 + 'px';
      fx.appendChild(s);
      setTimeout(() => s.remove(), 2600);
    }
  }
  function popStar(el) {
    const r = el.getBoundingClientRect();
    const s = document.createElement('span');
    s.className = 'flystar';
    s.textContent = '⭐';
    s.style.left = r.left + r.width / 2 + 'px';
    s.style.top = r.top + 'px';
    fx.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }

  /* ---------- Cabecera y Bubo ---------- */
  const stickers = () => Math.min(KID_STICKERS.length, Math.floor(store.stars / STARS_PER_STICKER));

  function header() {
    return `
      <header class="khud">
        <button class="kbtn small" data-go="map" aria-label="Volver al mapa">${esc(store.avatar || '🙂')} ${esc(grade.short)}</button>
        <span class="kpill" aria-label="Estrellas">⭐ <b id="kstars">${store.stars}</b></span>
        <button class="kpill" data-go="album" aria-label="Álbum de pegatinas">📒 <b id="kstk">${stickers()}</b>/${KID_STICKERS.length}</button>
      </header>`;
  }
  function bubo(text, mood) {
    return `<div class="bubo"><span class="bubo-face ${mood || ''}" aria-hidden="true">🦉</span><p class="bubo-say" id="bubo">${text}</p></div>`;
  }
  function setBubo(text, mood) {
    const b = document.getElementById('bubo');
    if (b) b.innerHTML = text;
    const f = document.querySelector('.bubo-face');
    if (f) { f.className = 'bubo-face ' + (mood || ''); void f.offsetWidth; f.classList.add('bounce'); }
  }

  function addStar(el) {
    const before = stickers();
    store.stars++;
    save();
    const s = document.getElementById('kstars');
    if (s) s.textContent = store.stars;
    if (el) popStar(el);
    if (stickers() > before) {
      const k = document.getElementById('kstk');
      if (k) k.textContent = stickers();
      return KID_STICKERS[stickers() - 1];
    }
    return null;
  }

  /* ---------- Pantalla de inicio: dos preguntas ---------- */
  function renderStart() {
    let avatar = store.avatar;
    let gid = store.grade;
    app.innerHTML = `
      ${bubo('¡Hola! Soy <b>Bubo</b>, tu búho profe de inglés. 🎈 ¡Vamos a jugar y aprender juntos!')}
      <button class="kbtn ghost" id="hear">🔊 Escuchar a Bubo</button>

      <h2>1. ¿Quién va a jugar? Elige tu amigo</h2>
      <div class="kgrid avatars">${KID_AVATARS.map((a) => `<button class="ktile ${a === avatar ? 'sel' : ''}" data-av="${a}" aria-label="Elegir ${a}">${a}</button>`).join('')}</div>

      <h2>2. ¿En qué curso estás?</h2>
      <div class="kgrid grades">${KID_GRADES.map((g) => `<button class="ktile grade ${g.id === gid ? 'sel' : ''}" data-grade="${g.id}"><span>${g.emoji}</span><small>${esc(g.name)}</small></button>`).join('')}</div>

      <button class="kbtn big" id="startbtn" ${avatar && gid ? '' : 'disabled'}>▶️ ¡A jugar!</button>

      <details class="parents">
        <summary>👪 Información para familias y docentes</summary>
        <p>Juego de inglés para Infantil (3, 4 y 5 años) y Primaria (1º a 6º). Los temas siguen los contenidos que se suelen trabajar en cada curso en los colegios de la Comunitat Valenciana: colores, números, familia y animales en Infantil; y en Primaria, vocabulario temático junto con estructuras como <i>I like</i>, <i>I can</i>, presente simple y continuo, pasado, comparativos o <i>going to</i>.</p>
        <ul>
          <li>En Infantil todo se puede hacer <b>escuchando y tocando dibujos</b>, sin saber leer. Conviene jugar con un adulto al lado.</li>
          <li>Las instrucciones están en español y las palabras se escuchan en inglés con la voz del dispositivo. Si no se oye, revisa el volumen o instala una voz en inglés en el sistema.</li>
          <li>No hay anuncios, compras ni registro. El progreso solo se guarda en este navegador.</li>
          <li>Recomendación: sesiones cortas, de 10 a 15 minutos. Bubo avisará para descansar.</li>
        </ul>
        <p><a href="index.html">Ir a la versión para jóvenes y adultos →</a></p>
      </details>`;

    const play = document.getElementById('startbtn');
    const refresh = () => { play.disabled = !(avatar && gid); };
    document.getElementById('hear').addEventListener('click', () => say([es('¡Hola! Soy Bubo, tu búho profe de inglés. Elige tu amigo y tu curso, y pulsa a jugar.'), en('Hello! Let\'s play!')]));
    app.querySelectorAll('[data-av]').forEach((b) => b.addEventListener('click', () => {
      avatar = b.dataset.av;
      app.querySelectorAll('[data-av]').forEach((x) => x.classList.toggle('sel', x === b));
      refresh();
    }));
    app.querySelectorAll('[data-grade]').forEach((b) => b.addEventListener('click', () => {
      gid = b.dataset.grade;
      app.querySelectorAll('[data-grade]').forEach((x) => x.classList.toggle('sel', x === b));
      say([es(KID_GRADES.find((g) => g.id === gid).name)]);
      refresh();
    }));
    play.addEventListener('click', () => {
      store.avatar = avatar;
      store.grade = gid;
      save();
      grade = KID_GRADES.find((g) => g.id === gid);
      say([en('Hello, ' + 'friend!'), es('¡Vamos allá!')]);
      renderMap();
    });
  }

  /* ---------- Mapa de unidades ---------- */
  const bestKey = (u, g) => grade.id + ':' + u + ':' + g;
  const medalOf = (key) => store.best[key] || '';

  function renderMap() {
    app.innerHTML = header() + `
      ${bubo(`¡Hola, ${esc(store.avatar)}! Elige una isla y un juego. Consigue estrellas ⭐ para ganar pegatinas.`)}
      <div class="units">
        ${grade.units.map((u, ui) => `
          <section class="unit">
            <h3><span class="unit-emoji">${u.emoji}</span> ${esc(u.name)} <small>${esc(u.es)}</small></h3>
            <div class="games">
              ${grade.games.filter((g) => g !== 'grammar' && gameAvailable(g, u)).map((g) => `
                <button class="game" data-unit="${ui}" data-game="${g}">
                  <span class="game-emoji">${KID_GAMES[g].emoji}</span>
                  <small>${esc(KID_GAMES[g].name)}</small>
                  <span class="medal">${medalOf(bestKey(ui, g)) || '·'}</span>
                </button>`).join('')}
            </div>
          </section>`).join('')}
        ${grade.grammar ? `
          <section class="unit challenge">
            <h3><span class="unit-emoji">🧩</span> Reto de frases <small>Gramática de ${esc(grade.name)}</small></h3>
            <div class="games"><button class="game" data-unit="-1" data-game="grammar"><span class="game-emoji">🧩</span><small>${esc(KID_GAMES.grammar.name)}</small><span class="medal">${medalOf(bestKey(-1, 'grammar')) || '·'}</span></button></div>
          </section>` : ''}
      </div>
      <p class="center"><button class="kbtn ghost" data-go="start">🔁 Cambiar de curso o de amigo</button></p>`;

    app.querySelectorAll('[data-game]').forEach((b) => b.addEventListener('click', () => startGame(b.dataset.game, Number(b.dataset.unit))));
  }

  const spellable = (w) => /^[a-z]+$/i.test(w) && w.length <= 10;
  function gameAvailable(g, u) {
    if (g === 'spell') return u.words.filter((w) => spellable(w[0])).length >= 3;
    return true;
  }

  /* ---------- Juegos ---------- */
  function startGame(game, unitIdx) {
    const unit = unitIdx >= 0 ? grade.units[unitIdx] : null;
    const ctx = { game, unitIdx, unit, first: 0, total: 0, stars: 0, newStickers: [] };
    app.innerHTML = header() + `
      <div class="gametop">
        <button class="kbtn small ghost" data-go="map">⬅️ Mapa</button>
        <h2>${KID_GAMES[game].emoji} ${esc(KID_GAMES[game].name)} ${unit ? `<small>· ${unit.emoji} ${esc(unit.name)}</small>` : ''}</h2>
      </div>
      ${bubo(esc(KID_GAMES[game].say))}
      <div id="play"></div>`;
    say([es(KID_GAMES[game].say)]);
    ({ learn: gameLearn, listen: gameChoose, read: gameChoose, spell: gameSpell, memory: gameMemory, grammar: gameGrammar })[game](ctx);
  }

  function reward(ctx, el) {
    const stk = addStar(el);
    ctx.stars++;
    if (stk) ctx.newStickers.push(stk);
  }

  /** Aprende: tarjetas que suenan al tocarlas. */
  function gameLearn(ctx) {
    const area = document.getElementById('play');
    const seen = new Set();
    const words = ctx.unit.words;
    area.innerHTML = `<div class="kgrid cards">${words.map((w, i) => `
      <button class="card" data-i="${i}">
        <span class="card-emoji">${w[1]}</span>
        <b class="card-word">${esc(w[0])}</b>
        <small>${esc(w[2])}</small>
      </button>`).join('')}</div>
      <p class="center muted" id="count">0 / ${words.length}</p>`;
    area.querySelectorAll('.card').forEach((c) => c.addEventListener('click', () => {
      const w = words[Number(c.dataset.i)];
      say([en(w[0])]);
      c.classList.add('seen', 'bounce');
      setTimeout(() => c.classList.remove('bounce'), 400);
      if (!seen.has(w[0])) {
        seen.add(w[0]);
        reward(ctx, c);
        document.getElementById('count').textContent = seen.size + ' / ' + words.length;
      }
      if (seen.size === words.length && !ctx.done) {
        ctx.done = true;
        ctx.first = ctx.total = words.length;
        setTimeout(() => finish(ctx), 1200);
      }
    }));
  }

  /** Escucha y toca / Lee y elige: elegir el dibujo correcto. */
  function gameChoose(ctx) {
    const area = document.getElementById('play');
    const words = ctx.unit.words;
    const queue = shuffle(words).slice(0, Math.min(ROUND_SIZE, words.length));
    let i = 0;
    const listen = ctx.game === 'listen';

    function show() {
      const target = queue[i];
      const opts = shuffle([target].concat(shuffle(words.filter((w) => w !== target)).slice(0, grade.options - 1)));
      let firstTry = true;
      area.innerHTML = `
        <div class="dots">${queue.map((_, k) => `<span class="${k < i ? 'done' : k === i ? 'now' : ''}"></span>`).join('')}</div>
        ${listen
          ? `<p class="center"><button class="kbtn big listen" id="again" aria-label="Escuchar otra vez">🔊</button></p>`
          : `<p class="center bigword">${esc(target[0])}</p>`}
        <div class="kgrid pics">${opts.map((w) => `<button class="pic" data-w="${esc(w[0])}" aria-label="${esc(w[2])}">${w[1]}</button>`).join('')}</div>`;
      if (listen) {
        document.getElementById('again').addEventListener('click', () => say([en(target[0])]));
        setTimeout(() => say([en(target[0])]), i === 0 ? 1400 : 250);
      }
      area.querySelectorAll('.pic').forEach((p) => p.addEventListener('click', () => {
        if (p.dataset.w === target[0]) {
          area.querySelectorAll('.pic').forEach((x) => { x.disabled = true; });
          p.classList.add('right');
          ctx.total++;
          if (firstTry) { ctx.first++; reward(ctx, p); }
          setBubo(pick(PRAISE_ES) + ` <b>${esc(target[0])}</b> = ${esc(target[2])}`, 'happy');
          say([en(target[0]), en(pick(PRAISE_EN))]);
          setTimeout(() => { i++; i < queue.length ? show() : finish(ctx); }, 1500);
        } else {
          firstTry = false;
          p.classList.add('wrong');
          p.disabled = true;
          setBubo(pick(RETRY_ES), 'think');
          if (listen) say([es('Escucha otra vez'), en(target[0])]);
        }
      }));
    }
    show();
  }

  /** Ordena las letras. */
  function gameSpell(ctx) {
    const area = document.getElementById('play');
    const queue = shuffle(ctx.unit.words.filter((w) => spellable(w[0]))).slice(0, 5);
    let i = 0;

    function show() {
      const [word, emoji, mean] = queue[i];
      const letters = word.toLowerCase().split('');
      let tiles = shuffle(letters.map((l, k) => ({ l, k })));
      if (tiles.map((t) => t.l).join('') === letters.join('') && letters.length > 1) tiles = tiles.reverse();
      let pos = 0;
      let mistakes = 0;
      area.innerHTML = `
        <div class="dots">${queue.map((_, k) => `<span class="${k < i ? 'done' : k === i ? 'now' : ''}"></span>`).join('')}</div>
        <p class="center"><span class="spell-emoji">${emoji}</span><br><small>${esc(mean)}</small> <button class="kbtn small ghost" id="hearw">🔊</button></p>
        <div class="slots">${letters.map(() => '<span class="slot"></span>').join('')}</div>
        <div class="letters">${tiles.map((t, k) => `<button class="letter" data-l="${t.l}" data-k="${k}">${t.l}</button>`).join('')}</div>`;
      document.getElementById('hearw').addEventListener('click', () => say([en(word)]));
      const slots = area.querySelectorAll('.slot');
      area.querySelectorAll('.letter').forEach((b) => b.addEventListener('click', () => {
        if (b.dataset.l === letters[pos]) {
          slots[pos].textContent = b.dataset.l;
          slots[pos].classList.add('filled');
          b.disabled = true;
          b.classList.add('used');
          pos++;
          if (pos === letters.length) {
            area.querySelectorAll('.letter').forEach((x) => { x.disabled = true; });
            ctx.total++;
            if (mistakes === 0) { ctx.first++; reward(ctx, slots[slots.length - 1]); }
            setBubo(pick(PRAISE_ES) + ` Has escrito <b>${esc(word)}</b>.`, 'happy');
            say([en(word), en(pick(PRAISE_EN))]);
            setTimeout(() => { i++; i < queue.length ? show() : finish(ctx); }, 1600);
          }
        } else {
          mistakes++;
          b.classList.add('wrong');
          setTimeout(() => b.classList.remove('wrong'), 450);
          setBubo(`${pick(RETRY_ES)} Pista: la siguiente letra es <b>${esc(letters[pos])}</b>.`, 'think');
        }
      }));
    }
    show();
  }

  /** Memory: encontrar parejas. En Infantil dibujo-dibujo; en Primaria dibujo-palabra. */
  function gameMemory(ctx) {
    const area = document.getElementById('play');
    const chosen = shuffle(ctx.unit.words).slice(0, Math.min(grade.pairs, ctx.unit.words.length));
    const pictureOnly = grade.stage === 'inf';
    const cards = shuffle(chosen.flatMap((w) => [
      { id: w[0], face: w[1], kind: 'fpic' },
      { id: w[0], face: pictureOnly ? w[1] : w[0], kind: pictureOnly ? 'fpic' : 'fword' }
    ]));
    let open = [];
    let found = 0;
    let moves = 0;
    let busy = false;
    area.innerHTML = `<div class="kgrid memory cols${cards.length > 6 ? 4 : 3}">${cards.map((c, k) => `
      <button class="mem" data-k="${k}" aria-label="Carta"><span class="back">❓</span><span class="front ${c.kind}">${esc(c.face)}</span></button>`).join('')}</div>
      <p class="center muted" id="moves">Intentos: 0</p>`;
    const els = area.querySelectorAll('.mem');
    els.forEach((el) => el.addEventListener('click', () => {
      const k = Number(el.dataset.k);
      if (busy || el.classList.contains('up')) return;
      el.classList.add('up');
      const card = cards[k];
      say([en(card.id)]);
      open.push({ el, card });
      if (open.length < 2) return;
      moves++;
      document.getElementById('moves').textContent = 'Intentos: ' + moves;
      const [a, b] = open;
      open = [];
      if (a.card.id === b.card.id) {
        a.el.classList.add('match');
        b.el.classList.add('match');
        found++;
        reward(ctx, b.el);
        setBubo(pick(PRAISE_ES) + ` ¡Pareja de <b>${esc(a.card.id)}</b>!`, 'happy');
        if (found === chosen.length) {
          ctx.total = chosen.length;
          ctx.first = moves <= chosen.length + 2 ? chosen.length : moves <= chosen.length * 2 ? Math.ceil(chosen.length * 0.7) : Math.ceil(chosen.length * 0.4);
          ctx.note = `Lo has conseguido en ${moves} intentos.`;
          setTimeout(() => finish(ctx), 1300);
        }
      } else {
        busy = true;
        setBubo('¡No son iguales! Recuerda dónde estaban. 🤔', 'think');
        setTimeout(() => { a.el.classList.remove('up'); b.el.classList.remove('up'); busy = false; }, 1100);
      }
    }));
  }

  /** Completa la frase (Primaria). */
  function gameGrammar(ctx) {
    const area = document.getElementById('play');
    const queue = shuffle(grade.grammar).slice(0, ROUND_SIZE);
    let i = 0;
    function show() {
      const [sentence, options, hint] = queue[i];
      const right = options[0];
      let firstTry = true;
      area.innerHTML = `
        <div class="dots">${queue.map((_, k) => `<span class="${k < i ? 'done' : k === i ? 'now' : ''}"></span>`).join('')}</div>
        <p class="sentence">${esc(sentence).replace('___', '<span class="gap">?</span>')}</p>
        <div class="words">${shuffle(options).map((o) => `<button class="kbtn word" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;
      area.querySelectorAll('.word').forEach((b) => b.addEventListener('click', () => {
        if (b.dataset.o === right) {
          area.querySelectorAll('.word').forEach((x) => { x.disabled = true; });
          b.classList.add('right');
          area.querySelector('.gap').textContent = right;
          area.querySelector('.gap').classList.add('ok');
          ctx.total++;
          if (firstTry) { ctx.first++; reward(ctx, b); }
          setBubo(pick(PRAISE_ES) + ' ' + esc(hint), 'happy');
          say([en(sentence.replace('___', right).replace(/\p{Extended_Pictographic}|️|‍/gu, ''))]);
          setTimeout(() => { i++; i < queue.length ? show() : finish(ctx); }, 2400);
        } else {
          firstTry = false;
          b.classList.add('wrong');
          b.disabled = true;
          setBubo(`${pick(RETRY_ES)} 💡 ${esc(hint)}`, 'think');
        }
      }));
    }
    show();
  }

  /* ---------- Final de la ronda ---------- */
  function finish(ctx) {
    roundsThisVisit++;
    store.rounds = (store.rounds || 0) + 1;
    const ratio = ctx.total ? ctx.first / ctx.total : 1;
    const medal = ratio >= 0.9 ? '🥇' : ratio >= 0.6 ? '🥈' : '🥉';
    const rank = { '🥇': 3, '🥈': 2, '🥉': 1 };
    const key = bestKey(ctx.unitIdx, ctx.game);
    if (!store.best[key] || rank[medal] > rank[store.best[key]]) store.best[key] = medal;
    save();

    const msg = medal === '🥇' ? '¡Medalla de oro! ¡Eres una estrella!' : medal === '🥈' ? '¡Medalla de plata! ¡Muy bien hecho!' : '¡Medalla de bronce! Si practicas más, ¡llegarás al oro!';
    const next = ctx.unit ? grade.games.filter((g) => g !== 'grammar' && g !== ctx.game && gameAvailable(g, ctx.unit) && !store.best[bestKey(ctx.unitIdx, g)])[0] : null;
    const rest = roundsThisVisit > 0 && roundsThisVisit % 6 === 0;

    const area = document.getElementById('play');
    area.innerHTML = `
      <div class="finish">
        <div class="medal-big">${medal}</div>
        <p class="center"><b>${msg}</b></p>
        <p class="center">Has ganado <b>${ctx.stars} ⭐</b> ${ctx.note ? '· ' + esc(ctx.note) : ''}</p>
        ${ctx.newStickers.length ? `<p class="center newsticker">🎁 ¡Pegatina nueva para tu álbum! <span>${ctx.newStickers.join(' ')}</span></p>` : `<p class="center muted">Te faltan ${STARS_PER_STICKER - (store.stars % STARS_PER_STICKER)} ⭐ para la próxima pegatina.</p>`}
        ${rest ? '<p class="center rest">😴 Bubo dice: ¡Llevas un buen rato jugando! Es buen momento para descansar los ojos y moverte un poco.</p>' : ''}
        <p class="center">¿Quieres jugar otra vez?</p>
        <div class="center">
          <button class="kbtn big" id="again">🔁 Sí, ¡otra vez!</button>
          ${next ? `<button class="kbtn big alt" id="next">${KID_GAMES[next].emoji} Probar «${esc(KID_GAMES[next].name)}»</button>` : ''}
          <button class="kbtn big ghost" data-go="map">🗺️ No, volver al mapa</button>
        </div>
      </div>`;
    setBubo(msg, 'happy');
    confetti();
    say([en(medal === '🥇' ? 'Amazing!' : 'Well done!'), es(msg + (ctx.newStickers.length ? ' ¡Y has ganado una pegatina nueva!' : ''))]);
    document.getElementById('again').addEventListener('click', () => startGame(ctx.game, ctx.unitIdx));
    if (next) document.getElementById('next').addEventListener('click', () => startGame(next, ctx.unitIdx));
  }

  /* ---------- Álbum de pegatinas ---------- */
  function renderAlbum() {
    const have = stickers();
    app.innerHTML = header() + `
      <div class="gametop"><button class="kbtn small ghost" data-go="map">⬅️ Mapa</button><h2>📒 Mi álbum de pegatinas</h2></div>
      ${bubo(`Tienes <b>${have}</b> pegatinas. Cada ${STARS_PER_STICKER} ⭐ consigues una nueva. ${have < KID_STICKERS.length ? `¡Te faltan ${STARS_PER_STICKER - (store.stars % STARS_PER_STICKER)} ⭐ para la siguiente!` : '¡Has completado el álbum! 🏆'}`)}
      <div class="kgrid album">${KID_STICKERS.map((s, k) => `<span class="sticker ${k < have ? 'got' : ''}">${k < have ? s : '❔'}</span>`).join('')}</div>`;
  }

  /* ---------- Navegación ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-go]');
    if (!t) return;
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (err) { /* nada */ }
    if (t.dataset.go === 'map') renderMap();
    if (t.dataset.go === 'album') renderAlbum();
    if (t.dataset.go === 'start') renderStart();
  });

  try { window.speechSynthesis && window.speechSynthesis.getVoices(); } catch (e) { /* nada */ }
  renderStart();
})();
