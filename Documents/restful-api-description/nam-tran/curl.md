##cURL Description (Students)

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
    -X POST '/Students',
    -d '{
            firstName: "Truong",
            lastName: "Nam Tran",
            phoneNumber: "0905178492",
            email: "truongvntran@gmail.com",
            rank: "686faf56-d573-42ab-b37e-363ded840995"
        }'
```

### 2. Read

**Get all students**
`curl
-X GET '/Students'`

**Get Student by id**
`curl
-X GET '/Students/627394eb57216fbf0340cca7'`

idStudent: 627394eb57216fbf0340cca7

**Search for Student**
`curl
-X GET '/Students?q = 090517 & type = d8b6a724-7a16-4f48-8cc3-409a04a84bb7'`


### 3. Update
**Update Student by Id**
```
curl
    -X PUT '/Students/627394eb57216fbf0340cca7'
    -d '{
            firstName: "Truong",
            lastName: "Tran",
            phoneNumber: "0123456789",
            email: "truongvntran2@gmail.com",
            type: "d8b6a724-7a16-4f48-8cc3-409a04a84bb7"
        }'
```

### 4. Delete
`curl -XDELETE '/students/627394eb57216fbf0340cca7'`