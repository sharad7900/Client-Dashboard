const express = require("express");
const control = require("../controllers/controller.js");
const control2 = require("../controllers/controller2.js");
const router = express.Router();

router.route("/home").get(control.home);
router.route("/login").post(control.login);
router.route("/mfd").get(control.mfd);
router.route("/comments").post(control.comments);
router.route("/create_comment").post(control.create_cmt);
router.route("/forgotpassword").post(control.forgotpassword);
router.route("/resetpassword").post(control.reset_password);
router.route("/corporate_portFolio").get(control2.Corporate_PortFolio);
router.route("/demat_portFolio").get(control2.Demat_PortFolio);
router.route("/createTask").post(control2.Create_Task);
router.route("/logout").post(control.logout);


module.exports = router;