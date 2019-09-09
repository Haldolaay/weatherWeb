//using window.addeventlistener to use javascript as soon as the page loads
// the equvilant of that in jquery is onLoad i think
window.addEventListener("load",()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone')
    //navigator.geolocation is an object that contain longitude and latitude
    if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // darksky api is free to use
            const proxy = `https://cors-anywhere.herokuapp.com/`// this proxy is easy to use, remember it!
            const api =`${proxy}https://api.darksky.net/forecast/1879494e658c054e3ee8c74ae2d24b58/${lat},${long}`;

                     // fetch is gonna work when the api is succesful
        fetch(api)
        // when api is successful we go to the first .then
                .then(response =>{
                    return response.json();
                })    
                // if the return from the first .then is successful then we move on to the next .then
                // it's like a domino effect
                .then(data =>{
                    // console.log(data);
                    const { temperature , summary , icon} = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //to use icons i downloaded a zipfile of the code from skycons github account
                    setIcon(icon,document.querySelector('.icon'));
                })
            })
   
    }
    else{
        h1.textContent = "yooo, dude";
    }
    function setIcon(icon,iconId){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
       return skycons.set(iconId,skycons[currentIcon]);
    }
});
