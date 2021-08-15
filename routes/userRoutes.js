import Router from "express";
import tokenValidator from "../middlewares/tokenValidator";
import { isOperator, isManagerOrOperator, isManager } from "../middlewares/roleVerifier";
import { isIdSafeInteger } from "../middlewares/sanitizer";
import { isSelf } from "../middlewares/checkOwnership";
import {
  viewSingleManager,
  viewAllManagers,
  searchManagers,
  viewSingleDriver,
  viewAllDrivers,
  searchDrivers,
  viewCommuterProfile,
  viewOwnProfile,
  viewAllCooperativeDrivers,
} from "../controllers/userController";

const router = Router();

router.get(
  "/managers/:id",
  tokenValidator,
  isManagerOrOperator,
  isIdSafeInteger,
  viewSingleManager
);

router.get("/managers", tokenValidator, isOperator, viewAllManagers);

router.get("/managers/search/:key", tokenValidator, isOperator, searchManagers);

router.get("/drivers/:id", tokenValidator, isIdSafeInteger, viewSingleDriver);

router.get("/drivers", tokenValidator, viewAllDrivers);

router.get("/drivers/cooperative/:id", tokenValidator, isManager, isIdSafeInteger, viewAllCooperativeDrivers);

router.get("/drivers/search/:key", tokenValidator, searchDrivers);

router.get("/profile", tokenValidator, viewOwnProfile);

router.get(
  "/commuters/:id",
  tokenValidator,
  isIdSafeInteger,
  isSelf,
  viewCommuterProfile
);

export default router;
