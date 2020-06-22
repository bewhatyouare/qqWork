
let Vue;
class Qrouter {
    static install(_Vue){
        Vue = _Vue;//局部变量缓存
        Vue.mixin({
            beforeCreate(){
                Vue.prototype.$qrouter = '自己的路由';
                // console.info(this.$options);
                if(this.$options.router){
                    this.$options.router.init();
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
        console.info(this.app.current);
        console.info(this.$routeMap[this.app.current]);
        Vue.component('router-view',{
            render: h => h(this.$routeMap[this.app.current].component)
        })
    }
    createRouteMap(){
        this.$options.routes.forEach( item => {
            this.$routeMap[item.path] = item;
        })
        // console.info(this.$routeMap);
    }
    bindEvents(){
        window.addEventListener('hashChange',this.onHashChange.bind(this),false);
        window.addEventListener('load',this.onHashChange.bind(this),false);
    }
    getHash(){
        return window.location.hash.slice(1) || '/';
    }
    onHashChange(e){
        console.info('hash变了');
        //获取当前路由的hash值
        let hash = this.getHash();
        console.info(hash);
        // this.app.current = hash;
    }
}
export default Qrouter;