const fs = require('fs');
const path = require('path');
const way = path.join(__dirname, 'task2.txt');

const process = require('node:process');
const { stdin, stdout } = process;

console.log('Hi! Please, write something: \n');

const stream = fs.createWriteStream(way, 'utf-8');
stdin.on('data', data =>{
  if (data.toString().trim() == 'exit') {
    process.exit();
  } else {
    stream.write(data, 'utf-8');
  }
});

process.on('exit', ()=> {
  console.log('Done, bye( \n');
  process.exit();
});

