const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
    }

    const logs = event.body;
    const filePath = path.join('/tmp', 'uploaded_logs.txt');

    // Save logs to a file on the server
    fs.writeFileSync(filePath, logs, 'utf8');

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
