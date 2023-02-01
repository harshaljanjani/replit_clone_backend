require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //MONGODB ATLAS CLOUD HOSTED DATABASE - CONNECTION

//COLLECTION: Set of documents which have a similar structure
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: { type: Array, default: [] },
});

//MODEL INSTANTIATION:
let Person = mongoose.model("Person", personSchema);

//SCHEMA -> MODEL -> OBJECT/INSTANCE
//Challenge 1: Create and save the document of a single person
const createAndSavePerson = (done) => {
  const jsonObject = {
    name: "MrNeinNeed",
    age: 18,
    favoriteFoods: ["pizzas", "noodles"],
  };
  const person = new Person(jsonObject); //new object/instance from model
  person.save(function (err, data) {
    if (err) {
      done(err);
      return;
    } else {
      console.log(data);
      done(null, data);
    }
  });
};

//Challenge 2: Create and save documents of multiple people, stored in an array of JSON objects
let arrayOfPeople = [
  { name: "MrNeinNeed", age: 18, favoriteFoods: ["Del Tacos"] },
  { name: "MrMeowNeed", age: 5, favoriteFoods: ["Fish"] },
  { name: "MrNeighNeed", age: 10, favoriteFoods: ["Anything Lol"] },
];
let createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      done(err);
      return;
    }
    done(null, data);
  });
};

//Challenge 3: Modify the findPeopleByName function to find all the people having a given name, using Model.find() -> [Person]
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) {
      done(err);
      return;
    } else {
      done(null, data);
    }
  });
};

//Challenge 4: Modify the findOneByFood function to find just one person which has a certain food in the person's favorites, using Model.findOne() -> Person
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) {
      done(err);
      return;
    } else {
      done(null, data);
    }
  });
};

//Challenge 5: Modify the findPersonById to find the only person having a given _id, using Model.findById() -> Person
const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) {
      done(err);
      return;
    } else {
      done(null, data);
    }
  });
};

//Challenge 6: Modify the findEditThenSave function to find a person by _id (use any of the above methods) with the parameter personId as search key. Add "foodToAdd" to the list of the person's favoriteFoods (you can use Array.push()). Then - inside the find callback - save() the updated Person
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, person) {
    if (err) {
      done(err);
      return;
    } else {
      person.favoriteFoods.push(foodToAdd);
      person.save(function (err, data) {
        if (err) {
          done(err);
          return;
        } else {
          console.log(data);
          done(null, data);
        }
      });
    }
  });
};

//Challenge 7: Modify the findAndUpdate function to find a person by Name and set the person's age to 20. Use the function parameter personName as the search key
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, data) {
      if (err) {
        done(err);
        return;
      } else {
        console.log(data);
        done(null, data);
      }
    }
  );
};

//Challenge 8: Modify the removeById function to delete one person by the person's _id. You should use one of the methods findByIdAndRemove() or findOneAndRemove().
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) {
      done(err);
      return;
    } else {
      console.log(data);
      done(null, data);
    }
  });
};

//Challenge 9: Modify the removeManyPeople function to delete all the people whose name is within the variable nameToRemove, using Model.remove(). Pass it to a query document with the name field set, and a callback.
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) {
      done(err);
      return;
    } else {
      done(null, data);
    }
  });
};

//Challenge 10: Modify the queryChain function to find people who like the food specified by the variable named foodToSearch. Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec().
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort("name")
    .limit(2)
    .select(["name", "favoriteFoods"]) //Select particular fields from the resulting document
    .exec(function (err, data) {
      if (err) {
        done(err);
        return;
      } else {
        done(null, data);
      }
    });
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
