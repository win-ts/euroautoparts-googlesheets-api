const express = require("express");
const router = express.Router();

const sheetsController = require("../controllers/sheets");

router.get("/products", sheetsController.getProducts);
router.get("/products/page", sheetsController.getProductsByPage);
router.get("/products/page-count", sheetsController.getProductsPageCount);
router.get("/products/:category", sheetsController.getProductsByType);
router.get("/products/:category/page-count", sheetsController.getProductsByTypePageCount);
router.get("/products/:category/page", sheetsController.getProductsByTypeWithPage);
router.post("/lead", sheetsController.newLead);
router.get("/best-selling", sheetsController.getBestSellingProducts);

module.exports = router;