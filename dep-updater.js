const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const baseDir = path.join(__dirname, "utils/ps");
const mainPackagePath = path.join(__dirname, "package.json");

const mainPackageJson = JSON.parse(fs.readFileSync(mainPackagePath, "utf-8"));
mainPackageJson.dependencies ??= {};

const folders = fs
  .readdirSync(baseDir, {withFileTypes: true})
  .filter(d => d.isDirectory())
  .filter(d => fs.existsSync(path.join(baseDir, d.name, "dependencies.json")))
  .map(d => d.name);

const choices = [];

folders.forEach(folder => {
  const pkgPath = path.join(baseDir, folder, "dependencies.json");
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  const deps = pkgJson.dependencies ?? {};
  const depNames = Object.keys(deps);

  let allDepsInstalled = false;

  if (depNames.length > 0) {
    allDepsInstalled = depNames.every(dep => Object.prototype.hasOwnProperty.call(mainPackageJson.dependencies, dep));
  }

  choices.push({
    name: folder,
    value: folder,
    checked: allDepsInstalled,
  });
});

inquirer
  .prompt([
    {
      type: "checkbox",
      name: "selected",
      message: "Выбери наборы зависимостей:",
      choices,
    },
  ])
  .then(({selected}) => {
    choices.forEach(item => {
      item.checked = selected.includes(item.name);
    });

    choices.forEach(({name, checked}) => {
      const pkgPath = path.join(baseDir, name, "dependencies.json");
      const pkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

      const deps = pkgJson.dependencies ?? {};

      for (const [dep, version] of Object.entries(deps)) {
        if (!mainPackageJson.dependencies[dep] && checked) {
          mainPackageJson.dependencies[dep] = version;
          console.log(`➕ ${dep}@${version} (из ${name})`);
        } else if (mainPackageJson.dependencies[dep] && !checked) {
          delete mainPackageJson.dependencies[dep];
          console.log(`➖ ${dep} (из ${name})`);
        }
      }
    });

    fs.writeFileSync(mainPackagePath, JSON.stringify(mainPackageJson, null, 2));

    console.log("✅ dependencies.json обновлён");
  });
