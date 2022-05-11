# Query on Embedded/Nested Documents

**On this page**

Match an Embedded/Nested Document
Query on Nested Field
Additional Query Tutorials

---
Use the **Select your language** drop-down menu in the upper-right to set the language of the following examples.

---
This page provides examples of query operations on embedded/nested documents using the `db.collection.find()` method in `mongosh.` The examples on this page use the inventory collection. To populate the `students` collection, run the following:
```
show 5
```
You can run the operation in the web shell below:

**Match an Embedded/Nested Document**

To specify an equality condition on a field that is an embedded/nested document, use the [query filter document]() { <field>: <value> } where <value> is the document to match.

For example, the following query selects all documents where the field `size` equals the document `{ h: 170, w: 68, unit: "cm" }`:

```
db.students.find( { "size": { h: 170, w: 68, unit: "cm" } } )
show 1
```

Equality matches on the whole embedded document require an exact match of the specified `<value>` document, including the field order. For example, the following query does not match any documents in the `students` collection:

```
db.students.find( { "size": { h: 169, w: 68, unit: "cm" } } )
show 0
```

**Query on Nested Field**
To specify a query condition on fields in an embedded/nested document, use [dot notation]() `("field.nestedField")`.

```
NOTE
When querying using dot notation, the field and nested field must be inside quotation marks.
```
**Specify Equality Match on a Nested Field**

The following example selects all documents where the field `unit` nested in the `size` field equals "in":

```
db.students.find( { "size.unit": "cm" } )
show 5
```

**Specify Match using Query Operator**

A [query filter document]() can use the [query operators]() to specify conditions in the following form:

```
{ <field1>: { <operator1>: <value1> }, ... }
```

The following query uses the less than operator `($lt)` on the field `h` embedded in the `size` field:

```
db.students.find( { "size.h": { $lt: 170 } } )
```

**Specify `AND` Condition**
The following query selects all documents where the nested field `h` is less than `170`, the nested field `unit` equals `"cm"`, and the `status` field equals `"D"`:

```
db.students.find( {"size.h":{$lt:170}, "size.unit":"cm", status: "A" } )
```