import chalk from "chalk"

// readline : A Package which helps to take input in NodeJS terminal
// for more : npm i readline | 

import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const simpleExample = () => {
  rl.question("Enter your name: ", (name) => {
    console.log(`Hello, ${name}!`);
    rl.close();
  });
}
// simpleExample

const simpleLogin = () => {
  console.log(chalk.red("Authentication"));
  rl.question("usr : ", (usr) => {
    rl.question("psswd : ", (psswd) => {
      if (usr !== "root" && psswd !== "root") {
        console.log(chalk.red("Authentication Failed"));
        rl.close()
      } else {
        console.log(chalk.green("Authentication Passed"));
        rl.close()
      }
    })
  })
}

// simpleLogin()


const simpleTaskManager = () => {
  const tasksList = []
  function addTask() {
    rl.question(" [ Add SomeThing 😮‍💨 : .... ] :  ", (task) => {
      if (task) { tasksList.push(task) }
      tasksList.forEach((tl, i) => { console.log(chalk.black.bgWhite.bold.italic(`${i + 1}) ${tl}`)) })
      // ask for further operation 
      rl.question("Continue Add y/n ?", (ans) => {
        // empty str for 'enter' purpose
        if (["y", "yes", "ok", ""].includes(ans.toLowerCase())) {
          addTask()
        } else {
          console.log(chalk.red.bold.italic("Program Quit !  "));
          rl.close()
        }
      })
    })
  }
  addTask()
}
// simpleTaskManager()
// Same as we can make calculator as well : simple arithematic 

