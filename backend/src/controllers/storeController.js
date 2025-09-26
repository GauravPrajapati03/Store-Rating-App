import db from '../config/db.js';

export const addStore = async (req, res) => {
    const { name, email, address, owner_id } = req.body;

    // console.log(req.body);

    // const owner_id = req.user.id;
    // console.log(owner_id);

    if (!name || !email || !address || !owner_id) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        const [result] = await db.query('INSERT INTO stores (name, email, address, owner_id) VALUES (?,?,?,?)', [name, email, address, owner_id]);

        const [ownerCheck] = await db.query("SELECT role FROM users WHERE id = ?", [owner_id]);
        if (!ownerCheck.length || ownerCheck[0].role !== "owner") {
            return res.status(400).json({ message: "Invalid owner_id. Must belong to a store owner" });
        }

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
    // console.log(id);

    try {
        const [stores] = await db.query(
            `SELECT s.*,
                (SELECT AVG(rating) FROM ratings WHERE store_id = s.id) AS avg_rating 
            FROM stores s 
            WHERE s.id = ?`, [id]
        );

        if (stores.length === 0) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        res.status(200).json({
            msg: 'Store details fetched successfully',
            store: stores[0]
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Error fetching store details',
            error: err.message
        })
    }
}
