const { program } = require("commander");
const fs = require("fs");

const filePath =
  "/Users/zayeemmohd/Desktop/fsd_teaching_code/Node/day 1/todo.json";

let existingTodos = [];

const data = fs.readFileSync(filePath, "utf-8");
existingTodos = JSON.parse(data);

program.name("todo cli").description("Cli for todo").version("1.0.0");

program
  .command("add")
  .description("add new todo to todo list")
  .argument("<new_todo>", "new wala todo")
  .action((new_todo) => {
    existingTodos.push(new_todo);

    fs.writeFileSync(filePath, JSON.stringify(existingTodos));
  });

program
  .command("delete")
  .description("delete todo from todo list")
  .argument("<todo_name>", "jo todo delete karna hai wo")
  .action((todo_name) => {

    // delete -> [1, 2, 3] -> 2 delete -> [1,3]

    existingTodos = existingTodos.filter((elem) => {
      return elem != todo_name;
    });
    console.log('todo deleted: ', todo_name)

    fs.writeFileSync(filePath, JSON.stringify(existingTodos));
  });

program
  .command("print")
  .description("print todos from todo list")
  .action(() => {

    console.log(existingTodos);
  });

program.parse();
