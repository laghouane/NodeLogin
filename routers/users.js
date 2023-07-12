const express = require('express');
const User = require('../models/user');
const { mongoose } = require('mongoose');
const {protect}=require('../middlewares/auth.middleware')
const router = express.Router()

// GET /api/v1/users
router.get("/", protect, async(req, res) => {
    try {
       const result= await User.find( req.query )
       res.send(result)
    } catch(err){
        res.status(400).send(err)
    }
})

// POST /api/v1/users
router.post("/", protect,async(req, res) => {
    try {
        const result= await User.create(req.body)
        res.send(result)
    }catch(err){
        if (err.properties) res.status(400).send(err.properties)
        // else
        else res.status(404).send(err)
    }
})

// GET /api/v1/users/:id
router.get("/:id", protect, async(req, res) => {
    try {
        const result= await User.findById(req.params.id)
        res.send(result)
    }catch(err){
        res.status(400).send(err)
    }
})

// PUT /api/v1/users/:id
router.put("/:id",protect, async(req, res) => {
    try {
        const result = await User.findOneAndUpdate({_id : req.params.id}, req.body, {
            new: true
          })
          res.send(result)
    }catch (err){
        if (err.properties) res.status(400).send(err.properties)
        // else
        else res.status(404).send(err)
    }  
    })

// DELETE /api/v1/users/:id
router.delete("/:id",protect, async(req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id)
        res.send(result)
    }catch (err) {
        res.status(404).send(err)
    }
    })

module.exports = router;