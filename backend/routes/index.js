const { Router } = require("express");
const listsRoutes = require("./listsRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const preventAttackController = require("./preventAttackRoutes");
const authenticationMiddleware = require('../middleware/authenticationMiddleware')
const authRouter = require('./authRoutes')

const router = Router();

router.use("/", dashboardRoutes);
router.use("/api/v1/attack", preventAttackController)
router.use("/api/v1/lists", authenticationMiddleware, listsRoutes);
router.use("/auth", authRouter)

module.exports = router;