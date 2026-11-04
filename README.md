# hello-world

Hi humans!

## 🎓 Profesor de Idiomas Gamificado

Una experiencia interactiva para aprender idiomas. Es una página web estática y no necesita dependencias: abre `index.html` en el navegador.

**Cómo funciona**

1. 👋 Mensaje de bienvenida y solo dos preguntas: el idioma que quieres aprender (inglés, francés o alemán) y tu nivel actual (Principiante A1–A2, Intermedio B1–B2 o Avanzado C1–C2).
2. 🎓 Ves un plan de **Asignaturas de Aprendizaje** adaptado a ese idioma y nivel:
   - 📚 Expansión de Vocabulario: tarjetas con el significado en español, ejemplos y pronunciación 🔊, y después oraciones para completar.
   - 🧩 Desafíos Gramaticales: acertijos con una explicación de la regla.
   - ☕ Diálogos Interactivos: una conversación en el café, en formato chat.
   - ⏱️ Juegos de Supervivencia Lingüística: un reto contra el reloj (se desbloquea con 40 XP).
   - 🏙️ Historias Interactivas: una aventura en la ciudad donde tomas decisiones (se desbloquea con 80 XP).
   - ✍️ Redacción y Composición: escribes un ensayo y recibes una revisión con rúbrica (se desbloquea con 120 XP).
3. ⭐ Cada respuesta tiene retroalimentación inmediata. Ganas XP, rachas 🔥, niveles de jugador e insignias 🏅.
4. Al terminar cada ronda se te pregunta si quieres continuar (Sí/No). Si respondes «No», ves un 📊 resumen de la sesión con tus errores para repasar y una recomendación de la siguiente asignatura o del siguiente nivel.

Las explicaciones están siempre en español (el idioma nativo). Los ejemplos y ejercicios están en el idioma que se aprende.

**Archivos:** `index.html` (estructura), `styles.css` (estilos con modo claro y oscuro), `data.js` (contenido de los cursos), `app.js` (lógica y gamificación). El progreso se guarda en el `localStorage` del navegador.

Para añadir un idioma, agrega una entrada en `COURSES` dentro de `data.js` con la misma estructura (en cada pregunta, la primera opción es la correcta; la app baraja las opciones).

## 🦉 Inglés con Bubo (versión para niños)

Abre `kids.html`. Es un juego de inglés para **Infantil (3, 4 y 5 años)** y **Primaria (1º a 6º)**. Los temas siguen los contenidos que se suelen trabajar en cada curso en los colegios de la Comunitat Valenciana. En 4º hay además una unidad sobre Valencia: paella, naranjas, Fallas, playa y banda de música.

- **Dos preguntas al empezar:** elegir un amigo (avatar) y el curso.
- **Mapa de islas:** cada isla es una unidad temática, con estos juegos:
  - 👀 Aprende: tocas el dibujo y oyes la palabra en inglés.
  - 👂 Escucha y toca: oyes la palabra y tocas el dibujo correcto.
  - 🃏 Memory: encontrar parejas. En Infantil son de dibujo con dibujo; en Primaria, de dibujo con palabra.
  - 📖 Lee y elige (desde 1º): lees la palabra y tocas el dibujo.
  - 🔤 Ordena las letras (desde 2º): escribes la palabra con letras desordenadas.
  - 🧩 Completa la frase (Primaria): gramática del curso, como *I like*, *I can*, presente simple y continuo, pasado, comparativos, *going to* o *will*.
- **Pensado para niños:** en Infantil no hace falta saber leer, porque todo funciona con dibujos y audio. No hay castigos: si fallan, Bubo da una pista y lo vuelven a intentar.
- **Gamificación:** estrellas ⭐, medallas 🥇🥈🥉, confeti, un álbum de 30 pegatinas (una cada 8 estrellas) y un aviso de Bubo para descansar después de varias partidas.
- Las instrucciones están en español y las palabras en inglés, con la voz del dispositivo. No hay anuncios, compras ni registro; el progreso solo se guarda en el navegador.

**Archivos:** `kids.html`, `kids.css`, `kids-data.js` (contenido por curso) y `kids.js` (los juegos).
