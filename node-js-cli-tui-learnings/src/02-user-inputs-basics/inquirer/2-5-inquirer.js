import inquirer from "inquirer";

// 3 ) MCQ Quiz
async function MCQ() {
  // Await user input
  const answer = await inquirer.prompt([
    {
      type: "list", // list gives multiple-choice (MCQ) options
      name: "q1", // the key for the user's selected answer
      message: "2) What is Node.js?",
      choices: [
        "A JavaScript runtime",
        "A programming language",
        "A database",
        "A CSS framework",
      ],
    },
  ]);

  // Access answer with the same key you gave above: "q1"
  if (answer.q1 === "A JavaScript runtime") {
    console.log("✅ Correct Answer!");
  } else {
    console.log("❌ Wrong Answer!");
  }
}

// MCQ();
//

async function MCQQuiz() {
  let score = 0;
  const questions = [
    {
      type: "list",
      name: "q1",
      message: "1) What is Node.js?",
      choices: [
        "A JavaScript runtime",
        "A programming language",
        "A database",
        "A CSS framework",
      ],
      answer: "A JavaScript runtime",
    },
    {
      type: "list",
      name: "q2",
      message: "2) Which of the following is NOT a JavaScript data type?",
      choices: ["String", "Number", "Boolean", "Character"],
      answer: "Character",
    },
    {
      type: "list",
      name: "q3",
      message: "3) Which command initializes a new Node.js project?",
      choices: ["npm start", "npm init", "node init", "npm install"],
      answer: "npm init",
    },
    {
      type: "list",
      name: "q4",
      message: "4) Which method converts JSON to a JavaScript object?",
      choices: [
        "JSON.parse()",
        "JSON.stringify()",
        "JSON.convert()",
        "JSON.toObject()",
      ],
      answer: "JSON.parse()",
    },
    {
      type: "list",
      name: "q5",
      message: "5) Which of the following is a NoSQL database?",
      choices: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
      answer: "MongoDB",
    },
  ];

  for (let q of questions) {
    const ans = await inquirer.prompt([q]);
    // ans[q.name] this grabs choice you have choosen
    if (ans[q.name] === q.answer) {
      console.log("✅ Correct!\n");
      score++;
    } else {
      console.log(`❌ Wrong! Correct answer: ${q.answer}\n`);
    }
  }
  console.log(`🎯 Quiz Finished! Your Score: ${score} / ${questions.length}`);
}

MCQQuiz();
