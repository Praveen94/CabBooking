var express = require('express');
var router = express.Router();
var People = require('../models/PeopleModel');

router.post('/AddPeople', function(req, res) {
    newPeople = new People();
    newPeople.Name = req.body.Name;
    newPeople.City = req.body.City;
    newPeople.Email = req.body.Email;
    newPeople.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                success: true
            });
            console.log('Data Saved !');
        }
    });
});

router.get('/GetPeople', function(req, res) {
    People.find({}, function(err, data) {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});


router.delete('/DeletePeople/:id', function(req, res) {
    People.remove({
        '_id': req.params.id
    }, function(err) {
        if (err) {
            throw err;
        } else {
            res.json({
                success: true
            });
            console.log('Deleted');
        }
    });
});



module.exports = router;
