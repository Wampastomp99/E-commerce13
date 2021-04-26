const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

router.get("/", (req, res) => {
  
  Product.findAll({
    attributes: ["id", "product_name", "price", "stock", "category_id"],
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"],
      },
      {
        model: Tag,
        through: ProductTag,
        as: "tags",
      },
    ],
  })
    .then((dbProductData) => res.json(dbProductData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get("/:id", (req, res) => {
  
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"],
      },
      {
        model: Tag,
        through: ProductTag,
        as: "tags",
      },
    ],
  })
  .then((dbProductData) => {
    if (!dbProductData) {
      res
        .status(404)
        .json({ message: "There was no product found with this id." });
      return;
    }
    res.json(dbProductData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});