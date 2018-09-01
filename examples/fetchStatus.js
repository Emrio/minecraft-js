const mcjs = require('..')

mcjs.misc.fetch_status()
  .then(services => {
    for (const service in services) {
      switch (services[service]) {
        case 1:
          console.log("Status of " + service + ": SERVICE UP")
          break
        case 0.5:
          console.log("Status of " + service + ": PARTIAL OUTAGES")
          break
        default:
          console.log("Status of " + service + ": SERVICE DOWN")
      }
    }
  })
  .catch(console.error)
