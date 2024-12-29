const fs = require('fs');
const path = require('path');

function decodeBase64(data) {
    return Buffer.from(data, 'base64').toString('utf-8');
}

exports.handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: 'Method Not Allowed',
            };
        }

        // Decode Base64 data
        const logs = decodeBase64(event.body);

        const filePath = path.join('/tmp', 'uploaded_logs.txt');

        // Save logs to a file on the server
        fs.writeFileSync(filePath, logs, 'utf8');

        console.log('Received decoded logs:', logs);

        return {
            statusCode: 200,
            body: 'Logs successfully uploaded!',
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error: ${error.message}`,
        };
    }
};
