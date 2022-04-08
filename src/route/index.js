import { createRouter, createWebHashHistory } from "vue-router"

const olmap = () => import("../components/olmap")
const amap = () => import("../components/amap")
const googlemap = () => import("../components/googlemap")
const tiandimap = () => import("../components/tiandimap")

const routes = [
    {
        path: "/olmap",
        name: "olmap",
        component: olmap
    },
    {
        path: "/amap",
        component: amap
    },
    {
        path: "/googlemap",
        component: googlemap
    },
    {
        path: "/tiandimap",
        component: tiandimap
    },
    // 重定向
    {
        path: '/', 
        redirect: '/olmap' 
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})