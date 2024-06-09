
<h1>
Version history</h1>
<p>0b1e1d6: changed frontend authentication from using "setCoookies" to "passing into Context directly"</p>
<p>b421689 is the  version include CRUD + createAc/login/authentication/logout (Using PassportJS,JsonWebToken)</p>
<p>d36c236 is the  version include only CRUD (barebone)</p>
<h1>BACKEND</h1>
npm init <br>
npm install nodemon mongoose express http-status-codes cors mongodb dotenv <br>
//authentication part: npm install  express-session passport@0.5.2 passport-local-mongoose jsonwebtoken <br>
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
<p>/*The whole User Model,User Controller and authentication part in appjs can be omitted if there is no login/auth component in the full-stack app */ </p>

<hr>

<h1>FRONTEND</h1>
npx create-react-app . --template typescript<br>
<br>
npm start<br>
npm install react-router-dom react-hook-form yup @hookform/resolvers axios dotenv <br>
<del>//authentication part:npm install js-cookie </del>changed to just passing into context directly<br>
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

<h1>Deployment inside LAN [work for both wired/wireless network] Method 1: Using PM2  </h1>
<pre>
npm intall pm2 -g
npm install serve -g
</pre>
<h2>For deploying backend</h2>
<ol>
<li>navigate to the backend folder</li>
<li>pm2 start app.js --name merntodolistapi3000</li>
</ol>
<h2>For deploying frontend</h2>
<ol>
<li>navigate to the frontend folder</li>
<li>npm run build</li>
<li>pm2 serve build 3001 --spa --name merntodolistreact3001</li>
</ol>
<h2>Useful Command</h2>

<ul>
<li>"pm2 ls" for showing all running pm2 processes</li>
<li>"pm2 delete [idx] for delete""pm2 stop [idx] for stopping"</li>
<li>"pm2 save" for saving all running pm2 processes</li>
<li>"pm2 resurrect" for restore all running pm2 processes</li>
</ul>
<p>Better mark down originalSourceCodePath, Service running port for migration purpose</p>
<p>The downside of using PM2 for deployment is :</p>
<ul><li> &#128553; User need to call pm2 resurrect everytime the server machine restart </li></ul>
<h1>Deployment inside LAN  Method 2: Using IIS and Window Services</h1>
<h2>Compared to PM2, This kind of deployment makes both frontend + backend automatically restart when system restart </h2>
<h2>For deploying backend to Window Services</h2>
<pre>npm install node-windows</pre>
<ol>
<li>Add script node-win-services.js to the backend folder</li>
<pre>
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'mernToDoApi',
  description: 'This is service for merntodoApi ',
  script: 'C:\\Users\\user\\Documents\\MERNToDoList\\backend\\app.js' //obtained by copying the path of app.js
});

/**********install guide below  ***********/
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
/**********  ***********/

/**********Uninstall guide below  ***********/

// svc.on('uninstall',function(){
//     console.log('Uninstall complete.');
//     console.log('The service exists: ',svc.exists);
//   });
  
//   // Uninstall the service.
//   svc.uninstall();
/**********  ***********/
</pre>
<li>Run "node node-win-services" to run to Api on window services</li>
<li>Test the api using 192.168.1.6(Your physicalIP):3000(port of the API u host) from another local device</li>
</ol>
<h2>For deploying frontend to IIS</h2>
<h3>Setup</h3>
<ol>
<li>navigate to frontend folder => npm run build</li>
<li>Choose Add website in IIS</li>
<li>Type the site name, set the Physical Path to the build folder (eg. C:\Users\user\Documents\MERNToDoList\frontend\build) </li>
<li>Choose a port for binding (eg 3001) </li>
<li>Click OK to create website</li>
</ol>
<h3>Configure Authentication</h3>
<ol>
<li>Go to the website pannel, rightclick authentication icon ->edit permission</li>
<li>choose security tab-> edit </li>
<li>Add user </li>
<li>Type Everyone, press check Names </li>
<li>Set the permission</li>
![iisUserConfig.png] 
</ol>
<h3>Configure Firewall</h3>
<ol>
<li>Go to Windows Defender Firewall</li>
<li>Go to Advanced settings</li>
<li>Go to Advanced Inbound rules->New rule</li>
<li>Choose port ->Next</li>
<li>Type the specific local port you want other devices to have access (eg 3001)</li>
<li>Choose Allow the connection ; Apply the rules for domain,private and public</li>
<li>Set a Name for the rule and click finish</li>
</ol>
<p>After configuring user permissions and firewall accessibility, the frontend app hosted on iis should be accessible by all local devices </p>
<p>We can test it with 192.168.1.6(Your physicalIP):3001(port of the frontend u host) from another local device</p>
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


 