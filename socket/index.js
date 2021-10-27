const { uuid } = require("uuidv4");

const { Server } = require("socket.io");
const io = new Server({});
const port = 8283;

const info = {
    connections: 0,
    connectsTime: {},
};

io.on("connection", (socket) => {
    function _getLogin() {
        return socket.login ? "/" + socket.login : "#" + socket.id;
    }

    console.log(`[Socket${_getLogin()}] Connected.`, socket.handshake.auth.token);

    let token = socket.handshake.auth.token || uuid();

    info.connections++;
    info.connectsTime[token] = {
        start: Date.now(),
    };

    io.emit("info", info);
    socket.emit("token", token);

    socket.on("disconnect", (reason) => {
        console.log(`[Socket${_getLogin()}] Disconnected: ${reason}`);

        info.connections--;
        info.connectsTime[token] = {
            ...info.connectsTime[token],
            end: Date.now(),
        };

        io.emit("info", info);
    });
});

io.listen(port);
console.log(`[SOCKET] Start listening at port: ${port}`);
