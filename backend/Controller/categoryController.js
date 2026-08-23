const Category = require("../Modal/Category");

// CREATE CATEGORY
const createCategory = async (req, res) => {
    try {
        const { name, icon, color } = req.body;

        if (!name || !icon) {
            return res.status(400).json({
                success: false,
                message: "Name and icon are required",
            });
        }

        // Create slug automatically
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        // Check duplicate name
        const existingCategory = await Category.findOne({
            $or: [
                { name: name.trim() },
                { slug },
            ],
        });

        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: "Category already exists",
            });
        }

        const category = await Category.create({
            name: name.trim(),
            slug,
            icon,
            color: color || "#6366F1",
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category,
        });

    } catch (error) {
        console.error("Create Category Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create category",
            error: error.message,
        });
    }
};


// GET ALL CATEGORIES
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .sort({ createdAt: -1 });
                console.log(categories)
        return res.status(200).json({
            success: true,
            count: categories.length,
            categories,
        });

    } catch (error) {
        console.error("Get Categories Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
            error: error.message,
        });
    }
};


// GET SINGLE CATEGORY
const getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            category,
        });

    } catch (error) {
        console.error("Get Category Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch category",
            error: error.message,
        });
    }
};


// UPDATE CATEGORY
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, icon, color } = req.body;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        if (name) {
            const slug = name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");

            const duplicate = await Category.findOne({
                slug,
                _id: { $ne: id },
            });

            if (duplicate) {
                return res.status(409).json({
                    success: false,
                    message: "Category with this name already exists",
                });
            }

            category.name = name.trim();
            category.slug = slug;
        }

        if (icon !== undefined) {
            category.icon = icon;
        }

        if (color !== undefined) {
            category.color = color;
        }

        await category.save();

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category,
        });

    } catch (error) {
        console.error("Update Category Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update category",
            error: error.message,
        });
    }
};


// DELETE CATEGORY
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        await Category.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });

    } catch (error) {
        console.error("Delete Category Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete category",
            error: error.message,
        });
    }
};


module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};