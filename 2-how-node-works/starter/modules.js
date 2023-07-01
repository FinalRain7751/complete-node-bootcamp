// console.log(arguments);
// console.log(require('module').wrapper);

const C = require('./test-module-1');

const calc1 = new C();
console.log(calc1.add(2, 3));

// exports
const { add, multiply, divide } = require('./test-module-2');
console.log(add(3, 4), multiply(3, 4));

//caching

require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
