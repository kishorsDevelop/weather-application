
const request = require('request');

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibXJrdW1hcjE4Mzk5IiwiYSI6ImNrOG15YmkweDBobnczbW9jY2RqbjN0M2IifQ.YiX1VyZQg-V1TfYzDVyFSw&limit=1"
    request({url:url,json:true},(error,{ body })=>{
          
         if(error)
          {
             callback("Unable to connect to Server!",undefined);
          }
          else if(body.features.length === 0)
          {
             callback("Location Not Found!",undefined);
          }
          else
          {
               callback(undefined,{
                   latitude: body.features[0].center[1],
                   longitude: body.features[0].center[0],
                   location: body.features[0].place_name
               })
          }
    })
  }
module.exports = geocode;