const express = require("express");
const { z } = require("zod");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const {
  getPositions,
  getPosition,
  createPosition,
  deletePosition
} = require("../controllers/positionController");

const router = express.Router();

const createPositionSchema = z.object({
  symbol: z.string().min(1).max(20),
  assetName: z.string().min(1).max(100),
  side: z.enum(["LONG", "SHORT"]).default("LONG"),
  quantity: z.number().positive(),
  entryPrice: z.number().positive(),
  currentPrice: z.number().nonnegative(),
  stopLoss: z.number().nonnegative(),
  targetPrice: z.number().nonnegative().nullable().optional(),
  accountSize: z.number().positive(),
  riskPercent: z.number().positive().max(100),
  notes: z.string().max(500).optional()
});

router.get("/", asyncHandler(getPositions));
router.get("/:id", asyncHandler(getPosition));
router.post("/", validate(createPositionSchema), asyncHandler(createPosition));
router.delete("/:id", asyncHandler(deletePosition));

module.exports = router;