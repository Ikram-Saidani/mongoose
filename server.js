//variables from .env
require("dotenv").config();
// Import Mongoose
const mongoose = require("mongoose");
// Import createAndSavePerson
const {
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
} = require("./utils/createAndSavePerson");
// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { dbName: "personDB" });

// Connect to db then call function
mongoose.connection.once("open", async () => {
  console.log("connected to db");

  // Create new person
  try {
    const newPerson = await createAndSavePerson({
      name: "ikram",
      age: 15,
      favoriteFoods: ["Pizza", "salad", "Pasta"],
    });
    console.log("Person created:",newPerson);
  } catch (err) {
    console.log("Error creating person:", err);
  }

  // Create people
  const arrayOfPeople = [
    {
      name: "ali",
      age: 25,
      favoriteFoods: ["Salad", "Fruit"],
    },
    {
      name: "asma",
      age: 40,
      favoriteFoods: ["Steak"],
    },
    {
      name: "Mary",
      age: 40,
      favoriteFoods: ["Steak"],
    },
    {
      name: "ahmed",
      age: 32,
      favoriteFoods: ["Burritos", "Ice Cream"],
    },
    {
      name: "omar",
      age: 52,
      favoriteFoods: ["Pasta", "hamburger"],
    },
    {
      name: "amal",
      age: 32,
      favoriteFoods: ["Burritos", "Ice Cream"],
    },
    {
      name: "ala",
      age: 18,
      favoriteFoods: ["Burritos", "hamburger"],
    },
    {
      name: "ahmed",
      age: 21,
      favoriteFoods: ["Pasta", "Ice Cream"],
    },
  ];

  try {
    const people = await createPeople(arrayOfPeople);
    console.log("People created:", people);
  } catch (err) {
    console.log("Error creating people:", err);
  } 

  // Find all people
  try {
    const peopleFound = await findPeople("ahmed");
    console.log("All person found:", peopleFound);
  } catch (err) {
    console.log("Error finding all person:", err);
  }

  // Find one person which has a certain food in the person's favorites
  try {
    const personFoundByFood = await findPersonByFood("Pizza");
    console.log("Person found by food:", personFoundByFood);
  } catch (err) {
    console.log("Error finding person:", err);
  }

  // Find person by _id
  try {
    const personFoundById = await findPersonById("66b3ec7541ba5e1aab0cc8c8");
    console.log("Person found by _id :", personFoundById);
  } catch (err) {
    console.log("Error finding person:", err);
  }

  // Update a person's favorite foods by adding "hamburger"
  try {
    const updatedPersonByFavoriteFoods = await updatePersonFavoriteFoods("66b68fb621458032a8c9764a");
    console.log("Updated Person favorite foods:", updatedPersonByFavoriteFoods);
  } catch (err) {
    console.log("Error updating person favorite foods:", err);
  }

  //Find a person by Name and set the person's age to 20
  try {
    const updatedPersonByName = await setPersonAgeByName("ahmed");
    console.log("Updated Person age:",updatedPersonByName);
  } catch (err) {
    console.log("Error updating person age:", err);
  }

  //delete a person by _id
  try {
    const deletedPersonById = await deletePersonById("66b3ffdd8850a7c55427864b");
    console.log("deleted Person by _id:", deletedPersonById);
  } catch (err) {
    console.log("Error deleting person by _id:", err);
  }

  //Delete all the people whose name is “Mary”
  try {
    const deletedByName = await deletePeopleByName("Mary");
    console.log("deleted people by name:", deletedByName);
  } catch (err) {
    console.log("Error deleting people by name:", err);
  }

  //Find people who like burritos
  try {
    const peopleWhoLikeBurritos = await findPeopleWhoLikeFood("Burritos");
    console.log("People who like burritos found:",peopleWhoLikeBurritos);
  } catch (err) {
    console.log("Error:", err);
  }

  // Close the connection
  mongoose.connection.close();
});
