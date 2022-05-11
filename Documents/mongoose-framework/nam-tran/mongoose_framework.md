##  Quick start

- Install Mongodb and nodejs
- install Mongoose 
  `npm install mongoose --save`

- Connect mongoose
  ```
  const mongoose = require('mongoose');

  main().catch(err => console.log(err));

  async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
  }
  ```


### Schema

- With Mongoose, everything is derived from a Schema.
  vd: define a Schema
  ```
  const kittySchema = new mongoose.Schema({
  name: String
  });
  ```


### Model

- We've got a schema with one property, name, which will be a String. 
- The next step is compiling our schema into a Model.
  `const Kitten = mongoose.model('Kitten', kittySchema);` 

- A model is a class with which we construct documents. In this case, each document will be a kitten with properties and behaviors as declared in our schema. 
  ```
  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'
  ```
- add "speak" functionality to our documents
  *NOTE:* methods must be added to the schema before compiling it with mongoose.model()

  ```
  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model('Kitten', kittySchema);
  ```

- Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:
  ```
  const fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"
  ```

### Save to the database

- we still haven't saved anything to MongoDB. Each document can be saved to the database by calling its save method. The first argument to the callback will be an error if any occurred.
  ```
  await fluffy.save();
  fluffy.speak();
  ```

### Find Document

- Display all the kittens (We can access all of the kitten documents through our Kitten model.)
  ```
  const kittens = await Kitten.find();
  console.log(kittens);
  ```
- search for all documents with a name property that begins with "fluff" and returns the result as an array of kittens to the callback
  `await Kitten.find({ name: /^fluff/ });`
