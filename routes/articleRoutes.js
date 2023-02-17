const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const writerController = require("../controllers/writerController");
const {
  isAuthenticated,
  commentAuthenticate,
  isAuthenticatedAdmin,
} = require("../middlewares/isAuthenticated");

const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

router.get("/login", loginController.loginIndex);
router.post("/login", loginController.login);

router.get("/", makeUserAvailableInViews, mainController.index);
router.get("/articulo/:id", mainController.selectArticle);

// AuTH COMMENTS
router.post("/articulo/:id", commentAuthenticate, commentController.createComment);
//AUTH COMMENTS

// CRUD ADMIN //
router.get("/admin", isAuthenticatedAdmin, mainController.indexAdmin);
router.get("/admin/crear", isAuthenticatedAdmin, mainController.createForm);
router.post("/admin", mainController.createArticle);
router.get("/admin/editar/:id", isAuthenticatedAdmin, mainController.editForm);
router.post("/admin/editar/:id", isAuthenticatedAdmin, mainController.editArticle);
router.get("/admin/eliminar/:id", isAuthenticatedAdmin, mainController.deleteArticle);
// CRUD ADMIN //

// CRUD WRITER //
router.get("/writer", isAuthenticated, writerController.indexWriter);
router.get("/writer/crear", isAuthenticated, writerController.createForm);
router.post("/writer", writerController.createArticle);
router.get("/writer/editar/:id", writerController.editForm);
router.post("/writer/editar/:id", writerController.editArticle);
router.get("/writer/eliminar/:id", writerController.deleteArticle);
// CRUD ADMIN //

router.get("/users", userController.getUsers);

module.exports = router;
