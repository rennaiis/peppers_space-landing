const fs = require("fs");
const path = require("path");

const currentDir = __dirname;

const settings = {
  empty: "assets/settings.json",
};

Object.entries(settings).forEach(([key, compileTo]) => {
  const searchDir = path.join(currentDir, key);
  const jsonContent = {};

  const jsFiles = findJSFiles(searchDir);
  jsFiles.forEach(jsPath => {
    const data = require(path.join(currentDir, jsPath));
    const name = path.basename(jsPath, ".js");
    jsonContent[name] = data;

    const outputPath = path.resolve(__dirname, "../../public", compileTo);
    const outputDir = path.dirname(outputPath);

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, {recursive: true});

    fs.writeFileSync(outputPath, JSON.stringify(jsonContent));
  });
});

function findJSFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findJSFiles(filePath, fileList);
    } else if (path.extname(file) === ".js") {
      const relativePath = path.relative(currentDir, filePath);
      fileList.push(relativePath);
    }
  });

  return fileList;
}
