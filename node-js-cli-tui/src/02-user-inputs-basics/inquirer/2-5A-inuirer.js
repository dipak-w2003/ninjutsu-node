import inquirer from "inquirer";


// 1) Task Manager simple
const tasksList = []
async function taskManager() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "what you want to do ? ",
      choices: ["Add Task", "View Tasks", "Exit"]
    }
  ])


  if (action === "Add Task") {
    const { task } = await inquirer.prompt([
      {
        type: "input",
        name: "task",
        message: "enter task : "
      }
    ])
    if (!task || task.length === 0) {
      return taskManager()
    } else {
      tasksList.push(task);
      return taskManager()
    }


  }
  if (action === "View Tasks") {
    tasksList.map((tl, _) => {
      console.log(`${_ + 1}) ${tl}`);
    })
    return taskManager()
  }
  if (action === "Exit") { }



}
// taskManager()


// 2) Register User with  validation
const regUser = []
async function registerUser() {
  const { email } = await inquirer.prompt([{
    name: "email",
    message: "create a email : ",
    type: "input",
    validate: (val) => {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      return gmailRegex.test(val) || "❌ Please enter a valid Gmail address";
    },
  }])
  const { password } = await inquirer.prompt([{
    type: "password",
    name: "password",
    message: "Enter password:",
    mask: "*",
    validate: (val) => val.length >= 6 || "❌ Password must be at least 6 characters long",
  }])

  console.log("✅ Login Successful!");
  console.log("📧 Gmail:", email);
  console.log("🔒 Password accepted:", password);
  regUser.push({ email: email, password: password })
  console.log(regUser);

  return registerUser()

}
// registerUser()