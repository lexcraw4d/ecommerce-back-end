const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', (req, res) => {
	// find all categories
	Category.findAll({
		attributes: ['id', 'category_name'],
		include: [
			{
				model: Product,
				//if wanted to return single or select certain individual products you would list here in attributes
				// attributes: ['product_name'],
			},
		],
	})
		.then((dbCategoryData) => res.json(dbCategoryData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});

	// be sure to include its associated Products
});
	// find one category by its `id` value
	router.get('/:id', (req, res) => {
		Category.findOne({
			where: {
				id: req.params.id,
			},
			include: [
				{
					model: Product,
					// attributes: ['product_name'],
				},
			],
		})
			.then((dbCategoryData) => {
				if (!dbCategoryData) {
					res.status(404).json({ message: 'No post found with this id' });
					return;
				}
				res.json(dbCategoryData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	});
	// be sure to include its associated Products

router.post('/', (req, res) => {
	// create a new category
	Category.create({
		category_name: req.body.category_name,
	})
		.then((dbPostData) => res.json(dbPostData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});

});

router.put('/:id', (req, res) => {
	// update a category by its `id` value
  Category.update
    (req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    })
      .then((dbCategoryData) => {
        if (!dbCategoryData[0]) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
        }
        res.json(dbCategoryData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  })

  router.delete('/:id', (req, res) => {
    //delete a category by it's id
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbCategoryData) => {
        if (!dbCategoryData) {
          res.status(404).json({ message: 'No user category with this id' });
          return;
        }
        res.json(dbCategoryData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;