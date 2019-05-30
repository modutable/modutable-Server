import express, { Request, Response, NextFunction } from "express";
import hostController from "../controller/host";

const router = express.Router();

router.get("/hostaddress", hostController.mainViewAddress);
router.get("/quickhost", hostController.quickSearchHost);

export = router;
