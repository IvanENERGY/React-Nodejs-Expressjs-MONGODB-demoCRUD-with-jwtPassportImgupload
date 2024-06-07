
<h1>BACKEND</h1>
npm init <br>
npm install nodemon mongoose express http-status-codes cors mongodb dotenv <br>
npm start<br>
<h5>add .env file</h5>
<pre>
#DB_URL=mongodb+srv://ivan:y6566683@cluster0.03hgnwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DB_URL=mongodb://localhost:27017/todo_db
PORT=3000
</pre>
<h5>initalize env file in appjs</h5>
<pre>
require('dotenv').config();
</pre>
<hr>

<h1>FRONTEND</h1>
npx create-react-app . --template typescript<br>
<br>
npm start<br>
npm install react-router-dom react-hook-form yup @hookform/resolvers axios dotenv <br>
<br>
<br>
<br>


for this app, data validation only performed in frontend<br>
//for create , we check these in frontend<br>
<br>
<pre>
  const schema = yup.object().shape({
        name: yup.string().required("Task name must be entered"),
        deadline:yup.date().min(new Date()).required(),
        reps:yup.number().positive().integer().min(0).max(20).required()
    })
</pre>
//for update, we do valid check using vanilla js 

<h5>add .env file</h5>
<pre>
###########VARIABLE name must be started with REACT_APP
REACT_APP_BACKEND_URL=http://localhost:3000
#REACT_APP_BACKEND_URL=https://mern-crud-todolist-be.onrender.com
</pre>
<h5>just called env variables in the app</h5>
<pre>
axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`)
</pre>
<h1>Deployment on render</h1>
<p>Upload whole folder(backend+frontend) to gitHUb</p>
<p>Configure Altas mongodb :set useracpw, set accessip 0.0.0.0 (all),get connection string
<p>create package.json in outerfolder</p>
<pre>
{
    "name": "todo-mern",
    "version": "1.0.0",
    "description": "",
    "main": "app.js",
    "scripts": {
      "install-server": "cd backend && npm install",
      "start-server": "cd backend && node app.js",
      "install-client": "cd frontend && npm install",
      "build-client": "cd frontend && npm run build",
      "start-client": "cd frontend && npm run start"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
</pre>
<h5>Create web services in render</h5>
![](/renderback.png)
<img width="538" alt="renderback" src="https://github.com/IvanENERGY/MERN-CRUD-ToDoList/assets/90034836/1e0e8198-8a83-4f02-be93-42db9d0d6371">
<p>Copy the productionbackendurl  </p>
<h5>Create static site in render</h5>
![](/renderfront.png)
<img width="923" alt="renderfront" src="https://github.com/IvanENERGY/MERN-CRUD-ToDoList/assets/90034836/0d2dc300-4288-4046-96c0-3008d6374d4e">

<h1>Deployment Using PM2 </h1>
<pre>
npm intall pm2 -g
npm install serve -g
</pre>
<h2>For deploying backend</h2>
<ol>
<li>navigate to the backend folder</li>
<li>pm2 start app.js</li>
</ol>
<h2>For deploying frontend</h2>
<ol>
<li>navigate to the frontend folder</li>
<li>npm run build</li>
<li>pm2 serve build 3001 --spa</li>
</ol>
<h2>Useful Command</h2>

<ul>
<li>"pm2 ls" for showing all running pm2 processes</li>
<li>"pm2 save" for saving all running pm2 processes</li>
<li>"pm2 resurrect" for restore all running pm2 processes</li>
</ul>
<p>Better mark down originalSourceCodePath, Service running port for migration purpose</p>
<h1>MongoDB setup for accessing within LAN </h1>
<ol>
<li>go to C:\Program Files\MongoDB\Server\7.0\bin</li>
<li>edit mongod config file</li>
<li>bindIp: 192.168.1.17 (<-production machine u want everyone to access:can be checked using ipconfig)</li>
<li>Restart mongodb services in window services; test the connection with string mongodb://192.168.1.17:27017/ in mongoCompass </li>
<li>The path in backend (connect db)should be mongodb://192.168.1.17:27017/todo_db (todo_db is just example db name)</li>
<li>The path in frontend (connect backend)should be http://192.168.1.17:3000</li>
<li>Redeploy frontend+backend in pm2 ; => the application should be accessible by every device on the same local area network </li>
</ol>

mongod
