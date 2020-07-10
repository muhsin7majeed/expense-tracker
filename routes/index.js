const { Router } = require("express");
const router = Router();

const { signin, signup } = require("../api/_userModule/userController");

/* ------------------------------- AUTH ROUTE ------------------------------- */

router.post("/signin", signin);
router.post("/signup", signup);

/* --------------------------- TRANSACTIONS ROUTE --------------------------- */

module.exports = router;
