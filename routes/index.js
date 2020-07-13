const { Router } = require("express");
const router = Router();

const { verifyToken } = require("../api/helpers/helper");
const { signin, signup, setBalance } = require("../api/_userModule/userController");
const { getTransactions } = require("../api/_transactModule/transactController");

/* ------------------------------- AUTH ROUTE ------------------------------- */

router.post("/signin", signin);
router.post("/signup", signup);

/* --------------------------- TRANSACTIONS ROUTE --------------------------- */

router.post("/balance", verifyToken, setBalance);
router.get("/transactions/:type?/", verifyToken, getTransactions); // type = ALL, EXP, INC
router.post("/transactions");
router.patch("/transactions/:id");
router.delete("/transactions/:id");

module.exports = router;
