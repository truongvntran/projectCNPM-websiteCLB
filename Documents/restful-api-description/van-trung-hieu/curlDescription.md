# cURL Description

## Constants

```curl
STUDENT_RANK = {
  EXCELLENT: 'd8b6a724-7a16-4f48-8cc3-409a04a84bb7',
    GOOD: '686faf56-d573-42ab-b37e-363ded840995',
    AVERAGE: 'ed9ef384-4d70-47f4-90ac-3babcde899a3',
    WEAK: '3e553c5f-9589-4a8a-b292-cad1b08b5224'
  }
```

## 1. Create a student

```curl
curl 
  -XPOST '/students'
  -d '{
    "firstName": "Van Trung",
    "lastName": "Hieu",
    "phoneNumber": "0948305988",
    "email": "trunghieuvan@gmail.com",
    "ranked": "6639aa25-de02-4d7c-86a2-01ee0e01fd73"
  }'
```

## 2. Get a student by _id

```curl
curl -XGET '/students/627377b3597c550e2799ab9f'
```

## 3. Get a list of students

```curl
curl -XGET '/students?q=trung-hi&type=686faf56-d573-42ab-b37e-363ded840995'
```

## 4. Update a student by id

```curl
curl 
  -XPUT '/students/627377b3597c550e2799ab9f'
  -d '{
    "firstName": "Van Trung",
    "lastName": "Hieu",
    "phoneNumber": "0948305988",
    "email": "hieuvan@gmail.com",
    "ranked": "6639aa25-de02-4d7c-86a2-01ee0e01fd73"
  }'
```

## 5. Delete a student by id

```curl
curl - XDELETE '/students/627377b3597c550e2799ab9f'
```
