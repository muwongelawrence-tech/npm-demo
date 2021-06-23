console.log("before");
// getUser(1,(user) => {
//     console.log("User",user);
// });

// asyncronous using await  of promises
  notify();
  
  console.log("After");

  async function notify(){
    const user = await getUser(4);
    console.log("User",user);
      
    }  

  function getUser(id){
    return new Promise((resolve,reject)=> {
      //Asynchronous work
      setTimeout(() => {
        console.log("reading User from the database.........");
        console.log("wait for 4 seconds.")
        resolve({id:id, gitHubUsername:"muwonge"});
    },4000);

    });
    
   }