require("dotenv").config(".env");
const express = require('express');
const cors = require('cors');
const ChatRoutes = require('./routes/ChatRoutes');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
// const io = socketIo(server);

const io = require('socket.io')(server, {
    maxHttpBufferSize: 5 * 1024 * 1024,
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
        credentials: true
    }
});

global.io = io;

require('./controllers/SocketController')(io);

app.get('/', (req, res) => {
    res.send('Chat app is live here.');
});

app.use('/api', ChatRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
