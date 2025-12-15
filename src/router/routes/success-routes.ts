import { RoutesConstant } from "@/utils/constant/RoutesConstant";
import SuccessPage from "@/pages/SuccessPage";
import type { RouteType } from "@/type/RouteType";

export const successRoutes: RouteType[] = [
    {
        path: RoutesConstant.success.index,
        name: RoutesConstant.success.index,
        component: SuccessPage,
        metadata: { isAuthenticated: false }
    }
];

