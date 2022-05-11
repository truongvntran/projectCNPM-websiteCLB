### OR

The $or operator performs a logical OR operation on an array of two or more <expressions> and selects the documents that satisfy at least one of the <expressions>. The $or has the following syntax:

`{ $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }`

*ex:*
`db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )`
This query will select all documents in the inventory collection where either the quantity field value is less than 20 or the price field value equals 10.

### $in
The $in operator selects the documents where the value of a field equals any value in the specified array. To specify an $in expression, use the following prototype:
`{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }`

If the field holds an array, then the $in operator selects the documents whose field holds an array that contains at least one element that matches a value in the specified array (for example, <value1>, <value2>, and so on).

*ex:*
`db.getCollection("Students").find({firstName: {$in: ["Nguyen"] }})`

### $lt
(less than ..)
