const express = require('express');
const knex = require('knex');

const knexFile = require('../knexfile.js')

const db = knex(knexFile.development)

const router = express.Router();

router.get('/', (req, res)=>{
    db('cars')
    .then(cars =>{
        res.status(200).json(cars)
    })
    .catch(errors =>{
        console.log(errors)
        res.status(500).json({error: error.message})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    db("cars")
      .where({ id })
      .first()
      .then(car =>{
          if(car){
            res.status(200).json(car)
          }else{
              res.status(404).json({message: "car with specific ID does not exist"})
          } 
      })
      .catch(error =>{
          res.status(500).json({error: error.message})
      })
})

router.post('/', (req, res)=>{
    const carsData = req.body;
    db('cars').insert(carsData)
    .then(ids=>{
        db('cars').where({ id: ids[0]})
        .then(newCarEntry =>{
            res.status(201).json(newCarEntry)
        })
    })
    .catch(error =>{
        console.log("Server error in post", error)
        res.status(500).json({error: `Server error durring post ${error.message}`})

    })
})






module.exports = router