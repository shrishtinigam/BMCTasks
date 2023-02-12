const Product = require('../models/product');
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

exports.get_all_products = (req, res, next) => {
    Product.find().exec().then(docs => {
        //console.log(docs);
        res.status(200).json(docs);    
    }).catch(err => {
        //console.log(err);
        res.status(500).json({
            error : err
        })
    })
}


exports.create_product = (req, res, next) => {

    const product = new Product ({
        _id : new mongoose.Types.ObjectId,
        name : req.body.name,
        price : req.body.price
    })
    product.save().then(result => {
        //console.log(result);
        res.status(201).json({
            message : 'Handling POST req to /products',
            createdProduct: result
        })
    }).catch(err => {
        //console.log(err);
        res.status(500).json({error : err});
    })
}

exports.get_product_by_id = (req, res, next) => {
    const id = req.params.productId
    Product.findById(id).exec().then(doc => {
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message : 'No valid entry found for provided ID'});
        }
        
    }).catch(err => {
        //console.log(err);
        res.status(500).json({error : err});
    })
}

exports.patch_product_by_id = (req, res, next) => {
    const id = req.params.productId;
    const updates = {};
    for(const key in req.body){
        updates[key] = req.body[key];
    }

    Product.findById(id).exec().then(doc => {
        if(!doc){
            res.status(404).json({message : 'No valid entry found for provided ID'});
        }
    }).catch(err => {
        //console.log(err);
        res.status(500).json({error : err});
    })

    Product.updateOne({_id : id}, { $set : updates}).exec().then(result => {
        //console.log(result);
        res.status(200).json(result)
    }).catch(err => {
        //console.log(err);
        res.status(500).json({
            error : err
        })
    })
}

exports.put_product_by_id = (req, res, next) => {
    const id = req.params.productId;
    const updates = {};
    for(const key in req.body){
        updates[key] = req.body[key];
    }
    
    Product.findById(id).exec().then(doc => {
        if(!doc){
            res.status(404).json({message : 'No valid entry found for provided ID'});
        }
    }).catch(err => {
        //console.log(err);
        res.status(500).json({error : err});
    })

    Product.updateOne({_id : id}, { $set : updates}).exec().then(result => {
        //console.log(result);
        res.status(200).json(result)
    }).catch(err => {
        //console.log(err);
        res.status(500).json({
            error : err
        })
    })
}

exports.delete_product_by_id = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id : id}).exec().then(result => {
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    })
}