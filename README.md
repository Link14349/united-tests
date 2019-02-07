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
- -p, --put: __open put-json flag(This flag can output some info in a json file)__
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
  "out-json-name": "string (default: \"tests.json\")",
  "read-dir": "string (default: \"tests-info.json\")",
  "tests": "array"
}
```
__Prototypes__  
- test-out _Set whether to output the result of the test module_
- out-in-json _Set whether to output the test results and summary to the json file_
- out-in-json _Set json filename_
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

## License
[MIT](https://github.com/qianduanXIAOHAOZI/united-tests/blob/master/LICENSE)