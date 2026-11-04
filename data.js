/*
 * Contenido de los cursos.
 * Regla pedagógica: las explicaciones (significados, consejos, explicaciones gramaticales)
 * están en español (idioma nativo del usuario); los ejemplos y ejercicios están en el idioma objetivo.
 *
 * Convención: en grammar / dialogue / story, la PRIMERA opción es siempre la correcta.
 * La aplicación baraja las opciones antes de mostrarlas.
 *
 * vocab:    [palabra, significado (ES), ejemplo, oración para completar con ___]
 * grammar:  [oración con ___, [opciones], explicación (ES)]
 * dialogue: [frase del camarero, [opciones], consejo (ES)]
 * story:    [texto, pregunta, [opciones], explicación (ES)]
 */
const SUBJECTS = [
  {
    id: 'vocab', emoji: '📚', name: 'Expansión de Vocabulario', unlockXp: 0,
    activity: 'Aprendizaje de Nuevas Palabras',
    desc: 'Incrementa tu léxico con palabras y expresiones útiles para situaciones cotidianas y profesionales. Aprende nuevas palabras y practícalas en contextos reales.',
    skill: 'Competencia léxica'
  },
  {
    id: 'grammar', emoji: '🧩', name: 'Desafíos Gramaticales', unlockXp: 0,
    activity: 'Resolución de Acertijos Gramaticales',
    desc: 'Perfecciona tu conocimiento de la gramática a través de desafíos que pondrán a prueba tus habilidades. Aprende reglas gramaticales y aplícalas correctamente.',
    skill: 'Competencia gramatical'
  },
  {
    id: 'dialogue', emoji: '☕', name: 'Diálogos Interactivos', unlockXp: 0,
    activity: 'Conversación en el Café',
    desc: 'Participa en conversaciones simuladas donde deberás responder de manera adecuada para avanzar. Mejora tu fluidez y comprensión en situaciones reales.',
    skill: 'Competencia pragmática y oral'
  },
  {
    id: 'survival', emoji: '⏱️', name: 'Juegos de Supervivencia Lingüística', unlockXp: 40,
    activity: 'Reto de Tiempo',
    desc: 'Pon a prueba tu resistencia lingüística con preguntas de vocabulario y gramática. Responde correctamente antes de que se agote el tiempo para sobrevivir lo máximo posible.',
    skill: 'Automatización y rapidez de respuesta'
  },
  {
    id: 'story', emoji: '🏙️', name: 'Historias Interactivas', unlockXp: 80,
    activity: 'Aventura en la Ciudad',
    desc: 'Sumérgete en una historia en el idioma objetivo donde tus decisiones afectan la narrativa. Ideal para mejorar la comprensión lectora y la toma de decisiones en el idioma.',
    skill: 'Comprensión lectora'
  },
  {
    id: 'writing', emoji: '✍️', name: 'Redacción y Composición', unlockXp: 120,
    activity: 'Escribe un Ensayo',
    desc: 'Mejora tu escritura creando textos y ensayos sobre diversos temas. Recibe retroalimentación detallada sobre estructura, conectores y vocabulario.',
    skill: 'Expresión escrita'
  }
];

const LEVELS = {
  A: { name: 'Principiante', cefr: 'A1–A2', emoji: '🌱', hint: 'Conozco pocas palabras o frases básicas.' },
  B: { name: 'Intermedio', cefr: 'B1–B2', emoji: '🌿', hint: 'Me defiendo en conversaciones cotidianas.' },
  C: { name: 'Avanzado', cefr: 'C1–C2', emoji: '🌳', hint: 'Me expreso con fluidez y quiero pulir matices.' }
};

const COURSES = {
  en: {
    name: 'Inglés', flag: '🇬🇧', voice: 'en-GB',
    culture: 'En los países anglófonos se usa mucho "please" y "thank you": omitirlos puede sonar brusco.',
    levels: {
      A: {
        vocab: [
          ['breakfast', 'desayuno', 'I have breakfast at eight o\'clock.', 'I usually eat toast for ___.'],
          ['tired', 'cansado/a', 'I am tired after work.', 'After running, I feel very ___.'],
          ['cheap', 'barato/a', 'This shirt is cheap.', 'The bus is ___: it costs only one dollar.'],
          ['always', 'siempre', 'She always drinks tea.', 'I ___ brush my teeth before bed.'],
          ['neighbour', 'vecino/a', 'My neighbour has a dog.', 'My ___ lives in the house next to mine.']
        ],
        grammar: [
          ['She ___ a teacher.', ['is', 'are', 'am'], 'Con he / she / it, el verbo "to be" en presente es "is".'],
          ['They ___ football on Sundays.', ['play', 'plays', 'playing'], 'En presente simple solo se añade -s con he / she / it. Con "they" va la forma base.'],
          ['There ___ two apples on the table.', ['are', 'is', 'be'], '"There is" es para singular y "there are" para plural (two apples).'],
          ['I ___ like coffee.', ['don\'t', 'doesn\'t', 'not'], 'La negación en presente simple con I / you / we / they es "don\'t"; "doesn\'t" es para he / she / it.'],
          ['This is ___ umbrella.', ['an', 'a', 'the a'], 'Se usa "an" delante de palabras que empiezan por sonido vocálico: an umbrella, an apple.']
        ],
        dialogue: [
          ['Good morning! What can I get you?', ['Can I have a coffee, please?', 'I am a coffee.', 'Give coffee.'], '"Can I have..., please?" es la forma educada y natural de pedir. "I am a coffee" significa "soy un café".'],
          ['Sure. Small, medium or large?', ['Medium, please.', 'Yes, please.', 'I am medium.'], 'Ante una pregunta de opciones (A, B o C) se responde eligiendo una, no con "yes".'],
          ['Anything else?', ['A croissant too, please.', 'I want else.', 'Yes, anything.'], '"Anything else?" = "¿Algo más?". Puedes contestar con lo que quieres + "too" (también) o "No, thank you".'],
          ['That\'s five dollars, please.', ['Here you are.', 'There you go are.', 'Is five.'], '"Here you are" se usa al entregar algo (el dinero). Es la fórmula estándar al pagar.']
        ],
        story: [
          ['You arrive in London by train. It is 9 a.m. and you are very hungry. Next to the station there is a small café and a bookshop.', 'What do you do?', ['I go to the café and order breakfast.', 'I go to the bookshop and eat a book.', 'I go back on the train.'], '"Hungry" = hambriento. "Bookshop" = librería, no es un lugar para comer.'],
          ['After breakfast, you want to visit the British Museum. A woman says: "Take bus number 24 and get off at the third stop."', 'Which bus do you take?', ['Bus 24', 'Bus 3', 'Bus 4'], '"Get off at the third stop" = bájate en la tercera parada. El número del autobús es el 24.'],
          ['On the bus, the driver says: "Tickets, please!" You don\'t have a ticket, but you have a bank card.', 'What do you say?', ['Can I pay by card?', 'I am a card.', 'Where is the ticket of me?'], '"Pay by card" = pagar con tarjeta. En inglés se dice "by card" / "in cash".'],
          ['At the museum, a sign says: "Entrance on the right. Free admission."', 'How much is it and where do you go?', ['It\'s free; I go to the right.', 'It\'s expensive; I go left.', 'It\'s closed; I go home.'], '"Free admission" = entrada gratuita. "On the right" = a la derecha.']
        ],
        writing: {
          topics: ['Describe tu rutina diaria — "My daily routine"', 'Presenta a tu familia — "My family"'],
          min: 40,
          words: ['always', 'usually', 'breakfast', 'work', 'morning'],
          connectors: ['and', 'but', 'then', 'because', 'after']
        }
      },
      B: {
        vocab: [
          ['reliable', 'fiable, de confianza', 'She is a reliable colleague.', 'My old car is very ___: it never breaks down.'],
          ['deadline', 'fecha límite, plazo', 'The deadline for the report is Friday.', 'We must finish the project before the ___ on Monday.'],
          ['achieve', 'lograr, conseguir', 'She achieved all her goals.', 'If you work hard, you can ___ anything.'],
          ['meanwhile', 'mientras tanto', 'I\'ll cook. Meanwhile, you can rest.', 'I\'ll cook dinner. ___, you can set the table.'],
          ['crowded', 'abarrotado, lleno de gente', 'The beach was crowded in August.', 'The train was so ___ that I had to stand.']
        ],
        grammar: [
          ['I ___ in Madrid since 2019.', ['have lived', 'live', 'am living'], 'Con "since" / "for" para algo que empezó en el pasado y continúa, se usa el present perfect: "I have lived".'],
          ['If it rains tomorrow, we ___ at home.', ['will stay', 'stay', 'would stay'], 'Primer condicional (situación real/probable): if + presente, will + infinitivo.'],
          ['While I ___ TV, the phone rang.', ['was watching', 'watched', 'am watching'], 'El pasado continuo describe una acción en progreso que otra acción (pasado simple) interrumpe.'],
          ['This is the book ___ I told you about.', ['which', 'who', 'where'], '"Which" (o "that") se usa para cosas; "who" para personas; "where" para lugares.'],
          ['You ___ smoke here. It\'s forbidden.', ['mustn\'t', 'don\'t have to', 'needn\'t'], '"Mustn\'t" expresa prohibición. "Don\'t have to" significa "no es necesario": ¡falso amigo frecuente!']
        ],
        dialogue: [
          ['Good evening. Do you have a reservation?', ['Yes, I booked a table for two under the name García.', 'Yes, I reserved myself yesterday.', 'No, I have a table.'], '"Book a table under the name..." = reservar una mesa a nombre de... "Reserve myself" es un calco incorrecto del español.'],
          ['I\'m afraid your table isn\'t ready yet. Would you mind waiting ten minutes?', ['Not at all, we\'ll wait at the bar.', 'Yes, I mind, that\'s fine.', 'No, I don\'t mind waiting no.'], 'Trampa clásica: "Would you mind...?" significa "¿Le importaría...?". Para aceptar se responde "Not at all" (en absoluto). "Yes, I mind" significa que sí te molesta.'],
          ['What would you like to order?', ['I\'d like the soup of the day, please. Is it vegetarian?', 'I would like that you bring soup.', 'Me soup.'], '"I\'d like + sustantivo" es la forma cortés. "I would like that you..." es un calco del español ("me gustaría que...").'],
          ['Here\'s your steak, enjoy!', ['Excuse me, I think there\'s been a mistake. I ordered the soup.', 'This is not my order, take it away now!', 'Thanks, I\'m vegetarian.'], 'Para reclamar con cortesía: "Excuse me, I think there\'s been a mistake". La segunda opción es correcta gramaticalmente pero demasiado brusca (registro inadecuado).']
        ],
        story: [
          ['You\'ve just landed in New York for a job interview at 3 p.m. Your phone battery is dead and you don\'t know the address by heart. However, you printed the confirmation email and it\'s in your suitcase.', 'What\'s the smartest move?', ['Open your suitcase and check the printed email.', 'Wait at the airport until your phone recharges itself.', 'Ask a stranger to lend you their phone for an hour.'], '"By heart" = de memoria. "Dead battery" = batería agotada. La pista clave: "you printed the confirmation email".'],
          ['The address is 350 Fifth Avenue. A taxi driver tells you: "Traffic is terrible today; the subway would be quicker, though you\'d have to change lines once."', 'According to the driver, which option is faster?', ['The subway, even with one change.', 'The taxi, because there\'s no traffic.', 'Walking, because it\'s very close.'], '"Quicker" = más rápido. "Though" = aunque. "Change lines" = hacer transbordo.'],
          ['You arrive 40 minutes early. The receptionist says: "Mr. Lee is running late, so the interview has been pushed back by half an hour."', 'When does the interview start now?', ['At 3:30 p.m.', 'At 2:30 p.m.', 'At 3:00 p.m. sharp.'], '"Push back" = posponer, retrasar. "Running late" = ir con retraso. 3:00 + 30 min = 3:30.'],
          ['During the interview, Mr. Lee asks: "Why should we hire you?"', 'What is the best answer?', ['Because I have five years of experience in sales and I\'ve consistently exceeded my targets.', 'Because I need the money.', 'Because I am hire you.'], 'En una entrevista conviene aportar logros concretos. "Exceed targets" = superar objetivos.']
        ],
        writing: {
          topics: ['Ventajas y desventajas de trabajar desde casa — "Working from home: pros and cons"', 'Un viaje que cambió tu forma de ver el mundo — "A trip that changed me"'],
          min: 100,
          words: ['however', 'although', 'advantage', 'disadvantage', 'experience'],
          connectors: ['however', 'although', 'moreover', 'therefore', 'on the other hand', 'in conclusion']
        }
      },
      C: {
        vocab: [
          ['unprecedented', 'sin precedentes', 'We are living in unprecedented times.', 'The pandemic caused an ___ crisis in global healthcare.'],
          ['undermine', 'socavar, debilitar', 'Corruption undermines public trust.', 'Constant criticism can ___ a person\'s confidence.'],
          ['nonetheless', 'no obstante, aun así', 'It was risky; nonetheless, we tried.', 'The plan was risky; ___, the board approved it.'],
          ['thorough', 'exhaustivo, minucioso', 'She gave a thorough explanation.', 'The detective carried out a ___ investigation of the crime scene.'],
          ['ubiquitous', 'omnipresente', 'Coffee shops are ubiquitous in this city.', 'Smartphones have become ___ in modern society.']
        ],
        grammar: [
          ['___ I known about the strike, I would have taken a taxi.', ['Had', 'If', 'Should'], 'Inversión en el tercer condicional: "Had I known..." = "If I had known...". Es un registro formal muy apreciado en C1.'],
          ['Not only ___ late, but he also forgot the documents.', ['did he arrive', 'he arrived', 'he did arrive'], 'Tras expresiones negativas al inicio ("Not only", "Never", "Rarely") se invierte sujeto y auxiliar.'],
          ['I\'d rather you ___ smoke in the car.', ['didn\'t', 'don\'t', 'won\'t'], '"Would rather + otro sujeto" va seguido de pasado simple aunque hable del presente.'],
          ['By this time next year, she ___ her PhD.', ['will have finished', 'will finish', 'finishes'], 'Futuro perfecto ("will have + participio") para acciones que estarán terminadas antes de un momento futuro.'],
          ['It\'s high time we ___ a decision.', ['made', 'make', 'will make'], '"It\'s (high) time + sujeto" va con pasado simple para expresar que algo ya debería estar ocurriendo.']
        ],
        dialogue: [
          ['I understand you wanted to speak to the manager. How can I help?', ['Thank you for your time. I\'m afraid this morning\'s service fell rather short of your usual standards.', 'Your service is terrible and I want my money back now.', 'I wanted to speak to the manager because I want to speak.'], 'En C1 se valora la diplomacia: "I\'m afraid..." suaviza la queja y "fall short of" (no estar a la altura) es una colocación muy natural.'],
          ['I\'m terribly sorry to hear that. Could you tell me exactly what happened?', ['We waited nearly forty minutes for our order and, when it finally arrived, it was cold.', 'It happened that we waited, then cold.', 'Nothing, forget it, whatever.'], 'Una buena reclamación es concreta y cronológica. "Nearly" = casi; "finally" = por fin.'],
          ['That\'s unacceptable, and I do apologise. Would you allow us to make it up to you?', ['That\'s very kind of you. A fresh dish would be more than enough.', 'Make it up? I don\'t make anything.', 'Obviously, give me everything for free forever.'], '"Make it up to someone" = compensar a alguien. Es un phrasal verb idiomático: no se traduce literalmente.'],
          ['Of course. Is there anything you think we could improve?', ['Perhaps it might be worth having an extra pair of hands during the morning rush.', 'You should hire better people, honestly.', 'Improving is not my problem.'], '"It might be worth + -ing" sugiere con tacto. "An extra pair of hands" = una persona más para ayudar; "morning rush" = hora punta de la mañana.']
        ],
        story: [
          ['As a freelance journalist in Chicago, you receive an anonymous tip: the city council is allegedly about to approve a construction contract that "smells fishy". Your editor warns you: "Don\'t run anything unless you can back it up with at least two independent sources."', 'What does your editor require?', ['Corroboration from two independent sources before publishing.', 'Publishing immediately to beat competitors.', 'Writing an opinion piece instead.'], '"Run a story" = publicar. "Back it up" = respaldarlo. "Smell fishy" = oler a chamusquina, parecer sospechoso.'],
          ['A council clerk agrees to talk off the record. She hints that the winning bidder\'s CEO is the mayor\'s brother-in-law, but she refuses to be quoted.', 'How can you use her information?', ['As a lead to investigate further, without naming her.', 'Quote her by name as the main source.', 'Ignore it completely because it\'s off the record.'], '"Off the record" = de forma extraoficial: la información orienta, pero no se atribuye. "Lead" = pista. "Brother-in-law" = cuñado.'],
          ['Public records reveal that the contract was awarded even though the bid was 30% higher than that of its nearest competitor.', 'Which statement accurately reflects this finding?', ['The chosen bid was considerably more expensive than the runner-up.', 'The chosen bid was the cheapest one.', 'There were no other bidders.'], '"Award a contract" = adjudicar. "Runner-up" = el segundo clasificado. "Even though" = a pesar de que.'],
          ['The mayor\'s office issues a statement: "The allegations are baseless and the procurement process was carried out by the book."', 'What is the mayor\'s office claiming?', ['That proper procedures were followed and the accusations are unfounded.', 'That a book about the contract will be published.', 'That they admit some irregularities.'], '"By the book" = siguiendo las normas al pie de la letra (¡no tiene nada que ver con un libro!). "Baseless" = infundado.']
        ],
        writing: {
          topics: ['¿Deberían los gobiernos regular la inteligencia artificial? — "Should AI be regulated?"', 'El turismo masivo: ¿bendición o maldición para las ciudades? — "Mass tourism: blessing or curse?"'],
          min: 200,
          words: ['nonetheless', 'arguably', 'undermine', 'unprecedented', 'thorough'],
          connectors: ['nonetheless', 'furthermore', 'consequently', 'whereas', 'notwithstanding', 'to sum up']
        }
      }
    }
  },

  fr: {
    name: 'Francés', flag: '🇫🇷', voice: 'fr-FR',
    culture: 'En Francia, saludar con "Bonjour" al entrar en una tienda o café es casi obligatorio: no hacerlo se considera de mala educación.',
    levels: {
      A: {
        vocab: [
          ['petit-déjeuner', 'desayuno (le petit-déjeuner, masculino)', 'Je prends le petit-déjeuner à huit heures.', 'Le matin, je mange un croissant au ___.'],
          ['fatigué', 'cansado', 'Je suis fatigué après le travail.', 'Après le sport, je suis très ___.'],
          ['cher', 'caro', 'Cette voiture est très chère.', 'Ce restaurant est trop ___ : un café coûte dix euros !'],
          ['toujours', 'siempre', 'Il est toujours en retard.', 'Elle boit ___ du thé le matin.'],
          ['voisin', 'vecino', 'Mon voisin a un chien.', 'Mon ___ habite dans la maison à côté.']
        ],
        grammar: [
          ['Nous ___ français.', ['parlons', 'parle', 'parlez'], 'Los verbos en -er con "nous" terminan en -ons: nous parlons.'],
          ['J\'___ 25 ans.', ['ai', 'suis', 'fais'], 'En francés la edad se expresa con "avoir" (tener), como en español: j\'ai 25 ans.'],
          ['C\'est ___ pomme.', ['une', 'un', 'des'], '"Pomme" (manzana) es femenino, por eso va con "une".'],
          ['Je ne mange ___ de viande.', ['pas', 'rien', 'non'], 'La negación básica rodea al verbo: ne + verbo + pas.'],
          ['Ils ___ au cinéma ce soir.', ['vont', 'va', 'allez'], '"Aller" es irregular: je vais, tu vas, il va, nous allons, vous allez, ils vont.']
        ],
        dialogue: [
          ['Bonjour ! Qu\'est-ce que je vous sers ?', ['Bonjour ! Un café, s\'il vous plaît.', 'Je suis un café.', 'Donne café.'], 'Responde siempre con "Bonjour" y usa "s\'il vous plaît". "Je suis un café" significa "soy un café".'],
          ['Vous le voulez avec du lait ?', ['Oui, avec un peu de lait, merci.', 'Oui, je veux le lait de vous.', 'Non, je suis lait.'], '"Un peu de" = un poco de. Tras expresiones de cantidad se usa "de" sin artículo.'],
          ['Et avec ceci ?', ['Un croissant aussi, s\'il vous plaît.', 'Ceci avec et.', 'Oui, avec.'], '"Et avec ceci ?" es la forma típica de preguntar "¿Algo más?" en los comercios franceses.'],
          ['Ça fait quatre euros cinquante.', ['Voilà, merci !', 'C\'est fait.', 'Quatre euros cinquante ans.'], '"Voilà" se usa al entregar algo. "Ça fait..." = "Son...", para indicar el precio.']
        ],
        story: [
          ['Tu arrives à Paris en train. Il est neuf heures et tu as très faim. À côté de la gare, il y a une boulangerie et une pharmacie.', 'Qu\'est-ce que tu fais ?', ['Je vais à la boulangerie pour acheter un croissant.', 'Je vais à la pharmacie pour manger.', 'Je reprends le train.'], '"Avoir faim" = tener hambre. "Boulangerie" = panadería; "pharmacie" = farmacia.'],
          ['Ensuite, tu veux visiter le Louvre. Un homme te dit : « Prends le métro, ligne 1, et descends à la quatrième station. »', 'Quelle ligne de métro prends-tu ?', ['La ligne 1', 'La ligne 4', 'La ligne 9'], '"Descendre" = bajarse. La cuarta estación es dónde bajas, pero la línea es la 1.'],
          ['Au guichet, l\'employée demande : « Vous avez une carte d\'étudiant ? » Tu es étudiant(e).', 'Que réponds-tu ?', ['Oui, voilà ma carte.', 'Non, je suis carte.', 'Oui, je suis employée.'], '"Guichet" = taquilla. "Voilà ma carte" = aquí tiene mi carné.'],
          ['Un panneau dit : « Entrée gratuite le premier dimanche du mois. » Aujourd\'hui, c\'est le premier dimanche du mois.', 'Combien tu paies ?', ['Rien, c\'est gratuit !', 'Dix euros.', 'Le musée est fermé.'], '"Gratuit" = gratis. "Panneau" = cartel. "Premier dimanche du mois" = primer domingo del mes.']
        ],
        writing: {
          topics: ['Describe tu rutina diaria — « Ma journée typique »', 'Presenta a tu familia — « Ma famille »'],
          min: 40,
          words: ['toujours', 'd\'abord', 'petit-déjeuner', 'travail', 'matin'],
          connectors: ['et', 'mais', 'ensuite', 'parce que', 'après']
        }
      },
      B: {
        vocab: [
          ['fiable', 'fiable, de confianza', 'C\'est une collègue fiable.', 'Ma vieille voiture est très ___ : elle ne tombe jamais en panne.'],
          ['délai', 'plazo', 'Le délai est très court.', 'Nous devons terminer le projet dans un ___ de deux semaines.'],
          ['atteindre', 'alcanzar, lograr', 'Elle a atteint tous ses objectifs.', 'Avec du travail, tu peux ___ tes objectifs.'],
          ['cependant', 'sin embargo', 'C\'est cher ; cependant, c\'est de qualité.', 'Il pleuvait ; ___, nous sommes sortis nous promener.'],
          ['bondé', 'abarrotado, lleno de gente', 'La plage était bondée en août.', 'Le métro était tellement ___ que j\'ai dû rester debout.']
        ],
        grammar: [
          ['J\'habite à Lyon ___ trois ans.', ['depuis', 'pendant', 'il y a'], '"Depuis" + presente expresa una acción que empezó en el pasado y continúa: "vivo en Lyon desde hace tres años".'],
          ['Hier, nous ___ au restaurant.', ['sommes allés', 'avons allé', 'allions allés'], '"Aller" forma el passé composé con "être", y el participio concuerda con el sujeto: nous sommes allés.'],
          ['Si j\'avais le temps, je ___ plus.', ['lirais', 'lis', 'lirai'], 'Hipótesis: si + imparfait → conditionnel présent (je lirais).'],
          ['Il faut que tu ___ tes devoirs.', ['fasses', 'fais', 'feras'], '"Il faut que" exige subjuntivo: que tu fasses.'],
          ['C\'est le livre ___ je t\'ai parlé.', ['dont', 'que', 'qui'], '"Parler de" lleva "de", por eso el relativo es "dont" (del que).']
        ],
        dialogue: [
          ['Bonsoir, vous avez réservé ?', ['Oui, une table pour deux au nom de García.', 'Oui, je me suis réservé hier.', 'Non, j\'ai une table.'], '"Au nom de" = a nombre de. "Réserver" no es pronominal en este uso.'],
          ['Désolé, votre table n\'est pas encore prête. Ça vous dérange d\'attendre dix minutes ?', ['Pas du tout, nous attendrons au bar.', 'Oui, ça me dérange, c\'est parfait.', 'Non, je ne dérange pas.'], '"Ça vous dérange ?" = ¿le molesta? Para aceptar: "Pas du tout" (en absoluto). Decir "oui" significaría que sí te molesta.'],
          ['Vous avez choisi ?', ['Je voudrais la soupe du jour, s\'il vous plaît. Elle est végétarienne ?', 'Je veux que vous apportez soupe.', 'Moi soupe.'], '"Je voudrais" (condicional) es más cortés que "je veux".'],
          ['Voici votre steak, bon appétit !', ['Excusez-moi, je crois qu\'il y a une erreur. J\'ai commandé la soupe.', 'Ce n\'est pas à moi, enlevez ça tout de suite !', 'Merci, je suis végétarien.'], 'Para reclamar con cortesía: "Excusez-moi, je crois qu\'il y a une erreur". La segunda opción es demasiado brusca.']
        ],
        story: [
          ['Tu viens d\'arriver à Lyon pour un entretien d\'embauche à 15 h. La batterie de ton téléphone est vide et tu ne connais pas l\'adresse par cœur. Heureusement, tu as imprimé l\'e-mail de confirmation : il est dans ta valise.', 'Que fais-tu ?', ['J\'ouvre ma valise et je lis l\'e-mail imprimé.', 'J\'attends que mon téléphone se recharge tout seul.', 'Je demande son téléphone à un inconnu pendant une heure.'], '"Par cœur" = de memoria. "Entretien d\'embauche" = entrevista de trabajo. "Valise" = maleta.'],
          ['Un chauffeur de taxi te dit : « Il y a des bouchons partout aujourd\'hui ; le métro serait plus rapide, même s\'il faut changer une fois. »', 'Selon le chauffeur, quelle option est la plus rapide ?', ['Le métro, même avec un changement.', 'Le taxi, parce qu\'il n\'y a pas de circulation.', 'À pied, parce que c\'est tout près.'], '"Bouchons" = atascos (¡no tapones!). "Même si" = aunque.'],
          ['Tu arrives en avance. La réceptionniste annonce : « M. Martin a du retard, l\'entretien est repoussé d\'une demi-heure. »', 'À quelle heure commence l\'entretien maintenant ?', ['À 15 h 30', 'À 14 h 30', 'À 15 h pile'], '"Repousser" = posponer. "Avoir du retard" = ir con retraso. 15 h + 30 min = 15 h 30.'],
          ['M. Martin te demande : « Pourquoi devrions-nous vous embaucher ? »', 'Quelle est la meilleure réponse ?', ['Parce que j\'ai cinq ans d\'expérience dans la vente et que j\'ai toujours dépassé mes objectifs.', 'Parce que j\'ai besoin d\'argent.', 'Parce que je suis embaucher vous.'], 'Aporta logros concretos. "Dépasser ses objectifs" = superar los objetivos.']
        ],
        writing: {
          topics: ['Ventajas y desventajas del teletrabajo — « Le télétravail : pour ou contre ? »', 'Un viaje que te cambió — « Un voyage qui m\'a changé »'],
          min: 100,
          words: ['cependant', 'bien que', 'avantage', 'inconvénient', 'expérience'],
          connectors: ['cependant', 'bien que', 'de plus', 'donc', 'd\'un autre côté', 'en conclusion']
        }
      },
      C: {
        vocab: [
          ['sans précédent', 'sin precedentes', 'Nous vivons une époque sans précédent.', 'La pandémie a provoqué une crise ___ dans le système de santé.'],
          ['nuire', 'perjudicar, dañar', 'Le tabac nuit gravement à la santé.', 'Le manque de sommeil peut ___ à la concentration.'],
          ['néanmoins', 'no obstante', 'C\'était risqué ; néanmoins, nous avons essayé.', 'Le projet était risqué ; ___, le conseil l\'a approuvé.'],
          ['approfondie', 'exhaustiva, profunda', 'Elle a mené une étude approfondie.', 'L\'enquêteur a mené une analyse ___ de la scène du crime.'],
          ['omniprésents', 'omnipresentes', 'Les écrans sont omniprésents.', 'Les smartphones sont devenus ___ dans notre société.']
        ],
        grammar: [
          ['Bien qu\'il ___ malade, il est venu travailler.', ['soit', 'est', 'était'], '"Bien que" (aunque) exige siempre subjuntivo: bien qu\'il soit.'],
          ['Si j\'avais su, je ___ venu plus tôt.', ['serais', 'aurais', 'serai'], 'Hipótesis en el pasado: si + plus-que-parfait → conditionnel passé. "Venir" se conjuga con "être": je serais venu.'],
          ['Les lettres qu\'il a ___ sont arrivées.', ['écrites', 'écrit', 'écrits'], 'Con "avoir", el participio concuerda con el complemento directo si va antes del verbo ("que" = les lettres, femenino plural).'],
          ['Je cherche quelqu\'un qui ___ parler chinois.', ['sache', 'sait', 'saura'], 'Cuando el antecedente es hipotético (no sabemos si existe), se usa subjuntivo: qui sache.'],
          ['___ arrivé à la gare, il a appelé sa mère.', ['Une fois', 'Dès que', 'Après'], '"Une fois + participio" = "una vez llegado". "Dès que" y "après" necesitan un verbo conjugado o un infinitivo compuesto ("après être arrivé").']
        ],
        dialogue: [
          ['On m\'a dit que vous souhaitiez parler au responsable. Que puis-je faire pour vous ?', ['Je vous remercie de me recevoir. Je crains que le service de ce matin n\'ait pas été à la hauteur de vos habitudes.', 'Votre service est nul, je veux mon argent tout de suite.', 'Je voulais parler au responsable parce que je veux parler.'], '"Je crains que" + subjuntivo (con ne expletivo opcional) suaviza la queja. "Être à la hauteur" = estar a la altura.'],
          ['Je suis vraiment navré. Pourriez-vous me dire ce qui s\'est passé exactement ?', ['Nous avons attendu près de quarante minutes et, lorsque les plats sont enfin arrivés, ils étaient froids.', 'Il s\'est passé que attendre, puis froid.', 'Rien, laissez tomber, peu importe.'], 'Una buena reclamación es precisa y cronológica. "Près de" = casi; "enfin" = por fin.'],
          ['C\'est inadmissible, je vous présente nos excuses. Permettez-nous de nous rattraper.', ['C\'est très aimable à vous. Un plat chaud suffira amplement.', 'Rattraper quoi ? Je ne suis pas tombé.', 'Évidemment, offrez-moi tout gratuitement pour toujours.'], '"Se rattraper" = compensar, enmendarse. "Suffire amplement" = ser más que suficiente.'],
          ['Bien sûr. Auriez-vous une suggestion pour que nous nous améliorions ?', ['Peut-être serait-il judicieux de prévoir une personne supplémentaire pendant le coup de feu du matin.', 'Engagez des gens compétents, franchement.', 'S\'améliorer, ce n\'est pas mon problème.'], '"Peut-être serait-il..." (inversión tras peut-être) es muy elegante. "Le coup de feu" = la hora de más trabajo en hostelería.']
        ],
        story: [
          ['Journaliste indépendant(e) à Marseille, tu reçois un tuyau anonyme : le conseil municipal s\'apprêterait à attribuer un marché de construction « louche ». Ta rédactrice en chef te prévient : « Ne publie rien tant que tu n\'as pas au moins deux sources indépendantes. »', 'Qu\'exige ta rédactrice en chef ?', ['Deux sources indépendantes avant toute publication.', 'Publier immédiatement pour devancer la concurrence.', 'Écrire plutôt une tribune d\'opinion.'], '"Un tuyau" = un soplo, una pista. "Louche" = turbio, sospechoso. El condicional "s\'apprêterait" indica información no confirmada.'],
          ['Une employée de la mairie accepte de parler en off. Elle laisse entendre que le PDG de l\'entreprise retenue est le beau-frère du maire, mais refuse d\'être citée.', 'Comment peux-tu utiliser cette information ?', ['Comme piste pour enquêter, sans la nommer.', 'La citer nommément comme source principale.', 'L\'ignorer complètement.'], '"En off" = extraoficialmente. "Laisser entendre" = insinuar. "Beau-frère" = cuñado.'],
          ['Les documents publics révèlent que le marché a été attribué alors que l\'offre était 30 % plus chère que celle du concurrent le plus proche.', 'Quelle affirmation est correcte ?', ['L\'offre retenue était nettement plus chère que la deuxième.', 'L\'offre retenue était la moins chère.', 'Il n\'y avait aucun autre candidat.'], '"Alors que" aquí = a pesar de que. "Nettement" = claramente.'],
          ['La mairie publie un communiqué : « Ces allégations sont sans fondement et la procédure a été menée dans les règles de l\'art. »', 'Que prétend la mairie ?', ['Que la procédure a été respectée et que les accusations sont infondées.', 'Qu\'un livre sur l\'art sera publié.', 'Qu\'elle reconnaît certaines irrégularités.'], '"Dans les règles de l\'art" = como es debido, correctamente (¡nada que ver con el arte!).']
        ],
        writing: {
          topics: ['¿Hay que regular la inteligencia artificial? — « Faut-il réguler l\'intelligence artificielle ? »', 'El turismo de masas — « Le tourisme de masse : bénédiction ou fléau ? »'],
          min: 200,
          words: ['néanmoins', 'sans précédent', 'nuire', 'enjeu', 'certes'],
          connectors: ['néanmoins', 'en outre', 'par conséquent', 'tandis que', 'certes', 'en somme']
        }
      }
    }
  },

  de: {
    name: 'Alemán', flag: '🇩🇪', voice: 'de-DE',
    culture: 'En Alemania la puntualidad es una muestra de respeto, y al pagar en un café es habitual redondear diciendo "Stimmt so" (quédese con el cambio).',
    levels: {
      A: {
        vocab: [
          ['Frühstück', 'desayuno (das Frühstück)', 'Das Frühstück ist um acht Uhr.', 'Am Morgen esse ich Brot zum ___.'],
          ['müde', 'cansado/a', 'Ich bin heute sehr müde.', 'Nach der Arbeit bin ich sehr ___.'],
          ['billig', 'barato/a', 'Das Hemd ist billig.', 'Der Bus ist ___: Er kostet nur einen Euro.'],
          ['immer', 'siempre', 'Er kommt immer zu spät.', 'Sie trinkt morgens ___ Tee.'],
          ['Nachbar', 'vecino (der Nachbar)', 'Mein Nachbar hat einen Hund.', 'Mein ___ wohnt im Haus nebenan.']
        ],
        grammar: [
          ['Wir ___ Deutsch.', ['lernen', 'lerne', 'lernt'], 'Con "wir" (nosotros) el verbo termina en -en: wir lernen.'],
          ['Ich ___ 25 Jahre alt.', ['bin', 'habe', 'mache'], 'A diferencia del español, la edad se expresa con "sein" (ser/estar): Ich bin 25 Jahre alt.'],
          ['Das ist ___ Tisch.', ['der', 'die', 'das'], '"Tisch" (mesa) es masculino en alemán: der Tisch. ¡El género no coincide con el español!'],
          ['Ich habe ___ Auto.', ['kein', 'keine', 'nicht'], 'Para negar un sustantivo se usa "kein". "Auto" es neutro (das Auto), así que es "kein".'],
          ['Morgen ___ ich nach Berlin.', ['fahre', 'fahren', 'fährst'], 'El verbo conjugado va siempre en segunda posición. Con "ich": ich fahre.']
        ],
        dialogue: [
          ['Guten Morgen! Was darf es sein?', ['Einen Kaffee, bitte.', 'Ich bin ein Kaffee.', 'Gib Kaffee.'], '"Was darf es sein?" = ¿Qué desea? Se responde con lo que quieres en acusativo + "bitte": einen Kaffee.'],
          ['Mit Milch und Zucker?', ['Nur mit Milch, bitte.', 'Ja, ich bin Milch.', 'Mit mir, danke.'], '"Nur" = solo. "Mit Milch" = con leche.'],
          ['Sonst noch etwas?', ['Ein Croissant, bitte.', 'Sonst bitte etwas noch.', 'Ja, sonst.'], '"Sonst noch etwas?" = ¿Algo más? Puedes responder con otro pedido o "Nein, danke".'],
          ['Das macht vier Euro fünfzig.', ['Hier, bitte. Stimmt so!', 'Das macht nichts.', 'Vier Euro fünfzig Jahre.'], '"Stimmt so" = quédese con el cambio. ¡Ojo! "Das macht nichts" significa "no pasa nada".']
        ],
        story: [
          ['Du kommst mit dem Zug in Berlin an. Es ist neun Uhr und du hast großen Hunger. Neben dem Bahnhof gibt es eine Bäckerei und eine Apotheke.', 'Was machst du?', ['Ich gehe in die Bäckerei und kaufe ein Brötchen.', 'Ich gehe in die Apotheke und esse dort.', 'Ich fahre mit dem Zug zurück.'], '"Hunger haben" = tener hambre. "Bäckerei" = panadería; "Apotheke" = farmacia.'],
          ['Dann möchtest du das Brandenburger Tor sehen. Eine Frau sagt: „Nimm die U-Bahn, Linie 5, und steig an der dritten Station aus.“', 'Welche Linie nimmst du?', ['Die Linie 5', 'Die Linie 3', 'Die Linie 8'], '"Aussteigen" = bajarse (verbo separable: steig ... aus). Te bajas en la tercera estación, pero la línea es la 5.'],
          ['In der U-Bahn sagt ein Kontrolleur: „Fahrkarte, bitte!“ Du hast eine Tageskarte.', 'Was sagst du?', ['Hier ist meine Tageskarte.', 'Ich bin eine Fahrkarte.', 'Wo ist Karte von mich?'], '"Fahrkarte" = billete. "Tageskarte" = billete de un día.'],
          ['Am Tor steht ein Schild: „Führung um 14 Uhr – kostenlos.“ Es ist jetzt 13 Uhr.', 'Was stimmt?', ['Die Führung beginnt in einer Stunde und kostet nichts.', 'Die Führung ist sehr teuer.', 'Die Führung war schon um 12 Uhr.'], '"Führung" = visita guiada. "Kostenlos" = gratis. 13 Uhr + 1 Stunde = 14 Uhr.']
        ],
        writing: {
          topics: ['Describe tu rutina diaria — „Mein Tagesablauf“', 'Presenta a tu familia — „Meine Familie“'],
          min: 40,
          words: ['immer', 'zuerst', 'Frühstück', 'Arbeit', 'Morgen'],
          connectors: ['und', 'aber', 'dann', 'weil', 'danach']
        }
      },
      B: {
        vocab: [
          ['zuverlässig', 'fiable, de confianza', 'Sie ist eine zuverlässige Kollegin.', 'Mein altes Auto ist sehr ___: Es geht nie kaputt.'],
          ['Frist', 'plazo (die Frist)', 'Die Frist ist sehr kurz.', 'Die ___ für den Bericht endet am Freitag.'],
          ['erreichen', 'alcanzar, lograr', 'Sie hat alle ihre Ziele erreicht.', 'Mit viel Arbeit kannst du deine Ziele ___.'],
          ['trotzdem', 'aun así, sin embargo', 'Es war kalt; trotzdem sind wir geschwommen.', 'Es hat geregnet; ___ sind wir spazieren gegangen.'],
          ['überfüllt', 'abarrotado, lleno', 'Der Strand war im August überfüllt.', 'Die U-Bahn war so ___, dass ich stehen musste.']
        ],
        grammar: [
          ['Ich bleibe zu Hause, weil ___.', ['ich krank bin', 'ich bin krank', 'bin ich krank'], 'En las oraciones subordinadas (weil, dass, wenn, ob...) el verbo conjugado va al final.'],
          ['Gestern ___ ich ins Kino gegangen.', ['bin', 'habe', 'war'], 'Los verbos de movimiento como "gehen" forman el Perfekt con "sein": ich bin gegangen.'],
          ['Ich helfe ___ Mann.', ['dem', 'den', 'der'], '"Helfen" rige dativo: dem Mann (masculino dativo).'],
          ['Wenn ich Zeit hätte, ___ ich mehr lesen.', ['würde', 'werde', 'wurde'], 'Para hipótesis se usa el Konjunktiv II: würde + infinitivo. "Wurde" es pasado y "werde" futuro.'],
          ['Das ist die Frau, ___ ich gestern gesehen habe.', ['die', 'der', 'den'], 'El pronombre relativo toma el género del antecedente (die Frau) y el caso de su función (acusativo: ich habe sie gesehen) → die.']
        ],
        dialogue: [
          ['Guten Abend, haben Sie reserviert?', ['Ja, einen Tisch für zwei auf den Namen García.', 'Ja, ich habe mich gestern reserviert.', 'Nein, ich habe einen Tisch.'], '"Auf den Namen" = a nombre de. "Reservieren" no es reflexivo aquí.'],
          ['Leider ist Ihr Tisch noch nicht frei. Würde es Ihnen etwas ausmachen, zehn Minuten zu warten?', ['Nein, überhaupt nicht. Wir warten an der Bar.', 'Ja, das macht mir etwas aus, perfekt.', 'Ich mache nichts aus.'], '"Etwas ausmachen" = importar, molestar. Para aceptar se dice "Nein, überhaupt nicht" (no, en absoluto).'],
          ['Haben Sie schon gewählt?', ['Ich hätte gern die Tagessuppe. Ist sie vegetarisch?', 'Ich will, dass Sie Suppe bringen sofort.', 'Ich Suppe.'], '"Ich hätte gern..." es la fórmula más cortés para pedir. "Ich will" suena exigente.'],
          ['Hier ist Ihr Steak, guten Appetit!', ['Entschuldigung, ich glaube, da liegt ein Irrtum vor. Ich habe die Suppe bestellt.', 'Das ist nicht meins, nehmen Sie das sofort weg!', 'Danke, ich bin Vegetarier.'], '"Da liegt ein Irrtum vor" = ha habido un error. Una reclamación cortés y precisa es más eficaz.']
        ],
        story: [
          ['Du bist gerade in Hamburg angekommen und hast um 15 Uhr ein Vorstellungsgespräch. Dein Handy-Akku ist leer und du kennst die Adresse nicht auswendig. Zum Glück hast du die Bestätigungsmail ausgedruckt; sie liegt in deinem Koffer.', 'Was ist am klügsten?', ['Ich öffne den Koffer und lese die ausgedruckte Mail.', 'Ich warte, bis sich das Handy von selbst auflädt.', 'Ich leihe mir eine Stunde lang das Handy eines Fremden.'], '"Auswendig" = de memoria. "Vorstellungsgespräch" = entrevista de trabajo. "Koffer" = maleta.'],
          ['Ein Taxifahrer sagt: „Heute ist überall Stau. Mit der S-Bahn wären Sie schneller, auch wenn Sie einmal umsteigen müssen.“', 'Was ist laut Taxifahrer schneller?', ['Die S-Bahn, trotz einmal Umsteigen.', 'Das Taxi, weil es keinen Verkehr gibt.', 'Zu Fuß, weil es ganz nah ist.'], '"Stau" = atasco. "Umsteigen" = hacer transbordo. "Auch wenn" = aunque.'],
          ['Du bist zu früh da. Die Empfangsdame sagt: „Herr Weber verspätet sich, das Gespräch wird um eine halbe Stunde verschoben.“', 'Wann beginnt das Gespräch jetzt?', ['Um 15:30 Uhr', 'Um 14:30 Uhr', 'Pünktlich um 15 Uhr'], '"Verschieben" = posponer. "Sich verspäten" = retrasarse. 15 Uhr + 30 Minuten = 15:30.'],
          ['Herr Weber fragt: „Warum sollten wir Sie einstellen?“', 'Was ist die beste Antwort?', ['Weil ich fünf Jahre Erfahrung im Vertrieb habe und meine Ziele immer übertroffen habe.', 'Weil ich Geld brauche.', 'Weil ich Sie einstellen bin.'], '"Einstellen" = contratar. "Vertrieb" = ventas. Fíjate: tras "weil" el verbo va al final.']
        ],
        writing: {
          topics: ['Ventajas y desventajas del teletrabajo — „Homeoffice: Vor- und Nachteile“', 'Un viaje que te cambió — „Eine Reise, die mich verändert hat“'],
          min: 100,
          words: ['trotzdem', 'obwohl', 'Vorteil', 'Nachteil', 'Erfahrung'],
          connectors: ['trotzdem', 'obwohl', 'außerdem', 'deshalb', 'einerseits', 'andererseits']
        }
      },
      C: {
        vocab: [
          ['beispiellos', 'sin precedentes', 'Der Erfolg war beispiellos.', 'Das Ausmaß der Krise war ___.'],
          ['untergraben', 'socavar, minar', 'Korruption untergräbt das Vertrauen.', 'Ständige Kritik kann das Selbstvertrauen eines Menschen ___.'],
          ['dennoch', 'no obstante', 'Es war riskant; dennoch haben wir es versucht.', 'Das Projekt war riskant; ___ hat der Vorstand es genehmigt.'],
          ['gründlich', 'minucioso, a fondo', 'Sie hat den Text gründlich gelesen.', 'Die Kommissarin hat den Tatort ___ untersucht.'],
          ['allgegenwärtig', 'omnipresente', 'Werbung ist heute allgegenwärtig.', 'Smartphones sind in unserer Gesellschaft ___.']
        ],
        grammar: [
          ['Hätte ich das gewusst, ___ ich früher gekommen.', ['wäre', 'hätte', 'würde'], 'Konjunktiv II del pasado: "kommen" forma el Perfekt con "sein", por eso "wäre ... gekommen".'],
          ['Der Vertrag ___ gestern unterschrieben.', ['wurde', 'wird', 'hat'], 'Voz pasiva en pasado (Präteritum): wurde + participio.'],
          ['Trotz ___ Regens fand das Konzert statt.', ['des', 'dem', 'den'], '"Trotz" rige genitivo en registro formal: trotz des Regens.'],
          ['Er sagte, er ___ keine Zeit.', ['habe', 'hat', 'hätte gehabt'], 'En el estilo indirecto formal (prensa, informes) se usa el Konjunktiv I: er habe.'],
          ['Je mehr man übt, ___ besser spricht man.', ['desto', 'als', 'so'], 'Estructura comparativa "je + comparativo..., desto + comparativo..." = cuanto más..., mejor...']
        ],
        dialogue: [
          ['Sie wollten den Geschäftsführer sprechen. Wie kann ich Ihnen helfen?', ['Danke, dass Sie sich Zeit nehmen. Ich fürchte, der Service heute Morgen entsprach leider nicht Ihrem üblichen Niveau.', 'Ihr Service ist miserabel, ich will sofort mein Geld zurück.', 'Ich wollte sprechen, weil ich sprechen will.'], '"Ich fürchte..." suaviza la queja. "Entsprechen" (+ dativo) = corresponder, estar a la altura de.'],
          ['Das tut mir außerordentlich leid. Könnten Sie mir schildern, was genau passiert ist?', ['Wir haben fast vierzig Minuten gewartet, und als das Essen endlich kam, war es kalt.', 'Es ist passiert, dass warten, dann kalt.', 'Nichts, vergessen Sie es, egal.'], '"Schildern" = describir, relatar. Observa la inversión tras la subordinada: "..., war es kalt".'],
          ['Das ist inakzeptabel, ich entschuldige mich. Dürfen wir das wiedergutmachen?', ['Das ist sehr freundlich. Ein frisches Gericht wäre völlig ausreichend.', 'Wiedergutmachen? Ich mache gar nichts gut.', 'Selbstverständlich, für immer alles umsonst.'], '"Wiedergutmachen" = compensar, reparar un daño. "Völlig ausreichend" = más que suficiente.'],
          ['Selbstverständlich. Hätten Sie vielleicht einen Verbesserungsvorschlag?', ['Es wäre womöglich sinnvoll, während des morgendlichen Andrangs eine zusätzliche Kraft einzusetzen.', 'Stellen Sie halt kompetente Leute ein.', 'Verbessern ist nicht mein Problem.'], '"Es wäre womöglich sinnvoll..." sugiere con tacto. "Andrang" = afluencia de gente; "eine Kraft" = un/a empleado/a.']
        ],
        story: [
          ['Als freie Journalistin oder freier Journalist in München erhältst du einen anonymen Hinweis: Der Stadtrat soll kurz davor stehen, einen dubiosen Bauauftrag zu vergeben. Deine Chefredakteurin warnt: „Veröffentliche nichts, solange du es nicht durch mindestens zwei unabhängige Quellen belegen kannst.“', 'Was verlangt deine Chefredakteurin?', ['Zwei unabhängige Quellen vor jeder Veröffentlichung.', 'Sofort veröffentlichen, um der Konkurrenz zuvorzukommen.', 'Stattdessen einen Meinungsartikel schreiben.'], '"Soll ... stehen" expresa un rumor (se dice que). "Belegen" = demostrar, respaldar con pruebas.'],
          ['Eine Mitarbeiterin der Stadtverwaltung ist bereit, vertraulich zu reden. Sie deutet an, dass der Chef der beauftragten Firma der Schwager des Bürgermeisters ist, will aber nicht zitiert werden.', 'Wie kannst du diese Information nutzen?', ['Als Spur für weitere Recherchen, ohne sie zu nennen.', 'Sie namentlich als Hauptquelle zitieren.', 'Sie komplett ignorieren.'], '"Andeuten" = insinuar. "Schwager" = cuñado. "Vertraulich" = de forma confidencial.'],
          ['Öffentliche Unterlagen zeigen, dass der Auftrag vergeben wurde, obwohl das Angebot 30 % teurer war als das des nächstbesten Mitbewerbers.', 'Welche Aussage trifft zu?', ['Das gewählte Angebot war deutlich teurer als das zweitbeste.', 'Das gewählte Angebot war das billigste.', 'Es gab keine anderen Bewerber.'], '"Obwohl" = aunque. "Nächstbester Mitbewerber" = el siguiente mejor competidor.'],
          ['Das Rathaus erklärt: „Die Vorwürfe entbehren jeder Grundlage; das Vergabeverfahren wurde ordnungsgemäß durchgeführt.“', 'Was behauptet das Rathaus?', ['Dass das Verfahren korrekt war und die Vorwürfe unbegründet sind.', 'Dass ein Buch über das Verfahren erscheint.', 'Dass es Unregelmäßigkeiten zugibt.'], '"Jeder Grundlage entbehren" = carecer de todo fundamento (genitivo, registro muy formal). "Ordnungsgemäß" = conforme a las normas.']
        ],
        writing: {
          topics: ['¿Debe el Estado regular la IA? — „Sollte künstliche Intelligenz staatlich reguliert werden?“', 'El turismo de masas — „Massentourismus: Segen oder Fluch für die Städte?“'],
          min: 200,
          words: ['dennoch', 'beispiellos', 'untergraben', 'zweifellos', 'gründlich'],
          connectors: ['dennoch', 'darüber hinaus', 'folglich', 'während', 'zwar', 'zusammenfassend']
        }
      }
    }
  }
};
