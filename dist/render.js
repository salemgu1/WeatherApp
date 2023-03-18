class Renderer {
    constructor() {
      this.data = []
      this.source = $("#cities-template").html()
      this.template = Handlebars.compile(this.source)
    }
  
    renderCities(cities) {
        console.log("renderCities");
        $("#cities").empty()
        let newHtml = this.template({cities})
        $("#cities").append(newHtml)
    }
  }
