const Service = require('../service/service');

exports.getProducts = async (_req, res) => {
    try {
        const products = await Service.getProducts();
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByPage = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const pageNo = parseInt(req.query.pageNo);
        if (isNaN(pageNo) || isNaN(limit) || limit < 1 || pageNo < 1) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid page number' });
        }

        const products = await Service.getProductsByPage(limit, pageNo);
        res.json({ success: true, products });
    } catch (err) {
        console.error('Error retrieving spreadsheet data:', err);
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsPageCount = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        if (isNaN(limit) || limit < 1) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid limit' });
        }
        const pageCount = await Service.getProductsPageCount(limit);
        res.json({ success: true, pageCount });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.newLead = async (req, res) => {
    try {
        const payload = req.body;
        if (payload === undefined || (payload.name === "" && payload.contact === "" && payload.phone === "")) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid payload' });
        }

        const newLead = await Service.newLead(payload);
        res.json({ success: true, newLead });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getBestSellingProducts = async (_req, res) => {
    try {
        const products = await Service.getBestSellingProducts();
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}