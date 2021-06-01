import _Layout from './layout';
import _Header from './header';
import _Footer from './footer';
import _Aside from './aside';
import _Content from './content';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Layout: WithInstallType<typeof _Layout> = withInstall(_Layout);
const Header: WithInstallType<typeof _Header> = withInstall(_Header);
const Footer: WithInstallType<typeof _Footer> = withInstall(_Footer);
const Aside: WithInstallType<typeof _Aside> = withInstall(_Aside);
const Content: WithInstallType<typeof _Content> = withInstall(_Content);

export { Layout, Header, Footer, Aside, Content };
export default Layout;
