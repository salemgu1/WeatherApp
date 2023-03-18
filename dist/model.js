class ApiManager {
  constructor() {
    this.cities = [];
  }
  async getCitiesFromDB() {
    const response = $.get('/cities');
    console.log(response);
    this.cities.push(response)
  } 
  async getCityData(cityName) {
    const cityData = await $.get(`/city/${cityName}`);
    return cityData;
  }

  async getCities(){
   return this.cities
  }

  async saveCity(cityName) {
    let newCity = {}
    for (let city of this.getCityData()) {
        if (city.name === cityName) {
            newCity = city 
        }
    }
    await $.post('/city/', newCity)
  }

  async deleteCity(cityName){
    axios.delete(`/city/${cityName}`)
    .then(() => element.innerHTML = 'Delete successful');
  }
}



