import { createRouter, createWebHistory } from 'vue-router';
import { createLlmsRedirectRoutes } from '@tdesign/common-docs/plugins/generate-llms/route';
import config from '../site.config';
import TdesignComponents from './components/components.jsx';

const { docs } = config;

function getDocsRoutes(docs, type) {
  let docsRoutes = [];
  let docRoute;

  docs?.forEach((item) => {
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
  // llms.txt 规范产物：主域名被 SPA 兜底时跳转到静态资源域名（vite base）下的真实文件
  ...createLlmsRedirectRoutes({ prefix: '/vue-next-chat' }),
  {
    path: '/vue-next-chat/',
    redirect: '/vue-next-chat/getting-started',
    component: TdesignComponents,
    children: [...getDocsRoutes(docs)],
  },
  {
    path: '/',
    redirect: '/vue-next-chat/getting-started',
  },
  {
    path: '/:w+',
    redirect: '/vue-next-chat/getting-started',
  },
  {
    name: 'demosComponent',
    path: '/vue-next-chat/demos/:componentName/',
    component: () => import('./components/demo-page.vue'),
  },
  {
    name: 'demos',
    path: '/vue-next-chat/demos/:componentName/:demoName',
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
