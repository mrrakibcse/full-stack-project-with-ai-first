import { Router } from "express";
import { SpecialtyRoutes } from "../module/specialty";

const router = Router();

interface IModuleRoute {
  path: string;
  route: Router;
}

const moduleRoutes: IModuleRoute[] = [
  {
    path: "/specialties",
    route: SpecialtyRoutes,
  },
  // Future module routes can be registered here:
  // {
  //   path: "/users",
  //   route: UserRoutes,
  // },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
