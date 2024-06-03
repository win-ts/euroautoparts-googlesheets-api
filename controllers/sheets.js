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

const productTypes = {
    "interior": "อะไหล่ภายใน",
    "exterior": "อะไหล่ภายนอก",
    "suspension": "อะไหล่ช่วงล่าง",
}

exports.getProductsByType = async (req, res) => {
    try {
        const category = req.params.category;
        if (category === undefined || category === "" || productTypes[category] === undefined) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid category' });
        }

        const products = await Service.getProductsByType(productTypes[category]);
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByTypePageCount = async (req, res) => {
    try {
        const category = req.params.category;
        const limit = parseInt(req.query.limit);
        if (category === undefined || category === "" || productTypes[category] === undefined || isNaN(limit) || limit < 1) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid category or limit' });
        }

        const pageCount = await Service.getProductsByTypePageCount(productTypes[category], limit);
        res.json({ success: true, pageCount });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByTypeWithPage = async (req, res) => {
    try {
        const category = req.params.category;
        const limit = parseInt(req.query.limit);
        const pageNo = parseInt(req.query.pageNo);
        if (category === undefined || category === "" || productTypes[category] === undefined || isNaN(pageNo) || isNaN(limit) || limit < 1 || pageNo < 1) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid category or page number' });
        }

        const products = await Service.getProductsByTypeWithPage(productTypes[category], limit, pageNo);
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByBrand = async (req, res) => {
    try {
        const brand = req.params.brand;
        if (brand === undefined || brand === "") {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid brand' });
        }

        const products = await Service.getProductsByBrand(brand);
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByBrandPageCount = async (req, res) => {
    try {
        const brand = req.params.brand;
        const limit = parseInt(req.query.limit);
        if (brand === undefined || brand === "" || isNaN(limit) || limit < 1) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid brand or limit' });
        }

        const pageCount = await Service.getProductsByBrandPageCount(brand, limit);
        res.json({ success: true, pageCount });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByBrandWithPage = async (req, res) => {
    try {
        const brand = req.params.brand;
        const limit = parseInt(req.query.limit);
        const pageNo = parseInt(req.query.pageNo);
        if (brand === undefined || brand === "" || isNaN(pageNo) || isNaN(limit) || limit < 1 || pageNo < 1) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid brand or page number' });
        }

        const products = await Service.getProductsByBrandWithPage(brand, limit, pageNo);
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByCar = async (req, res) => {
    try {
        const car = req.params.car;
        if (car === undefined || car === "") {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid car' });
        }

        const products = await Service.getProductsByCar(car);
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByCarPageCount = async (req, res) => {
    try {
        const car = req.params.car;
        const limit = parseInt(req.query.limit);
        if (car === undefined || car === "" || isNaN(limit) || limit < 1) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid car or limit' });
        }

        const pageCount = await Service.getProductsByCarPageCount(car, limit);
        res.json({ success: true, pageCount });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByCarWithPage = async (req, res) => {
    try {
        const car = req.params.car;
        const limit = parseInt(req.query.limit);
        const pageNo = parseInt(req.query.pageNo);
        if (car === undefined || car === "" || isNaN(pageNo) || isNaN(limit) || limit < 1 || pageNo < 1) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid car or page number' });
        }

        const products = await Service.getProductsByCarWithPage(car, limit, pageNo);
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByTypeAndBrand = async (req, res) => {
    try {
        const category = req.params.category;
        const brand = req.params.brand;
        if (category === undefined || category === "" || productTypes[category] === undefined || brand === undefined || brand === "") {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid category or brand' });
        }

        const products = await Service.getProductsByTypeAndBrand(productTypes[category], brand);
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByTypeAndBrandPageCount = async (req, res) => {
    try {
        const category = req.params.category;
        const brand = req.params.brand;
        const limit = parseInt(req.query.limit);
        if (category === undefined || category === "" || productTypes[category] === undefined || brand === undefined || brand === "" || isNaN(limit) || limit < 1) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid category, brand or limit' });
        }

        const pageCount = await Service.getProductsByTypeAndBrandPageCount(productTypes[category], brand, limit);
        res.json({ success: true, pageCount });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByTypeAndBrandWithPage = async (req, res) => {
    try {
        const category = req.params.category;
        const brand = req.params.brand;
        const limit = parseInt(req.query.limit);
        const pageNo = parseInt(req.query.pageNo);
        if (category === undefined || category === "" || productTypes[category] === undefined || brand === undefined || brand === "" || isNaN(pageNo) || isNaN(limit) || limit < 1 || pageNo < 1) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid category, brand or page number' });
        }

        const products = await Service.getProductsByTypeAndBrandWithPage(productTypes[category], brand, limit, pageNo);
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByTypeAndCar = async (req, res) => {
    try {
        const category = req.params.category;
        const car = req.params.car;
        if (category === undefined || category === "" || productTypes[category] === undefined || car === undefined || car === "") {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid category or car' });
        }

        const products = await Service.getProductsByTypeAndCar(productTypes[category], car);
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByTypeAndCarPageCount = async (req, res) => {
    try {
        const category = req.params.category;
        const car = req.params.car;
        const limit = parseInt(req.query.limit);
        if (category === undefined || category === "" || productTypes[category] === undefined || car === undefined || car === "" || isNaN(limit) || limit < 1) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid category, car or limit' });
        }

        const pageCount = await Service.getProductsByTypeAndCarPageCount(productTypes[category], car, limit);
        res.json({ success: true, pageCount });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.getProductsByTypeAndCarWithPage = async (req, res) => {
    try {
        const category = req.params.category;
        const car = req.params.car;
        const limit = parseInt(req.query.limit);
        const pageNo = parseInt(req.query.pageNo);
        if (category === undefined || category === "" || productTypes[category] === undefined || car === undefined || car === "" || isNaN(pageNo) || isNaN(limit) || limit < 1 || pageNo < 1) {
            return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid category, car or page number' });
        }

        const products = await Service.getProductsByTypeAndCarWithPage(productTypes[category], car, limit, pageNo);
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

exports.newLead = async (req, res) => {
    try {
        const payload = req.body;
        if (payload === undefined || (payload.name === "" || payload.contact === "" || payload.phone === "" || payload.province === "")) {
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