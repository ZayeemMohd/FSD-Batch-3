const { program } = require("commander");
const fs = require("fs");

const filePath =
  "/Users/zayeemmohd/Desktop/fsd_teaching_code/Node/day 1/todo.json";

let existingTodos = [];
fs.readFile(filePath, "utf-8", (err, data) => {
  existingTodos = JSON.parse(data);
});
console.log("line 11", existingTodos);

program.name("todo cli").description("Cli for todo").version("1.0.0");

program
  .command("add")
  .description("add new todo to todo list")
  .argument("<new_todo>", "new wala todo")
  .action((new_todo) => {
    existingTodos.push(new_todo);
    let str_todo = JSON.stringify(existingTodos);
    fs.writeFile(filePath, str_todo, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("todo added successfully");
      }
    });
  });

program
  .command("delete")
  .description("delete todo from todo list")
  .argument("<todo_name>", "jo todo delete karna hai wo")
  .action((todo_name) => {
    const filteredArr = todo_list.filter((elem) => {
      return elem != todo_name;
    });
    todo_list = [...filteredArr];
    console.log("todo delted");
  });

program
  .command("print")
  .description("print todos from todo list")
  .action(() => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      console.log(JSON.parse(data));
    });
  });

program.parse();
