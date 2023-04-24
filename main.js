const axios = require("axios");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const url_txt = fs.readFileSync("WebHookURL.txt");

const windowoption = {
  width: 250,
  height: 200,
  resizable: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
  icon: path.join(__dirname, "discord.png"),
};

(function () {
  let win;
  app.whenReady().then(() => {
    win = new BrowserWindow(windowoption);
    win.removeMenu();
    win.loadFile("main.html");
  });
})();

ipcMain.on("start", async (event, arg) => {
  const url = url_txt;

  const msg = "```" + arg.msg + "```";

  const bot = {
    username: "CODE BOT",
    avatar_url:
      "https://cdn.discordapp.com/attachments/1099570532527116342/1099570559953678356/image.png",
    content: msg,
  };

  const data = JSON.stringify(bot);

  axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.log(error);
    });
});
