const express = require('express');
const { Client, LocalAuth, Buttons, List } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 911;
const server = http.createServer(app);
const io = socketIo(server);

// Use LocalAuth to store session data
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.toDataURL(qr, (err, url) => {
        io.emit('qr', url);
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
    io.emit('ready', 'WhatsApp Client is ready!');
});

client.on('authenticated', (session) => {
    console.log('Authenticated');
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

// Function to write phone numbers to list.txt without duplication
const writeToList = (number) => {
    const filePath = path.join(__dirname, 'list.txt');

    // Read existing data
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error(err);
            return;
        }

        const numbers = data ? data.split('\n') : [];

        if (!numbers.includes(number)) {
            numbers.push(number);
            fs.writeFile(filePath, numbers.join('\n'), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    });
};

client.on('message_create', message => {
    console.log(message.body);
    const number = message.from;
    writeToList(number);
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
        console.log('yes!');
    } else if (msg.body == '!contacts') {
        client.getChats().then(chats => {
            let contactList = 'Recent Chats:\n';
            chats.forEach((chat, index) => {
                if(index < 10) { // Limiting to 10 recent chats
                    contactList += `${index + 1}. ${chat.name || chat.id.user}\n`;
                }
            });
            msg.reply(contactList);
        });
    } else if (msg.body == '!buttons') {
        let button = new Buttons('Button body', [{ body: 'Button 1' }, { body: 'Button 2' }, { body: 'Button 3' }], 'Title', 'Footer');
        msg.reply(button);
        client.sendMessage(msg.from, button);
    }
});

client.initialize();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
