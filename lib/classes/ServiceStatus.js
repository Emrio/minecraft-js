var colorToNumber = (color) => {
  return color === "green" ? 1 : (color === "yellow" ? 0.5 : 0)
}

class ServiceStatus {
  constructor(statuses) {

    for (var service of statuses) {
      console.log(statuses)
      console.log(statuses[service])
      console.log(service)
      this[Object.keys(service)[0]] = colorToNumber(service[Object.keys(service)[0]])
    }

  }
}

module.exports = ServiceStatus
