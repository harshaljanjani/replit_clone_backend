require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); //MONGODB ATLAS CLOUD HOSTED DATABASE - CONNECTION

//COLLECTION: Set of documents which have a similar structure
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

//MODEL INSTANTIATION:
let Person = mongoose.model('Person', personSchema);

//SCHEMA -> MODEL -> OBJECT/INSTANCE
//Challenge 1: Create and save the document of a single person
const createAndSavePerson = (done) => {
  const jsonObject = {
    "name": "MrNeinNeed",
    "age": 18,
    "favoriteFoods": ["pizzas", "noodles"]
  }
  const person = new Person(jsonObject); //new object/instance from model
  person.save(function(err, data) {
    if (err) {
      done(err);
      return;
    }
    else {
      console.log(data);
      done(null, data);
    }
  });
};

//Challenge 2: Create and save documents of multiple people, stored in an array of JSON objects
let arrayOfPeople = [
  { name: "MrNeinNeed", age: 18, favoriteFoods: ["Del Tacos"] },
  { name: "MrMeowNeed", age: 5, favoriteFoods: ["Fish"] },
  { name: "MrNeighNeed", age: 10, favoriteFoods: ["Anything Lol"] }
];
let createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      done(err);
      return;
    }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
