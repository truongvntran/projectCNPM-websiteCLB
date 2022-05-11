# MongoDB 

## MongoDB Operations

### Insert Documents

**Insert a Single Document:**

`db.collection.insertOne()`

Ex:

```mongodb
db.student.insertOne({
    name: "hieu",
    age: 22
})
```

**Insert Multiple Document:**

`db.collection.insertMany()`

Ex:

```mongo
db.studentdb.insertMany([
    {
        name: "Nguyen van A",
        age: 22
    },
    {
        name: "Nguyen van B",
        age: 22
    }
])
```

If the collection does not currently exist, insert operations will create the collection.

### Query Docruments

**Select All Documents in a Collection:**

`db.collection.find({})`

Ex:

```mongo
db.studentdb.find({})
```

**Specify Equality Condition:**

`{ <field1>: <value1>, ... }`

Ex:

```mongo
db.studentdb.find({name: "Nguyen Van A"})
```

**Specify Conditions Using Query Operators:**

`{ <field1>: { <operator1>: <value1> }, ... }`

Ex: The following example retrieves all documents from the `studentdb` collection where `name` equals either `"hieu"` or `"hung"`

```mongo
db.studentdb.find({name: {$in: ["hieu"] }})
```

**Specify `AND` Conditions**

Ex: The following example retrieves all documents in the `studentdb` collection where the `name` equals `"hieu"` and `age` is less than (`$lt`) `30` 

```mongo
db.studentdb.find({name: "hieu", age: {$lt: 30}})
```

**Specify `OR` Conditions:**

Ex: The following example retrieves all documents in the collection where the `name` equals `"hieu"` or `age` is less than `30`

```mongo
db.studentdb.find( {$or: [{name: "hieu"}, {age: {$lt: 30}}]})
```

**Specify `AND` as well as `OR` Conditions:**

Ex: The following example, the compound
query document selects all documents in the collection, where the `name` equals `"hung"` and either `age` is less than `30` or `email` starts with the character `h`

```mongo
db.studentdb.find( {
     name: "hung",
     $or: [ { age: { $lt: 30 } }, { email: /^h/ } ]
} )
```

### Query on Embedded/Nested Documents

**Match an Embedded/Nested Document:**

Ex: The following query selects all documents where the field `bmi` equals the document `{height: 180, weight: 56}`

```mongo
db.studentdb.find({bmi: {height: 180, weight: 56}})
```

**Query on Nested Feild:**

To specify a query condition on fields in an embedded/nested document, user *dot notation* ("field.nestedField").

**Specify Equality Match on a Nested Field:**

Ex: The following example selects all documents where the field `height` nested in the `size` field equals `180`

```mongo
db.studentdb.find({"bmi.height": 180})
```

**Specify Match using Query Operator:**

A query filter document can use the query operators to specify conditions in the following form:

`{ <field>: { <operator1>: <value> }, ...}`

Ex: The following query uses the less than operator (`$ls`) on the field `height` embedded in the `bmi` field

```mongo
db.studentdb.find({"bmi.height": {$lt: 190}})
```

**Specify `AND` Condition:**

Ex: The following query selects all documents where the nested field `height` is greater than `170`, the nested field `weight` equal `70`

```mongo
db.studentdb.find({"bmi.height": {$gt: 170}, "bmi.weight": 70})
```

### Query an Array

**Match an Array:**

To specify equality condition on an array, use the query document `{ <field>: <value> }` where `<value>` is the exact array to match, including the order of the elements.

Ex: The following example queries for all documents where the field `favorite_color` value is an array with exactly two elements `"red"` and `"green"` in the specified order

```mongo
db.studentdb.find({favorite_color:["red", "green"]})
```

If, instead, you wish to find an array that contains both the elements `"red"` and `"green"`, without regard to order or other elements in the array, use `$all` operator:

```mongo
db.studentdb.find({favorite_color: {$all: ["green"]}})
```

**Query an Array for an Element:**

To query if the array field contains at least one element with the specified value, use the filter `{ <field>: <value> }` where `<value>` is the element value.

Ex: The following example queries for all documents where `favorite_color` is an array that contains the string `"red"` as one of its elements

```mongo
db.studentdb.find({favorite_color: "red"})
```

To specify conditions on the elements in the array field, use query operators in the query filter document:

`{ <array field>: { <operator1>: <value>, ...} }`

Ex: For example, the following operation queries for all documents where the array `favorite_number` contains at least one element whose value is greater than `30`.

```mongo
db.studentdb.find({favorite_number: {$gt: 30}})
```

**Specify Multiple Conditions for Array Elements:**

*Query an Array with Compound Filter Conditions on the Array Elements:*

Ex: The following example queries for documents where the `favorite_color` array contains elements that in some combination satisfy the query conditions; one element can satisdy the greater than `2` condition and another element can satisfy the less than '30' condition, or a single element can satisfy both

```mongo
db.studentdb.find({favorite_number: {$gt: 2, $lt: 30}})
```

*Query for an Array Element that Meets Multiple Criteria:*

Use `$elemMatch` operator to specify multiple criteria on the elements of an array such that at least one array element satisfies all the specified criteria.

Ex: The following example queries for documents where the `favorite_number` array contains at least one element that is both greater than (`$gt`) `1` and less than (`$lt`) `20`

```mongo
db.studentdb.find({favorite_number: {$elemMatch: {$gt: 1, $lt: 20}}})
```

*Query an Element by the Array Index Position:*

Using *dot notation*. The array uses zero-based indexing.

Ex: The following example queries for all documents where the second element in the array `favorite_color` equal to `24`

```mongo
db.studentdb.find({"favorite_number.1": 24})
```

*Query an Array by Array Length:*

Use the `$size` operator to query for arrays by number of elements.

Ex: The following selects document where the array `favorite_number` has 2 elements.

```mongo
db.studentdb.find({favorite_number: {$size: 2}})
```

### Query an Array of Embedded Documents

**Query for a Document Nested in an Array:**

Ex: The following example selects all documents where an element in the `subject` array matches the specified document, including the field order.

```mongo
db.studentdb.find({subject: {name: "JS", score: 7.5}})
```

**Specify a Query Condition on a Field in an Array of Documents:**

*Specify a Query Condition on a Field Embedded in an Array of Documents:*

If you do not know the index position of the document nested in the array, concatenate the name of the array field, with a dot (`.`) and the name of the field in the nested document.

Ex: The following example selects all documents where the `subject` array has at least one embedded document that contain the field `score` whose value is less than 8

```mongo
db.studentdb.find({"subject.score": {$lt: 8}})
```

*Use the Array Index to Query for a Field in the Embedded Document:*

Using *dot notation*. The array uses zero-based indexing.

Ex: The following example selects all documents where the `subject` array has as its first element a document that contains the field `score` whose value is equal to `10`

```mongo
db.studentdb.find({"subject.0.score": 10})
```

**Specify Multiple Conditions for Array of Documents:**

When specifying conditions on more than one field nested in an array of documents, you can specify the query such that either a single document meets these condition or any combination of documents (including a single document) in the array meets the conditions.

*A single Nested Document Meets Multiple Query Conditions on Nested Fields:*

Use `$elemMatch` operator to specify multiple criteria on an array of embedded documents such that at least one embedded document satisfies all the specified criteria.

Ex: The following example queries for documents where the `subject` array has at least one embedded document that contains both the field `name` equal to `python` and the field `score` equal to `10`

```mongo
db.studentdb.find({subject: { $elemMatch: {name: "python", score: 10}}})
```

Ex: This following example queries for documents where the `subject` array has at least one embedded document that contains the field `scrore` that is less than `10` and greater than `7`

```mongo
db.studentdb.find({subject: { $elemMatch: {score: {$lt: 10, $gt: 7}}}})
```

*Combination of Elements Satisfies the Criteria:*

If fo not use `$elemMatch` operator, the query selects those documents whose array contains any combination of elements that satisdies the conditions.

Ex: The following query matches documents where any document nested in the `subject` array has the `score` field greater than `7` and any document (but not necessarily the same embedded document) in the array has the `score` field less than `10`

```mongo
db.studentdb.find({ "subject.score": {$gt:7, $lt:10 }})
```

Ex: The following example queries for documents where the `subject` array has at least one embedded document that contains the field `score` equal to `10` and at least one embedded document (but not necessarily the same embedded document) that contains the field `name` equal to `JS`

```mongo
db.studentdb.find({"subject.score": 10, "subject.name": "JS"})
```

### Project Fields to Return from Query

By default, queries in MongoDB return all fields in matching documents. To limit the amount of data that MongoDB sends to applications, you can include a projection document to specify or restrict fields to return.

**Return All Fields in Matching Documents:**

*All queries above.*

**Return the Specified Fields and the `_id` Field Only:**

A projection can explicitly include several fields by setting the `<field>` to `1` in the projection document.

The following operation returns all documents that match the query. In the result set, only the `name`, `age` and, by default, the `_id` fields return in the matching documents.

```mongo
db.studentdb.find({name: "dat"}, {name: 1, age: 1})
```

**Suppress `_id` Field**

You can remove the `_id` field from the results by setting it to `0` in the projection, as in the following example:

```mongo
db.studentdb.find({name: "dat"}, {name: 1, age: 1, _id: 0})
```

**Return All But the Excluded Fields:**

Instead of listing the fields to return in the matching document, you can use a projection to exclude specific fields. The following example which returns all fields except for the `name` and the `age` fields in the matching documents

```mongo
db.studentdb.find({name: "dat"}, {name: 0, age: 0})
```

**Return Specific Fields in Embedded Documents:**

Use the *dot notation* to refer to the embedded field and set to `1` in the projection document.

The following example returns:

- The `_id` field (return by default)

- The `name` field

- The `age` field

- The `height` field in the `bmi` document

```mongo
db.studentdb.find(
    {name: "dat"}, 
    {name: 1, age: 1, "bmi.height": 1}
)
```

**Suppress Specific Fields in Embedded Documents:**

Ex: The following example specifies a projection to exclude the `height` field inside the `bmi` document. All other fields are returned in the matching documents

```mongo
db.studentdb.find({name: "dat"}, {"bmi.height": 0})
```

**Projection on Embedded Documents in an Array:**

Use *dot notation* to project specific fields inside documents embedded in an array.

Ex: The following example returns:

- The `_id` field (return by default)

- The `name` field

- The `age` field

- The `name` field in the documents embedded in the `subject` array

```mongo
db.studentdb.find(
    {name: "dat"}, 
    {name: 1, age: 1, "subject.name":1}
)
```

**Project Specific Array Elements in the Returned Array:**

For fields that contain arrays, MongoDB provides the following projection operators for manipulating arrays: `$elemMatch`, `$slice`, and `$`.

The following example uses the `$slice` projection operator to return the last element in the instock array:

```mongo
db.studentdb.find(
    {name: "dat"}, 
    {name: 1, age: 1, favorite_color: { $slice: -1}}
)
```

`$elemMatch`, `$slice`, and `$` are the only way to project specific elements to include in the returned array.

### Query for Null or Missing Fields

Different query operators in MongoDB treat `null` values differently.

```mongo
db.inventory.insertMany([
   { _id: 1, item: null },
   { _id: 2 }
])
```

**Equality Filter:**

The `{ item : null }` query matches documents that either contain the item field whose value is `null` or that do not contain the item field.

```mongo
db.inventory.find( { item: null } )
```

The query returns both documents in the collection.

**Type Check:**

The `{ item : { $type: 10 } }` query matches only documents that contain the item field whose value is `null`; i.e. the value of the item field is of BSON Type `Null` (type number 10)

```mongo
db.inventory.find( { item : { $type: 10 } } )
```

The query returns only the document where the item field has a value of `null`.

**Existence Check:**

The following example queries for documents that do not contain a field. The `{ item : { $exists: false } }` query matches documents that do not contain the `item` field

```mongo
db.inventory.find( { item : { $exists: false } } )
```

The query only returns the document that does not contain the item field.

### Updates with Aggregation Pipeline (Mongo 5.0)

Ex: The following `db.studentdb.updateOne()` operation uses an aggregation pipeline to update the document with `_id: new ObjectId("62691288f93879b5f00db39c")`

```mongo
db.studentdb.updateOne({_id: new ObjectId("62691288f93879b5f00db39c")}, { $set: {email: "h@gmail.com"}})
```

Specifically, the pipeline consist of a `$set` stage which sets the `email` field to `h@gmail.com`.

**$replaceRoot:**

Replaces the input document with the specified document. The operation replaces all existing fields in the input document, including the `_id` field.

The `$replaceRoot` stage has the following form:

```mongo
{ $replaceRoot: { newRoot: <replacementDocument> } }
```

The stage errors and fails if `<replacementDocument>` is not a document.

If the `<replacementDocument>`resolves to a missing document (i.e. the document does not exist), $replaceRoot errors and fails.

Ex: Create a collection with the following documents:

```mongo
db.collection.insertMany([
   { "_id": 1, "name" : { "first" : "John", "last" : "Backus" } },
   { "_id": 2, "name" : { "first" : "John", "last" : "McCarthy" } },
   { "_id": 3, "firstname": "Ole-Johan", "lastname" : "Dahl" },
])
```

The following `$replaceRoot` operations fails because one of the documents does not have the `name` field:

```mongo
db.collection.aggregate([
   { $replaceRoot: { newRoot: "$name" } }
])
```

To avoid the error, you can use `$mergeObjects` to merge the name document into some default document; for example:

```mongo
db.collection.aggregate([
   { $replaceRoot: { newRoot: { $mergeObjects: [ { _id: "$_id", first: "", last: "" }, "$name" ] } } }
])
```

### Update Documents

**Update Documents in a Collection:**

To use the update operators, pass to the update methods an update document of the form:

```mongo
{
  <update operator>: { <field1>: <value1>, ... },
  <update operator>: { <field2>: <value2>, ... },
  ...
}
```

Some update operators, such as `$set`, will create the field if the field does not exist

**Update a Single Document:**

Ex: The following example uses the `db.collection.updateOne()` method on the `studentdb` collection to update the first document where `name` equals "hieu":

```mongo
db.studentdb.updateOne(
    { name: "hieu" },
    {
        $set: {email: "hieu@gmail.com"},
        $currentDate: {birthday: true}
    }
)
```

The update operation:

- uses the `$set` operator to update the value of the `email` field to `"hieu@gmail.com"`,

- uses the `$currentDate` operator to update the value of the `birthday` field to the current date. If `birthday` field does not exist, $currentDate will create the field. 

**Update Multiple Documents:**

The following example uses the `db.collection.updateMany()` method on the `studentdb` collection to update all documents where `age` is less than `22`:

```mongo
db.studentdb.updateMany(
    {age: {$lt: 22}},
    {
        $set: {"bmi.weight": 180},
        $currentDate: {birthday: true}
    }
)
```

**Replace a Document:**

To replace the entire content of a document except for the `_id` field, pass an entirely new document as the second argument to `db.collection.replaceOne()`.

When replacing a document, the replacement document must consist of only field/value pairs; i.e. do not include *update operators* expressions.

The replacement document can have different fields from the original document. In the replacement document, you can omit the `_id` field since the `_id` field is immutable; however, if you do include the `_id` field, it must have the same value as the current value.

Ex: The following example replaces the *first* document from the `studentdb` collection where `name: "hieu"`

```mongo
db.inventory.replaceOne(
   { item: "paper" },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
)
```

*`_id` Field*

Once set, you cannot update the value of the `_id` field nor can you replace an existing document with a replacement document that has a different `_id` field value.

### Delete Documents:

**Delete All Documents:**

To delete all documents from a collection, pass an empty filter document `{}` to the `db.collection.deleteMany()` method.

**Delete All Documents that Match a Condition:**

To specify equality conditions, use `<field>:<value> `expressions in the query filter document.

A query filter document can use the query operators to specify conditions in the following form:

```mongo
{ <field1>: { <operator1>: <value1> }, ... }
```

Ex: The following example removes all documents from the `studentdb` collection where the `name` field equals `"hieu"`

```mongo
db.studentdb.deleteMany({name: "hieu"})
```

**Delete Only One Document that Matches a Condition:**

To delete at most a single document that matches a specified filter (even though multiple documents may match the specified filter) use the `db.collection.deleteOne()` method.

Ex: The following example deletes the first document where `age` is `22`

```mongo
db.studentdb.deleteOne({age: 22})
```

### Phân trang MongoDB

Để xá định số lượng kết quả trả về và số thú tự kết qủa được lấy ta sư dụng method `limit()` và `skip()`

Để phân trang trong MongoDB ta sẽ sử dụng kết hợp `limit()` và `skip()`, ví dụ mình chia kết quả thành các trang (page), mỗi trang có 5 kết quả.

**limit():**

Method `limit()` được dùng sau method `find()` để xác định tối đa số kết quả trả về.

Ex: Ví dụ dưới lấy ra 5 document của user

```mongo
db.user.find({}).limit(5)
```

Nếu tham số trong method `limit()` lớn hơn số lượng kết quả trả về thì nó sẽ trả về tất cả các kết quả.

**skip():**

Method `skip()` được dùng để xác định sẽ lấy document trong kết quả từ vị trí bao nhiêu bằng cách bỏ qua các document trước đó.

Ex: Ví dụ dưới lấy ra 5 document của của collection user bỏ qua 2 người đầu tiên

```mongo
db.user.find({}).limit(5).skip(2)
```