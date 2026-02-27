math.js

module.exports.sub = (a, b) => a - b;
module.exports.sum = (a, b) => a + b;
module.exports.mul = (a, b) => a * b;
module.exports.div = (a, b) => a / b;


// module.exports = {
//     sub, sum, mul, div
// }



fsExample.js
// count the letters in a file

// const fs = require("fs");
// const path = require("path");

// const filePath = path.join(__dirname, "data.txt");

// fs.readFile(filePath , 'utf-8', (err, data)=>{
//     console.log("The number of letters in this file: ", data.length)
// })

// fs.readFile(filePath , 'utf-8', (err, data)=>{
//     console.log("Number of words", data.split(" ").length)
// })

// fs.readFile(filePath , 'utf-8', (err, data)=>{
//     console.log("Number of lines", data.split("\n").length)
// })

// fs.writeFile(filePath, "hello world", ()=>{
//     console.log("function exectuted, check the file")
// });

// let todo = ['go to gym', 'go to college', 'go to market'];

// function addTodo(new_todo) {
//   todo.push(new_todo);
// }

// function printTodo() {
//   console.log(todo);
// }

// function deleteTodo(del_todo) {
//   filtered_todo = todo.filter((elem) => {
//     return elem != del_todo;
//   });
//   todo = [...filtered_todo]
// }

// addTodo('go to school')
// printTodo();
// deleteTodo('go to college')
// printTodo();

const fs = require('fs')

const filePath = process.argv[2]

fs.readFile(filePath, 'utf-8', (err, data)=>{
    console.log("No of lines: ", data.split('\n').length);
})

fs.readFile(filePath, 'utf-8', (err, data)=>{
    console.log("No of characters: ", data.length);
})