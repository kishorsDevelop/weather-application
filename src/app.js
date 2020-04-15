const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


//Handling Paths
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
//set up static directory to serve
const publicDirectoryPath = path.join(__dirname,'../public');
//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

//set up handlebars and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


app.get('',(req,res) => {
    res.render('index', {
        title:'Weather App',
        name:'Kishor Kumar'
    });
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Kishor Kumar'
    });
})

app.get('/help',(req,res) => {
   res.render('help',{
      title:'Help', 
      name:'Kishor Kumar'
   })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
         res.send({
             error: "Please provide an address"
         })
    }
    

    geocode(req.query.address,(error, {latitude, longitude, location } = {}) => {
            if(error){
                return res.send({ error })
            }

           forecast(latitude,longitude,(error,foreCastData = {}) => {
                    if(error){
                        return res.send({ error })
                    }
                  res.send({
                      forecast: foreCastData,
                      location: location,
                      address: req.query.address
                  })

           }) 
    })



  
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        name:'Kishor',
        title:'404',
        message:'Help Article Not Found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
       name:'Kishor',
       title:'404',
       message:'Page Not Found'
    })
})




app.listen(port, () => {
    console.log("Server is Running !");
})