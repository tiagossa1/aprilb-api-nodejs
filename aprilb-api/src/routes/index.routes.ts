import * as express from "express";
import memberRoutes from "./member.routes.js";
import nonMemberRoutes from "./nonMember.routes.js";
import feeRoutes from "./fee.routes.js";
import tripTypeRoutes from "./tripType.routes.js";
import tripRoutes from "./trip.routes.js";
import userRoutes from './user.routes.js';

const router = express.Router();

router.use("/member", memberRoutes);
router.use("/non-member", nonMemberRoutes);
router.use("/fee", feeRoutes);
router.use("/trip-type", tripTypeRoutes);
router.use("/trip", tripRoutes);
router.use("/user", userRoutes);

export default router;
