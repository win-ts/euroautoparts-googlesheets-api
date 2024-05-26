const express = require("express");
const router = express.Router();

const sheetsController = require("../controllers/sheets");

router.get("/products", sheetsController.getProducts);
router.get("/products/page", sheetsController.getProductsByPage);
router.get("/products/page-count", sheetsController.getProductsPageCount);
router.get("/products/type/:category", sheetsController.getProductsByType);
router.get("/products/type/:category/page-count", sheetsController.getProductsByTypePageCount);
router.get("/products/type/:category/page", sheetsController.getProductsByTypeWithPage);
router.get("/products/model/:car", sheetsController.getProductsByCar);
router.get("/products/model/:car/page-count", sheetsController.getProductsByCarPageCount);
router.get("/products/model/:car/page", sheetsController.getProductsByCarWithPage);
router.get("/products/type&model/:category/:car", sheetsController.getProductsByTypeAndCar);
router.get("/products/type&model/:category/:car/page-count", sheetsController.getProductsByTypeAndCarPageCount);
router.get("/products/type&model/:category/:car/page", sheetsController.getProductsByTypeAndCarWithPage);
router.post("/lead", sheetsController.newLead);
router.get("/best-selling", sheetsController.getBestSellingProducts);

module.exports = router;