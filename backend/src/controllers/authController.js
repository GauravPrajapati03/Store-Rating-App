import db from '../config/db.js'
import { hashPassword, comparePassword } from '../utils/hashPassword.js';
import generateToken from '../utils/jwtToken.js';


export const registerUser = async (req, res) => {
    // console.log(req.body);
    const { name, email, address, password } = req.body;

    if (!name || !email || !address || !password) {
        return res.status(400).json({ msg: 'All fields are required' })
    }

    try {
        const [exists] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (exists.length > 0) {
            return res.status(400).json({ msg: 'User already exists' })
        }

        const hashedPassword = await hashPassword(password);
        const [result] = await db.query('INSERT INTO users (name, email, address, password, role) VALUES (?, ?, ?, ?, ?)', [name, email, address, hashedPassword, 'USER']);
        // console.log(result);

        // const token = await generateToken(result.insertId, email);
        // res.cookie('token', token, { httpOnly: true });

        res.status(201).json({ msg: 'User created successfully', user: { id: result.insertId, name, email, address } });
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'User Registration Error', error: err })
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Enter Email and Password' })
    }

    try {

        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ msg: 'Invalid Email or Password' })
        }

        const user = users[0];

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Email or Password' })
        }

        const token = generateToken(user.id, user.role);
        res.cookie('token', token);

        res.status(200).json({ msg: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email, role: user.role, address: user.address } });

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Login Error', error: err })
    }
}

export const logoutUser = async (req, res) => {

    res.clearCookie('token');
    res.status(200).json({ msg: 'Logout successful' });
}