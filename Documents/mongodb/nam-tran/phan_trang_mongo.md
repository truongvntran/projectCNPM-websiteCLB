Để xác định số lượng kết quả trả về và số thứ tự kết quả được lấy ta sử dụng method limit() và skip()

**limit()**

*Method limit() được dùng sau method find() để xác định tối đa số kết quả trả về:*

Ẽx: muốn lấy 2 document của collection users:

    `db.users.find().limit(2)`

**skip()**

*Method skip() được dùng để xác định sẽ lấy document trong kết quả ở vị trí thứ bao nhiêu bằng cách bỏ qua các document trước đó.*

Ví dụ: muốn lấy 2 document của collection users từ vị trí thứ 3:

    `db.users.find().limit(2).skip(2);`

**Để phân trang trong MongoDB ta sẽ sử dụng kết hợp limit() và skip()**
ví dụ: chia kết quả thành các trang (page), mỗi trang có 5 kết quả.
Bây giờ muốn lấy kết quả trang thứ n (n bắt đầu từ 0) thì câu lệnh sẽ là:

    `db.users.find().limit(5).skip(5*n)`