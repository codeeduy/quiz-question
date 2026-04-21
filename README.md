# Quiz Game

A lightweight, browser-based quiz game built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies. Just open `index.html` and play.

## Overview

Quiz Game walks the user through a short series of multiple-choice questions, tracks their score in real time, and shows a results screen with a message that scales to how they did. Built as a portfolio project to demonstrate DOM manipulation, event handling, and state management in plain JavaScript.

## Features

- **Multi-screen flow** — start, quiz, and results screens managed through a single `.active` CSS class
- **Live score and progress tracking** — score updates on each answer, and a progress bar fills as the user advances
- **Instant visual feedback** — selected answers are marked correct (green) or incorrect (red), and the correct answer is always revealed
- **Click protection** — answer buttons disable after selection to prevent double-clicks from skewing the score
- **Responsive design** — layout adjusts cleanly for mobile screens at 500px and below
- **Restart support** — users can replay the quiz from the results screen without reloading the page

## Tech Stack

- HTML5
- CSS3 (flexbox, custom properties, media queries)
- Vanilla JavaScript (ES6+)

## Getting Started

Clone the repo and open the HTML file directly in a browser:

```bash
git clone https://github.com/codeeduy/quiz-question.git
cd quiz-question
open index.html
```

No installation, no npm, no server required.

## Project Structure

```
.
├── index.html    # Markup and screen containers
├── style.css     # Styles, layout, and responsive rules
└── script.js     # Quiz logic, state, and DOM updates
```

## How It Works

Questions live in a `quizQuestions` array in `script.js`. Each question is an object with the question text and an array of possible answers, where one is flagged `correct: true`. The app tracks three pieces of state — current question index, score, and whether answers are currently locked — and re-renders the quiz screen each time the user advances.

To add or change questions, edit the `quizQuestions` array directly. The total question count and max score update automatically based on the array length.

## Possible Improvements

- Pull questions from an external JSON file or a public API (e.g., Open Trivia DB)
- Add a timer per question
- Track a high score using localStorage
- Support multiple categories or difficulty levels
- Add keyboard navigation for accessibility

## License

Personal portfolio project — feel free to use as a reference.

