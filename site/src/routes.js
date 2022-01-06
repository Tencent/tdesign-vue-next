import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import config from '../site.config';
import TdesignComponents from './components/components.jsx';

const { docs } = config;

function getDocsRoutes(docs, type) {
  let docsRoutes = [];
  let docRoute;

  docs.forEach((item) => {
    const docType = item.type || type;
    let { children } = item;
    if (item.type === 'component') {
      children = item.children.sort((a, b) => {
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

const routes = [
  {
    path: '/vue-next/',
    redirect: '/vue-next/overview',
    component: TdesignComponents,
    children: getDocsRoutes(docs),
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
    path: '/vue-next/demos/:componentName/:demoName',
    component: () => import('./components/demo-page.vue'),
  },
];

const routerConfig = {
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    if (to.path !== from.path) {
      return { top: 0 };
    }
  },
};

if (process.env.NODE_ENV === 'preview') {
  routerConfig.history = createWebHashHistory();
}

const router = createRouter(routerConfig);

router.beforeEach((to, from, next) => {
  if (typeof NProgress !== 'undefined') {
    // eslint-disable-next-line no-undef
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  if (typeof NProgress !== 'undefined') {
    // eslint-disable-next-line no-undef
    NProgress.done();
  }
});

export default router;
