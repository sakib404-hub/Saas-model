import type { Request, Response } from "express";
import status from "http-status";

const notFound = (req: Request, res: Response) => {
  return res.status(status.NOT_FOUND).json({
    success: false,
    statusCode: status.NOT_FOUND,
    message: "Route not found",
    error: {
      path: req.originalUrl,
      method: req.method,
    },
    timestamp: new Date().toISOString(),
  });
};

export default notFound;