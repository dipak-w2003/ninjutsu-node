import inquirer from "inquirer"

// 1) Simple Prompt Selection
async function simplePrompt() {
  // 1️⃣ Ask the question
  // `prompt()` takes an array of question objects
  const answer = await inquirer.prompt([
    {
      // type of question (input, list, checkbox, etc.)
      type: "input",
      // this acts as the KEY in the returned object
      name: "myname",
      // the message shown to the user
      message: "Your Name : ",
    }
  ])

  // 2️⃣ What `prompt()` returns:
  // It gives back an object where:
  //    key   = value of "name"
  //    value = whatever user typed/selected
  //
  // Example: if user typed "Naruto"
  // answer = { myname: "Naruto" }

  // 3️⃣ Access the input value using the key ("myname")
  console.log(" Your Answer:", answer["myname"])
  // Same as console.log(" Your Answer:", answer.myname)
}
// simplePrompt()


// multitpleQuestions
async function multitpleQuestions() {

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What's your name?",
    },
    {
      type: "input",
      name: "age",
      message: "How old are you?",
    },
    {
      type: "list",
      name: "gender",
      message: "Select your gender:",
      choices: ["Male", "Female", "Other"],
    },
    {
      type: "input",
      name: "hobby",
      message: "What's your favorite hobby?",
    },
    {
      type: "checkbox",
      name: "skills",
      message: "Select your skills:",
      choices: ["JavaScript", "Python", "C++", "Java", "Go", "Rust"],
    },
    {
      type: "list",
      name: "os",
      message: "Which OS do you prefer?",
      choices: ["Linux", "Windows", "macOS"],
    },
    {
      type: "input",
      name: "dreamJob",
      message: "What's your dream job?",
    },
    {
      type: "list",
      name: "workStyle",
      message: "How do you prefer to work?",
      choices: ["Team", "Solo", "Hybrid"],
    },
    {
      type: "input",
      name: "inspiration",
      message: "Who inspires you the most?",
    },
    {
      type: "confirm",
      name: "likeCoding",
      message: "Do you like coding?",
    },
  ])

  console.log("\n--- Summary ---")
  console.log("Name:", answers.name)
  console.log("Age:", answers.age)
  console.log("Gender:", answers.gender)
  console.log("Hobby:", answers.hobby)
  console.log("Skills:", answers.skills.join(", ")) // ✅ will only work because skills is a checkbox array
  console.log("Preferred OS:", answers.os)
  console.log("Dream Job:", answers.dreamJob)
  console.log("Work Style:", answers.workStyle)
  console.log("Inspiration:", answers.inspiration)
  console.log("Likes Coding:", answers.likeCoding ? "Yes" : "No")


}
// multitpleQuestions()