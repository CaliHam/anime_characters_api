// server.js
const express = require('express');

const pool = require('./db'); // Import the database connection pool
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM anime_characters');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/add_character', async (req, res) => {
    try {
      const { name, birthday, zodiac_sign, anime, likes, dislikes, image_url, wiki_page_url } = req.body;

			const query = 'INSERT INTO anime_characters (name, birthday, zodiac_sign, anime, likes, dislikes, image_url, wiki_page_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
      const values = [name, birthday, zodiac_sign, anime, likes, dislikes, image_url, wiki_page_url];
  
      const result = await pool.query(query, values);
        
      // Respond with the newly added character
			res.status(201).json({
				message: 'Character added successfully',
				character: result.rows[0]
			});
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
