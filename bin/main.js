#!/usr/bin/env node
let program = require('commander');
const chalk = require('chalk');
const fs = require("fs");
const path = require("path");

program
    .version('1.0.4')
    .option("-e, --error", "show detailed error message")
    .option("-o, --out", "open test-out flag")
    .option("-f, --fuzzy", "open fuzzy query (the fuzzy mode is in the form of regular expression)")
    .option("-p, --put", "open put-json flag(This flag can output some info in a json file)")
    .option("-i, --info [filename]", "Set the out info json file", "tests-info.json")
    .option("-j, --json [filename]", "Set the entry json file", "tests.json")
    .description('This is a tool that can automate and validate unit tests.');
program.parse(process.argv);

function main() {
    let testEntry = program.json;
    console.log(chalk.bold("untied-tests command line tool"));
    console.log(chalk.cyan("[INFO] Reading '" + testEntry + "'..."));
    let testsJSON;
    try {
        testsJSON = fs.readFileSync(path.join(process.cwd(), testEntry)).toString();
    } catch (e) {
        console.log(chalk.red.bold("[ERROR] Read '" + testEntry + "' failed."));
        if (program.error) {
            console.log("Detailed error message: \n" + chalk.red(JSON.stringify(e, null, 2)));
        } else {
            console.log(chalk.red("Add flag -e or --error to show detailed error message."));
        }
        console.log("exit.");
        return;
    }
    console.log(chalk.green("[FINISH] Read '" + testEntry + "' success."));
    console.log(chalk.cyan("[INFO] Parsing '" + testEntry + "'..."));
    try {
        testsJSON = JSON.parse(testsJSON);
    } catch (e) {
        console.log(chalk.red.bold("[ERROR] Parse tests.json failed."));
        if (program.error) {
            console.log("Detailed error message: \n" + chalk.red(JSON.stringify(e, null, 2)));
        } else {
            console.log(chalk.red("Add flag -e or --error to show detailed error message."));
        }
        console.log("exit.");
        return;
    }
    console.log(chalk.green("[FINISH] Parse '" + testEntry + "' success."));
    let {
        "read-dir": readDir = "tests",
        "test-out": testOut = program.out,
        "out-in-json": outJSON = program.put,
        "out-json-name": outJSONName = program.info,
        fuzzy = program.fuzzy,
        tests
    } = testsJSON;
    let infoJSON = {
        "main-score": 0,
        "tests": []
    };
    let mainScore = 0;
    for (let i of tests) {
        let name = i["name"];
        let inputs = i["run"]["inputs"];
        let outputs = i["run"]["outputs"];
        if (!inputs || !outputs) {
            console.log(chalk.red.bold("[ERROR] Inputs or outputs is undefined! Start united tests must use them."));
            return;
        }
        let point = 100 / inputs.length;
        let score = 0;
        let failed = [];
        let success = [];
        let test;
        // console.log("./" + readDir + "/" + name);
        console.log(chalk.cyan("[INFO] Running test module '" + name + "' in directory '" + readDir + "'..."));
        let modulePath = path.join(process.cwd(), readDir, name);
        try {
            test = require(modulePath);
        } catch (e) {
            console.log(chalk.red.bold("[ERROR] Import test module '" + name + "' in directory '" + readDir + "' failed."));
            console.log("Module path: " + modulePath);
            if (program.error) {
                console.log("Detailed error message: \n" + chalk.red(JSON.stringify(e, null, 2)));
            } else {
                console.log(chalk.red("Add flag -e or --error to show detailed error message."));
            }
            console.log("exit.");
            return;
        }
        for (let j in inputs) {
            let out = test(...inputs);
            if (testOut) console.log(out);
            if (fuzzy) {
                outputs[j] = new RegExp(outputs[j]);
                if (out.search(outputs[j]) > -1) {
                    score += point;
                    success.push(j);
                } else {
                    failed.push(j);
                }
            } else {
                if (out == outputs[j]) {
                    score += point;
                    success.push(j);
                } else {
                    failed.push(j);
                }
            }
        }
        console.log(chalk.yellow("[INFO] Test '" + name + "' got score: " + score + ""));
        if (score == 100) {
            console.log(chalk.green("[FINISH] Test '" + name + "' finished all!"));
        } else {
            for (let j in success) {
                console.log(chalk.green("[FINISH] Test '" + name + "' passed test point " + j));
            }
            for (let j in failed) {
                console.log(chalk.yellow("[FINISH] Test '" + name + "' failed test point " + j));
            }
        }
        mainScore += score;
        if (outJSON) {
            infoJSON.tests.push({
                "name": name,
                "score": score,
                "one-test-point": point,
                "module-path": modulePath,
                "failed": failed,
                "success": success,
            });
        }
    }
    if (outJSON) {
        infoJSON["main-score"] = mainScore;
        fs.writeFileSync(path.join(process.cwd(), outJSONName), JSON.stringify(infoJSON, null, 2));
        console.log("Look info in '" + outJSONName + "'.");
    }
    console.log(chalk.green.bold.bgBlack("[FINISH]"));
}

main();