import express from "express";
import multer from "multer";

import CnabController from "../controllers/CnabController";

const router = express.Router();
const upload = multer();

const cnabController = new CnabController();

router.post("/upload", upload.single("file"), (req, res) =>
  cnabController.uploadFile(req, res)
);

router.get("/transactions", cnabController.getAllTransactions);

export default router;
