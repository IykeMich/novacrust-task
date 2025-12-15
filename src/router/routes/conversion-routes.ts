import { RoutesConstant } from "@/utils/constant/RoutesConstant";
import ConversionPage from "@/pages/ConversionPage";
import type { RouteType } from "@/type/RouteType";

export const conversionRoutes: RouteType[] = [
    {
        path: RoutesConstant.conversion.index,
        name: RoutesConstant.conversion.index,
        component: ConversionPage,
        metadata: { isAuthenticated: false }
    }
];

