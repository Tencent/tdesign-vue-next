import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import config from './site.config';
import TdesignComponents from './components/components.jsx';
import TdesignDemoPage from './components/demo-page.vue';
import TdesignPlayground from './pages/playground/index.vue';

const { docs } = config;

export const demoFiles = import.meta.globEager('../examples/**/demos/*.vue');

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
      docRoute = {
        path: item.name,
        meta: item.meta || {},
        component: item.component,
      };
      docsRoutes.push(docRoute);
    }
  });
  return docsRoutes;
}

function getDemoRoutes() {
  if (process.env.NODE_ENV === 'development') {
    return Object.keys(demoFiles).map((key) => {
      const match = key.match(/([\w-]+).demos.([\w-]+).vue/);
      const [, componentName, demoName] = match;
      return {
        path: `/vue-next/demos/${componentName}/${demoName}`,
        props: { componentName, demo: demoFiles[key].default },
        component: TdesignDemoPage,
      };
    });
  }
  return [];
}

const demoRoutes = getDemoRoutes();

const routes = [
  {
    path: '/vue-next/components',
    redirect: '/vue-next/components/button',
    component: TdesignComponents,
    children: getDocsRoutes(docs),
  },
  {
    path: '/vue-next/',
    redirect: '/vue-next/components/button',
  },
  {
    path: '/',
    redirect: '/vue-next/components/button',
  },
  ...demoRoutes,
];

if (process.env.NODE_ENV === 'development') {
  routes.push({
    path: '/vue-next/playground',
    component: TdesignPlayground,
  });
}

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

export default router;
