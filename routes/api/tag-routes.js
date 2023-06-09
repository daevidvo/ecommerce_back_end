const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    })
    if(!tagData){
      res.status(400).json({message: 'No tags were found'}) // message if there is no tag data at all
    }else{
      res.status(200).json(tagData)
    }
  }catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if(!tagData){
      res.status(400).json({message: 'No tags with this id were found'}) // message if no tag with the given id shows up
    }else{
      res.status(200).json(tagData)
    }
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    if(req.body.tag_name){
      const tagData = await Tag.create({
        tag_name: req.body.tag_name
      })
      res.status(200).json({message: 'Tag created'}) // creation confirmation message
    }else{
      res.status(400).json({message: 'Include a tag_name in your request'}) // message if the user forgets to put in a tag_name property in their body
    }
  }catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(!tagData){
      res.status(400).json({message: 'No tag with that id was found'}) // message if no tag with the given id was found
    }else{
      res.status(200).json({message: 'Tag updated'}) // confirmation message
    }
  }catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!tagData){
      req.status(400).json({message: 'No tag with this id was found'})
    }else{
      res.status(200).json({message: 'Tag deleted'})
    }
  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
