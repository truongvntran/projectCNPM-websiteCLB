## Create new Databases
### Create new Collection

Show tất cả các table
```
    db.getCollection("students").find({})
```

## Insert Documents
**On this page**
- Insert a single Document
- Insert Multiple Documents
- Insert Behavior
---
Use the **Select your language** drop-down menu in the upper-right to set the language of the examples on this page.

---
This page provides examples of insert operations in MongoDB.

> 
> **NOTE**
> `Creating a Collection`
> If the collection does not currently exist, insert operations will create the collection.

## Insert a Single Document

`db.collection.insertOne()` inserts a sigle document into a collection.

The following example inserts a new document into the `students` collection. If the document does not specify an `_id` filed, MongoDB adds the `_id` field with an ObjectId value to the new document. see [Insert Behavior]().

```
db.students.insertOne(
{name:"Xuan Huy", age:"24", size:{h:"170", w:"68", unit:"cm"}}
)
db.students.insertOne(
{name:"Xuan Linh", age:"30", size:{h:"172", w:"70", unit:"cm"}}
)
```

You can run the code in intelliShell:
| id | name | age | size |
|---|---|---|---|
| id | xuanhuy | 24 | size |
| id | xuanlinh | 30 | size |

`insertOne()` returns a document that includes the newly inserted document's `_id` field value. For an example of a return document, see [db.collection.insertOne() reference]().

To retrieve the document that you just inserted, [query the collection]():

```
db.getCollection("students").find({name:"Xuan Linh"})
```

## Insert Multiple Documents
---
Use the **Select your language** drop-down menu in the upper-right to set the language of the examples on this page.

---
*New in version 3.2*
```
db.students.insertMany(
[{name:"Van A",age:"24",size:{h:165,w:40,unit:'cm'}},
{name:"Van B",age:"25",size:{h:166,w:45,unit:'cm'}},
{name:"Van C",age:"26",size:{h:167,w:50,unit:'cm'}}]
)
```
You can run the code in intelliShell:
| id | name | age | size |
|---|---|---|---|
| id | xuanhuy | 24 | size |
| id | xuanlinh | 30 | size |
| id | van A | 25 | size |
| id | van B | 26 | size |
| id | van C | 27 | size |

`insertMany()` returns a document that includes the newly inserted documents `_id` field values. See the [reference]() for an example.

To retrieve the inserted documents, [query the collection]():

```
db.students.find({})
```
## Insert Behavior
**collection Creation**

If the collection does not currently exist, insert operations will create the collection.

**`_id` Field**
In MongoDB, each document stored in a collection requires a unique `_id` field that acts as a [primary key](). If an inserted document omits the `_id` field, the MongoDB driver automatically generates an [ObjectId]() for the `_id` field.

This also applies to documents inserted through update operations with [upsert: true]().

**Atomicity**
All write operations in MongoDB are atomic on the level of a single document. For more information on MongoDB and atomicity, see [Atomicity and Transactions]()

**Write Acknowledgement**
With write concerns, you can specify the level of acknowledgement requested from MongoDB for write operations. For details, see [Write Concern]().

> **TIP**
> see also:
>
>- db.collection.insertOne()
>- db.collection.insertMany()
>- Additional Methods for Inserts