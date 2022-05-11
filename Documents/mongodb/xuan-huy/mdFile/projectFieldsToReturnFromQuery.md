# Các trường dự án để trả về từ truy vấn

**Trên trang này**

Trả lại tất cả các trường trong tài liệu phù hợp
Trả lại các trường đã chỉ định và chỉ _idtrường
_idTrường đàn áp
Trả lại tất cả trừ các trường bị loại trừ
Trả lại các trường cụ thể trong tài liệu được nhúng
Loại bỏ các trường cụ thể trong tài liệu nhúng
Phép chiếu trên tài liệu được nhúng trong một mảng
Các phần tử mảng cụ thể của dự án trong mảng được trả về
Cân nhắc bổ sung

---
Theo mặc định, các truy vấn trong MongoDB trả về tất cả các trường trong tài liệu phù hợp. Để giới hạn số lượng dữ liệu mà MongoDB gửi đến các ứng dụng, bạn có thể bao gồm tài liệu `chiếu` để chỉ định hoặc hạn chế các trường trả về.

Trang này cung cấp các ví dụ về hoạt động truy vấn với phép chiếu sử dụng `db.collection.find()` phương pháp trong `mongosh`. Các ví dụ trên trang này sử dụng FieldsQuery bộ sưu tập. Để điền FieldsQuery bộ sưu tập, hãy chạy như sau:

```
db.createCollection("FieldsQuery")
tạo mới collection
```

```
db.FieldsQuery.insertMany( [
  { item: "journal", status: "A", size: { h: 24, w: 31, uom: "cm" }, instock: [ { warehouse: "A", qty: 15 } ] },
  { item: "notebook", status: "A",  size: { h: 18.5, w: 21, uom: "in" }, instock: [ { warehouse: "C", qty: 15 } ] },
  { item: "paper", status: "D", size: { h: 18.5, w: 21, uom: "in" }, instock: [ { warehouse: "A", qty: 70 } ] },
  { item: "planner", status: "D", size: { h: 32.85, w: 40, uom: "cm" }, instock: [ { warehouse: "A", qty: 50 } ] },
  { item: "postcard", status: "A", size: { h: 20, w: 25.25, uom: "cm" }, instock: [ { warehouse: "B", qty: 25 }, { warehouse: "C", qty: 45 } ] }
]);
insert dữ liệu vào document
```

**Trả lại tất cả các trường trong tài liệu phù hợp**

Nếu bạn không chỉ định tài liệu chiếu , `db.collection.find()` phương thức trả về tất cả các trường trong tài liệu phù hợp.

Ví dụ sau trả về tất cả các trường từ tất cả các tài liệu trong `FieldsQuery` bộ sưu tập có giá trị `status` bằng `"A"`:

```
db.FieldsQuery.find( {status:"A"} )
show 3
```

Hoạt động tương ứng với câu lệnh SQL sau:
```
SELECT * from inventory WHERE status = "A"
```

**Trả lại các trường đã chỉ định và chỉ _idtrường**

Một phép chiếu có thể bao gồm một số trường một cách rõ ràng bằng cách đặt thành `<field>` trong `1` tài liệu chiếu. Thao tác sau đây trả về tất cả các tài liệu phù hợp với truy vấn. Trong tập kết quả, chỉ `item` và `status`, theo mặc định, các `_id` trường trả về trong các tài liệu phù hợp.

```
db.FieldsQuery.find( {status:"A"}, {item:1,status:1} )
Hiển thị 3 kết quả, chỉ hiển thị 3 trường id,item,status
```

Hoạt động tương ứng với câu lệnh SQL sau:

```
SELECT _id, item, status from inventory WHERE status = "A"
```

**`_id`Trường đàn áp**

Bạn có thể xóa `_id` trường khỏi kết quả bằng cách đặt trường thành `0`trong phép chiếu, như trong ví dụ sau:

```
db.FieldsQuery.find( {status:"A"}, {item:1,status:1,_id:0} )
xóa trường _id khỏi kết quả, chỉ hiển thị 2 trường item, status
```

Hoạt động tương ứng với câu lệnh SQL sau:

```
SELECT item, status from inventory WHERE status = "A"
```

```
NOTE
Ngoại trừ `_id` trường, bạn không thể kết hợp các câu lệnh bao gồm và loại trừ trong tài liệu chiếu.
```

**Trả lại tất cả trừ các trường bị loại trừ**

Thay vì liệt kê các trường cần trả về trong tài liệu phù hợp, bạn có thể sử dụng phép chiếu để loại trừ các trường cụ thể. Ví dụ sau trả về tất cả các trường ngoại trừ trường `status` và các `instock` trường trong tài liệu phù hợp:

```
db.FieldsQuery.find( {status:"A"},{status:0, instock:0} )
xóa trường status,instock khỏi kết quả, hiển thị các trường còn lại
```

```
NOTE
Ngoại trừ trường `_id`, bạn không thể kết hợp các câu lệnh bao gồm và loại trừ trong tài liệu chiếu.
```

**Trả lại các trường cụ thể trong tài liệu được nhúng**

Bạn có thể trả về các trường cụ thể trong một tài liệu nhúng. Sử dụng `ký hiệu dấu chấm` để tham chiếu đến trường nhúng và đặt thành `1`trong tài liệu chiếu.

Ví dụ sau trả về:

Trường `_id`(trả về theo mặc định),
Các `item` lĩnh vực,
Các `status`lĩnh vực,
Trường `uom` trong `size` tài liệu.
Trường `uom` vẫn được nhúng trong `size` tài liệu.

```
db.FieldsQuery.find( {status:"A"},{item:1,status:1,"size.uom":1} )
show 3, chỉ hiển thị 3 trường item,status,size.uom ( trường id mặc định hiển thị)
```

Bắt đầu từ MongoDB 4.4, bạn cũng có thể chỉ định các trường nhúng bằng cách sử dụng biểu mẫu lồng nhau, ví dụ `{ item: 1, status: 1, size: { uom: 1 } }`.

**Loại bỏ các trường cụ thể trong tài liệu nhúng**

Bạn có thể chặn các trường cụ thể trong một tài liệu nhúng. Sử dụng `ký hiệu dấu chấm` để tham chiếu đến trường nhúng trong tài liệu chiếu và đặt thành `0`.

Ví dụ sau chỉ định một phép chiếu để loại trừ trường `uom` bên trong `size` tài liệu. Tất cả các trường khác được trả về trong các tài liệu phù hợp:

```
db.FieldsQuery.find( {status:"A"},{"size.uom":0} )
show 3, xóa trường size.uom khỏi kết quả, hiển thị các trường còn lại ( trường id mặc định hiển thị)
```

Bắt đầu từ MongoDB 4.4, bạn cũng có thể chỉ định các trường nhúng bằng cách sử dụng biểu mẫu lồng nhau, ví dụ `{ size: { uom: 0 } }`.

**Phép chiếu trên tài liệu được nhúng trong một mảng**

Sử dụng `ký hiệu dấu chấm` để chiếu các trường cụ thể bên trong tài liệu được nhúng trong một mảng.

Ví dụ sau chỉ định một phép chiếu để trả về:

Trường `_id`(trả về theo mặc định),
Các `item` lĩnh vực,
Các `status` lĩnh vực,
Trường `qty` trong tài liệu được nhúng trong `instock` mảng.

```
db.FieldsQuery.find( {status:"A"},{item:1, status:1, "instock.qty":1} )
show 3, chỉ hiển thị 3 trương item,status,instock ( trường id mặc định hiển thị)
```

**Các phần tử mảng cụ thể của dự án trong mảng được trả về**

Đối với các trường chứa mảng, MongoDB cung cấp các toán tử phép chiếu sau để thao tác với mảng `$elemMatch`:, `$slice` và `$`.

Ví dụ sau sử dụng toán tử phép chiếu `$slice` để trả về phần tử cuối cùng trong `instock` mảng:

```
db.FieldsQuery.find( {status:"A"}, { item:1,status:1,instock: { $slice:-1 } } )
show 3, chỉ hiển thị 3 trường item,status,instock(cuối), $slice trả về phần tử cuối
```

`$elemMatch`, `$slice` và `$` là cách *duy nhất* để chiếu các phần tử cụ thể để đưa vào mảng được trả về. Ví dụ: bạn *không thể* chiếu các phần tử mảng cụ thể bằng cách sử dụng chỉ mục mảng; ví dụ: `{ "instock.0": 1 }` phép chiếu sẽ *không* chiếu mảng có phần tử đầu tiên.

**Cân nhắc bổ sung**

Bắt đầu từ MongoDB 4.4, MongoDB thực thi các hạn chế bổ sung liên quan đến các phép chiếu. Xem `Các hạn chế về phép chiếu` để biết thêm chi tiết.