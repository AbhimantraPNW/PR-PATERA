import { createProductService } from '@/services/admin/products/create-product.service';
import { forgotPasswordService } from '@/services/admin/auth/forgot-password.service';
import { getProductsService } from '@/services/admin/products/get-products.service';
import { keepLoginService } from '@/services/admin/auth/keep-login.service';
import { loginService } from '@/services/admin/auth/login.service';
import { registerService } from '@/services/admin/auth/register.service';
import { resetPasswordService } from '@/services/admin/auth/reset-password.service';
import { NextFunction, Request, Response } from 'express';
import { getProductService } from '@/services/admin/products/get-product.service';
import { deleteProductService } from '@/services/admin/products/delete-product.service';
import { deleteImageService } from '@/services/admin/images/delete-image.service';
import { updateProductService } from '@/services/admin/products/update-product.service';

export class AdminController {
  async registerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next (error);
    }
  }

  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next (error);
    }
  }

  async forgotPasswordController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await forgotPasswordService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next (error);
    }
  }

  async resetPasswordController(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.body.user.id)
      const password = req.body.password

      const result = await resetPasswordService(userId, password);
      res.status(200).send(result);
    } catch (error) {
      next (error);
    }
  }

  async keepLoginController(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.body.user.id);

      const result = await keepLoginService(userId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createProductController(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];

      if(!files.length) {
        throw new Error('No file uploaded')
      }

      const result = await createProductService(req.body, files);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getProductController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const result = await getProductService(Number(id));
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  
  async getProductsController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string) || '',
      };

      const result = await getProductsService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateProductsController(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];
      // const existingImages = req.body.deletedImages ? JSON.parse(req.body.existingImages) : [];

      const result = await updateProductService(
        Number(req.params.id),
        req.body,
        files,
        // existingImages
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteProductsController(req: Request, res: Response, next: NextFunction) {
    try {
      
      const result = await deleteProductService(Number(req.params.id));
      return res.status(200).send(result)
    } catch (error) {
      next(error);
    }
  }

  async deleteImagesController(req: Request, res: Response, next: NextFunction) {
    try {
      
      const result = await deleteImageService(Number(req.params.id));
      return res.status(200).send(result)
    } catch (error) {
      next(error);
    }
  }
}
