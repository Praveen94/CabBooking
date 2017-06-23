var express=require('express');
var router=express.Router();
var Booking=require('../models/BookingModel');

router.post('/AddBookingLater',function(req,res){
var booking=new Booking();
booking.BookingStatus='Booked',
booking.Distance=req.body.Distance,
booking.CabType=req.body.CabType,
booking.Fare=req.body.Fare,
booking.PickupDate=req.body.PickupDate,
booking.BookingType='HOLD',
booking.DestinationLocation=req.body.DestinationLocation,
booking.PickupLocation=req.body.PickupLocation,
booking.BookingID=req.body.BookingID



booking.save().then(function(data){
res.status(200).send(data);
},function(err){

res.status(400).send(err);


});
});


module.exports=router;
