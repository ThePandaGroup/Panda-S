# Panda-S

This directory contains one express servers:
- AppServer.js + App.js - Encapsulated Node/Express web server w/ Mongooose Access

File Content:
- AppServer.ts : based http server 
- App.ts : express server
- DB population files are stored in the createDB folder

Make sure to have node.js server and Mongo DB, including Mongo Shell software, installed. Ensure your path variable contains the execution path of node.js and mongo binary.

To execute the server db and then the node server, do the following:

//compile all files
0. tsc

//set up authenticated user... Make sure the directory ./db has been created
// if not, it's mkdir -p ./db
1. mongod -port 3000 -dbpath ".\db"

//for mac users use the next command instead
1. mongod -port 3000 -dbpath ".\db"

//go into the mongo shell

2. mongosh -port 3000

//load database
3. load('createDB/createPandaSSample.js'), load('createDB/createAdminUser.js')

//exit this terminal or create new terminal for following:

4. node AppServer.js

//Server running on port 8080

http://localhost:8080
http://localhost:8080/app/shoes
http://localhost:8080/app/:shoeId
