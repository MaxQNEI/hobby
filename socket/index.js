const { Server } = require("socket.io");
const io = new Server({});
const port = 8283;

io.on("connection", (socket) => {
    function _getLogin() {
        return socket.login ? "/" + socket.login : "#" + socket.id;
    }

    console.log(`[Socket${_getLogin()}] Connected.`);

    socket.on("disconnect", (reason) => {
        console.log(`[Socket${_getLogin()}] Disconnected: ${reason}`);
    });
});

io.listen(port);
console.log(`[SOCKET] Start listening at port: ${port}`);
