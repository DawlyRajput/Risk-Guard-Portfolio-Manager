const express = require("express");
const { z } = require("zod");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const {
  calculateRisk,
  calculatePosition,
  stressTest
} = require("../controllers/riskController");

const router = express.Router();

const riskSchema = z.object({
  side: z.enum(["LONG", "SHORT"]),
  quantity: z.number().positive(),
  entryPrice: z.number().positive(),
  currentPrice: z.number().nonnegative(),
  stopLoss: z.number().nonnegative(),
  targetPrice: z.number().nonnegative().nullable().optional(),
  accountSize: z.number().positive(),
  riskPercent: z.number().positive().max(100)
});

const positionSizeSchema = z.object({
  accountSize: z.number().positive(),
  riskPercent: z.number().positive().max(100),
  entryPrice: z.number().positive(),
  stopLoss: z.number().nonnegative()
});

const stressSchema = z.object({
  dropPercent: z.union([z.literal(10), z.literal(20), z.literal(30)])
});

router.post("/calculate", validate(riskSchema), asyncHandler(calculateRisk));
router.post("/position-size", validate(positionSizeSchema), asyncHandler(calculatePosition));
router.post("/stress-test", validate(stressSchema), asyncHandler(stressTest));

module.exports = router;