const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product, through: { attributes:[] }}]
    });
    return res.json(tagData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagById) {
      return res.status(404).send('Tag not found')
    }
    res.json(tagById);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).send(`Tag name: ${newTag.tag_name} has been added to the database.`);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagById = await Tag.findByPk(req.params.id);
    if (!tagById) {
      return res.status(404).send('Tag not found')
    }
    await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: tagById.id
      }
    });
    res.status(200).send(`Tag name updated to ${req.body.tag_name}`);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagById = await Tag.findByPk(req.params.id);
    if(!tagById) {
      return res.status(404).send('Tag not found');
    }
    await Tag.destroy({
      where: {
        id: tagById.id
      }
    })
    res.status(200).send(`The tag ${tagById.tag_name} has been deleted!`);
  } catch (err) {
    return res.status(500).json(err)
  }
});

module.exports = router;
