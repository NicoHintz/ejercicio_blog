const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const writerController = require("../controllers/writerController");
const editorController = require("../controllers/editorController");
const apiController = require("../controllers/apiController");
const { expressjwt: checkJwt } = require("express-jwt");
const { isAuthenticated, commentAuthenticate } = require("../middlewares/isAuthenticated");
const { isAuthenticatedAdmin } = require("../middlewares/isAuthenticatedAdmin");
const { isAuthenticatedEditor } = require("../middlewares/isAuthenticatedEditor");
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
// CRUD WRITER //

// CRUD EDITOR //
router.get("/editor", isAuthenticatedEditor, editorController.indexEditor);
router.get("/editor/crear", isAuthenticated, editorController.createForm);
router.post("/editor", editorController.createArticle);
router.get("/editor/editar/:id", editorController.editForm);
router.post("/editor/editar/:id", editorController.editArticle);
router.get("/editor/eliminar/:id", isAuthenticatedEditor, editorController.deleteArticle);
router.post("/articulo/editar/:id", editorController.editComment);
router.get("/comentario/eliminar/:id", isAuthenticatedEditor, editorController.deleteComment);
router.post("/comentario/editar/:id", isAuthenticatedEditor, editorController.editComment);
// CRUD EDITOR //

//API//
router.post("/api/tokens", apiController.tokens);

router.get(
  "/api/articulos",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  apiController.apiIndex,
);
router.post(
  "/api/articulos",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  apiController.apiIndex,
);

router.delete(
  "/api/articulos/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  apiController.apiDeleteArticle,
);
router.post(
  "/api/articulos/",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  apiController.apiCreateArticle,
);
router.patch(
  "/api/articulos/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  apiController.apiEditArticle,
);
//API//

router.get("/users", userController.getUsers);

module.exports = router;
