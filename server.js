const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Remplacez par votre utilisateur MySQL
    password: 'root', // Remplacez par votre mot de passe MySQL
    database: 'siteweb' // Nom de la base que vous avez créée
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL.');
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT nom, prenom FROM user WHERE id = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la requête SQL :', err);
            res.status(500).json({ message: 'Erreur serveur' });
            return;
        }

        if (result.length > 0) {
            res.json(result[0]); // Envoyer seulement le premier résultat
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    });
});

app.get('/users', async(req, res) => {
    
    try{
        const [rows] = await db.query('SELECT * FROM user');
        res.json(rows);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});