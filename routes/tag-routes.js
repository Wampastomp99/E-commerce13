const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// GET ROUTE
router.get("/", (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products",
      },
    ],
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get("/:id", (req, res) => {
    
    Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
          through: ProductTag,
          as: "products",
        },
      ],
    })
      .then((dbTagData) => {
        if (!dbTagData) {
          res
            .status(404)
            .json({ message: "There was no tag found with this id." });
          return;
        }
        res.json(dbTagData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // POST ROUTE
  router.post("/", (req, res) => {
    // Create a new tag
    Tag.create({
      tag_name: req.body.tag_name,
    })
      .then((dbTagData) => res.json(dbTagData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });