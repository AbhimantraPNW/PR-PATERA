import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { customProductService } from '@/services/custom.product';

export class ProductController {
  async customProductController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // const { name, size, quantity, handle } = req.body;

      // if (!name || !size || !quantity || handle === undefined) {
      //   return res.status(400).send({ error: 'Missing required fields' });
      // }
  
      console.log("incoming data:", req.body)
 
      const result = await customProductService(req.body);

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
}
