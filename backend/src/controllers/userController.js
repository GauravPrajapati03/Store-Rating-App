import db from '../config/db.js';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';


export const addUser = async (req, res) => {
    // console.log(req.body);
    const { name, email, address, password } = req.body;
    if (!name || !email || !address || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await hashPassword(password);
        const [result] = await db.query('INSERT INTO users (name, email, address, password, role) VALUES (?, ?, ?, ?, ?)', [name, email, address, hashedPassword, 'USER']);

        res.status(201).json({ message: 'User added successfully', user: { id: result.insertId, name, email, address } });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
}
export const getUsers = async (req, res) => {
    const { name, email, address, role } = req.query;

    let query = 'SELECT id, name, email, address, role FROM users WHERE 1=1';
    const params = [];

    if (name) {
        query += 'AND name LIKE ?';
        params.push(`%${name}%`);
    }

    if (email) {
        query += 'AND email LIKE ?';
        params.push(`%${email}%`);
    }
    if (address) {
        query += 'AND address LIKE ?';
        params.push(`%${address}%`);
    }
    if (role) {
        query += 'AND role = ?';
        params.push(role);
    }

    try {
        const [users] = await db.query(query, params);

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}

export const getUserDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const [users] = await db.query('SELECT id, name, email, address, role FROM users WHERE id = ?', [id]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[0];

        if (user.role === 'OWNER') {
            const [store] = await db.query(
                `SELECT s.id, s.name, s.address,
                (SELECT AVG(rating) FROM ratings WHERE store_id = s.id as avg_rating
                FROM stores s WHERE s.owner_id = ?`, [id]
            );
            user.store = store.length ? store[0] : null;
        }

        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching user details', error: error.message });
    }
}
export const getDashboardStats = async (req, res) => {
    try {
        const [[usersCount]] = await db.query("SELECT COUNT(*) as total_users FROM users");
        const [[storesCount]] = await db.query("SELECT COUNT(*) as total_stores FROM stores");
        const [[ratingsCount]] = await db.query("SELECT COUNT(*) as total_ratings FROM ratings");

        res.status(200).json({
            totalUsers: usersCount.totalUsers,
            totalStores: storesCount.totalStores,
            totalRatings: ratingsCount.totalRatings
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching dashboard stats', error: err.message });
    }
}

export const updateUserPassword = async (req, res) => {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Old password and new password are required' });
    }

    if (oldPassword === newPassword) {
        return res.status(400).json({ message: 'New password must be different from old password' });
    }

    try {
        const [rows] = await db.query("SELECT password FROM users WHERE id = ?", [userId]);

        if (!rows.length) {
            return res.status(404).json({ message: 'User not found' });
        }

        const valid = await comparePassword(oldPassword, rows[0].password);
        if (!valid) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        const hashedPassword = await hashPassword(newPassword);
        await db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);

        res.status(200).json({ message: 'Password updated successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Error updating password', error: err.message });
    }
}