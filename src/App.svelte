<script>
    import { Connected } from "./store/socket";
</script>

<div class="wrap">
    <div>
        <h1><a href="/">MAXQNEI.COM</a></h1>
        <p class="connection">Connection: {$Connected ? "Yes" : "No"}</p>
    </div>
</div>

<style>
    .wrap {
        width: 100vw;
        height: 100vh;

        display: flex;
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
        color: #aaaaaa;
    }
</style>
