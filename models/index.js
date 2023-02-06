// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  onDelete: 'CASCADE'
})
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
})
// which is the right way on through, using ProductTag or product_tag which is the model name
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
