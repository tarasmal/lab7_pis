
const socketIo = require('socket.io');

const server = require('http').createServer();
const io = socketIo(server);

const connectedUsers = new Set();

io.on('connection', (socket) => {
    connectedUsers.add(socket.id);
    console.log(`Клієнт підключений. Кількість підключених користувачів: ${connectedUsers.size}`);

    socket.on('disconnect', () => {
        // Видалення відключеного користувача
        connectedUsers.delete(socket.id);
        console.log(`Клієнт відключений. Кількість підключених користувачів: ${connectedUsers.size}`);
    });

    socket.on('message', (message) => {
        const profitabilityMessage = `Повідомлення від головного бухгалтера: ${message}. Прибутковість культури рослинництва: ...`;
        io.emit('profitability-message', profitabilityMessage);
    });
});


server.listen(3000, () => {
    console.log('Сервер запущено на порті 3000');
});
