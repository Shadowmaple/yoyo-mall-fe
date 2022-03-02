import Home from '../views/Home.vue'
import Coupon from '../views/home/Coupon.vue'
import Feedback from '../views/home/Feedback.vue'
import Logistics from '../views/home/Logistics.vue'
import Product from '../views/home/product/Product.vue'
import Login from '../views/Login.vue'

const routes = [{
    path: '/',
    component: Home,
    children: [{
        path: 'product',
        component: Product,
    }, {
        path: 'feedback',
        component: Feedback,
    }, {
        path: 'coupon',
        component: Coupon,
    }, {
        path: 'logistics',
        component: Logistics,
    }]
}, {
    path: '/login',
    component: Login,
}]

export default routes