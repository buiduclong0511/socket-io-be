const { Server } = require("socket.io");

// Tạo server socket
const server = new Server({
    // Cấu hình cors cho phép http://127.0.0.1:5500 truy cập
    cors: ['http://127.0.0.1:5500']
});

// Biến messages dùng để lưu các message được gửi lên 
const messages = []

// Lắng nghe sự kiện 1 client connect
server.on("connection", (client) => {
    // Mỗi 1 client sẽ có 1 id riêng biệt
    console.log('Someone connected.', client.id)

    // Khi client connect thì sẽ dispatch event server_send_current_messages
    // gửi xuống danh sách messages hiện có
    client.emit('server_send_current_messages', messages)

    // Lắng nghe sự kiện client_send_message khi client click nút send
    client.on('client_send_message', (data) => {
        // Thêm mới 1 message
        messages.push(data)
        // Gửi thông tin message mới cho toàn bộ client
        server.emit('server_send_message', data)
    })

    client.on("disconnect", (reason) => {
        console.log(client.id + ' disconnected.')
    });
});

server.listen(3000);
