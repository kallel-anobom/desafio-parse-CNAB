import express from "express";
import multer from "multer";

import CnabController from "../controllers/CnabController";

const router = express.Router();
const upload = multer();

const cnabController = new CnabController();

/**
 * @openapi
 * /api/upload:
 *   post:
 *     summary: Faz o upload de um arquivo CNAB
 *     tags: [CNAB]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Arquivo enviado com sucesso
 *       400:
 *         description: Erro no envio do arquivo
 *       500:
 *         description: Erro no servidor ao processar o arquivo
 */
router.post("/upload", upload.single("file"), (req, res) =>
  cnabController.uploadFile(req, res)
);

router.get("/transactions", cnabController.getAllTransactions);

export default router;
