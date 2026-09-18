const fs = require("fs");
const path = require("path");

const limesLimit = 1000;

exports.writeLog = (e, message) => {
  const currentFilePath = __filename;
  const currentDirectory = path.dirname(currentFilePath);

  const fileName = "logTCP.txt";
  const folderPath = path.join(currentDirectory, "logs");
  const filePath = path.join(folderPath, fileName);

  // Create the folder if it does not exist
  fs.mkdir(folderPath, {recursive: true}, err => {
    if (err) {
      console.error("Ошибка при создании папки:", err);
      return;
    }
    console.log("Папка успешно создана:", folderPath);

    // Add a log entry
    appendLog(filePath, message);
  });
};

function appendLog(filePath, message) {
  // Check and remove excess lines
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      // Ignore error if the file does not exist
      console.error("Error reading file:", err);
      return;
    }

    const lines = data ? data.split("\n").filter(line => line.trim() !== "") : []; // Remove empty lines

    // Remove old lines if there are more than limesLimit
    if (lines.length >= limesLimit) {
      lines.splice(0, lines.length - limesLimit - 1); // Keep only the last limesLimit lines
    }

    // Add a new line
    lines.push(message.trim());

    // Overwrite the file with updated lines
    fs.writeFile(filePath, lines.join("\n"), "utf8", err => {
      if (err) {
        console.error("Error writing to file:", err);
        return;
      }
      console.log("Line successfully written to file:", filePath);
    });
  });
}
