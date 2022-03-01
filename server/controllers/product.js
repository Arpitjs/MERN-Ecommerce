import Product from "../models/Product";
import slugify from "slugify";
import User from "../models/User";

export const create = async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  try {
    let product = await Product.create({
      ...req.body,
    });
    res.status(200).json(product);
  } catch (e) {
    if (e.code === 11000) return next({ msg: "duplicate product." });
    next({ msg: e });
  }
};

export const read = async (req, res, next) => {
  try {
    res.json(
      await Product.find({})
        .populate("category")
        .populate("subs")
        .sort([["createdAt", "desc"]])
    );
  } catch (e) {
    next({ msg: e });
  }
};

export const readByCount = async (req, res, next) => {
  try {
    res.json(
      await Product.find({})
        .limit(parseInt(req.params.count))
        .populate("category")
        .populate("subs")
        .sort([["createdAt", "desc"]])
    );
  } catch (e) {
    next({ msg: e });
  }
};

export const readOne = async (req, res, next) => {
  try {
    res.json(
      await Product.findOne({ slug: req.params.slug })
        .populate("category")
        .populate("subs")
    );
  } catch (e) {
    next({ msg: e });
  }
};

export const update = async (req, res, next) => {
  console.table(req.body);
  try {
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.status(204).json({ updated });
  } catch (e) {
    next({ msg: e });
  }
};

export const remove = async (req, res, next) => {
  try {
    await Product.findOneAndRemove({ slug: req.params.slug });
    res.status(204).json({ msg: "deleted." });
  } catch (e) {
    next({ msg: e });
  }
};

export const list = async (req, res, next) => {
  // console.table(req.query);
  try {
    const { sort, order, page } = req.query;
    const currentPage = parseInt(page) || 1;
    const perPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage);

    res.json({ products });
  } catch (e) {
    next({ msg: e });
  }
};

export const productsCount = async (req, res, next) => {
  try {
    const total = await Product.find({}).countDocuments({});
    res.json(total);
  } catch (e) {
    next({ msg: e });
  }
};

export const starProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { star } = req.body;
    const { email } = req.user;

    const product = await Product.findById(id);
    const user = await User.findOne({ email });

    const existingRatingObject = product.ratings.find(
      (elem) => elem.postedBy.toString() === user._id.toString()
    );

    if (!existingRatingObject) {
      const ratingAdded = await Product.findByIdAndUpdate(
        id,
      {$push: { ratings: { star, postedBy: user._id }}},
        { new: true }
      );
      res.json(ratingAdded);
    } else {
      const ratingUpdated = await Product.updateOne({
          ratings: { $elemMatch: existingRatingObject }
      }, 
      { $set: {"ratings.$.star": star }},
      { new: true }
      );

      res.json(ratingUpdated);
    }
  } catch (e) {
    next({ msg: e });
  }
};

export const listRelated = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const related = await Product.find({
      _id: { $ne: product._id },
      category: product.category
    })
    .limit(3)
    .populate('category')
    .populate('subs')

    res.json(related);
  } catch (e) {
    next({ msg: e });
  }
}