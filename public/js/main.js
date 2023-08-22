// const socket = io("localhost:3000");  // local environment port will be 3000 so check the next line 
const socket = io("/");

socket.on("connect", () => {
    console.log("successfully connected to socket.io server");
    //webSocket server (wss)
    console.log(socket.id);
})