window.addEventListener('load',()=>{
    let longitude;
    let latitude;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.temperature span')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitude},${longitude}`

            fetch(api)
                .then(data => {
                return data.json();
                })
                 .then( data => {
                    console.log(data)
                    const {temperature, summary}  = data.currently;

                    //Set DOM ELEMENTS From Api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    let celsius = (temperature - 32)*(5/9);

                    //change Temp to Cel/Far
                    temperatureSection.addEventListener('click',()=>{
                        if(temperatureSpan.textContent==="F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpan.textContent = "F"
                            temperatureDegree.textContent = temperature
                        }
                    })
                 })
            
        });

       
    }
});