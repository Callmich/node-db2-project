const express = require('express');
const knex = require('knex');

const knexFile = require('../knexfile.js')

const db = knex(knexFile.development)

const router = express.Router();

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