# united-tests
This is a tool that can automate and validate unit tests.

## _Why use them?_
Because this is a lightweight and powerful unit test gadget, and we will continue to maintain it in the future.

## Download
### _Download with npm_
```bash
sudo npm install united-tests -g
```
### _Download with yarn_
```bash
sudo yarn add united-tests -g
```

## Usage
```bash
unitedt [options]
```
### _Flags_
- -h, --help: __output usage information__
- -V, --version: __output the version number__
- -e, --error: __show detailed error message when got error__
- -o, --out: __open test-out flag__
- -f, --fuzzy: __Open fuzzy query (the fuzzy mode is in the form of regular expression)__
- -i, --info [filename]: __Set the out info json file (default: "tests-info.json")__
- -j, --json [filename]: __Set the entry json file (default: "tests.json")__
### Example
tests.json
```json
{
  "test-out": false,
  "tests": [
    {
      "name": "hello",
      "run": {
        "inputs": [
          []
        ],
        "outputs": [
          "Hello world!"
        ]
      }
    }
  ]
}
```
```bash
unitedt
```

### Edit tests.json
#### _Basic structure_
```json
{
  "test-out": "boolean (default: false)",
  "out-in-json": "boolean (default: false)",
  "fuzzy": "boolean (default: false)",
  "out-json-name": "string (default: \"tests.json\")",
  "read-dir": "string (default: \"tests-info.json\")",
  "tests": "array"
}
```
__Prototypes__  
- test-out _Set whether to output the result of the test module_
- out-in-json _Set whether to output the test results and summary to the json file_
- out-json-name _Set json filename_
- fuzzy _Whether to enable fuzzy query (the fuzzy mode is in the form of regular expression)_
- read-dir _Set the path to the unit test summary_
- tests _Set up each module that the unit test needs to test and its input and output samples_

#### Element of tests
```json
{
  "name": "string",
  "run": {
    "inputs": "array",
    "outputs": "array"
  }
}
```


## Issues
### Issues-1
```
internal/modules/cjs/loader.js:611
    throw err;
    ^

Error: Cannot find module 'commander'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:609:15)
    at Function.Module._load (internal/modules/cjs/loader.js:535:25)
    at Module.require (internal/modules/cjs/loader.js:663:17)
    at require (internal/modules/cjs/helpers.js:20:18)
    at Object.<anonymous> (/usr/local/lib/node_modules/united-tests/bin/main.js:2:15)
    at Module._compile (internal/modules/cjs/loader.js:734:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:745:10)
    at Module.load (internal/modules/cjs/loader.js:626:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:566:12)
    at Function.Module._load (internal/modules/cjs/loader.js:558:3)
```
This shows that the command line tool is missing the npm package commander.
Enter `sudo npm install commander -g` on the command line to solve

### Issues-2
```internal/modules/cjs/loader.js:611
       throw err;
       ^
   
   Error: Cannot find module 'chalk'
       at Function.Module._resolveFilename (internal/modules/cjs/loader.js:609:15)
       at Function.Module._load (internal/modules/cjs/loader.js:535:25)
       at Module.require (internal/modules/cjs/loader.js:663:17)
       at require (internal/modules/cjs/helpers.js:20:18)
       at Object.<anonymous> (/usr/local/lib/node_modules/united-tests/bin/main.js:3:15)
       at Module._compile (internal/modules/cjs/loader.js:734:30)
       at Object.Module._extensions..js (internal/modules/cjs/loader.js:745:10)
       at Module.load (internal/modules/cjs/loader.js:626:32)
       at tryModuleLoad (internal/modules/cjs/loader.js:566:12)
       at Function.Module._load (internal/modules/cjs/loader.js:558:3)
```
This shows that the command line tool is missing the npm package chalk.
Enter `sudo npm install chalk -g` on the command line to solve

## License
[MIT](https://github.com/qianduanXIAOHAOZI/united-tests/blob/master/LICENSE)