# Query Documents
**On this page**
*Select All Documents in a* *Collection*
*Specify Equality Condition*
*Specify Conditions Using Query* *Operators*
*Specify AND Conditions*
*Specify OR Conditions*
*Additional Query Tutorials*
*Behavior*

---
Use the **Select your language** drop-down menu in the upper-right to set the language of the following examples.

---
This page provides examples of query operations using [MongoDB Compass](). The examples on this page use the `students` collection. Populate the `students` collection with the following documents:

---
---

**BEFORE THAT**
update db.students
```
db.students.updateOne({name:"Xuan Linh", age:"30", size:{h:"172", w:"70", unit:"cm"}},{$set: {status:"A"}})
db.students.updateOne({name:"Xuan Huy", age:"24", size:{h:"170", w:"68", unit:"cm"}},{$set: {status:"A"}})
db.students.updateOne({name:"Van A",age:"24",size:{h:165,w:40,unit:'cm'}},{$set: {status:"D"}})
db.students.updateOne({name:"Van B",age:"25",size:{h:166,w:45,unit:'cm'}},{$set: {status:"D"}})
db.students.updateOne({name:"Van C",age:"26",size:{h:167,w:50,unit:'cm'}},{$set: {status:"A"}})
```
```
db.students.find({})
```
This operation corresponds to the following SQL statement:

```
SELECT * FROM students
```

For more information on the MongoDB Compass query bar, see [Query Bar]().

**Specify Equality Condition**
To specify equality conditions, use `<field>:<value>` expressions in the [query filter document]():

```
{ <field1>: <value1>, ... }
```

The following example selects from the `students` collection all documents where the `status` equals `"D"`:

Copy the following filter into the Compass query bar and click **Find**:

```
{ status: "A" }
```
```
db.students.find({ status : "A" })
```

Thao tác này tương ứng với câu lệnh SQL sau:

```
SELECT * FROM students WHERE status = "A"
```
> **NOTE**
> The MongoDB Compass query bar autocompletes the current query based on the keys in your collection's documents, including keys in embedded sub-documents.

**Specify Conditions Using Query Operators**
A [query filter document]() can use the [query operators]() to specify conditions in the following form:

```
{ <field1>: { <operator1>: <value1> }, ... }
```

The following example retrieves all documents from the `students` collection where `status` equals either `"A"` or `"D"`:

Copy the following filter into the Compass query bar and click **Find**:

```
db.students.find({status:{ $in: ["A","D"]}})
```

> **NOTE**
> Although you can express this query using the `$or` operator, use the `$in` operator rather than the `$or` operator when performing equality checks on the same field.

The operation corresponds to the following SQL statement:

```
SELECT * FROM students WHERE status in ("A", "D")
```

Refer to the [Query and Projection Operators]() document for the complete list of MongoDB query operators.

**Specify `AND` Conditions**

A compound query can specify conditions for more than one field in the collection's documents. Implicitly, a logical `AND` conjunction connects the clauses of a compound query so that the query selects the documents in the collection that match all the conditions.

The following example retrieves all documents in the `students` collection where the `status` equals `"A"` and `age` is less than (`$lt`) `27`:

Copy the following filter into the Compass query bar and click **Find**:

```
db.students.find({status:"A",age:{$lt:"27"}})
```

The operation corresponds to the following SQL statement:

```
SELECT * FROM students WHERE status = "A" AND age < 27
```

See comparison operators for other MongoDB comparison operators.

**Specify `OR` Conditions**

Using the `$or` operator, you can specify a compound query that joins each clause with a logical `OR` conjunction so that the query selects the documents in the collection that match at least one condition.

The following example retrieves all documents in the collection where the `status` equals `"A"` or `age` is less than (`$lt`) `27`:

Copy the following filter into the Compass query bar and click **Find**:

```
db.students.find({$or: [{status:"A"},{age:{$lt:27} }] })
```

The operation corresponds to the following SQL statement:
```
SELECT * FROM students WHERE status = "A" OR age < 27
```

> **NOTE**
> Queries which use [comparison operators]() are subject to [Type Bracketing]().

**Specify `AND` as well as `OR` Conditions**

In the following example, the compound query document selects all documents in the collection where the `status` equals `"A"` and either `age` is less than (`$lt`) `27` or `name` starts with the character `p`:

Copy the following filter into the Compass query bar and click **Find**:

```
db.students.find({status:"A", $or:[{age:{$lt:"27"} },{ name:/^p/}] })
```

The operation corresponds to the following SQL statement:

```
SELECT * FROM students WHERE status = "A" AND ( age < 27 OR name LIKE "p%")
```

> **NOTE**
> MongoDB supports regular expressions `$regex` queries to perform string pattern matches.

**Additional Query Tutorials**

For additional query examples, see:

- Query on Embedded/Nested Documents
- Query an Array
- Query an Array of Embedded Documents
- Project Fields to Return from Query
- Query for Null or Missing Fields