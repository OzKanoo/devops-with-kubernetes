const { v4: uuidv4 } = require('uuid');
const id = uuidv4();

console.log('Log Output App started. ID:', id);

setInterval(() => {
    console.log(new Date().toISOString() + ': ' + id);
}, 5000);
