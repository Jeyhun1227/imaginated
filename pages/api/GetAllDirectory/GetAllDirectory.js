const PoolConnection = require('../postgressql')


export default async (req, res) => {

    if (req.method === 'POST') {
        // SELECT LINKNAME FROM INDIVIDUAL;
        // SELECT CATEGORY FROM CATEGORY;
        // SELECT CATEGORYNAME, SUBCATEGORY FROM SUBCATEGORY;
        var individual = await PoolConnection.query('SELECT LINKNAME FROM INDIVIDUAL;');
        var category = await PoolConnection.query('SELECT CATEGORY FROM CATEGORY;');
        var subcategory = await PoolConnection.query('SELECT CATEGORYNAME, SUBCATEGORY FROM SUBCATEGORY;');

        return res.status(200).json({individual: individual.rows, category: category.rows, subcategory: subcategory.rows});

    }

        
}