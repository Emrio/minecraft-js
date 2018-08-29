module.exports = class SalesOverview {
  constructor(sales_type, data) {
    this.total = data.total
    this.last24h = data.last24h
    this.sales_velocity = data.saleVelocityPerSeconds
    this.type = sales_type

  }

}
