const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/persons")
 

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = async () => {
  const person = new Person({
    name: 'Yahia',
    age: 20,
    favoriteFoods: ['Pizza', 'Tacos']
  });

  try {
    const data = await person.save();
    console.log("Person saved:", data);
  } catch (err) {
    console.error("Error:", err);
  }
};

createAndSavePerson();

const createManyPeople = async (arrayOfPeople) => {
  try {
    const people = await Person.create(arrayOfPeople);
    console.log("People created:", people);
  } catch (err) {
    console.error("Error:", err);
  }
};

createManyPeople([{ name: 'Vini', age: 22, favoriteFoods: ['Burger'] }, { name: 'Mbappe', age: 26, favoriteFoods: ['Salad'] }]);

const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name });
    console.log("People found by name:", people);
  } catch (err) {
    console.error("Error:", err);
  }
};

findPeopleByName('Vini');

const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log("Person found by food:", person);
  } catch (err) {
    console.error("Error:", err);
  }
};

findOneByFood('Dobara');

const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log("Person found by ID:", person);
  } catch (err) {
    console.error("Error:", err);
  }
};

findPersonById('6728883f9b2ad00aaa00d46b');

const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push("hamburger");
    const updatedPerson = await person.save();
    console.log("Updated person:", updatedPerson);
  } catch (err) {
    console.error("Error:", err);
  }
};

findEditThenSave('6728883f9b2ad00aaa00d469');

const findAndUpdate = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log("Updated:", updatedPerson);
  } catch (err) {
    console.error("Error:", err);
  }
};

findAndUpdate('Mbappe');

const removeById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndRemove(personId);
    console.log("Removed person:", removedPerson);
  } catch (err) {
    console.error("Error:", err);
  }
};

removeById('6728e0e6fe99b80852cceb05');

const removeManyPeople = async (name) => {
  try {
    const result = await Person.deleteMany({ name });
    console.log("People removed:", result);
  } catch (err) {
    console.error("Error:", err);
  }
};

// removeManyPeople('');

const queryChain = async () => {
  return await Person.find({ favoriteFoods: 'burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec();
};

queryChain();
