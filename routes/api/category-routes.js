const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{Product}]
    });
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    res.json(category);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  console.log("new category added:")
  console.log(req.body);
  try {
    const categoryCreation = await Category.create({
      category_name: req.body
    })
    res.json(categoryCreation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    await category.update(req.body);
    res.json(category);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    await category.destroy(req.body);
    res.json(category);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
