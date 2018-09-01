const mcjs = require('..')

mcjs.servers.get("play.hypixel.net")
  .then(server => {
    console.log("IP : " + server.host)
    console.log("Online players : " + server.players.online + "/" + server.players.max)
    console.log("Minecraft Version : " + server.version)
  })
  .catch(console.error)
