import { AdminController } from "@/controllers/admin.controller";
import { verifyToken } from "@/lib/jwt";
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
  }

  getRouter(): Router {
    return this.router;
  }
}
