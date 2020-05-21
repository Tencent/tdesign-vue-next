import config from './config/index';
import SpfxComponents from './pages/components';
import SpfxDemoList from './pages/demo-list';
import SpfxDemoPage from './pages/demo-page';

const demoReq = require.context('../examples', true, /demos[/\\][\w-]+\.vue$/im);

const { navs } = config.navs;

function getDocsRoutes(docs, type) {
  let docsRoutes = [];
  let docRoute;

  docs.forEach((item) => {
    const docType = item.type || type;
    if (item.children) {
      docsRoutes = docsRoutes.concat(getDocsRoutes(item.children, docType));
    } else {
      docRoute = {
        path: item.name,
        component: item.component,
      };
      docsRoutes.push(docRoute);
    }
  });
  return docsRoutes;
}

/**
 * 生成可独立调试的 demo 路由
 * 访问路径 /demos/组件目录名/demo 文件名（无后缀）
 */
function getDemoRoutes() {
  if (process.env.NODE_ENV === 'development') {
    return demoReq.keys().map((key) => {
      const match = key.match(/([\w-]+).demos.([\w-]+).vue/);
      const [, componentName, demoName] = match;
      return {
        path: `/demos/${componentName}/${demoName}`,
        props: { componentName, demo: demoReq(key).default },
        component: SpfxDemoPage,
      };
    });
  }
  return [];
}
const demoRoutes = getDemoRoutes();
const routes = [
  {
    path: '/components',
    redirect: '/components/install',
    component: SpfxComponents,
    children: getDocsRoutes(navs.components.docs),
  },
  {
    path: '*',
    redirect: '/components/install',
  },
  ...demoRoutes,
  {
    path: '/demos*',
    component: SpfxDemoList,
    props: { demoRoutes },
  },
];
export default routes;
