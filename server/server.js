require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const massive = require('massive');
const port = 3001;

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(
    (db) => {
        app.set('db', db);

    })

    app.get('/api/heroes', (req,resp) => {
        const db =  req.app.get('db');
        db.getHeroes().then(heroes => {
            resp.send(heroes)
        }).catch(console.log)
    })

    app.post('/api/heroes', (req,resp)=> {
        const db = req.app.get('db');
        db.createHero([req.body.name, 
                       req.body.hometown, 
                       req.body.power_rating, 
                       req.body.alter_ego])
                       
                  
                       .then((newHero) => {
            console.log(newHero);
            resp.send(newHero)
        }).catch(console.log)
    })
        
  


app.listen(port, ()=> {
    console.log(`I'm listening...on ${port}!`)
})
