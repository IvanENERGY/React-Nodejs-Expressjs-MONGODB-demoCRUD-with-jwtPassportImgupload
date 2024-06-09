//How to run this script? navigate to the folder this file belongs-> node node-win-services 
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

