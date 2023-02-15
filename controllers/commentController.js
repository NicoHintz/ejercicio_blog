const { Comment, Article, User } = require("../models");

async function getComments(req, res) {
  const comments = await Comment.findAll({ include: Article });
  return res.send({ comments });
}

async function createComment(req, res) {
  if (!req.user) {
    const user = await User.findOne({ where: { firstname: req.body.firstname } });
    let articleNumber = req.params.id;
    const newComment = await Comment.create({
      content: `${req.body.content}`,
      articleId: `${req.params.id}`,
      author: `${req.body.firstname}`,
    });
    return res.redirect(`/articulo/${articleNumber}`);
  } else {
    const user = await User.findOne({ where: { firstname: req.body.firstname } });
    let articleNumber = req.params.id;
    const newComment = await Comment.create({
      content: `${req.body.content}`,
      articleId: `${req.params.id}`,
      userId: req.user.id,
    });
    return res.redirect(`/articulo/${articleNumber}`);
  }
}

module.exports = { getComments, createComment };
