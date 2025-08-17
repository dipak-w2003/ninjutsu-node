import { program } from "commander";
import chalk from "chalk";

program
  .name("naruto-cli")
  .description("Demo CLI")
  .version("1.0.0");

program
  .command("login <usr> <psswd>")
  .description("Login with username and password")
  .action((usr, psswd) => {
    if (usr !== "root" && psswd !== "root") {
      console.log(chalk.red("❌ Invalid user!"));
      return;
    }
    console.log(
      chalk.bgYellow.black(`
  ######################
  usr: ${usr}
  pwd: ${psswd}
  ######################
  `)
    );
  });

program.parse();
// usage : node login.js login root root


// whole process pkg 'commander' accepts global commands with flag
// where chalk for formatting/styling logs in console