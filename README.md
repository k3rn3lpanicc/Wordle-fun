# Wordle‑fun

A random project for solving Wordle.

---

## 📌 Overview

**Wordle‑fun** is a simple interactive tool that helps you find the correct Wordle answer based on your previous guesses and the feedback you received (e.g., correct letters and their positions).

---

## 🚀 How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/k3rn3lpanicc/Wordle-fun.git
   cd Wordle-fun
   ```

2. Install necessary packages:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm run start
   ```

4. Follow the prompt in your terminal:
   - Enter your starting Wordle guess.
   - Provide feedback for each letter (e.g., green, yellow, grey).
   - The tool will narrow down possible answers based on your input.

---

## 🧠 How It Works

The tool asks for:
- **Your guess word**, e.g., `CRANE`
- **Feedback for each letter**

Using this information, the algorithm filters the word list to suggest the most probable words remaining.

---

## 📂 Project Structure

```
Wordle-fun/
├── main.ts         # Main entry point — handles user interaction and filtering logic
├── words.ts        # Word list and helper functions
├── package.json    # Project metadata and scripts
├── README.md       # This documentation
└── LICENSE         # MIT License
```

---

## 🖥 Example Usage

```bash
npm run start
```

```
Which word did you guess? > CRANE
Enter green positions (1,2,3,4,5): > 145
Possible words:
- SLICE
- SLIME
- PRICE
...
```

*(This is a hypothetical example; actual outputs may vary depending on the words and algorithm.)*

---

## 🔮 Future Improvements

- Add a UI (web or CLI) to visualize feedback more intuitively.
- Implement improved suggestion algorithm—e.g., ranking possible words by information gain.

---

## 📦 Requirements

- **Node.js** installed (for running the TypeScript code through `npm` scripts).
- A modern terminal for input/output.

---

## 📜 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

Happy Wordle solving! 🧩
