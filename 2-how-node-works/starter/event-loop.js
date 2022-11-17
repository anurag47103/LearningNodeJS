const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

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

	crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
	console.log(Date.now() - start, 'Password encrypted');
	crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
	console.log(Date.now() - start, 'Password encrypted');
	crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
	console.log(Date.now() - start, 'Password encrypted');
	crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
	console.log(Date.now() - start, 'Password encrypted');
});

//1st the top level code will run
console.log('Hello from the top-loevel code');
