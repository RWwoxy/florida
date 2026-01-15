const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const USERS = "./data/users.json";
const APPS = "./data/apps.json";

// Admin sabit
const ADMIN = {
  user: "ADMİN BEY",
  pass: "adminpro2121"
};

function read(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
function write(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Kayıt
app.post("/register", (req, res) => {
  const users = read(USERS);
  users.push(req.body);
  write(USERS, users);
  res.json({ ok: true });
});

// Giriş
app.post("/login", (req, res) => {
  const { user, pass } = req.body;
  if (user === ADMIN.user && pass === ADMIN.pass)
    return res.json({ admin: true });

  const users = read(USERS);
  const found = users.find(u => u.user === user && u.pass === pass);
  res.json({ ok: !!found });
});

// Uygulama ekle (SADECE ADMIN)
app.post("/add-app", (req, res) => {
  const apps = read(APPS);
  apps.push(req.body);
  write(APPS, apps);
  res.json({ ok: true });
});

// Uygulamaları getir (HERKES)
app.get("/apps", (req, res) => {
  res.json(read(APPS));
});

app.listen(3000, () =>
  console.log("FLORİDA APPLICATION çalışıyor : http://localhost:3000")
);
