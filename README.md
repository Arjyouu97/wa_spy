
# WhatsApp Web Client with Express and Socket.IO

This project creates a simple web server using Express and Socket.IO to interact with WhatsApp Web using the `whatsapp-web.js` library. The server displays a QR code for authentication and allows interaction with WhatsApp messages.

## Features

- Displays a QR code for WhatsApp Web authentication.
- Logs incoming messages and replies with specific commands.
- Stores unique phone numbers from incoming messages into a file.
- Responds to commands like `!ping`, `!contacts`.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arjyouu97/wa_spy.git
   cd whatsapp-web-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the server:**
   ```bash
   node target.js
   ```

## Usage

1. **Access the web page:**
   Open your browser and navigate to `http://localhost:911`. wait 10 sec You will see a QR code.

2. **Scan the QR code:**
   Open WhatsApp on your phone, go to the menu, select "WhatsApp Web", and scan the QR code displayed on the webpage.

3. **Interact with WhatsApp:**
   - Send `!ping` to receive `pong`.
   - Send `!contacts` to get a list of recent chats.

## Project Structure

```
.
├── index.js          # Main server file
├── package.json      # Project dependencies
├── package-lock.json # Dependency lock file
├── list.txt          # File to store unique phone numbers
└── index.html        # HTML file to display QR code
```

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [whatsapp-web.js](https://www.npmjs.com/package/whatsapp-web.js)
- [qrcode](https://www.npmjs.com/package/qrcode)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [fs](https://nodejs.org/api/fs.html)
- [path](https://nodejs.org/api/path.html)

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License.
