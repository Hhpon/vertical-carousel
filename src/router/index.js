import Vue from 'vue';
import VueRouter from 'vue-router';
import Report from '../components/report/report';
import Swiper from '@/components/swiper/swiper';

Vue.use(VueRouter);

const routes = [
  {
    path: '/report',
    component: Report
  },
  {
    path: '/swiper',
    component: Swiper
  },
  {
    path: '*',
    redirect: '/swiper'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
