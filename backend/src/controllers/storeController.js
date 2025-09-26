import db from '../config/db.js';

export const addStore = async (req, res) => {
    const { name, email, address, owner_id } = req.body;

    if (!name || !email || !address || !owner_id) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        const [result] = await db.query('INSERT INTO stores (name, email, address, owner_id VALUES (?,?,?,?)', [name, email, address, owner_id]);

        res.status(201).json({
            msg: 'Store added successfully',
            store: {
                id: result.insertId,
                name, email, address, owner_id
            }
        })
    } catch (err) {
        res.status(500).json({ msg: 'Error adding store', error: err.message });
    }
}

export const getStores = async (req, res) => {
    const { name, address } = req.query;

    let query = `SELECT s.id, s.name, s.email, s.address,
    (SELECT AVG(rating) FROM ratings WHERE store_id = s.id) AS
    avg_rating FROM stores s WHERE 1=1`;

    const params = [];

    if (name) {
        query += "AND s.name LIKE ?";
        params.push(`%${name}%`);
    }

    if (address) {
        query += "AND s.address LIKE ?";
        params.push(`%${address}%`);
    }

    try {
        const [stores] = await db.query(query, params);

        res.status(200).json({ msg: "Fetched Stores successfully", stores: { stores } });
    } catch (err) {
        res.status(500).json({ msg: "Error Fetching Stores", error: err.message });
    }

}
export const getStoreDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const [stores] = await db.query(
            `SELECT s.*,
            SELECT AVG(rating) FROM ratings WHERE store.id = s.id as avg_rating 
            FROM stores s WHERE s.id = ?`, [id]
        )
    } catch (err) {
        res.status(500).json({
            msg: 'Error fetchimg store details',
            error: err.message
        })
    }
}
