const { Sequelize } = require("sequelize");
const { Article, User, Comment } = require("../models");
const formidable = require("formidable");

// const { User } = require("../models");

async function index(req, res) {
  const articles = await Article.findAll({ include: User });

  return res.render("home", { articles });
}

async function selectArticle(req, res) {
  // CHANGES!!!!!
  let articleNumber = req.params.id;
  const article = await Article.findByPk(req.params.id, { include: User });
  const comments = await Comment.findAll({ where: { articleId: req.params.id }, include: User });
  return res.render("article", { article, comments, articleNumber });
}

async function indexAdmin(req, res) {
  const articles = await Article.findAll({ include: User });
  console.log(articles[0].image);
  return res.render("admin", { articles });
}

async function createForm(req, res) {
  const articles = await Article.findAll();
  return res.render("crear");
}

async function createArticle(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    const newArticle = await Article.create({
      title: fields.title,
      content: fields.content,
      author: fields.author,
      image: files.image.newFilename,
      userId: 1,
    });

    return res.redirect("/admin");
  });
}

async function editForm(req, res) {
  const article = await Article.findByPk(req.params.id);
  res.render("edit", { article });
}

async function editArticle(req, res) {
  const newArticle = await Article.update(
    {
      title: `${req.body.title}`,
      content: `${req.body.content}`,
      date: {
        type: Sequelize.DATE,
        field: "updated_at",
      },
      image: `${req.body.image}`,
      author: `${req.body.author}`,
    },
    { where: { id: req.params.id } },
  );
  return res.redirect("/admin");
}

async function deleteArticle(req, res) {
  const deleteArticle = await Article.destroy({
    where: { id: req.params.id },
  });
  return res.redirect("/admin");
}

module.exports = {
  index,
  selectArticle,
  indexAdmin,
  createForm,
  createArticle,
  editForm,
  editArticle,
  deleteArticle,
};
