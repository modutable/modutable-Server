"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const express_1 = __importDefault(require("express"));
//const host_1 = __importDefault(require("../controller/host"));
const router = express_1.default.Router();
router.get("/", host_1.default.getHosts);
router.get("/detail", host_1.default.getOneHost);
module.exports = router;
