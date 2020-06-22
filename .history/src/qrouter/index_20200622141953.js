
let Vue;
class Qrouter {
    static install(_Vue){
        Vue = _Vue;//局部变量缓存
        Vue.mixin({
            beforeCreate(){
                // console.info(this.$options);
                if(this.$options.router){
                    this.$options.router.init();
                    console.info(this.$options.router);
                    Vue.prototype.$qrouter = this.$options.router;
                }
            }
        })
    };
    constructor(options){
        this.$options = options;
        this.$routeMap = {};
        //使用VUE的响应机制
        this.app = new Vue({
            data:{
                //根目录
                current:'/home'
            }
        })
    }
    init(){
        //1、处理hashchange事件
        this.bindEvents();
        //2、处理路由列表
        this.createRouteMap();
        // 初始化routeview路由
        this.initComponent();
        //
    }
    initComponent(){
        Vue.component('router-view',{
            render: h => h(this.$routeMap[this.app.current].component)
        });
        Vue.component('router-link',{
            props:{
                to:String
            },
            render (h){
                //h 三个参数：组件名、参数、子元素
                return h('a',{
                    attrs:{
                        href:'#' + this.to
                    },
                },
                [this.$slots.default]
                )
            }
            //template:"<a :href='to'><slot></slot></a>"
        })
    }
    createRouteMap(){
        this.$options.routes.forEach( item => {
            this.$routeMap[item.path] = item;
        })
        // console.info(this.$routeMap);
    }
    bindEvents(){
        window.addEventListener('hashchange',this.onHashChange.bind(this),false);
        window.addEventListener('load',this.onHashChange.bind(this),false);
    }
    getHash(){
        return window.location.hash.slice(1) || '/';
    }
    push(path){
        this.app.current = path;
    }
    onHashChange(e){
        console.info('hash变了');
        //获取当前路由的hash值
        let hash = this.getHash();
        console.info(hash);
        this.app.current = hash;
    }
}
export default Qrouter;