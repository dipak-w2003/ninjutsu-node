
// ======== Fundamentals =====
// 1. variable Declarations & Types of data types , number, string, boolean , obj, array etc
// const, let,var & difference

const fullName = "Tanjiro Kamado"
let pocketMoney = 900;
var globalStatus = false;

// 1B

const fruits = ["Apple", "Banana"]
const users = {
  username: "xyz",
  email: "pqr@gmail.com",
  get password() { }
}


// 2. Functions 
// simple, expression, arrow, anonymous func, call back

function simpleFunDemo() { }
const filterAge = function() { }
const arrowFunc = () => { }




// 3. Async , Promises, fetch
// async function checkData() {
//   try {
//     const req = await fetch("link")
//     const data = req.data.data.json()
//     if (data && data.length > 0) return [...data]
//   } catch (error) {
//     console.log(error)
//   }
// }


// setTimeout(() => {})



  // 4 Process Args
console.log(process.argv); // CLI args
// output : [
//   '/usr/bin/node',
//   '/home/filePath/*.js',
//   'Dipak'
// ]

process.stdin.on("data", (data) => console.log(`You typed: ${data}`));



