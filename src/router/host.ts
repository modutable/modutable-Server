import express, { Request, Response, NextFunction } from "express";
import hostController from "../controller/host";

const router = express.Router();

router.get("/", hostController.getHosts);
router.get("/detail", hostController.getOneHost);

export = router;
