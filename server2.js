const express = require('express');
const mysql = require('mysql2/promise'); // Utiliser mysql2/promise
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Connexion à la base de données avec mysql2/promise
const db = mysql.createPool({
    host: 'sql307.infinityfree.com',
    user: 'if0_38099393', // Remplacez par votre utilisateur MySQL
    password: 'JCodUwqQbmJ ', // Remplacez par votre mot de passe MySQL
    database: 'if0_38099393_site_web', // Nom de la base que vous avez créée
});


// Route pour obtenir tous les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM user'); // Retourne un tableau contenant [résultats, metadata]
        res.json(rows); // Envoyer uniquement les résultats
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour obtenir un utilisateur par ID
app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const [rows] = await db.query('SELECT nom, prenom FROM user WHERE id = ?', [userId]);
        if (rows.length > 0) {
            res.json(rows[0]); // Envoyer le premier utilisateur trouvé
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
