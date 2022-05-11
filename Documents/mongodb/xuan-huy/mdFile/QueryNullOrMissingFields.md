# Query for Null or Missing Fields
`Query cho các TRƯỜNG rỗng hoặc thiếu`

On this page

Equality Filter
Type Check
Existence Check

---

```
Create collection first
db.createCollection("NullorMiss").find({})
```

```
query collection
db.NullorMiss.find({})
```
---
Different query operators in MongoDB treat `null` values differently.

This page provides examples of operations that query for `null` values using the `db.collection.find()` method in `mongosh`. The examples on this page use the `NullorMiss` collection. To populate the `NullorMiss` collection, run the following:

```
db.NullorMiss.insertMany([
    {_id: 1, item:null},
    {_id: 2 },
    {_id: 3, item:"hammer"}
])
```

> Important
> 
> Use BsonNull.Value with the MongoDB C# driver to query for null or missing fields in MongoDB.

**Equality Filter - bộ lọc bình đẳng**

The `{ item : null }` query matches documents that either contain the `item` field whose value is `null` or `miss` that `do not contain` the `item` field ( Fields have value don't show).

```
db.NullorMiss.find( {item:null} )
```

The query returns both documents in the collection.

**Type Check-Loại kiểm tra**

The `{ item : { $type: 10 } }` query matches *only* documents that contain the `item` field whose value is `null`; i.e. the value of the `item` field is of **BSON Type** `Null` (type number `10`) :

```
db.NullorMiss.find( {item: { $type: 10 } } )
return document have fields item is of BSON Type Null 
```
The query returns only the document where the `item` field has a value of `null`.

**Existence Check-Kiểm tra sự tồn tại**

The following example queries for documents that do not contain a field. [1]

The `{ item : { $exists: false } }` query matches documents that do not contain the `item` field:

```
db.NullorMiss.find( {item: { $exists:false } } )
show fields haven't item
```

```
db.NullorMiss.find( {item: { $exists:true } } )
show fields have item Null or Value
```

The query only returns the document that does not contain the `item` field.

> TIP
> **See also:**
Reference documentation for the `$type` and `$exists` operators.