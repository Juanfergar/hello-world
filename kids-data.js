/*
 * Contenido de la versión para niños (inglés como lengua extranjera).
 * Orientado a los temas habituales de cada curso de Infantil y Primaria en la Comunitat Valenciana
 * (currículo LOMLOE). Explicaciones en español; palabras y frases en inglés.
 *
 * words:    [palabra en inglés, emoji, significado en español]
 * grammar:  [frase con ___ (incluye un emoji de pista), [opciones] (la primera es la correcta), pista en español]
 */
const KID_GAMES = {
  learn:   { emoji: '👀', name: 'Aprende',          say: 'Toca cada dibujo para escuchar cómo se dice en inglés.' },
  listen:  { emoji: '👂', name: 'Escucha y toca',   say: 'Escucha la palabra y toca el dibujo correcto.' },
  read:    { emoji: '📖', name: 'Lee y elige',      say: 'Lee la palabra y toca el dibujo correcto.' },
  spell:   { emoji: '🔤', name: 'Ordena las letras', say: 'Toca las letras en orden para escribir la palabra.' },
  memory:  { emoji: '🃏', name: 'Memory',           say: 'Da la vuelta a las cartas y encuentra las parejas.' },
  grammar: { emoji: '🧩', name: 'Completa la frase', say: 'Elige la palabra que falta en la frase.' }
};

const KID_GRADES = [
  {
    id: 'i3', name: 'Infantil 3 años', short: 'I3', emoji: '🐣', stage: 'inf', options: 3, pairs: 4,
    games: ['learn', 'listen', 'memory'],
    units: [
      { name: 'Colours', es: 'Los colores', emoji: '🎨', words: [['red', '🔴', 'rojo'], ['blue', '🔵', 'azul'], ['yellow', '🟡', 'amarillo'], ['green', '🟢', 'verde'], ['orange', '🟠', 'naranja'], ['purple', '🟣', 'morado']] },
      { name: 'Numbers 1–5', es: 'Los números del 1 al 5', emoji: '🔢', words: [['one', '1️⃣', 'uno'], ['two', '2️⃣', 'dos'], ['three', '3️⃣', 'tres'], ['four', '4️⃣', 'cuatro'], ['five', '5️⃣', 'cinco']] },
      { name: 'My family', es: 'Mi familia', emoji: '👨‍👩‍👧', words: [['mummy', '👩', 'mamá'], ['daddy', '👨', 'papá'], ['baby', '👶', 'bebé'], ['grandma', '👵', 'abuela'], ['grandpa', '👴', 'abuelo'], ['sister', '👧', 'hermana']] },
      { name: 'Animals', es: 'Los animales', emoji: '🐾', words: [['cat', '🐱', 'gato'], ['dog', '🐶', 'perro'], ['fish', '🐟', 'pez'], ['bird', '🐦', 'pájaro'], ['duck', '🦆', 'pato'], ['cow', '🐮', 'vaca']] }
    ]
  },
  {
    id: 'i4', name: 'Infantil 4 años', short: 'I4', emoji: '🐥', stage: 'inf', options: 3, pairs: 5,
    games: ['learn', 'listen', 'memory'],
    units: [
      { name: 'Numbers 1–10', es: 'Los números del 1 al 10', emoji: '🔟', words: [['three', '3️⃣', 'tres'], ['five', '5️⃣', 'cinco'], ['six', '6️⃣', 'seis'], ['seven', '7️⃣', 'siete'], ['eight', '8️⃣', 'ocho'], ['nine', '9️⃣', 'nueve'], ['ten', '🔟', 'diez']] },
      { name: 'My body', es: 'Mi cuerpo', emoji: '🧍', words: [['eye', '👁️', 'ojo'], ['nose', '👃', 'nariz'], ['mouth', '👄', 'boca'], ['ear', '👂', 'oreja'], ['hand', '✋', 'mano'], ['foot', '🦶', 'pie']] },
      { name: 'Food', es: 'La comida', emoji: '🍎', words: [['apple', '🍎', 'manzana'], ['banana', '🍌', 'plátano'], ['milk', '🥛', 'leche'], ['bread', '🍞', 'pan'], ['cake', '🍰', 'pastel'], ['water', '💧', 'agua']] },
      { name: 'Toys', es: 'Los juguetes', emoji: '🧸', words: [['ball', '⚽', 'pelota'], ['teddy bear', '🧸', 'osito de peluche'], ['car', '🚗', 'coche'], ['kite', '🪁', 'cometa'], ['train', '🚂', 'tren'], ['doll', '🪆', 'muñeca']] }
    ]
  },
  {
    id: 'i5', name: 'Infantil 5 años', short: 'I5', emoji: '🐤', stage: 'inf', options: 3, pairs: 6,
    games: ['learn', 'listen', 'memory'],
    units: [
      { name: 'The weather', es: 'El tiempo', emoji: '🌦️', words: [['sunny', '☀️', 'soleado'], ['rainy', '🌧️', 'lluvioso'], ['cloudy', '☁️', 'nublado'], ['windy', '🌬️', 'ventoso'], ['snowy', '❄️', 'nevado'], ['rainbow', '🌈', 'arcoíris']] },
      { name: 'Clothes', es: 'La ropa', emoji: '👕', words: [['T-shirt', '👕', 'camiseta'], ['trousers', '👖', 'pantalones'], ['dress', '👗', 'vestido'], ['shoes', '👟', 'zapatos'], ['cap', '🧢', 'gorra'], ['socks', '🧦', 'calcetines']] },
      { name: 'Feelings', es: 'Las emociones', emoji: '😊', words: [['happy', '😀', 'contento'], ['sad', '😢', 'triste'], ['angry', '😠', 'enfadado'], ['tired', '😴', 'cansado'], ['scared', '😱', 'asustado'], ['surprised', '😮', 'sorprendido']] },
      { name: 'Shapes', es: 'Las formas', emoji: '🔺', words: [['circle', '⚪', 'círculo'], ['square', '🟦', 'cuadrado'], ['triangle', '🔺', 'triángulo'], ['star', '⭐', 'estrella'], ['heart', '❤️', 'corazón'], ['diamond', '🔷', 'rombo']] }
    ]
  },
  {
    id: 'p1', name: '1º de Primaria', short: '1º', emoji: '🎒', stage: 'pri', options: 3, pairs: 6,
    games: ['learn', 'listen', 'read', 'memory', 'grammar'],
    units: [
      { name: 'My school', es: 'Mi cole', emoji: '🏫', words: [['pencil', '✏️', 'lápiz'], ['book', '📕', 'libro'], ['scissors', '✂️', 'tijeras'], ['ruler', '📏', 'regla'], ['bag', '🎒', 'mochila'], ['crayon', '🖍️', 'cera de colores']] },
      { name: 'Wild animals', es: 'Animales salvajes', emoji: '🦁', words: [['lion', '🦁', 'león'], ['elephant', '🐘', 'elefante'], ['monkey', '🐵', 'mono'], ['giraffe', '🦒', 'jirafa'], ['tiger', '🐯', 'tigre'], ['snake', '🐍', 'serpiente']] },
      { name: 'I like food', es: 'Me gusta la comida', emoji: '🍕', words: [['pizza', '🍕', 'pizza'], ['chips', '🍟', 'patatas fritas'], ['ice cream', '🍦', 'helado'], ['carrot', '🥕', 'zanahoria'], ['chicken', '🍗', 'pollo'], ['orange', '🍊', 'naranja (fruta)']] },
      { name: 'My body', es: 'Mi cuerpo', emoji: '💪', words: [['arms', '💪', 'brazos'], ['legs', '🦵', 'piernas'], ['teeth', '🦷', 'dientes'], ['hair', '💇', 'pelo'], ['eyes', '👀', 'ojos'], ['fingers', '🖐️', 'dedos']] }
    ],
    grammar: [
      ['This is a ___. ✏️', ['pencil', 'lion', 'pizza'], 'Mira el dibujo: es un lápiz, «pencil».'],
      ['I ___ pizza. 😋', ['like', 'am', 'is'], '«I like» significa «me gusta».'],
      ['The lion is ___. 🦁', ['yellow', 'blue', 'green'], 'El león es de color amarillo: «yellow».'],
      ['I ___ six years old. 🎂', ['am', 'is', 'are'], 'Con «I» (yo) usamos «am»: I am six.'],
      ['🍎🍎🍎 I\'ve got ___ apples.', ['three', 'five', 'one'], 'Cuenta las manzanas: hay tres, «three».']
    ]
  },
  {
    id: 'p2', name: '2º de Primaria', short: '2º', emoji: '✏️', stage: 'pri', options: 4, pairs: 6,
    games: ['learn', 'listen', 'read', 'spell', 'memory', 'grammar'],
    units: [
      { name: 'My house', es: 'Mi casa', emoji: '🏠', words: [['bedroom', '🛏️', 'dormitorio'], ['kitchen', '🍳', 'cocina'], ['bathroom', '🛁', 'baño'], ['living room', '🛋️', 'salón'], ['garden', '🌳', 'jardín'], ['door', '🚪', 'puerta']] },
      { name: 'Transport', es: 'Los transportes', emoji: '🚌', words: [['bus', '🚌', 'autobús'], ['bike', '🚲', 'bici'], ['plane', '✈️', 'avión'], ['boat', '⛵', 'barco'], ['taxi', '🚕', 'taxi'], ['helicopter', '🚁', 'helicóptero']] },
      { name: 'I can…', es: 'Lo que sé hacer', emoji: '🤸', words: [['swim', '🏊', 'nadar'], ['run', '🏃', 'correr'], ['dance', '💃', 'bailar'], ['sing', '🎤', 'cantar'], ['climb', '🧗', 'trepar'], ['jump', '🤸', 'saltar']] },
      { name: 'Opposites', es: 'Los contrarios', emoji: '↔️', words: [['fast', '🐆', 'rápido'], ['slow', '🐢', 'lento'], ['big', '🐘', 'grande'], ['small', '🐭', 'pequeño'], ['hot', '🔥', 'caliente'], ['cold', '🥶', 'frío']] }
    ],
    grammar: [
      ['I can ___. 🏊', ['swim', 'sing', 'eat'], 'En el dibujo alguien nada: «swim».'],
      ['Can you dance? 💃 Yes, I ___.', ['can', 'do', 'am'], 'A «Can you…?» se contesta «Yes, I can» o «No, I can\'t».'],
      ['I\'ve ___ a bike. 🚲', ['got', 'get', 'have'], '«I\'ve got» significa «tengo».'],
      ['The bed is in the ___. 🛏️', ['bedroom', 'kitchen', 'garden'], 'La cama está en el dormitorio: «bedroom».'],
      ['The tortoise is ___. 🐢', ['slow', 'fast', 'hot'], 'La tortuga es lenta: «slow».'],
      ['It\'s ___ today. ☀️', ['sunny', 'rainy', 'snowy'], 'Hace sol: «sunny».']
    ]
  },
  {
    id: 'p3', name: '3º de Primaria', short: '3º', emoji: '📘', stage: 'pri', options: 4, pairs: 6,
    games: ['learn', 'listen', 'read', 'spell', 'memory', 'grammar'],
    units: [
      { name: 'My day', es: 'Mi rutina diaria', emoji: '⏰', words: [['wake up', '⏰', 'despertarse'], ['have a shower', '🚿', 'ducharse'], ['brush my teeth', '🪥', 'lavarme los dientes'], ['have breakfast', '🥣', 'desayunar'], ['go to school', '🏫', 'ir al cole'], ['go to bed', '🛌', 'irse a la cama']] },
      { name: 'Jobs', es: 'Las profesiones', emoji: '👩‍🚒', words: [['doctor', '👩‍⚕️', 'médico/a'], ['teacher', '👩‍🏫', 'maestro/a'], ['firefighter', '👨‍🚒', 'bombero/a'], ['police officer', '👮', 'policía'], ['chef', '👨‍🍳', 'cocinero/a'], ['farmer', '👩‍🌾', 'granjero/a']] },
      { name: 'My town', es: 'Mi ciudad', emoji: '🏙️', words: [['hospital', '🏥', 'hospital'], ['park', '🏞️', 'parque'], ['supermarket', '🛒', 'supermercado'], ['library', '📚', 'biblioteca'], ['cinema', '🎬', 'cine'], ['bank', '🏦', 'banco']] },
      { name: 'Hobbies', es: 'Las aficiones', emoji: '🎨', words: [['reading', '📖', 'leer'], ['painting', '🎨', 'pintar'], ['football', '⚽', 'fútbol'], ['guitar', '🎸', 'guitarra'], ['cooking', '🍳', 'cocinar'], ['swimming', '🏊', 'nadar']] }
    ],
    grammar: [
      ['She ___ to school at nine o\'clock. 🏫', ['goes', 'go', 'going'], 'Con he / she / it el verbo lleva -s o -es: she goes.'],
      ['I ___ up at seven o\'clock. ⏰', ['get', 'gets', 'getting'], 'Con «I» el verbo no cambia: I get up.'],
      ['There ___ two parks in my town. 🏞️', ['are', 'is', 'am'], 'Para varias cosas (two parks) decimos «there are».'],
      ['He ___ like fish. 🐟', ['doesn\'t', 'don\'t', 'isn\'t'], 'Con he / she / it decimos «doesn\'t» para negar.'],
      ['A doctor works in a ___. 👩‍⚕️', ['hospital', 'library', 'cinema'], 'Los médicos trabajan en el hospital.'],
      ['What time ___ you go to bed? 🛌', ['do', 'does', 'are'], 'Para preguntar con «you» usamos «do».']
    ]
  },
  {
    id: 'p4', name: '4º de Primaria', short: '4º', emoji: '📗', stage: 'pri', options: 4, pairs: 6,
    games: ['learn', 'listen', 'read', 'spell', 'memory', 'grammar'],
    units: [
      { name: 'Seasons and months', es: 'Estaciones y meses', emoji: '🍂', words: [['spring', '🌸', 'primavera'], ['summer', '☀️', 'verano'], ['autumn', '🍂', 'otoño'], ['winter', '⛄', 'invierno'], ['birthday', '🎂', 'cumpleaños'], ['holidays', '🧳', 'vacaciones']] },
      { name: 'Amazing animals', es: 'Animales increíbles', emoji: '🐧', words: [['crocodile', '🐊', 'cocodrilo'], ['penguin', '🐧', 'pingüino'], ['bear', '🐻', 'oso'], ['kangaroo', '🦘', 'canguro'], ['dolphin', '🐬', 'delfín'], ['owl', '🦉', 'búho']] },
      { name: 'Valencia', es: 'Mi tierra: Valencia', emoji: '🥘', words: [['paella', '🥘', 'paella'], ['oranges', '🍊', 'naranjas'], ['fireworks', '🎆', 'fuegos artificiales'], ['beach', '🏖️', 'playa'], ['trumpet', '🎺', 'trompeta (banda de música)'], ['fire', '🔥', 'fuego (las Fallas)']] },
      { name: 'What are you doing?', es: '¿Qué estás haciendo?', emoji: '🏃', words: [['sleeping', '😴', 'durmiendo'], ['eating', '🍽️', 'comiendo'], ['running', '🏃', 'corriendo'], ['drinking', '🥤', 'bebiendo'], ['laughing', '😂', 'riendo'], ['writing', '✍️', 'escribiendo']] }
    ],
    grammar: [
      ['Look! The baby ___ sleeping. 😴', ['is', 'are', 'am'], 'Presente continuo: is / are / am + verbo con -ing. Con «the baby» va «is».'],
      ['They are ___ in the sea. 🏊', ['swimming', 'swim', 'swims'], 'Después de «they are» el verbo lleva -ing: swimming.'],
      ['Penguins ___ fly. 🐧', ['can\'t', 'can', 'are'], 'Los pingüinos no pueden volar: «can\'t».'],
      ['My birthday is ___ May. 🎂', ['in', 'on', 'at'], 'Con los meses usamos «in»: in May.'],
      ['In Valencia we eat ___ on Sundays. 🥘', ['paella', 'snow', 'fireworks'], '¡La paella valenciana es famosa en todo el mundo!'],
      ['It\'s cold in ___. ⛄', ['winter', 'summer', 'spring'], 'En invierno (winter) hace frío.']
    ]
  },
  {
    id: 'p5', name: '5º de Primaria', short: '5º', emoji: '📙', stage: 'pri', options: 4, pairs: 6,
    games: ['learn', 'listen', 'read', 'spell', 'memory', 'grammar'],
    units: [
      { name: 'Healthy food', es: 'Comida sana', emoji: '🥦', words: [['vegetables', '🥦', 'verduras'], ['fruit', '🍇', 'fruta'], ['sweets', '🍬', 'golosinas'], ['fish', '🐟', 'pescado'], ['eggs', '🥚', 'huevos'], ['cheese', '🧀', 'queso']] },
      { name: 'Our planet', es: 'Nuestro planeta', emoji: '🌍', words: [['recycle', '♻️', 'reciclar'], ['tree', '🌳', 'árbol'], ['river', '🏞️', 'río'], ['mountain', '⛰️', 'montaña'], ['rubbish', '🗑️', 'basura'], ['planet', '🌍', 'planeta']] },
      { name: 'Music', es: 'La música', emoji: '🎵', words: [['piano', '🎹', 'piano'], ['drums', '🥁', 'batería / tambor'], ['violin', '🎻', 'violín'], ['guitar', '🎸', 'guitarra'], ['trumpet', '🎺', 'trompeta'], ['saxophone', '🎷', 'saxofón']] },
      { name: 'Technology', es: 'La tecnología', emoji: '💻', words: [['computer', '💻', 'ordenador'], ['mobile phone', '📱', 'móvil'], ['camera', '📷', 'cámara'], ['robot', '🤖', 'robot'], ['headphones', '🎧', 'auriculares'], ['keyboard', '⌨️', 'teclado']] }
    ],
    grammar: [
      ['Yesterday I ___ football with my friends. ⚽', ['played', 'play', 'playing'], 'Para hablar del pasado, los verbos regulares terminan en -ed: played.'],
      ['We ___ at the beach last summer. 🏖️', ['were', 'was', 'are'], 'Pasado de «to be»: I / he / she was; we / you / they were.'],
      ['An elephant is ___ than a mouse. 🐘🐭', ['bigger', 'big', 'biggest'], 'Para comparar dos cosas: big → bigger than.'],
      ['She ___ TV last night. 📺', ['watched', 'watches', 'watch'], '«Last night» (anoche) es pasado: watched.'],
      ['Is there ___ cheese in the fridge? 🧀', ['any', 'a', 'many'], 'En preguntas con cosas que no se cuentan usamos «any».'],
      ['We must ___ plastic bottles. ♻️', ['recycle', 'eat', 'sing'], '¡Hay que reciclar las botellas de plástico para cuidar el planeta!']
    ]
  },
  {
    id: 'p6', name: '6º de Primaria', short: '6º', emoji: '📕', stage: 'pri', options: 4, pairs: 6,
    games: ['learn', 'listen', 'read', 'spell', 'memory', 'grammar'],
    units: [
      { name: 'Travelling', es: 'De viaje', emoji: '✈️', words: [['passport', '🛂', 'pasaporte'], ['suitcase', '🧳', 'maleta'], ['ticket', '🎫', 'billete'], ['map', '🗺️', 'mapa'], ['hotel', '🏨', 'hotel'], ['airport', '🛫', 'aeropuerto']] },
      { name: 'Space', es: 'El espacio', emoji: '🚀', words: [['planet', '🪐', 'planeta'], ['astronaut', '🧑‍🚀', 'astronauta'], ['rocket', '🚀', 'cohete'], ['moon', '🌙', 'luna'], ['star', '⭐', 'estrella'], ['telescope', '🔭', 'telescopio']] },
      { name: 'Health', es: 'La salud', emoji: '🩺', words: [['headache', '🤕', 'dolor de cabeza'], ['cold', '🤧', 'resfriado'], ['fever', '🤒', 'fiebre'], ['medicine', '💊', 'medicina'], ['dentist', '🦷', 'dentista'], ['healthy', '💪', 'sano']] },
      { name: 'Sports', es: 'Los deportes', emoji: '🏀', words: [['basketball', '🏀', 'baloncesto'], ['tennis', '🎾', 'tenis'], ['cycling', '🚴', 'ciclismo'], ['skiing', '⛷️', 'esquí'], ['volleyball', '🏐', 'voleibol'], ['surfing', '🏄', 'surf']] }
    ],
    grammar: [
      ['Last year we ___ to London. ✈️', ['went', 'go', 'goed'], '«Go» es irregular: en pasado es «went».'],
      ['Tomorrow I\'m going ___ visit my grandma. 👵', ['to', 'for', 'at'], 'Para planes de futuro: be going to + verbo.'],
      ['Jupiter is the ___ planet. 🪐', ['biggest', 'bigger', 'big'], 'Para decir «el más…» usamos -est: the biggest.'],
      ['You\'ve got a toothache. You ___ see a dentist. 🦷', ['should', 'shouldn\'t', 'can\'t'], '«Should» sirve para dar consejos: deberías.'],
      ['I think it ___ rain tomorrow. 🌧️', ['will', 'is', 'did'], 'Para predicciones usamos «will».'],
      ['We ___ wear a uniform at my school. 👔', ['have to', 'has to', 'having'], '«Have to» = tener que. Con «we» es «have to».'],
      ['Yesterday she ___ a delicious cake. 🍰', ['made', 'make', 'maked'], '«Make» es irregular: en pasado es «made».']
    ]
  }
];

const KID_STICKERS = ['🦄', '🐲', '🦖', '🐙', '🦋', '🐞', '🌻', '🍭', '🚀', '🛸', '🏰', '🎈', '🎁', '🌈', '🍩', '🦁', '🐼', '🐨', '🦊', '🐸', '🐬', '🦜', '🎠', '🧁', '🏆', '👑', '💎', '🦩', '🐳', '🌋'];
const KID_AVATARS = ['🐻', '🐰', '🦊', '🐼', '🐯', '🐸', '🐵', '🦄'];
