const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    return res.json(categoryData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryById) {
      return res.status(404).send('Category not found');
    }
    res.status(200).json(categoryById);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  console.log("new category added:")
  console.log(req.body);
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).send(`Category name: ${newCategory.category_name} has been added to the database.`);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryById = await Category.findByPk(req.params.id);
    if (!categoryById) {
      return res.status(404).send('Category not found');
    }
    await Category.update({ 
      category_name: req.body.category_name
    }, 
    { 
      where: {
          id: categoryById.id
        } 
    });
  res.status(200).send(`Category name updated to ${req.body.category_name}`);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryById = await Category.findByPk(req.params.id);
    if (!categoryById) {
      return res.status(404).send('categoryById not found');
    }
    await Category.destroy({
      where: {
        id: categoryById.id
      }
    })
    res.status(200).send(`The category ${categoryById.category_name} has been deleted!`);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
