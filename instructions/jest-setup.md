## Install Jest using your favorite package manager:
npm install --save-dev jest

## Let's get started by writing a test for a hypothetical function that adds two numbers. First, create a sum.js file:
function sum(a, b) {
  return a + b;
}
module.exports = sum;

## Then, create a file named sum.test.js. This will contain our actual test:
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

## Add the following section to your package.json:
{
  "scripts": {
    "test": "jest"
  }
}

## Run npm test and Jest will print this message:
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)

## Install the @babel/preset-env package
npm i -D @babel/preset-env

## Create a .babelrc file in the project’s root with the following lines of code:
{ "presets": ["@babel/preset-env"] }






