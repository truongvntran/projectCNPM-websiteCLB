# Truy vấn một mảng tài liệu nhúng 

Truy vấn cho một tài liệu được lồng trong một mảng
Chỉ định một điều kiện truy vấn trên một trường trong một mảng tài liệu
Chỉ định nhiều điều kiện cho mảng tài liệu
Hướng dẫn truy vấn bổ sung

---
**Tạo mới Collection**

 db.createCollection("story")
tạo mới collection

Trang này cung cấp các ví dụ về hoạt động truy vấn trên một mảng tài liệu lồng nhau bằng cách sử dụng `db.collection.find()`phương thức trong `mongosh`. Các ví dụ trên trang này sử dụng `story` bộ sưu tập. Để điền `story` bộ sưu tập, hãy chạy như sau:

```
db.story.insertMany([
    { item: "Xuan11", instock: [ { warehouse: "A", qty: 15 }, { warehouse: "C", qty: 25 } ] },
    {item: "Xuan22", instock: [ { warehouse: "C", qty: 15 } ] },
    {item: "Xuan33", instock: [ { warehouse: "A", qty: 70 }, { warehouse: "B", qty: 25 } ] },
    {item: "Xuan44", instock: [ { warehouse: "A", qty: 50 }, { warehouse: "B", qty: 15 } ] },
    {item: "Xuan55", instock: [ { warehouse: "B", qty: 25 }, { warehouse: "C", qty: 45 } ] }
])
```

```
kiểm tra collection
db.story.find({})
```

**Truy vấn cho một tài liệu được lồng trong một mảng**

Ví dụ sau đây chọn tất cả các tài liệu trong đó một phần tử trong `instock` mảng khớp với tài liệu được chỉ định:

```
db.story.find( {"instock": {warehouse: "A", qty: 15} } )
show 1
```

Đối sánh ngang bằng trên toàn bộ tài liệu được nhúng / lồng nhau yêu cầu khớp chính xác của tài liệu được chỉ định, bao gồm cả thứ tự trường. Ví dụ: truy vấn sau không khớp với bất kỳ tài liệu nào trong `story` bộ sưu tập:

```
db.story.find( {"instock": {qty:15,warehouse:"A"} } )
show 0
```

**Chỉ định một điều kiện truy vấn trên một trường trong một mảng tài liệu**
Chỉ định một điều kiện truy vấn trên một trường được nhúng trong một mảng tài liệu

Nếu bạn không biết vị trí chỉ mục của tài liệu được lồng trong mảng, hãy nối tên của trường mảng, với dấu chấm (` .`) và tên của trường trong tài liệu lồng nhau.

Ví dụ sau đây chọn tất cả các tài liệu trong đó `instock`mảng có ít nhất một tài liệu được nhúng chứa trường `qty` có giá trị nhỏ hơn hoặc bằng `20`:

```
db.story.find( {"instock.qty": {$lte: 20} } ) 
show 3 qty bé hơn hoặc bằng 20
```

**Sử dụng chỉ mục mảng để truy vấn cho một trường trong tài liệu được nhúng**

Sử dụng `ký hiệu dấu chấm` , bạn có thể chỉ định điều kiện truy vấn cho trường trong tài liệu tại một chỉ mục hoặc vị trí cụ thể của mảng. Mảng sử dụng lập chỉ mục dựa trên số không.

```
NOTE
Khi truy vấn bằng ký hiệu dấu chấm, trường và chỉ mục phải nằm trong dấu ngoặc kép.
```

Ví dụ sau đây chọn tất cả các tài liệu trong đó `instock` mảng có phần tử đầu tiên là tài liệu chứa trường `qty` có giá trị nhỏ hơn hoặc bằng `20`:

```
db.story.find( {"instock.0.qty": {$lte:20} } )
show 2 qty chỉ số 0 bé hơn hoặc bằng 20
```

**Chỉ định nhiều điều kiện cho mảng tài liệu**
Khi chỉ định các điều kiện trên nhiều trường được lồng trong một mảng tài liệu, bạn có thể chỉ định truy vấn sao cho một tài liệu duy nhất đáp ứng các điều kiện này hoặc bất kỳ tổ hợp tài liệu nào (bao gồm một tài liệu duy nhất) trong mảng đáp ứng các điều kiện.

**Một tài liệu lồng nhau đáp ứng nhiều điều kiện truy vấn trên các trường lồng nhau**

Sử dụng `$elemMatch` toán tử để chỉ định nhiều tiêu chí trên một mảng tài liệu nhúng sao cho ít nhất một tài liệu nhúng đáp ứng tất cả các tiêu chí đã chỉ định.

Ví dụ sau đây truy vấn cho các tài liệu trong đó `instock` mảng có ít nhất một tài liệu nhúng có chứa cả trường `qty` bằng `15` và trường `warehouse` bằng` A`:

```
db.story.find( {"instock": {$elemMatch: {qty: 15, warehouse:"A"} } } )
ít nhất 1 tài liệu có chứa 2 trường qty:15 và warehouse:"A"
show 1
```

Ví dụ sau đây truy vấn cho các tài liệu trong đó `instock` mảng có ít nhất một tài liệu nhúng có chứa trường `qty` lớn hơn `20` và nhỏ hơn hoặc bằng `30`:

```
db.story.find( {"instock": {$elemMatch: {qty:{$gt:20, $lte:30} } } } )
có ít nhất 1 tài liệu có chứa trường qty lớn hơn 20 và nhỏ hơn hoặc bằng 30
show 3
```

**Sự kết hợp của các yếu tố đáp ứng các tiêu chí**
Nếu điều kiện truy vấn kết hợp trên một trường mảng không sử dụng `$elemMatch` toán tử, truy vấn sẽ chọn những tài liệu có mảng chứa bất kỳ tổ hợp phần tử nào thỏa mãn điều kiện.

Ví dụ: truy vấn sau phù hợp với các tài liệu trong đó bất kỳ tài liệu nào được lồng trong `instock` mảng có `qty` trường lớn hơn `20` và bất kỳ tài liệu nào (nhưng không nhất thiết phải là cùng một tài liệu được nhúng) trong mảng có `qty` trường nhỏ hơn hoặc bằng `30`:

```
db.story.find( {"instock.qty": {$gt:20, $lte:30} } )
truy vấn vẫn sẽ chọn tài liệu có mảng chứa bất kỳ tổ hợp phần tử nào thỏa mãn điều kiện
show 4
```

Ví dụ sau đây truy vấn cho các tài liệu trong đó `instock` mảng có ít nhất một tài liệu nhúng chứa trường `qty` bằng `15`và ít nhất một tài liệu nhúng (nhưng không nhất thiết phải là cùng một tài liệu nhúng) có chứa trường `warehouse` bằng `A`:

```
db.story.find( {"instock.qty":15,"instock.warehouse":"A"} )
```