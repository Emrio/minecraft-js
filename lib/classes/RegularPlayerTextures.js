const Base64 = require('js-base64').Base64

/** @class
 * @desc Represents a minecraft player's skin and cape
 */
class RegularPlayerTextures {
  constructor(data) {
    var texture_data = JSON.parse(Base64.decode(data))

    this.uploaded_time = texture_data.timestamp
    //this.belongs_to = owner
    this.skin_url = texture_data.textures.SKIN ? texture_data.textures.SKIN.url : null
    this.cape_url = texture_data.textures.CAPE ? texture_data.textures.CAPE.url : null
    this.slim = (texture_data.textures.SKIN && texture_data.textures.SKIN.metadata && texture_data.textures.SKIN.metadata.model) ? true : false
  }
}

module.exports = RegularPlayerTextures
