
const path = require('path');
const cities = require('./cities');
const mongoose = require('mongoose');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
   useNewUrlParser: true,
   // useCreateIndex: true,
   useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
   // delete all campground
   await Campground.deleteMany({});

   for(let i = 0; i < 300; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random()*20)+10
      const camp = new Campground({
         author: '624e20a6ecde517f19e9b717',
         location: `${cities[random1000].city}, ${cities[random1000].state}`,
         title: `${sample(descriptors)} ${sample(places)}`,
         description: 'sooooo beautiful',
         price,
         geometry: {
            type: "Point",
            coordinates: [
               cities[random1000].longitude,
               cities[random1000].latitude
             ]
        },
         images: [
            {
                url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
                filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
            },
            {
                url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
                filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
            }
        ]
      })
      await camp.save();
   } 
}

seedDB().then(() => {
   mongoose.connection.close();
});