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
