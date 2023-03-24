const express= require('express');
const path=require('path');
const hbs=require('hbs');
const geocode=require('./util/geocoder');
const weatherInfo=require('./util/weatherInfo')
// console.log(__dirname);;
// console.log(__filename);
// console.log(path.join(__dirname,'../'));

//now it's a server
const app=express();
const port = process.env.PORT || 3000 //to access the port that the deploying app provides us

//define paths for expres config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials')


//here we are serving public directory to the server where index.html will be returned if no routes provided(static directory)
app.use(express.static(publicDirectoryPath));

//handlebars are dynamic templates
//setup handle bar engines and views location(if required)
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
//below code is of no use now
// app.get('',(req,res)=>{
//     res.send('hello ');
//     })

// app.get('/about',(req,res)=>{
//     res.send('about');
//     })

// app.get('/help',(req,res)=>{
//     res.send({
//         name:'ayush',
//         description:'aspirant'
//     });
//     })
app.get('',(req,res)=>{
res.render('index',{   //it will find out the index file in the views folder created in public directory on its own
    title:'weather app',
    name:'Ayush Sharma'
})
});

//we can also change the name of this views folder but in that case we need to give that path to viewspath as above shown
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'some helpful message',
        title:'help',
        name:'Ayush Sharma'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'Ayush Sharma',
    })
    }); 

app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error:'You must provide the location',
        })
    }
    geocode(req.query.location,(error,{latitude,longitude}={})=>{
        console.log(error,latitude,longitude);
        if(error){
           return  res.send({
                error,
            });
        }
        
            weatherInfo(latitude,longitude,(error,info)=>{
                if(error){
                  return  res.send({
                        error,
                    });
                }
                    res.send(info);
            })        

    })


})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send('you must provide a search term');
//     }
//     res.send(req.query);
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ayush Sharma',
        errorMsg:'Help article not found'
    });
    });
    

app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'Ayush Sharma',
    errorMsg:'Page not found'
});
});

//server is up on local host:3000
app.listen(port,()=>{
    console.log('server is up on port '+port);
})
