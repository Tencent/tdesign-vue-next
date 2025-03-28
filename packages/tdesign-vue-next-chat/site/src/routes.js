import { createRouter, createWebHistory } from 'vue-router';
import config from '../site.config';
import TdesignComponents from './components/components.jsx';

const { docs, enDocs } = config;

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
    path: '/chat/',
    redirect: '/chat/overview',
    component: TdesignComponents,
    children: [...getDocsRoutes(docs), ...getDocsRoutes(enDocs)],
  },
  {
    path: '/',
    redirect: '/chat/overview',
  },
  {
    path: '/:w+',
    redirect: '/chat/overview',
  },
  {
    name: 'demosComponent',
    path: '/chat/demos/:componentName/',
    component: () => import('./components/demo-page.vue'),
  },
  {
    name: 'demos',
    path: '/chat/demos/:componentName/:demoName',
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
  document.querySelector('td-stats')?.track?.();
});

export default router;
