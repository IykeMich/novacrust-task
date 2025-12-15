import React from "react";

export type RouteType = {
    path: string;
    name: string;
    component: React.ComponentType;
    metadata?: {
        redirectTo?: string;
        type?: string;
        isAuthentication?: boolean;
        isAuthenticated?: boolean;
        [key: string]: any;
    };
}


