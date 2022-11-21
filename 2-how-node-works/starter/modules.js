// console.log(arguments);
// console.log(require('module').wrapper);

//module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(3, 4));

//exports
// const calc2 = require('./test-module-2');
const { add, multiply } = require('./test-module-2'); //should be exact same same
console.log(multiply(2, 8));

//caching (test-moudle-3 was loaded only once thats why the code inside it is executed only once)
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
