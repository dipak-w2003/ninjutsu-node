

// == Steps to pass/get arguments ==
// 1) Passing Arguments 
// node thisFileName.js DipakDai
// console.log(process.argv); // CLI args
// node thisFileName.js args  :: passes ["node-location","file-full-location/*.js","Your Argument"]
/*
Output : 
[
  '/usr/bin/node',
  '/home/full-path/*.js',
  'DipakDai'
]
*/

console.log("Node Location : ",process.argv[0]);
console.log("File Location : ",process.argv[1]);
console.log("Your Argument : ",process.argv[2]);



// 
process.stdin.on("data", (data) => console.log(`You typed: ${data}`));
