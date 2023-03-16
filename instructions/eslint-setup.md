## Install ESLint
- npm install eslint --save-dev


## Install and configure ESLint using this command
- npm init @eslint/config


## Run ESLint on any file or directory like this
- npx eslint yourfile.js


## Installing the ESLint Extension


## Formatting on Save
- Command palette to open Preferences: Open Workspace Settings (JSON).


## Adjust settings.json to format on save
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"]
}


## Adjust .eslintrc.json to customize rules
}
  "rules": {
    "no-console": "off",
    "quotes": [
        "error",
        "double"
    ]
}
