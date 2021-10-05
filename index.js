const express = require('express');
const app = express();
const cluster = require('cluster');
const sleep = require('util').promisify(setTimeout)

let a=0
const numCPUs = require('os').cpus().length; //number of CPUS



if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();    //creating child process
    }
  
    //on exit of cluster
    cluster.on('exit', (worker, code, signal) => {
        if (signal) {
          console.log(`worker was killed by signal: ${signal}`);
        } else if (code !== 0) {
          console.log(`worker exited with error code: ${code}`);
        } else {
          console.log('worker success!');
        }
    });
  } else {
    app.get('/',async (req, res) => {
        a+=1
        await sleep(1000)
        setTimeout(() =>{console.log(a);},200)
           console.log(a);
            res.send('Hello World!');
        });
        
        app.listen(3000, () => {
            console.log('Example app listening on port 3000!');
        });
  }

 