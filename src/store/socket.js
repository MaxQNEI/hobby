import { readable } from "svelte/store";
import io from "socket.io-client";

let socket = io({ autoConnect: true });

export let Socket = readable(socket);

export let Connected = readable(false, (set) => {
    socket.on("connect", () => set(true));
    socket.on("disconnect", () => set(false));
});
