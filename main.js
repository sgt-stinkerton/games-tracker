const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let serverProcess;

function startBackend() {
    const jarPath = path.join(__dirname, 'backend/target/backend-0.0.1-SNAPSHOT.jar');
    serverProcess = spawn('java', ['-jar', jarPath]);

    serverProcess.stdout.on('data', (data) => console.log(`Java: ${data}`));
    serverProcess.stderr.on('data', (data) => console.error(`Java Error: ${data}`));
}

app.whenReady().then(() => {
    startBackend();
    const win = new BrowserWindow({ width: 1200, height: 800 });

    // In development, load React dev server
    // In production, load built index.html
    win.loadURL('http://localhost:3000');
});

app.on('window-all-closed', () => {
    if (serverProcess) serverProcess.kill();
    app.quit();
});