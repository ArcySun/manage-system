<template>
    <div class="sidebar">
        <el-menu
                class="sidebar-el-menu"
                :default-active="onRoutes"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                unique-opened
                :router="true"
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                        v-for="(threeItem,i) in subItem.subs"
                                        :key="i"
                                        :index="threeItem.index"
                                >
                                    <template slot="title">
                                        <i :class="threeItem.icon"></i>
                                        <span slot="title">{{ threeItem.title }}</span>
                                    </template>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    const data = [
        {
            icon: 'el-icon-lx-home',
            index: 'dashboard',
            title: '系统首页'
        },
        {
            icon: 'el-icon-lx-cascades',
            index: 'table',
            title: '基础表格'
        },
        {
            icon: 'el-icon-lx-copy',
            index: 'tabs',
            title: 'tab选项卡'
        },
        {
            icon: 'el-icon-lx-calendar',
            index: '3',
            title: '表单相关',
            subs: [
                {
                    index: 'form',
                    title: '基本表单'
                },
                {
                    index: '3-2',
                    title: '三级菜单',
                    subs: [
                        {
                            index: 'editor',
                            title: '富文本编辑器'
                        },
                        {
                            index: 'markdown',
                            title: 'markdown编辑器'
                        },
                    ]
                },
                {
                    index: 'upload',
                    title: '文件上传'
                }
            ]
        },
        {
            icon: 'el-icon-lx-emoji',
            index: 'icon',
            title: '自定义图标'
        },
        {
            icon: 'el-icon-lx-emoji',
            index: 'welcome',
            title: '新增页面'
        },
        {
            icon: 'el-icon-lx-favor',
            index: '1-1',
            title: '图表',
            subs: [
                {
                    index: 'charts',
                    title: 'schart图表',
                },
                {
                    index: 'echarts',
                    title: 'echarts图表',
                }
            ]
        },
        {
            icon: 'el-icon-rank',
            index: '6',
            title: '拖拽组件',
            subs: [
                {
                    index: 'drag',
                    title: '拖拽列表',
                },
                {
                    index: 'dialog',
                    title: '拖拽弹框',
                }
            ]
        },
        {
            icon: 'el-icon-lx-warn',
            index: '7',
            title: '错误处理',
            subs: [
                {
                    index: 'permission',
                    title: '权限测试'
                },
                {
                    index: '404',
                    title: '404页面'
                }
            ]
        }
    ];
    export default {
        data() {
            return {
                collapse: false,
                items: ""
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace("/", "");
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            this.$bus.$on("collapse", msg => {
                this.collapse = msg;
            });

            // get menu info &&  init router
            //this.$request.post();
            // console.log(this.$router);
            // login success
            if (process.env.NODE_ENV === "none") {
                this.items = data;
            } else {
                let menu_info = "";
                if (localStorage.getItem("inuserdata") !== null) {
                    menu_info = JSON.parse(decodeURIComponent(atob(localStorage.inuserdata))).menu;
                    console.log(menu_info);
                }
                this.$bus.$on("login", msg => {
                    if (msg !== "" || msg !== null) {
                        localStorage.setItem("inuserdata", btoa(encodeURIComponent(JSON.stringify(msg))));
                        this.items = msg.menu;
                    }
                });
                this.items = menu_info;
            }


        }
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
