// createCategory
// getAllCategories
// getCategoryBySlug
// updateCategory
// deleteCategory

const Category = require("../Modal/Category")

const createCategory = async(req,res)=>{
    try {
        const category = await Category.create({title})
    } catch (error) {
        
    }
}