const request=require('request');
const geocode=(address,callback)=>{
    const geocodeURL='http://www.mapquestapi.com/geocoding/v1/address?key=Y8FHWUk89WVXDrO9htBDNYILxkyzs5bp&location='+encodeURIComponent(address);
    request({url:geocodeURL,json:true},(error,response,body)=>{
      if(error){
            callback('unable to connect to Geocoding app',undefined);
          }
          else{
            if(response.body.results[0].locations[0]===undefined)   
            callback('unable to find location,try another search',undefined);
            else{
          const latitude = response.body.results[0].locations[0].latLng.lat
          const longitude = response.body.results[0].locations[0].latLng.lng
          console.log(latitude,longitude);
          callback(undefined,{latitude,longitude});
          }}
    })
    
  }
  module.exports=geocode;
  
// Geocoding
// Address -> Lat/Long -> Weather

// const geocodeURL='http://www.mapquestapi.com/geocoding/v1/address?key=Y8FHWUk89WVXDrO9htBDNYILxkyzs5bp&location=new delhi,India';

// request({ url: geocodeURL, json: true }, (error, response,body) => {
//   if(error){
//     console.log('unable to connect to Geocoding app');
//   }
//   else{
//     if(response.body.results[0].locations[0]===undefined)   
//     console.log('unable to find locarion,try another search');
//     else{
//   const latitude = response.body.results[0].locations[0].latLng.lat
//   const longitude = response.body.results[0].locations[0].latLng.lng
//   console.log(latitude, longitude)
//   }
// }
// })