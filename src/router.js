import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path:'*',
            name:'notfound',
            component:()=>import('./pages/Index/Navigation')
        },
        {
            path:'/',
            name:'navigation',
            component:()=>import('./pages/Index/Navigation')
        },
        {
            path:'/olmap',
            name:'olmap',
            component:()=>import('./pages/Index/olmap')
        },
        {
            path:'/dynamicdata',
            name:'dynamicdata',
            component:()=>import('./pages/Index/DynamicData')
        },
        {
            path:'/earthquakeheatmap',
            name:'earthquakeheatmap',
            component:()=>import('./pages/Index/EarthquakeHeatMap')
        },
        {
            path:'/hittolerance',
            name:'hittolerance',
            component:()=>import('./pages/Index/HitTolerance')
        }
    ]
})