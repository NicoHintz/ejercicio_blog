const { faker } = require("@faker-js/faker");
const { Article } = require("../models");

module.exports = async () => {
  const articles = [];
  for (let i = 0; i < 9; i++) {
    articles.push({
      title: faker.lorem.sentence(3),
      content: faker.lorem.paragraphs(10),
      image: faker.image.food(234, 345, true),
      userId: faker.datatype.number({ min: 1, max: 4 }),
    });
  }
  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
