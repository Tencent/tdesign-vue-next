import Layout from './layout';
import Header from './header';
import Footer from './footer';
import Aside from './aside';
import Content from './content';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('Layout', Layout);
setInstallFn('Header', Header);
setInstallFn('Footer', Footer);
setInstallFn('Aside', Aside);
setInstallFn('Content', Content);

export { Layout, Header, Footer, Aside, Content };
export default Layout;
