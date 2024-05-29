const fs = require('fs');

function logUserJoin(user) {
    const logMessage = `${user.username} has joined the server`;
    fs.appendFileSync('server.log', `${new Date().toISOString()}: ${logMessage}\n`);
}

function logUserLeave(user) {
    const logMessage = `${user.username} has left the server`;
    fs.appendFileSync('server.log', `${new Date().toISOString()}: ${logMessage}\n`);
}

function logMessageEdit(user, oldContent, newContent) {
    const logMessage = `${user.username} edited a message from "${oldContent}" to "${newContent}"`;
    fs.appendFileSync('server.log', `${new Date().toISOString()}: ${logMessage}\n`);
}

function logMessageDelete(user, content) {
    const logMessage = `${user.username} deleted a message with content: "${content}"`;
    fs.appendFileSync('server.log', `${new Date().toISOString()}: ${logMessage}\n`);
}

module.exports = {
    logUserJoin,
    logUserLeave,
    logMessageEdit,
    logMessageDelete
};