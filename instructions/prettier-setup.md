## Install Prettier locally
- npm install --save-dev --save-exact prettier


## create an empty config file to let editors and other tools know you are using Prettier
- echo {}> .prettierrc.json


## Create a .prettierignore file to let the Prettier CLI and editors know which files to not format
- Base your .prettierignore on .gitignore and .eslintignore (if you have one)
- If your project isn’t ready to format, say, HTML files yet, add \*.html


## Install “Prettier - Code formatter” Extension


## Adjust setting.json to use Prettier for only Javascript
{
  "[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}


## Adjust setting.json to disable or enable auto format
}
"[javascript]": {
"editor.formatOnSave": false
}
}


## Install eslint-config-prettier
- npm install --save-dev eslint-config-prettier


## Add "prettier" to the "extends" array in your .eslintrc.\* file.
## Make sure to put it last, so it gets the chance to override other configs.
}
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}


## Adjust .prettierrc.json to add rules
{
  "singleQuote": true
}
