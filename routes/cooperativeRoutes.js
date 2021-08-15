import Router from "express";
import {
  createCooperative,
  viewSingleCooperative,
  viewAllCooperatives,
  searchCooperatives,
  viewCooperativeStats,
  viewCooperativesStats,
} from "../controllers/cooperativesController";
import tokenValidator from "../middlewares/tokenValidator";
import { isOperator, isManager } from "../middlewares/roleVerifier";
import {
  cooperativeValidator,
  validateForm,
} from "../middlewares/formValidations";
import { isIdSafeInteger } from "../middlewares/sanitizer";

const router = Router();

router.post(
  "/new",
  tokenValidator,
  isOperator,
  cooperativeValidator,
  validateForm,
  createCooperative
);

router.get(
  "/:id",
  tokenValidator,
  isOperator,
  isIdSafeInteger,
  viewSingleCooperative
);

router.get(
  "/:id/stats",
  tokenValidator,
  isManager,
  isIdSafeInteger,
  viewCooperativeStats
);

router.get("/stats/all", tokenValidator, isOperator, viewCooperativesStats);

router.get("/", tokenValidator, isOperator, viewAllCooperatives);

router.get("/search/:key", tokenValidator, isOperator, searchCooperatives);

export default router;
