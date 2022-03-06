import Home from '../views/Home.vue'
import Coupon from '../views/home/coupon/Coupon.vue'
import Feedback from '../views/home/feedback/Feedback.vue'
import Order from '../views/home/order/Order.vue'
import Product from '../views/home/product/Product.vue'
import Login from '../views/Login.vue'

const routes = [{
    path: '/',
    component: Home,
    redirect: "/product",
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
        path: 'order',
        component: Order,
    }]
}, {
    path: '/login',
    component: Login,
}]

export default routes