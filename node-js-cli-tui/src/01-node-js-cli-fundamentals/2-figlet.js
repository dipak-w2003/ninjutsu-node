import figlet from 'figlet'

// SO figlet basically like a ASCII Drawing/ouput of your textual data

// basic
console.log(
  figlet.textSync("Figlet", {
    font: "Arrowear",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  })
);


// Simple Usage
const func = (str) => figlet(str, (err, data) => {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);

})
// func('Dipak')
/*
  ____  _             _    
 |  _ \(_)_ __   __ _| | __
 | | | | | '_ \ / _` | |/ /
 | |_| | | |_) | (_| |   < 
 |____/|_| .__/ \__,_|_|\_\
         |_|    
 * */


try {
  console.log(
    await figlet.text("Texts", {
      font: "3D Diagonal",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
} catch (err) {
  console.log("Something went wrong...");
  console.dir(err);
}



