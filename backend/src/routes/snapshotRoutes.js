const express = require("express");
const { z } = require("zod");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const {
  getSnapshots,
  createSnapshot
} = require("../controllers/snapshotController");

const router = express.Router();

const snapshotSchema = z.object({
  portfolioValue: z.number().nonnegative(),
  cashValue: z.number().nonnegative().default(0),
  investedValue: z.number().nonnegative().default(0),
  totalRisk: z.number().nonnegative().default(0),
  date: z.coerce.date().optional()
});

router.get("/", asyncHandler(getSnapshots));
router.post("/", validate(snapshotSchema), asyncHandler(createSnapshot));

module.exports = router;