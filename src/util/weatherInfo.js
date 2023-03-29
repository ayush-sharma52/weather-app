const request=require('request');
const weatherInfo=(lat,long,callback)=>{
  
    const url='http://api.weatherstack.com/current?access_key=2769cdc233d84cea85d57d41a3484cda&query='+lat+',-'+long+'&units=m';
    request({url:url,json:true}, function (error, response, body) {
      if(error){
          callback('unable to connect to weather service',undefined);
        }
        else{
          if(body.error)
          callback('unable to find location',undefined);
      
          else
          callback(undefined,{
            description:body.current.weather_descriptions[0],
            temp:body.current.temperature,
            feelslike:body.current.feelslike,
            humidity:body.current.humidity,
          })
        }
      });
      
    }
    module.exports=weatherInfo;
    // const url='http://api.weatherstack.com/current?access_key=2c40b1c11a9b4a677c69c4d457b4c419&query=40.7128,-74.0060&units=m';
// request({url:url,json:true}, function (error, response, body) {
// //   console.log('error:', error); // Print the error if one occurred
// //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   // console.log('body:', body); // Print the HTML for the Google homepage.
//   // const parsedBody=JSON.parse(body);
//   // console.log(parsedBody.current);
//   if(error){
//     console.log('unable to connect to weather service');
//   }
//   else{
//     if(body.error)
//     console.log('unable to find location');

//     else
//   console.log(body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" out.");
//   }
// });
