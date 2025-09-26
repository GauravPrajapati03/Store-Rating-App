import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import cookieParser from "cookie-parser";
import pool from "./src/config/db.js";
import authRoutes from './src/routes/authRoutes.js'

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


// Routes
app.use('/api/auth', authRoutes)


// Get all users
// app.get('/users', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM users');
//     console.log(rows)
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// app.get('/users', async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM users');
//         res.json(rows);
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// Add a new user
// app.post('/users', async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const [result] = await pool.query(
//       'INSERT INTO users (name, email) VALUES (?, ?)',
//       [name, email]
//     );
//     console.log(`User added:`, result);
//     res.status(201).json({ id: result.insertId, name, email });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });


app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO users (name, email) VALUES (? , ?', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server Error' })
    }
})


export default app;