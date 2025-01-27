const express = require('express');
const mysql = require('mysql2/promise'); // Utiliser mysql2/promise
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const user_file_path = path.join('C:/Users/Mathis/OneDrive/Documents/Programs/BackEndAPI', '/user.json')
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());



// Route pour obtenir tous les utilisateurs
app.get('/users', (req, res) => {
    const users = getUsersFromFile();
    res.json(users);
});

// Route pour obtenir un utilisateur par ID
app.get('/user/:id', (req, res) => {
    const users = getUsersFromFile();
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user){
        res.json(user);
    }
    else{
        res.status(404).json({error : "User not found."});
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});



function getUsersFromFile(){
    const data = fs.readFileSync(user_file_path, "utf-8");
    return JSON.parse(data);
};