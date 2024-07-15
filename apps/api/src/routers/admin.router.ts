import { AdminController } from "@/controllers/admin.controller";
import { verifyToken } from "@/lib/jwt";
import { uploader } from "@/lib/uploader";
import { Router } from "express";

export class AdminRouter {
  private router: Router;
  private adminController: AdminController;

  constructor() {
    this.adminController = new AdminController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/auth/register", this.adminController.registerController);
    this.router.post("/auth/login", this.adminController.loginController);
    this.router.post("/auth/forgot-password", this.adminController.forgotPasswordController);
    this.router.patch("/auth/reset-password", verifyToken, this.adminController.resetPasswordController);
    this.router.get("/auth/keep-login", verifyToken, this.adminController.keepLoginController);
    this.router.get("/products/:id", this.adminController.getProductController)
    this.router.patch('/products/:id', verifyToken, uploader("IMG", "/images").array("images", 4), this.adminController.updateProductsController)
    this.router.delete('/products/:id', verifyToken, this.adminController.deleteProductsController)
    this.router.delete('/images/:id', verifyToken, this.adminController.deleteImagesController)
    this.router.post("/products", verifyToken, uploader("IMG", "/images").array("image", 4), this.adminController.createProductController);
    this.router.get('/products', this.adminController.getProductsController)
  }

  getRouter(): Router {
    return this.router;
  }
}
