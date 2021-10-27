<script>
    import { onMount } from "svelte";
    import { Socket, Connected } from "./store/socket";

    const symbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    let infoConnections;
    let infoConnects;
    let infoCodes = 0;
    let infoCodeAttempts = 0;
    let code = "";
    let color = "";

    $Socket.on("info", (info) => {
        infoConnections = info.connections;
        infoConnects = Object.keys(info.connectsTime).length;
        infoCodes = Object.keys(info.codes).length;
        infoCodeAttempts = infoCodes
            ? Object.values(info.codes).reduce((pv, cv) => {
                  return pv + cv;
              })
            : 0;
    });

    $Socket.on("code", (_code, set) => {
        code = _code || "";
        set && (color = "#" + code);
    });

    onMount(() => {
        window.addEventListener("keypress", (event) => {
            symbols.includes(event.key) && send(event.key);
        });
    });

    function send(symbol) {
        $Socket.emit("symbol", symbol);
    }
</script>

<div class="wrap">
    <div
        class="content"
        style="border-color: {color || 'transparent'}; box-shadow: {color ? `0 0 25px 0 ${color}` : 'transparent'};"
    >
        <div>
            <h1><a href="/">MAXQNEI.COM</a></h1>
            <p class="connection" class:connecting={!$Connected}>{$Connected ? "Connected." : "Connecting..."}</p>
        </div>

        {#if $Connected}
            <div class="info">
                {#if infoConnections !== undefined}
                    <p>Connections: {infoConnections}</p>
                {/if}

                {#if infoConnects !== undefined}
                    <p>Connects: {infoConnects}</p>
                {/if}

                {#if infoCodes !== undefined}
                    <p>Codes: {infoCodes} ({infoCodeAttempts})</p>
                {/if}
            </div>

            <div>
                <div class="code">
                    {code.padEnd(6, "_").toUpperCase()}
                </div>

                <div class="symbols">
                    {#each symbols as symbol}
                        <button on:click={() => send(symbol)} disabled={code.length >= 6}>
                            {symbol.toString().toUpperCase()}
                        </button>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>

<div class="links">
    <a href="https://www.patreon.com/maxqnei" target="patreon">
        <img src="/assets/img/patreon.png" alt="Patreon" />
        <span>Patreon</span>
    </a>

    <a href="https://github.com/MaxQNEI/hobby" target="github">
        <img src="/assets/img/github.png" alt="GitHub" />
        <span>GitHub</span>
    </a>

    <a href="https://t.me/maxqnei" target="telegram">
        <img src="/assets/img/telegram.png" alt="Telegram" />
        <span>Telegram</span>
    </a>

    <a href="https://www.facebook.com/maxqnei" target="facebook">
        <img src="/assets/img/facebook.png" alt="Facebook" />
        <span>Facebook</span>
    </a>
</div>

<style>
    .wrap {
        width: 100vw;
        height: 100vh;

        display: grid;
        justify-content: center;
        align-items: center;
    }

    .wrap > * {
        display: grid;
        grid-gap: 8px;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .content {
        display: grid;
        grid-gap: 32px;
        padding: 32px 32px;
        border: 0 solid transparent;
        border-width: 2px 0 2px 0;
        background-color: rgba(255, 255, 255, 0.15);
        box-shadow: transparent;
    }

    .connection {
        color: yellowgreen;
    }
    .connection.connecting {
        color: #999999;
        animation: ConnectingAnimation 2s linear infinite;
    }

    @keyframes ConnectingAnimation {
        0% {
            opacity: 0.75;
        }
        10% {
            opacity: 0.95;
        }
        20% {
            opacity: 0.25;
        }
        30% {
            opacity: 0.95;
        }
        40% {
            opacity: 0.25;
        }
        50% {
            opacity: 0.95;
        }
        60% {
            opacity: 0.1;
        }
        70% {
            opacity: 0.7;
        }
        80% {
            opacity: 0.2;
        }
        90% {
            opacity: 0.4;
        }
        100% {
            opacity: 0.95;
        }
    }

    .code {
        padding: 8px;
        letter-spacing: 8px;
        font-size: 20px;
        font-family: monospace;
    }

    .symbols {
        display: grid;
        grid-gap: 1px;
        grid-template-columns: repeat(4, min-content);
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .symbols button {
        width: 36px;
        height: 48px;
        margin: 0;
        border: none;
        border-radius: 0;
        background-color: #1e90ff;
        color: #d2d2d2;
        font-size: 16px;
        cursor: pointer;

        transition: all 250ms ease-in-out;
    }
    .symbols button:hover {
        background-color: #3eb0ff;
        color: #ffffff;
    }
    .symbols button:disabled {
        background-color: #a0a0a0;
        color: #cccccc;
        cursor: not-allowed;
    }

    .links {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;

        width: min-content;
        margin: auto;
        padding: 16px 0;
        display: grid;
        grid-auto-flow: column;
    }

    .links a {
        display: grid;
        grid-auto-flow: column;
        grid-gap: 8px;
        justify-content: center;
        align-items: center;

        padding: 8px;
        border-radius: 24px;
        font-size: 0;
        text-decoration: none;
        color: white;

        transition: all 250ms ease-in-out;
    }

    .links a:hover {
        background-color: rgba(255, 255, 255, 0.15);
        font-size: 14px;
    }

    .links img {
        display: block;
        width: 24px;
        pointer-events: none;
    }

    @media (max-width: 480px) {
        .links {
            bottom: 0;

            width: 100%;
            grid-auto-flow: row;
            grid-template-columns: 1fr 1fr;
        }

        .links a {
            grid-template-columns: 32px 1fr;
            padding: 16px;
            border-radius: 0;
            background-color: rgba(255, 255, 255, 0.15);
            font-size: 16px;
            text-align: center;
        }

        .links a:hover {
            background-color: rgba(255, 255, 255, 0.25);
            font-size: 16px;
        }
    }
</style>
