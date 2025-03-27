import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import config from './site.config';
import TdesignComponents from '../components/components.jsx';
// @ts-ignore
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const { docs, enDocs } = config;

function getDocsRoutes(docs: any[], type?: any) {
  let docsRoutes: any = [];
  let docRoute;

  docs.forEach((item) => {
    const docType = item.type || type;
    let { children } = item;
    if (item.type === 'component') {
      children = item.children.sort((a: any, b: any) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }
    if (children) {
      docsRoutes = docsRoutes.concat(getDocsRoutes(children, docType));
    } else {
      docRoute = { ...item };
      docsRoutes.push(docRoute);
    }
  });
  return docsRoutes;
}

const routes: RouteRecordRaw[] = [
  {
    path: '/vue-next/',
    redirect: '/vue-next/overview',
    component: TdesignComponents,
    children: [...getDocsRoutes(docs), ...getDocsRoutes(enDocs)],
  },
  {
    path: '/',
    redirect: '/vue-next/overview',
  },
  {
    path: '/:w+',
    redirect: '/vue-next/overview',
  },
  {
    name: 'demosComponent',
    path: '/vue-next/demos/:componentName/',
    component: () => import('../components/demo-page.vue'),
  },
  {
    name: 'demos',
    path: '/vue-next/demos/:componentName/:demoName',
    component: () => import('../components/demo-page.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    if (to.path !== from.path) {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (typeof NProgress !== 'undefined') {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  if (typeof NProgress !== 'undefined') {
    NProgress.done();
  }
  // todo 这是干啥的
  // @ts-ignore
  document.querySelector('td-stats')?.track?.();
});

export default router;
