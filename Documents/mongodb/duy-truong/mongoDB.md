## Mongo> db

## Insert Documents

**Insert a Single Document:**

> db.users.insertOne();

Ex:
```mongo
 db.users.insertOne({
    "username": "duytruong09",
    "password": "123456",
    "date_of_birth": "18/09/2000",
    "address": "Da nang",
    "phone": +84123456789,
    "roles": ["admin", "user"]
  })
```

**Insert Multiple Document:**

> db.users.insertMany();

*Ex:*
```mongo
db.users.insertMany([
{
    "username": "user01",
    "password": "123456",
    "date_of_birth": "18/09/2000",
    "address": "Da nang",
    "phone": +84123456789,
    "roles": ["user"]
  },
 {
    "username": "user02",
    "password": "123456",
    "date_of_birth": "18/09/2000",
    "address": "Da nang",
    "phone": +84123456789,
    "roles": ["user"]
  }]
 )
```
 

## Query Documents

**Select All Documents in a users:**

> db.getusers("users").find({})

**Specify Equality Condition:**


{ <field1>: <value1>, <field2>: <value2>... }


*Ex:*

> db.getusers("users").find({username: "user01"})

**Specify Conditions Using Query Operators**


{ <field1>: { <operator1>: <value1> }, ... }


**Specify AND Conditions**

*Ex:* The following example retrieves all documents in the example users where the status equals "A" and qty is less than 30:

> db.users.find({roles: "user", age: {$lt: 22} })

*The operation corresponds to the following SQL statement:*
SELECT * FROM users WHERE roles = "user" AND age < 22

**Specify OR Conditions**

*Ex:* The following example retrieves all documents in the users where the roles equals "user" or age is less than 22:

> db.users.find( { $or: [ { roles: "user" }, { age: { $lt: 22 } } ] } )

*The operation corresponds to the following SQL statement:*
SELECT * FROM users WHERE roles = "user" OR age < 22

**Specify AND as well as OR Conditions**

*ex:* In the following example, the compound query document selects all documents in the users where the status equals "A" and either qty is less than 30 or item starts with the character p:
{ status: "A", $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ] }

*The operation corresponds to the following SQL statement:*
SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")

## Query on Embedded/Nested Documents

**Match an Embedded/Nested Document**

{ <field>: <value> }

*Ex:* the following query selects all documents where the field bmi equals the document { h: 172, w: 53}:

> db.users.find( { bmi: { h: 172, w: 53} } )

**Query on Nested Field**

Specify Equality Match on a Nested Field:
  *Ex:* selects all documents where the field uom nested in the size field equals 172:
  > db.users.find( { "bmi.h": 172} )

Specify Match using Query Operator:
  { <field1>: { <operator1>: <value1> }, ... }

  *Ex:* selects all documents where field h embedded in the size field less than 170
 > db.users.find( { "bmi.h": { $lt: 170 }} )

Specify AND Condition

  *Ex:* selects all documents where the nested field h is less than 170and the Class field equals "A"
  > db.users.find( { "bmi.h": { $lt: 170 }, "Class": "A"} )


## Query an Array

**Match an Array**

*Ex:*  queries for all documents where the field tags value is an array with exactly two elements, "red" and "blank", in the specified order:
> db.testArray.find( { tags: ["red", "blank"] } )

*if, instead, you wish to find an array that contains both the elements "red" and "blank", without regard to order or other elements in the array, use the $all operator:*
> db.testArray.find( { tags: { $all: ["red", "blank"] } } )

**Query an Array for an Element**

*To query if the array field contains at least one element with the specified value, use the filter 
{ <field>: <value> } where <value> is the element value.*

*Ex:* sellect all documents where tags is an array that contains the string "blank" as one of its elements:
> db.testArray.find( { tags: "blank" } )

*To specify conditions on the elements in the array field, use query operators in the query filter document:*
{ <array field>: { <operator1>: <value1>, ... } }
*Ex:* select all documents where the array dim_cm contains at least one element whose value is greater than 20.
> db.testArray.find( { dim_cm: { $gt: 20 } } )

### Specify Multiple Conditions for Array Elements

**Query an Array with Compound Filter Conditions on the Array Elements:**
The following example queries for documents where the dim_cm array contains elements that in some combination satisfy the query conditions 
*Ex:* one element can satisfy the greater than 15 condition and another element can satisfy the less than 20 condition, or a single element can satisfy both:
> db.testArray.find( { dim_cm: { $gt: 15, $lt: 20 } } )

**Query for an Array Element that Meets Multiple Criteria:**
Use $elemMatch operator to specify multiple criteria on the elements of an array such that at least one array element satisfies all the specified criteria.

*Ex:* Select documents where the dim_cm array contains at least one element that is both greater than 22 and less than 30:
> db.testArray.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )

**Query for an Element by the Array Index Position:**
Using dot notation, you can specify query conditions for an element at a particular index or position of the array. The array uses zero-based indexing.
*Ex:* The following example queries for all documents where the second element in the array dim_cm is greater than 25:
> db.testArray.find( { "dim_cm.1": { $gt: 25 } } )

**Query an Array by Array Length:**
Use the $size operator to query for arrays by number of elements. 
*Ex:* select documents where the array tags has 3 elements.
> db.testArray.find( { "tags": { $size: 3 } } )


## Query an Array of Embedded Documents

The following example selects all documents where an element in the   instock array matches the specified document:

> db.inventory.find( { "instock": { warehouse: "A", qty: 5 } } )

Equality matches on the whole embedded/nested document require an exact match of the specified document, including the field order. For example, the following query does not match any documents in the inventory collection:

> db.inventory.find( { "instock": { qty: 5, warehouse: "A" } } )

**Specify a Query Condition on a Field Embedded in an Array of Documents**

If you do not know the index position of the document nested in the array, concatenate the name of the array field, with a dot (.) and the name of the field in the nested document.

The following example selects all documents where the instock array has at least one embedded document that contains the field qty whose value is less than or equal to 20:

> db.inventory.find( { 'instock.qty': { $lte: 20 } } )

**Use the Array Index to Query for a Field in the Embedded Document**

Using dot notation, you can specify query conditions for field in a document at a particular index or position of the array. The array uses zero-based indexing.
Note

When querying using dot notation, the field and index must be inside quotation marks.

The following example selects all documents where the instock array has as its first element a document that contains the field qty whose value is less than or equal to 20:

> db.inventory.find( { 'instock.0.qty': { $lte: 20 } } )

Specify Multiple Conditions for Array of Documents

When specifying conditions on more than one field nested in an array of documents, you can specify the query such that either a single document meets these condition or any combination of documents (including a single document) in the array meets the conditions.
A Single Nested Document Meets Multiple Query Conditions on Nested Fields

Use $elemMatch operator to specify multiple criteria on an array of embedded documents such that at least one embedded document satisfies all the specified criteria.

The following example queries for documents where the instock array has at least one embedded document that contains both the field qty equal to 5 and the field warehouse equal to A:

> db.inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } )

The following example queries for documents where the instock array has at least one embedded document that contains the field qty that is greater than 10 and less than or equal to 20:

> db.inventory.find( { "instock": { $elemMatch: { qty: { $gt: 10, $lte: 20 } } } } )

Combination of Elements Satisfies the Criteria

If the compound query conditions on an array field do not use the $elemMatch operator, the query selects those documents whose array contains any combination of elements that satisfies the conditions.

For example, the following query matches documents where any document nested in the instock array has the qty field greater than 10 and any document (but not necessarily the same embedded document) in the array has the qty field less than or equal to 20:

> db.inventory.find( { "instock.qty": { $gt: 10,  $lte: 20 } } )

The following example queries for documents where the instock array has at least one embedded document that contains the field qty equal to 5 and at least one embedded document (but not necessarily the same embedded document) that contains the field warehouse equal to A:

> db.inventory.find( { "instock.qty": 5, "instock.warehouse": "A" } )

## Project Fields to Return from Query

**Return the Specified Fields and the _id Field Only**

> db.users.find({"Class":"A"}, {"Name": 1, "Age":1})

*The operation corresponds to the following SQL statement:*
SELECT _id, item, status from users WHERE Class = "A"

**Suppress _id Field**

> db.users.find({"Class":"A"}, {"Name": 1, "Age":1, _id: 0 })

*The operation corresponds to the following SQL statement:*
SELECT item, status from users WHERE Class = "A"

## Query for Null or Missing Fields
Different query operators in Mongo> db treat null values differently.


> db.inventory.insertMany([
   { _id: 1, item: null },
   { _id: 2 }
])


**Equality Filter:**
The { item : null } query matches documents that either contain the item field whose value is null or that do not contain the item field.

> db.inventory.find( { item: null } )
The query returns both documents in the users.

**Type Check:**
The { item : { $type: 10 } } query matches only documents that contain the item field whose value is null; i.e. the value of the item field is of BSON Type Null (type number 10)

> db.inventory.find( { item : { $type: 10 } } )
The query returns only the document where the item field has a value of null.

**Existence Check:**
The following example queries for documents that do not contain a field. The { item : { $exists: false } } query matches documents that do not contain the item field

> db.inventory.find( { item : { $exists: false } } )
The query only returns the document that does not contain the item field.


## Update Documents in a users


{
  <update operator>: { <field1>: <value1>, ... },
  <update operator>: { <field2>: <value2>, ... },
  ...
}


**Update a Single Document**

*Ex:* update the first document where item equals "paper":


> db.inventory.updateOne(
   { item: "paper" },
   {
     $set: { "size.uom": "cm", status: "P" },
     $currentDate: { lastModified: true }
   }
)


**Update Multiple Documents**
uses the > db.users.updateMany() method

**Replace a Document**

To replace the entire content of a document except for the _id field, pass an entirely new document as the second argument to > db.users.replaceOne().

## Delete Documents

**Delete All Documents**
> db.inventory.deleteMany({})

**Delete All Documents that Match a Condition**
{ <field1>: <value1>, ... }
{ <field1>: { <operator1>: <value1> }, ... }

*Ex:*
> db.users.deleteMany({ "Class" : "B" })

**Delete Only One Document that Matches a Condition**
*The following example deletes the **first document** where class is "A"*
> db.users.deleteOne( { "Class" : "A" } )
