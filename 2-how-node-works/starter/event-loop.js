const fs = require('fs');

//2nd the timeout calback will run
setTimeout(() => console.log(`Timer 1 finished`), 1000);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('text-file.txt', () => {
	console.log('I/O finished e');
	console.log('----------------------');

	setTimeout(() => console.log(`Timer 2 finished`), 0);
	setTimeout(() => console.log(`Timer 3 finished`), 3000);
	setImmediate(() => console.log('Immediate 2 finished'));

	process.nextTick(() => console.log('Process.nextTick'));
});

//1st the top level code will run
console.log('Hello from the top-loevel code');
