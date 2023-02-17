const { Sequelize } = require("sequelize");
const { Article, User, Comment } = require("../models");
const formidable = require("formidable");

async function indexEditor(req, res) {
  const articles = await Article.findAll({ include: User });

  return res.render("editor", { articles });
}

async function createForm(req, res) {
  const articles = await Article.findAll();
  return res.render("createWriter");
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
      userId: req.user.id,
    });
    return res.redirect("/writer");
  });
}

async function editForm(req, res) {
  const article = await Article.findByPk(req.params.id);
  res.render("editWriter", { article });
}

async function editArticle(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    const newArticle = await Article.update(
      {
        title: fields.title,
        content: fields.content,
        image: files.image.newFilename,
        userId: req.user.id,
      },
      { where: { id: req.params.id } },
    );
    return res.redirect("/writer");
  });
}

async function deleteArticle(req, res) {
  const article = await Article.findByPk(req.params.id);
  if (req.user.id === article.userId) {
    const deleteArticle = await Article.destroy({
      where: { id: req.params.id },
    });
  }
  return res.redirect("/editor");
}

// COMMMENTS --------------------------------------

async function editComment(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    const newArticle = await Article.update(
      {
        title: fields.title,
        content: fields.content,
        image: files.image.newFilename,
        userId: req.user.id,
      },
      { where: { id: req.params.id } },
    );
    return res.redirect("/writer");
  });
}

async function deleteComment(req, res) {
  const comment = await Comment.findByPk(req.params.id);
  const deleteComment = await Comment.destroy({
    where: { id: req.params.id },
  });
  return res.redirect(`/articulo/${req.query.articleId}`);
}

module.exports = {
  indexEditor,
  createForm,
  createArticle,
  editForm,
  editArticle,
  deleteArticle,
  editComment,
  deleteComment,
};
