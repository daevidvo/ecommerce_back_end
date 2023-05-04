const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categories = await Category.findAll({ // gets all of the categories 
      include: [{model: Product}]
    })
    if(!categories){ // if there are no categories
      res.status(400).json({message: 'No categories found'})
    }else{ // sends the category data to the user
      res.status(200).json(categories)
    }
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categories = await Category.findByPk(req.params.id,{
      include: [{model: Product}]
    })
    if(!categories){
      res.status(400).json({message: 'No category found, please check your request'})
    }else{
      res.status(200).json(categories)
    }
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    if(req.body.category_name){
      const categoryData = Category.create({
        category_name: req.body.category_name
      })
      res.status(200).json({message: 'Category has been created'})
    }else{
      res.status(400).json({message: 'Include a category_name in your request'})
    }
  }catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(!categoryData){
      res.status(400).json({message: 'No category with this id exists'})
    }
    res.status(200).json({message: 'Category has been updated'})
  }catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!categoryData){
      res.status(400).json({message: 'No category with this id exists'})
    }
    res.status(200).json({message: 'Category deleted'})
  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
