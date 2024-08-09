const mongoose = require('mongoose')

//Person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  favoriteFoods: {
    type: [String],
    required: true,
    default: []
  }
})

// Create a model
const Person = mongoose.model('Person', personSchema);


module.exports = Person
