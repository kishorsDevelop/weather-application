const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=53b5ca3f132404d9797bcf67fadf402a&units=metric";
    
    request({url,json:true},(error,{ body }) => {
           if(error){
               callback("Unable to Connect to Server!",undefined);
           }
           else if(body.coord.length === 0){
               callback("Location not Found",undefined);
           }
           else{
               callback(undefined, body.weather[0].description+ ' and Temperature is '+body.main.temp+' celsius')
           }
    })
}

module.exports = forecast;
