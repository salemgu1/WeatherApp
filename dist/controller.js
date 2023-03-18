const apiManager = new ApiManager()
const renderer = new Renderer();


async function loadingPage() {
    console.log("loadingPage");
    try {
        await apiManager.getCities();
        renderer.renderCities(apiManager.getCities());
    } catch (error) {
        console.error(error);
    }
}
async function handleSearch() {
    const cityName = $("#input").val()
    $("#input").val("")
    const res = apiManager.getCityData(cityName)
    // await apiManager.getCitiesFromDB()
    res.then((r)=>{
        renderer.data.push(r)
    })
    console.log(renderer.data);
    renderer.renderCities(renderer.data);
    // renderer.renderCities(res)
}

$('.cities').on('click', "#add-btn", async function () {
    const cityName = 
    console.log(cityName)
    await apiManager.saveCity(cityName)
    renderer.renderData(apiManager.getCities())
})
$('.cities').on('click', "#remove-btn", async function () {
    const cityName = 
    await apiManager.deleteCity(cityName) 
    await loadingPage()

})
loadingPage()
