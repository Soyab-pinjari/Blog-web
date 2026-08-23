const express = require("express");

const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} = require("../Controller/categoryController");

const router = express.Router();

router.post("/create", createCategory);

router.get("/", getCategories);

router.get("/:id", getCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;