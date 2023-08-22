const { log } = require("console");
const express = require("express");
const http = require("http");
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);


//connect our server with socket.io
const io = require("socket.io")(server);

//middleware
app.use(express.static("public"));  // now we can access the public folder file outside the server.


app.get("/", (req,res) => {
    // console.log("Hello ");
    res.sendFile(__dirname + "/public/index.html");
})

app.get("/hello", (req,res) => {
    // console.log("Hello");
    res.send("hello")
})

//Storing array of connected users in out server
let connectedUsers =[];


io.on("connection",(socket) => {
    connectedUsers.push(socket.id);
    console.log("User connected");
    console.log(connectedUsers);

    // if user disconnect/close tab/refresh
    socket.on("disconnect", () => {
        console.log("User disconnected");

        const newConnectedUsers = connectedUsers.filter((userSocketId) => {
            userSocketId!== socket.io;
        });

        connectedUsers = newConnectedUsers;
        console.log(connectedUsers);

    })
})

// // we are checking that client side changes is working or not
// io.on("connection",(socket) => {
//     console.log("User connected to socket.io server");
//     console.log(socket.id);
// })

server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
})