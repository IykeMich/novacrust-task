import { conversionRoutes } from "@/router/routes/conversion-routes";
import { successRoutes } from "@/router/routes/success-routes";
import type { RouteType } from "@/type/RouteType";

export const routes = () => {
    const initRoute = [] as RouteType[];

    return initRoute.concat(
        conversionRoutes,
        successRoutes
    );
}

