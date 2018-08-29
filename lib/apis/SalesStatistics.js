const reqs = require('./../requests')
const SalesOverview = require('./../classes/SalesOverview')
const MCAPIError = require('./../MCAPIError')


/**
 * @function get_sales_stats_by_name - Get the sales for a given type of sales
 *
 * @param  {String} sales_type_api The sales type name for the Mojang API
 * @param  {String} sales_name     The name to output as
 */
function get_sales_stats_by_name(sales_type_api, sales_name) {
  return new Promise((resolve, reject) => {
    reqs.POST("https://api.mojang.com/orders/statistics", { "metricKeys": [ sales_type_api ] })
      .then(body => {
        var sold = new SalesOverview(sales_name, JSON.parse(body))
        resolve(sold)
      })
      .catch((err) => {
        if(err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(all statistics fetcher) You have reached the API request limit"))
        else reject(err)
      })
    })
}

module.exports = class MCAPI_MISC {

  /**
   * @static @method all - Get alls metrics
   */
  static all() {
    return new Promise((resolve, reject) => {
      var sales = {}
      this.sold()
        .then(sold_items_stats => {
          sales.sold_items = sold_items_stats
          this.prepaid_cards()
            .then(prepaid_cards_stats => {
              sales.prepaid_cards = prepaid_cards_stats
              resolve(sales)
            })
            .catch(reject)
        })
        .catch(reject)
    })
  }


  /**
   * @static @method sold - Stats of the sold games
   */
  static sold() {
    return new Promise((resolve, reject) => {
      get_sales_stats_by_name("item_sold_minecraft", "sold_items")
        .then(resolve)
        .catch(reject)
    })
  }


  /**
   * @static @method prepaid_cards - Stats of the prepaid cards sales
   */
  static prepaid_cards() {
    return new Promise((resolve, reject) => {
      get_sales_stats_by_name("prepaid_card_redeemed_minecraft", "prepaid_cards")
        .then(resolve)
        .catch(reject)
    })
  }

}
