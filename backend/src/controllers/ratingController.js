import db from '../config/db.js';

//users: Add or update rating
export const addOrUpdateRating = async (req, res) => {
    const { store_id, rating } = req.body;
    const user_id = req.user.id;

    if (!store_id || !rating) {
        return res.status(400).json({ msg: 'All fields are Required' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ msg: "Rating must be between 1 and 5" });
    }

    try {
        const [rows] = await db.query("SELECT * FROM ratings WHERE user_id = ? AND store_id = ?", [user_id, store_id]);

        if (rows.length > 0) {
            // Update existing rating
            await db.query("UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?", [rating, user_id, store_id]);

            const [updatedRows] = await db.query("SELECT * FROM ratings WHERE user_id = ? AND store_id = ?", [user_id, store_id]);

            const updatedRating = updatedRows[0];

            res.status(200).json({
                msg: "Rating updated Successfully",
                id: updatedRating.id,
                user_id: updatedRating.user_id,
                store_id: updatedRating.store_id,
                rating: updatedRating.rating,
                created_at: updatedRating.created_at,
                updated_at: updatedRating.updated_at
            });
        }
        else {
            // Add new rating
            const [insertResult] = await db.query("INSERT INTO ratings (user_id, store_id, rating) VALUES (?,?,?) ", [user_id, store_id, rating]);

            const [newRows] = await db.query(
                "SELECT * FROM ratings WHERE id = ?",
                [insertResult.insertId]
            );

            const newRating = newRows[0];

            res.status(201).json({
                msg: "Rating added Successfully",
                id: newRating.id,
                user_id: newRating.user_id,
                store_id: newRating.store_id,
                rating: newRating.rating,
                created_at: newRating.created_at,
                updated_at: newRating.updated_at
            });
        }
    } catch (err) {
        res.status(500).json({ msg: "Error submitting rating", error: err.message });
    }
}


//users: get user rating for a store
export const getUserRatingForStore = async (req, res) => {
    const { storeId } = req.params;
    const user_id = req.user.id;

    try {
        const [ratings] = await db.query("SELECT rating FROM ratings WHERE user_id = ? AND store_id = ?", [user_id, storeId]);

        if (ratings.length === 0) {
            return res.status(200).json({ msg: "No rating found", rating: null });
        }

        res.status(200).json({ msg: "Fetched rating successfully", rating: ratings[0].rating, storeId: storeId });

    } catch (err) {
        res.status(500).json({ msg: "Error fetching rating", error: err.messsage });
    }

}

// store owner: view ratings for their store
export const getRatingsForStoreOwner = async (req, res) => {
    const owner_id = req.user.id;

    try {
        const [storeRows] = await db.query("SELECT * FROM stores WHERE owner_id = ?", [owner_id]);

        if (storeRows.length === 0) {
            return res.status(404).json({ msg: "Store not Found for this owner" });
        }

        const store_id = storeRows[0].id;

        const [ratings] = await db.query(
            `SELECT r.id, r.rating, u.name as user_name, u.email as user_email, r.created_at
                FROM ratings r
                JOIN users u ON r.user_id = u.id
                WHERE r.store_id = ?`,
            [store_id]
        );

        const [avgResult] = await db.query(
            "SELECT COALESCE(AVG(rating), 0) as avg_rating FROM ratings WHERE store_id = ?",
            [store_id]
        );

        const avg = parseFloat(avgResult[0].avg_rating) || 0;

        res.status(200).json({
            msg: "Fetched ratings and avg successfully",
            storeId: store_id,
            averageRating: Math.round(avg * 10) / 10,
            ratings
        });

    } catch (err) {
        res.status(500).json({
            msg: "Error fetching ratings for store owner",
            error: err.message
        });
    }
};