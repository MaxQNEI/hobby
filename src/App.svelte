<script>
    import { Socket, Connected } from "./store/socket";

    let infoConnections;
    let infoConnects;

    $Socket.on("info", (info) => {
        infoConnections = info.connections;
        infoConnects = Object.keys(info.connectsTime).length;
    });
</script>

<div class="wrap">
    <div>
        <h1><a href="/">MAXQNEI.COM</a></h1>
        <p class="connection" class:connecting={!$Connected}>{$Connected ? "Connected." : "Connecting..."}</p>

        {#if infoConnections}
            <div class="info">
                <p>Connections: {infoConnections}</p>
                <p>Connects: {infoConnects}</p>
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

    .connection {
        color: yellowgreen;
    }
    .connection.connecting {
        color: #999999;
        animation: ConnectingAnimation 2s linear infinite;
    }

    .info {
        margin-top: 32px;
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

    .links {
        position: fixed;
        left: 0;
        bottom: 16px;
        right: 0;

        width: min-content;
        margin: auto;
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

        transition: all ease-in-out 250ms;
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
