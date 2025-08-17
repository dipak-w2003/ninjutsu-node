// ES6 : import
// cjs : require("chalk")


import chalk from "chalk";

console.log(`${chalk["redBright"]("What Ever")}`)
// Font Formatting
console.log(chalk["redBright"]("Font Color Red"))
console.log(chalk["bgRedBright"]("Font Bg Red"))
console.log(chalk.bgWhite(chalk.black("bg white & text black")))

console.log(chalk.underline("Underlined text"))
console.log(chalk.italic("Italic Text"))
console.log(chalk.bgRgb(120, 30, 40)("RGB Color"))
console.log(chalk.hex("D708F5")("HEX TEXT COLOR"))


console.log(chalk.bgBlue.black("Blue"))

// 256 color example (number between 0–255)
console.log(chalk.ansi256(82)("Hello, green!"));
console.log(chalk.ansi256(196)("This is bright red!"));
console.log(chalk.bgAnsi256(21)("Blue background with default text"));

// use console.log() as module
const log = console.log
log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);



// source CHATGPT : Quick Palette Preview
for (let i = 0; i < 256; i++) {
  process.stdout.write(chalk.bgAnsi256(i)(String(i).padEnd(4, " ")));
  if ((i + 1) % 16 === 0) console.log();
}



// So this much is efficient for now
// For More NPM Link  : https://www.npmjs.com/package/chalk &   Repo :  github.com/chalk/chalk
