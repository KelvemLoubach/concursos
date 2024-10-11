import { Request, Response } from "express";
import generateResourceService from "../services/generateResourceService";

const generateResourceController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await generateResourceService(req, res);
  } catch (error) {
    console.error("Erro no controller generateResource: ", error);
    res.status(500).json({ error: "Erro ao gerar o recurso." });
  }
};

export { generateResourceController };
