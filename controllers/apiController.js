const { Sequelize, Op } = require("sequelize");
const { Article, User, Comment } = require("../models");
const formidable = require("formidable");
const express = require("express");
const jwt = require("jsonwebtoken");

async function apiIndex(req, res) {
  //   const filter = Object.entries(req.query);
  //   console.log(filter == undefined);
  //   console.log(filter == null);
  //   console.log(!filter);
  //   console.log(filter === []);
  let results = null;
  if (!filter) {
    results = await Article.findAll({ include: User });
    return res.json(results);
  }
  switch (filter[0][0]) {
    case "searchbytitle":
      results = await Article.findAll({
        where: { title: { [Op.substring]: req.query.searchbytitle } },
        include: User,
      });
      res.json(results);
      break;
    case "searchbyid":
      results = await Article.findByPk(req.query.searchbyid, { include: User });
      res.json(results);
      break;

    default:
      results = await Article.findAll({ include: User });
      res.json(results);
      break;
  }
}

async function apiCreateArticle(req, res) {
  console.log(req.body);
  const newArticle = await Article.create({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    userId: req.body.userId,
  });
  const articles = await Article.findAll({ include: User });
  return res.json(articles);
}

async function apiDeleteArticle(req, res) {
  const deleteArticle = await Article.destroy({
    where: { id: req.params.id },
  });
  const articles = await Article.findAll({ include: User });
  return res.json(articles);
}

async function apiEditArticle(req, res) {
  const articles = await Article.findAll({ include: User });
  const newArticle = await Article.update(
    {
      title: `${req.body.title}`,
      content: `${req.body.content}`,
      image: `${req.body.image}`,
      userId: `${req.body.userId}`,
    },
    { where: { id: req.params.id } },
  );
  return res.json(articles);
}

async function tokens(req, res) {
  console.log(req.body.password);
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const match = await user.isValidPassword(req.body.password);
    if (match) {
      const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
      return res.json({ token: token });
    }
  }
  return res.send("hola");
}

module.exports = {
  apiIndex,
  apiDeleteArticle,
  apiCreateArticle,
  apiEditArticle,
  tokens,
};
