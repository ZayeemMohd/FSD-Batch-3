const express = require("express");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "todo.json");
// const filePath = '/Users/zayeemmohd/Desktop/fsd_teaching_code/Node/day2/todo-server/todo.json'

const app = express();

app.use(express.json());

// read
app.get("/api/todo", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");

  const todoArr = JSON.parse(data);

  res.json(todoArr);
});



app.get('/signin/:username/:password', (req, res)=>{
    const {username, password} = req.params;
    console.log("email recieved: ", username);
    console.log("password recieved: ", password)
    res.send("signin successful 🟢");
})

// signin/abcd/123


// create
app.post("/api/todo", (req, res) => {

  //   todos.push(req.body.task);

  const data1 = fs.readFileSync(filePath, "utf-8");
  const CopytodoArr = JSON.parse(data1);
  CopytodoArr.push(req.body.task);
  fs.writeFileSync(filePath, JSON.stringify(CopytodoArr));

  res.send("todo added successfully 👍");
});


app.use((req, res)=>{
  res.send("route not defined")
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
