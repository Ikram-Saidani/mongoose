// Import Person model
const Person = require("../models/personModel");

// Create new person
function createAndSavePerson(data) {
  const newPerson = new Person(data);
  return newPerson.save();
}

//Create people
function createPeople(arrayOfPeople) {
  return Person.insertMany(arrayOfPeople);
}

//Find all people
function findPeople(name) {
  return Person.find({ name });
}

//Find one person which has a certain food in the person's favorites
function findPersonByFood(food) {
  return Person.findOne({ favoriteFoods: food });
}

// Find person by _id
function findPersonById(personId) {
  return Person.findById(personId);
}

// Update a person's favorite foods by adding "hamburger"
async function updatePersonFavoriteFoods(personId) {
  const person = await findPersonById(personId);
  person.favoriteFoods.push("hamburger");
  const updatedPerson = await person.save();
  return updatedPerson;
}

//Find a person by Name and set the person's age to 20
async function setPersonAgeByName(personName) {
  const person = await Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true }
  );
  return person;
}

//delete a person by _id
async function deletePersonById(personId) {
  const deletedPerson = await Person.findByIdAndDelete(personId);
  return deletedPerson;
}

//Delete all the people whose name is “Mary”
const deletePeopleByName = async (name) => {
  const deletedByName = await Person.deleteMany({ name: name });
  return deletedByName;
};

// Find people who like a certain food, sort by name, limit results, and hide age
const findPeopleWhoLikeFood = async (food) => {
  const people = await Person.find({ favoriteFoods: food })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec();

  return people;
};

module.exports = {
  createAndSavePerson,
  createPeople,
  findPeople,
  findPersonByFood,
  findPersonById,
  updatePersonFavoriteFoods,
  setPersonAgeByName,
  deletePersonById,
  deletePeopleByName,
  findPeopleWhoLikeFood,
};
