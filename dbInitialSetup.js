const db = require("./models");

module.exports = async () => {
  await db.sequelize.sync({ force: true });
  console.log("[Database] ¡Las tablas fueron creadas!");

  await require("./seeders/userSeeder")();
  await require("./seeders/articleSeeder")();
  await require("./seeders/commentSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
};
