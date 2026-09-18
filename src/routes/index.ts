import { Router } from "express";
import { SpecialtyRoutes } from "../module/specialty";
import { PatientRoutes } from "../module/patient";
import { AuthRoutes } from "../module/auth";

const router = Router();

interface IModuleRoute {
  path: string;
  route: Router;
}

const moduleRoutes: IModuleRoute[] = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtyRoutes,
  },
  {
    path: "/patients",
    route: PatientRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
