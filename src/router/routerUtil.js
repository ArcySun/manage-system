let routerUtil;

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * @param  {string}   name     the filename (basename) of the view to load.
 */
function view(name) {
    return function (resolve) {
        require([`../views/${name}.vue`], resolve);
    }
}

export default routerUtil = {
    default: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/dashboard',
                    component: view("Dashboard"),
                    meta: {title: '系统首页'}
                }
            ]
        },
        {
            path: '/login',
            component: view("Login")
        }
    ],
    loginSuccessRouter: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/dashboard',
                    component: resolve => require(['../views/Dashboard.vue'], resolve),
                    meta: {title: '系统首页'}
                },
                {
                    path: '/icon',
                    component: resolve => require(['../views/Icon.vue'], resolve),
                    meta: {title: '自定义图标'}
                },
                {
                    path: '/table',
                    component: resolve => require(['../views/BaseTable.vue'], resolve),
                    meta: {title: '基础表格'}
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../views/Tabs.vue'], resolve),
                    meta: {title: 'tab选项卡'}
                },
                {
                    path: '/form',
                    component: resolve => require(['../views/BaseForm.vue'], resolve),
                    meta: {title: '基本表单'}
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../views/VueEditor.vue'], resolve),
                    meta: {title: '富文本编辑器'}
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../views/Markdown.vue'], resolve),
                    meta: {title: 'markdown编辑器'}
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../views/Upload.vue'], resolve),
                    meta: {title: '文件上传'}
                },
                {
                    // vue-schart组件
                    path: '/echarts',
                    component: resolve => require(['../views/BaseEchart.vue'], resolve),
                    meta: {title: 'echarts图表'}
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../views/BaseCharts.vue'], resolve),
                    meta: {title: 'schart图表'}
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../views/DragList.vue'], resolve),
                    meta: {title: '拖拽列表'}
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../views/DragDialog.vue'], resolve),
                    meta: {title: '拖拽弹框'}
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../views/Permission.vue'], resolve),
                    meta: {title: '权限测试', permission: true}
                },
                {
                    path: '/404',
                    component: resolve => require(['../views/404.vue'], resolve),
                    meta: {title: '404'}
                },
                {
                    path: '/403',
                    component: resolve => require(['../views/403.vue'], resolve),
                    meta: {title: '403'}
                },
                {
                    path: '/welcome',
                    component: resolve => require(['../views/Welcome.vue'], resolve),
                    meta: {title: 'welcome'}
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../views/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ],
    baseRouter: [
        {
            path: '/',
            redirect: '/welcome'
        },
        {
            path: '/',
            component: () => import("../components/Home.vue"),
            meta: {title: '自述文件'},
            children: []
        },
        {
            path: '/login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '*',
            redirect: '/404'
        }],
    getInitRouter: function (data) {
        let initRouter = [];
        data.forEach(function (item) {
            const resource = item.resource;
            let it = {
                path: "/" + item.router,
                //TODO component: () => import(item.resource), check out it effective fixable
                // component: path,
                component: view(resource),
                meta: {title: item.title}
            };
            initRouter.push(it);

        });
        routerUtil.baseRouter[1].children = initRouter;
        return routerUtil.baseRouter;
    }
};
