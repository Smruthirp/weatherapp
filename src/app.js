const express = require(`express`)
const path = require(`path`)
const hbs = require(`hbs`)
const geocode = require(`./utils/geocode`)
const forecast = require(`./utils/forecast`)
const { createSecretKey } = require("crypto")
const app =express()
app.set(`view engine`,`hbs`) //hbs means handlebars
app.use(express.static(path.join(__dirname,`../public`)))
hbs.registerPartials(path.join(__dirname, `/partials`))
const port = process.env.PORT || 3000
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,`../public`))
// app.get(``,(req,res) => {
//     res.send(`<h1>Hello express!</h1>`)
// })
// app.get(`/help`, (req,res) => {
//     res.send(`Help Page`)
// })
// app.get(`/about`, (req,res) => {
//     res.send([{
//         name: `Smruthi`,
//         Age: 21
//     },{
//         email :`smruthirp@gmail.com`
//     }])
// })

app.get(``, (req,res) => {
    res.render(`index`,{
        title: `Weather App`,
        name: `Smruthi`
    })
})

app.get(`/about`,(req,res) => {
    res.render(`about`,{
        title: `About Page`,
        name: `Smruthi`
    })
})

app.get(`/help`,(req,res) => {
    res.render(`help`,{
        name: `Smruthi`
    })
})
app.get(`/weather`, (req,res) => {
    if (!req.query.address){
        return res.send({
            error: `You must provide a address!`
        })
    }
    geocode(req.query.address, (error,data) => {
        if (error) {
            return res.send(error)
        }
        forecast(data,(error2,fdata) =>{
        if(error2===undefined) {
        return res.send({
            location: data.location,
            Temperature: fdata.temperature,
            last: fdata.observation_time,
            name: `Smruthi`
        })
        } else {
        return res.send(`Error: ${error2}`)
        }
    })
    })
})

app.get(`/products`,(req,res) => {
    if (!req.query.search){
        return res.send({
            error: `You must provide a search item!`
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get(`/help/*`,(req,res) => {
    res.send(`Help article not found`)
})

app.get(`*`,(req,res) => { //* means everything other than the pages provuded in get above
    res.render(`error`)
})

app.listen(port, () => {
    console.log("Server is up on port 3000")
})

