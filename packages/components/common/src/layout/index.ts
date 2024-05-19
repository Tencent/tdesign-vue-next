import _Layout from './layout';
import _Header from './header';
import _Footer from './footer';
import _Aside from './aside';
import _Content from './content';
import { withInstall } from '@td/adapter-utils';
import { TdHeaderProps, TdFooterProps, TdAsideProps } from '@td/intel/layout/type';

import './style';

export * from '@td/intel/layout/type';
export type HeaderProps = TdHeaderProps;
export type FooterProps = TdFooterProps;
export type AsideProps = TdAsideProps;

export const Aside = withInstall(_Aside);
export const Layout = withInstall(_Layout);
export const Header = withInstall(_Header);
export const Footer = withInstall(_Footer);
export const Content = withInstall(_Content);
export default Layout;
