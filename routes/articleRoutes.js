const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

// Intentando hacer login //
router.get("/login", loginController.loginIndex);
router.post("/login", loginController.login);
// Intentando hacer login //

router.get("/", mainController.index);
router.get("/articulo/:id", mainController.selectArticle);
router.post("/articulo/:id", commentController.createComment);

router.get("/admin", isAuthenticated, mainController.indexAdmin);
router.get("/admin/crear", isAuthenticated, mainController.createForm);
router.post("/admin", mainController.createArticle);
router.get("/admin/editar/:id", mainController.editForm);
router.post("/admin/editar/:id", mainController.editArticle);
router.get("/admin/eliminar/:id", mainController.deleteArticle);

router.get("/users", userController.getUsers);

module.exports = router;
