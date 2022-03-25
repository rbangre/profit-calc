const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json()); 

// BET API // 

// creating a new bet
app.post('/bets', async (req, res) => {
    try {
        const { wager, odds, result } = req.body;
        const newBet = await pool.query(
            'INSERT INTO bets (wager, odds, result) VALUES ($1, $2, $3) RETURNING *',
            [wager, odds, result]
        );
        res.json(newBet.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
}); 

// retrieving all bets

app.get('/bets', async (req, res) => {
    try {
        const allBets = await pool.query('SELECT * FROM bets');
        res.json(allBets.rows);
    } catch(err) {
        console.error(err.message); 
    }
}); 

// retrieving a single bet based on bet id

app.get('/bets/:bet_id', async (req, res) => {
    try {
        const { bet_id } = req.params;
        const bet = await pool.query('SELECT * FROM bets WHERE bet_id = $1', [bet_id]);
        res.json(bet.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
}); 

// delete a single bet based on bet id
app.delete('/bets/:bet_id', async (req, res) => {
    try {
        const { bet_id } = req.params;
        const bet = await pool.query('DELETE FROM bets WHERE bet_id = $1', [bet_id]);
        res.json({ msg: 'Bet deleted' });
    } catch (err) {
        console.error(err.message);
    }
}); 


// USER API // 

// create a new user
app.post('/users', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, password]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// retrieve all users
app.get('/users', async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM users');
        res.json(allUsers.rows);
    } catch(err) {
        console.error(err.message); 
    }
}); 

// retrieve a single user based on username
app.get('/users/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        res.json(user.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
});

// delete a single user based on username
app.delete('/users/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await pool.query('DELETE FROM users WHERE username = $1', [username]);
        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
    }
}); 



app.listen(5001, () => {
    console.log("server has started"); 
})
