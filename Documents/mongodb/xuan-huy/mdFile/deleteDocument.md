# Delete Documents

This page uses the following mongosh methods:

- db.collection.deleteMany()
- db.collection.deleteOne()

```
Create collection
db.createCollection('students3')
```

```
show collection
db.students3.find({})
```

```
Insert documents
db.students3.insertMany( [
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
] );
```

```
show collection
db.students3.find({})
show 5
```

**Delete All Documents that Match a Condition**

To specify equality conditions, use `<field>:<value>` expressions in the `query filter document`:

```
{ <field1>: <value1>, ... }
```

A `query filter document` can use the `query operators` to specify conditions in the following form:

```
{ <field1>: { <operator1>: <value1> }, ... }
```

**deleteMany({})**
```
Delete all documents
db.students3.deleteMany({})
```

```
Delete many with fields
db.students3.deleteMany( {status:"A"} )
```

**Delete Only One Document that Matches a Condition**

**deleteOne({})**
```
Delete one with field
db.students3.deleteOne( {status:"D"} )
```

**Delete Behavior**

**Indexes**

Delete operations do not drop indexes, even if deleting all documents from a collection.

**Atomicity**

All write operations in MongoDB are atomic on the level of a single document. For more information on MongoDB and atomicity, see Atomicity and Transactions.