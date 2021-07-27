import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import config from './config';

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
      docRoute = {
        path: item.path,
        name: item.name,
        meta: { docType: item.docType },
        component: item.component,
      };
      docsRoutes.push(docRoute);
    }
  });
  return docsRoutes;
}

const routes = [
  {
    path: '/',
    redirect: () => ({ name: 'button' }),
  },
  {
    path: '/vue-next/',
    redirect: () => ({ name: 'button' }),
  },
  ...getDocsRoutes(docs, 'doc'),
  ...getDocsRoutes(docs, 'component'),
];

const routerConfig = {
  history: createWebHashHistory('/'),
  routes,
};

if (process.env.NODE_ENV === 'production') {
  routerConfig.history = createWebHistory('/');
}

const router = createRouter(routerConfig);

export default router;
