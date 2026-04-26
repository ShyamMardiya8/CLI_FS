#! /usr/bin/env node
import path from "path";
import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to our file system CLI program\n");

const options = ["read", "write", "update", "delete"];

options.forEach((opt, i) => console.log(`${i}. ${opt}`));

rl.question("\nEnter option number: ", (answer) => {
  const selectedIndex = parseInt(answer);

  const files = fs
    .readdirSync(process.cwd(), { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((f) => f.name);

  console.log("\nAvailable files:\n");
  files.forEach((file, i) => console.log(`${i + 1}. ${file}`));

  rl.question("\nSelect file number: ", (fileAnswer) => {
    const fileIndex = parseInt(fileAnswer);
    const fileName = files[fileIndex - 1];

    if (!fileName) {
      console.log("Invalid file selection");
      rl.close();
      return;
    }

    const filePath = path.join(process.cwd(), fileName);

    if (options[selectedIndex] === "write") {
      rl.question("Enter your data: ", (data) => {
        const writeStream = fs.createWriteStream(filePath);
        writeStream.write(data, () => {
          console.log("Written successfully");
          writeStream.end();
          rl.close();
        });
      });
    }
    if (options[selectedIndex] === "read") {
      const readStream = fs.createReadStream(filePath);
      readStream.on("data", (data, error) => {
        if (error) throw error;
        console.log("file content: ", data.toString());
        readStream.close();
        rl.close();
      });
    }
    if (options[selectedIndex] === "update") {
      rl.question("Enter your data: ", (data) => {
        fs.appendFile(filePath, data.toString(), (err) => {
          if (err) throw err;
          console.log("data updated successfully");
        });
        rl.close();
      });
    }
    if (options[selectedIndex] === "delete") {
      fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log("file deleted successfully");
      });
      rl.close();
    } else {
      console.log("Option not implemented yet");
      rl.close();
    }
  });
});
