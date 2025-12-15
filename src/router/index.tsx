import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { routes } from "@/router/routes";
import type { RouteType } from "@/type/RouteType.ts";

const GuestGuard = () => {
  return <Outlet />;
};

export const Router = () => {
  const guestRoutes = routes().filter((route: RouteType) => {
    return !route.metadata?.isAuthenticated;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestGuard />}>
          {guestRoutes.map((route, routeIndex) => {
            const routeOptions = route.metadata || {};

            if (routeOptions.redirectTo) {
              return (
                <Route
                  key={routeIndex}
                  path={route.path}
                  element={<Navigate to={routeOptions.redirectTo} replace />}
                />
              );
            }
            return (
              <Route
                key={routeIndex}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

