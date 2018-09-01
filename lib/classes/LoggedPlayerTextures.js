  reset_skin() {
  }

  upload_skin(url) {

  }

  use_url_skin(url) {
    return new Promise((resolve, reject) => {
      reqs.POST("https://api.mojang.com/user/profile/" + this.player.uuid + "/skin", { payload: "model=\"" + (this.slim ? "slim" : "") + "\"&url=" + url, headers: this._auth_header, is_json: false })
        .then(() => {
          console.log("Done")
          resolve()
        })
        .catch(err => { throw err })
    })
  }

  toggle_slim() {

  }
