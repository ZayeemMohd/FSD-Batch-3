const { program } = require("commander");
const fs = require("fs");

program
  .name("count")
  .description("CLI tool for counter the number of lines")
  .version("1.0.0");

program
  .command("count_lines")
  .description("Count the number of lines in your file")
  .argument("<file_path>", "Path of file")
  .action((file_path) => {
    fs.readFile(file_path, "utf-8", (err, data) => {
      console.log("Number of lines in this file: ", data.split("\n").length);
    });
  });

program
  .command("count_letters")
  .description("Count the letters of lines in your file")
  .argument("<file_path>", "Path of file")
  .action((file_path) => {
    fs.readFile(file_path, "utf-8", (err, data) => {
      try {
        // ['Hello', 'world', 'i', 'am']
        let letterCounter = 0;
        data.split(" ").forEach((word) => {
          letterCounter += word.length;
        });
        console.log("Number of letters in this file: ", letterCounter);
      } catch (err) {
        console.log("some error in file: ", err);
      }
    });
  });

program
  .command("count_words")
  .description("Count the number of words in your file")
  .argument("<file_path>", "Path of file")
  .action((file_path) => {
    fs.readFile(file_path, "utf-8", (pagal, xyz) => {
      console.log("The number of words in your file: ", xyz.split(' ').length);
    });
  });

program.parse();
