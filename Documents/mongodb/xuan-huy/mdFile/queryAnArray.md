# Truy vấn một mảng

**Trên trang này**

Khớp một mảng
Truy vấn một mảng cho một phần tử
Chỉ định nhiều điều kiện cho các phần tử mảng
Hướng dẫn truy vấn bổ sung

---
➤ Sử dụng menu thả xuống Chọn ngôn ngữ của bạn ở phía trên bên phải để đặt ngôn ngữ cho các ví dụ sau.

---
Trang này cung cấp các ví dụ về hoạt động truy vấn trên các trường mảng sử dụng `db.collection.find()`phương thức trong `mongosh`. Các ví dụ trên trang này sử dụng `students` bộ sưu tập. Để điền `students` bộ sưu tập, hãy chạy như sau:

```
db.students.updateOne({name:"Xuan Linh",age:"30", size:{h:170,w:72,unit:"cm"},status:"A",tags: ["red","blank"]},{$set: {dim_cm:[16,22]}})
db.students.updateOne({name:"Xuan Huy", age:"24",size:{h:170, w:68, unit:"cm"},status:"A",tags: ["blank","red"]},{$set: {dim_cm:[16,22]}})
db.students.updateOne({name:"Van A",age:"24",size:{h:165,w:40,unit:'cm'},status:"D",tags: ["red","blank","plain"]},{$set: {dim_cm:[16,22]}})
db.students.updateOne({name:"Van B",age:"25",size:{h:166,w:45,unit:'cm'},status:"D",tags: ["blank","red"]},{$set: {dim_cm:[20.85,29]}})
db.students.updateOne({name:"Van C",age:"26",size:{h:167,w:50,unit:'cm'},status:"A",tags: ["blue"]},{$set: {dim_cm:[12,14.25]}})
```
hoặc InsertMany mới document

```
db.students.insertMany([
{name:"Xuan Linh",age:"30", size:{h:170,w:72,unit:"cm"},status:"A",tags: ["red","blank"],dim_cm:[16,22]},
{name:"Xuan Huy", age:"24",size:{h:170, w:68, unit:"cm"},status:"A",tags: ["blank","red"],dim_cm:[16,22]},
{name:"Van A",age:"24",size:{h:165,w:40,unit:'cm'},status:"D",tags: ["red","blank","plain"],dim_cm:[16,22]},
{name:"Van B",age:"25",size:{h:166,w:45,unit:'cm'},status:"D",tags: ["blank","red"],dim_cm:[20.85,29]},
{name:"Van C",age:"26",size:{h:167,w:50,unit:'cm'},status:"A",tags: ["blue"],dim_cm:[12,14.25]}
])
```

## Khớp một mảng
Để chỉ định điều kiện bình đẳng trên một mảng, hãy sử dụng tài liệu truy vấn `{ <field>: <value> }` xem đâu `<value>` là mảng chính xác cần khớp, bao gồm thứ tự của các phần tử.

Ví dụ sau truy vấn cho tất cả các tài liệu trong đó `tags` giá trị trường là một mảng có chính xác hai phần tử `"red"` và theo thứ tự đã `"blank"` chỉ định:

```
db.students.find({})
```

```
db.students.find({tags: ["red","blank"]})
show1
```

Thay vào đó, nếu bạn muốn tìm một mảng có chứa cả các phần tử `"red"` và `"blank"`, bất kể thứ tự hoặc các phần tử khác trong mảng, hãy sử dụng `$all` toán tử:

```
db.students.find( {tags:{$all: ["red","blank"]} })
show4
```

## Truy vấn một mảng cho một phần tử
Để truy vấn xem trường mảng có chứa ít nhất một phần tử với giá trị được chỉ định hay không, hãy sử dụng bộ lọc `{ <field>: <value> }`trong đó `<value>` giá trị phần tử là.

Ví dụ sau truy vấn cho tất cả các tài liệu trong đó `tags`một mảng có chứa chuỗi `"red"` là một trong các phần tử của nó:

```
db.students.find( {tags:"red"} )
show4
```

Để chỉ định điều kiện trên các phần tử trong trường mảng, hãy sử dụng [toán tử truy vấn]() trong [tài liệu bộ lọc truy vấn]() :

```
{ <array field>: { <operator1>: <value1>, ... } }
```

Ví dụ: hoạt động sau truy vấn cho tất cả các tài liệu trong đó mảng `dim_cm` chứa ít nhất một phần tử có giá trị lớn hơn `25`.

```
db.students.find( {dim_cm: {$gt:25} } )
show1 lớn hơn 25
```

## Chỉ định nhiều điều kiện cho các phần tử mảng
Khi chỉ định điều kiện phức hợp trên các phần tử mảng, bạn có thể chỉ định truy vấn sao cho một phần tử mảng duy nhất đáp ứng điều kiện này hoặc bất kỳ kết hợp nào của các phần tử mảng đáp ứng các điều kiện.

**Truy vấn một mảng với các điều kiện lọc phức hợp trên các phần tử của mảng**
Ví dụ sau đây truy vấn cho các tài liệu trong đó `dim_cm` mảng chứa các phần tử mà trong một tổ hợp nào đó thỏa mãn các điều kiện truy vấn; Ví dụ: một phần tử có thể thỏa mãn điều kiện lớn hơn `15` và một phần tử khác có thể thỏa mãn điều kiện nhỏ hơn `20`, hoặc một phần tử duy nhất có thể thỏa mãn cả hai:

```
db.students.find( {dim_cm: {$gt:15, $lt:20} } )
show3 thỏa mãn 1 hoặc cả 2 dk: lớn hơn 15 và nhỏ hơn 20
```

**Truy vấn cho một phần tử mảng đáp ứng nhiều tiêu chí**
Sử dụng `$elemMatch` toán tử để chỉ định nhiều tiêu chí trên các phần tử của mảng sao cho ít nhất một phần tử mảng thỏa mãn tất cả các tiêu chí đã chỉ định.

Ví dụ sau truy vấn các tài liệu trong đó `dim_cm` mảng chứa ít nhất một phần tử lớn hơn ( `$gt`) 22 và nhỏ hơn ( `$lt`) 30:

```
db.students.find( { dim_cm: { $elemMatch: { $gt:22, $lt: 30} } } )
show1 chứa ít nhất 1 phần tử gt-lớn hơn 22, lt-nhỏ hơn 30
```

**Truy vấn một phần tử theo vị trí chỉ mục mảng**
Sử dụng [ký hiệu dấu chấm]() , bạn có thể chỉ định điều kiện truy vấn cho một phần tử tại một chỉ mục hoặc vị trí cụ thể của mảng. Mảng sử dụng lập chỉ mục dựa trên số không.

```
Khi truy vấn bằng ký hiệu dấu chấm, trường và trường lồng nhau phải nằm trong dấu ngoặc kép.
```

Ví dụ sau truy vấn cho tất cả các tài liệu trong đó phần tử thứ hai trong mảng `dim_cm` lớn hơn `25`:

```
db.students.find( {"dim_cm.1": {$gt:25} } )
```

**Truy vấn một mảng theo độ dài mảng**
Sử dụng `$size` toán tử để truy vấn mảng theo số phần tử. Ví dụ: phần sau chọn tài liệu trong đó mảng `tags` có 3 phần tử.

```
db.students.find( { "tags": {$size:3} } )
```