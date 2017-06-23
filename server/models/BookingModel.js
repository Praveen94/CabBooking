var mongoose=require('mongoose');
var BookingSchema=new mongoose.Schema({
BookingStatus:String,
Distance:String,
CabType:String,
Fare:Number,
PickupDate:Date,
BookingType:String,
DestinationLocation:String,
PickupLocation:String,
BookingID:String
});
module.exports=mongoose.model('Booking',BookingSchema);
