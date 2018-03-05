'use strict';

const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose');
let Favorite = require('../models/favoris.js');
/* GET users listing. */

router.post('/save', (req, res)=>{

    const favoriteName = req.body.name
    const spot = req.body.id

    Favorite.find({},(err, res)=>{
        res.forEach((list)=>{
            if(list.name === favoriteName){
                Favorite.update({name: favoriteName},{$addtoset:{spot: spot}})
            } else {
				let newFavorite = new Favorite()
				newFavorite.name = favoriteName,
				newFavorite.spot = [spot]
				newFavorite.save((err)=>{
					if (err) throw err;
				})
			}
				
		})
    })
})

router.delete('/deleteSpot', (req, res)=>{

	const favoriteName = req.body.name
	const spot = req.body.id

	Favorite.update({name: favoriteName},{$pull:{spot}})

	Favorite.findOne({name: favoriteName},(err, result)=>{
		if(result.spot.length === 0){
			let message = ''
			Favorite.findOneAndRemove({name: favoriteName}, (err)=>{
				if (!err) {
					message = 'notification!'
				}
				else {
					message = 'error'
				}
			});
		}
	})
})

router.delete('/deleteFavorite', (req, res)=>{

	const favoriteName = req.body.name
	
	Favorite.findOneAndRemove({name: favoriteName}, (err)=>{
		if (!err) {
			message = 'notification!'
		}
		else {
			message = 'error'
		}
	});
})

router.get('/getFavorite', (req, res)=>{

    /*var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mylist");
        dbo.collection("favorite").find().toArray(function(err, result) {
            if (err) throw err;
            res.json(result)
            db.close();
        });
    });*/

    
    mongoose.connect('mongodb://localhost:27017/mylist',(err)=>{
      if (err) throw err;
    })
	Favorite.find({},(err,result)=>{
        console.log(result)
	});
	res.send('test')
})

module.exports = router;