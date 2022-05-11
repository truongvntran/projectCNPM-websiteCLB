# PAGINATION MONGODB

1. MongoDB pagination by using limit method
    
    `db.collection_name.find () .limit (number);`
    
2. MongoDB pagination by using skip method
    
    `db.collection_name.find () .skip (number);`
    
3. MongoDB pagination by using ID field
    
    `db.collection_name.find ( {'_id': { 'Projection_operator': field_name } } )`
    
4. MongoDB pagination by using slice operator
    
    `db.collection_name.find ( { }, { field_name: {$slice: [number1, number2] } } )`
    
5. MongoDB pagination by using ranged queries
    
    `db.collection_name.find () .min ( { _id:0 } ).max ( { _id:3 } )`
    
6. MongoDB pagination by using create an index
    
    `db.collection_name.createIndex ( {field_name: -1} )`
    
References

[https://stackjava.com/mongodb/phan-trang-trong-mongodb-skip-limit-paging-trong-mongodb.html](https://stackjava.com/mongodb/phan-trang-trong-mongodb-skip-limit-paging-trong-mongodb.html)

[MongoDB Pagination | How pagination works in MongoDB?](https://www.educba.com/mongodb-pagination/)