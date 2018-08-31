var colorToNumber = (color) => {
  return color === "green" ? 1 : (color === "yellow" ? 0.5 : 0)
}

/**  @class
 * @desc Represents the status of the Minecraft services
 */
class ServiceStatus {
  constructor(statuses) {

    for (var service of statuses) {
      this[Object.keys(service)[0]] = colorToNumber(service[Object.keys(service)[0]])
    }

  }
}

module.exports = ServiceStatus
