require('dotenv').config();

let mongoose = require('mongoose');

const mySecret = process.env['MONGO_URI'];

console.log(mySecret)

mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema=mongoose.Schema({
  name:String,
  age:Number,
  favoriteFoods:[String]
})

let Person=mongoose.model('Person',personSchema);

const createAndSavePerson = (done) => {
  let person=new Person({name:"Raj",age:21,favoriteFoods:["Pizza","Burger"]});
  person.save(function(err,data){
    if(err) return console.error(err);
    done(null,data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(err,data) {
    if(err) return console.error(err);
    done(null,data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},function(err,data){
    if(err) return console.error(err);
    done(null,data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},function(err,data){
    if(err) return console.error(err);
    done(null,data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId,function(err,data){
    if(err) return console.error(err);
    done(null,data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,function(err,data){
    if(err) return console.error(err);
    let arr=data.favoriteFoods;
    arr.push(foodToAdd);
    data.favouriteFoods=arr;
    data.save(function(err,data){
      if(err) return console.error(err);
      done(null,data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},function(err,data){
    if(err) return console.error(err);
    done(null,data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err,data){
    if(err) return console.error(err);
    done(null,data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},function(err,data){
    if(err) return console.error(err);
    done(null,data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let query=Person.find({favoriteFoods:foodToSearch});
  query.sort({name:1});
  query.limit(2);
  query.select({age:0});
  query.exec(function(err,data){
    if(err) return console.error(err);
    done(null,data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

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
