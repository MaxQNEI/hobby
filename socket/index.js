const { uuid } = require("uuidv4");

const { Server } = require("socket.io");
const io = new Server({});
const port = 8283;

const info = {
    connections: 0,
    connectsTime: {},
    codes: {},
};

io.on("connection", (socket) => {
    function _getLogin() {
        return socket.login ? "/" + socket.login : "#" + socket.id;
    }

    console.log(`[Socket${_getLogin()}] Connected.`, socket.handshake.auth.token);

    let token = socket.handshake.auth.token || uuid();
    let code = "",
        symbolWait;

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

    socket.on("symbol", (symbol) => {
        console.log(`[Socket${_getLogin()}] Symbol: ${symbol}`);

        symbolWait && clearTimeout(symbolWait);

        code = (code + symbol.toString()).substr(0, 6);
        if (code.length < 6) {
            symbolWait = setTimeout(() => {
                code = "";
                socket.emit("code", code);
            }, 2000);
        } else {
            symbolWait = setTimeout(() => {
                info.codes[code] = (info.codes[code] || 0) + 1;
                io.emit("info", info);
                socket.emit("code", code, true);

                code = "";
                socket.emit("code", code);
            }, 500);
        }

        socket.emit("code", code);
    });
});

io.listen(port);
console.log(`[SOCKET] Start listening at port: ${port}`);
