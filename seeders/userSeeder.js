const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

module.exports = async function userSeeder() {
  //bcrypt.hash("bacon", 8, function (err, hash) {});

  const users = [
    {
      firstname: "Pablo",
      lastname: "Picasso",
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: await bcrypt.hash("1234", 8),
    },
    {
      firstname: "Claude",
      lastname: "Monet",
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: await bcrypt.hash("1234", 8),
    },
    {
      firstname: "Tolouse",
      lastname: "Lautrec",
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: await bcrypt.hash("1234", 8),
    },
    {
      firstname: "Pepe",
      lastname: "Botella",
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: await bcrypt.hash("1234", 8),
    },
  ];
  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
