const Blog = require("../models/Blog");
const User = require("../models/User");
const profile = require("../models/Profile");
class BlogController {
  static async Create(req, res, next) {
    const { title, article, tags } = req.body;
    const author = await User.findOne({ where: { id: req.id.id } });
    const tagged = await Blog.findOne({ where: { tags: tags } });
    if (author) {
      if (tags !== null) {
        const image = req.file.path;
        const blog = new Blog({
          title: title,
          article: article,
          tags: tags,
          Author: req.id.id,
          images: image,
        });
        blog.save();
        res.status(201).json({
          success: true,
          message: `blog has been created with ${tags}`,
          blog,
        });
      } else {
        const image = req.file.path;
        const blogs = new Blog({
          title: title,
          article: article,
          tags: tagged,
          Author: req.id.id,
          images: image,
        });
        blogs.save();
        res.status(201).json({
          success: true,
          message: `blog has been created with ${tagged}`,
          blogs,
        });
      }
    } else {
      next({ name: "NOT_Authorized" });
    }
  }
  static async update(req, res, next) {
    const id = req.params;
    const pk = id;
    console.log(pk);
    const author = await Blog.findOne({ where: { Author: req.id.id } });
    const blog = await Blog.findOne({ where: { id: pk.id } });
    console.log(blog);
    if (author) {
      if (blog) {
        const images = req.file.path;
        const { article, title } = req.body;
        const updated = await Blog.update(
          { images: images, article: article, title: title },
          {
            where: { id: pk.id },
          }
        );
        res.status(201).json({ msg: "Blog updated successfully", updated });
      } else {
        next();
      }
    } else {
      next({ name: "NOT_Authorized" });
    }
  }
  static delete(req, res, next) {
    const id = req.params;
    const pk = id;
    const blog = Blog.destroy({ where: { id: pk.id } })
      .then((data) => {
        res.status(204).json({ msg: `Data with id ${id} success deleted` });
        next();
      })
      .catch((err) => {
        next({ name: "AlREADY DELETED" });
      });
  }
  static getOne(req, res, next) {
    const id = req.params;
    const pk = id;
    const blog = Blog.findOne({ where: { id: pk.id } })
      .then((data) => {
        res
          .status(200)
          .json({ msg: `Data with id ${pk.id} success deleted`, data });
        next();
      })
      .catch((err) => {
        next({ name: "DATA_NOT_FOUND" });
      });
  }

  static getSpecific(req, res, next) {
    // User.belongsTo(Blog, { foreignKey: "id" });
    // Blog.hasMany(User, { foreignKey: "Author" });
    // User.findAll({ include: [Blog] }).then((data) => {
    //   res.json(data);
    // });
    profile.findAll().then(async (data) => {
      const user = data.map(async (result) => {
        const id = result.userId;
        const blog = await Blog.findAll({ where: { Author: id } });
        return {
          Author: result.fullName,
          blog: blog,
        };
      });
      data.blog = user;
      res.send(await Promise.all(user));
    });
  }
  static pagingfilteringsorting(req, res, next) {
    try {
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);
      let tags = req.query.tags;

      const offset = page ? page * limit : 0;

      //   console.log("offset = " + offset);

      Blog.findAndCountAll({
        attributes: [
          "id",
          "title",
          "article",
          "tags",
          "images",
          "article",
          "Author",
        ],
        where: { tags: tags },
        order: [
          ["Author", "ASC"],
          ["title", "DESC"],
        ],
        limit: limit,
        offset: offset,
      }).then(async (data) => {
        const a = await Blog.findAll({
          where: { tags: tags },
          order: [
            ["Author", "ASC"],
            ["title", "DESC"],
          ],
        });
        console.log(a);
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message:
            "Pagination Filtering Sorting request is completed! Query parameters: page = " +
            page +
            ", limit = " +
            limit +
            ", tags = " +
            tags,
          data: {
            totalItems: data.count,
            totalPages: totalPages,
            limit: limit,
            "tags-filtering": tags,
            currentPageNumber: page + 0,
            currentPageSize: a.length,
            blogs: a,
          },
        };
        res.send(response);
      });
    } catch (error) {
      res.status(500).send({
        message: "Error Can NOT complete a paging request!",
        error: error.message,
      });
    }
  }
}

module.exports = BlogController;
