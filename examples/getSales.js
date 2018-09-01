const mcjs = require('..')

mcjs.misc.stats.sold()
  .then(statistics => {
    console.log("A total of " + statistics.total + " copies of the game have been sold!")
    console.log("In the last 24 hours, " + statistics.last24h + " copies have been sold!")
    console.log("Currently, an average of " + statistics.velocity + " copies are sold every second!")
  })
  .catch(console.error)
