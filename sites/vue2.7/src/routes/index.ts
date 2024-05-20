import config from './config';
import TdesignComponents from '../components/page.vue';

const { docs, enDocs } = config;

function getDocsRoutes(docs, type) {
  let docsRoutes = [];
  let docRoute;

  docs.forEach((item) => {
    const docType = item.type || type;

    let { children } = item;
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
    path: '/vue',
    redirect: '/vue/overview',
    component: TdesignComponents,
    children: [...getDocsRoutes(docs), ...getDocsRoutes(enDocs)],
  },
  {
    path: '*',
    redirect: '/vue/overview',
  },
  {
    name: 'demos',
    path: '/vue/demos/:componentName/',
    component: () => import('../components/demo-page.vue'),
  },
  {
    name: 'demo',
    path: '/vue/demos/:componentName/:demoName',
    component: () => import('../components/demo-page.vue'),
  },
];
export default routes;
