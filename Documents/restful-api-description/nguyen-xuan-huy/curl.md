##cURL Description (students)

**Constants:**
```
rank = {
  EXCELLENT: 'd8b6a724-7a16-4f48-8cc3-409a04a84bb7',
  GOOD: '686faf56-d573-42ab-b37e-363ded840995',
  AVERAGE: 'ed9ef384-4d70-47f4-90ac-3babcde899a3',
  WEAK: '3e553c5f-9589-4a8a-b292-cad1b08b5224'
}
```
### 1. Create

```
curl 
    -X POST '/students',
    -d '{
            firstName: "Nguyen",
            lastName: "Xuan Linh",
            phoneNumber: "0905111113",
            email: "linhnx42@due.edu.vn",
            rank: "ed9ef384-4d70-47f4-90ac-3babcde899a3"
        }'
```

### 2. Read

**Get all students**
`curl
-X GET '/students'`

**Get Student by id**
`curl
-X GET '/students/:id'
-X GET '/students/6279c1e5ef747eddff91f296'`

idStudent: 6279c1e5ef747eddff91f296

**Search for Student**
`curl
-X GET '/students?q = 0905111113 & type = ed9ef384-4d70-47f4-90ac-3babcde899a3'`

### 3. Update
**Update Student by Id**
```
curl
    -X PUT '/students/:id'
    -X PUT '/students/6279c1e5ef747eddff91f296'`
    -d '{
            firstName: "Nguyen",
            lastName: "Xuan Linh",
            phoneNumber: "090511111x",
            email: "linhnx42@due.edu.vn",
            rank: "ed9ef384-4d70-47f4-90ac-3babcde899a3"
        }'
```

### 4. Delete
`curl -X DELETE '/students/6279c1e5ef747eddff91f296'`
[display: true/false]