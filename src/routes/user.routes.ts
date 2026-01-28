import { Route } from "@/types";

export const userRoutes: Route[] = [
    {
        title: "Blog Management",
        url: "",
        items: [
            {
                title: "Create Blog",
                url: "/dashboard/create-blog",
            },
            {
                title: "History",
                url: "/dashboard/history",
            },
        ],
    },
];