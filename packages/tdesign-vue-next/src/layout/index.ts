import { withInstall } from '@td/adapter-vue';
import type { TdAsideProps, TdFooterProps, TdHeaderProps } from '@td/components/layout/type';
import _Layout from '@td/components-common/src/layout/layout';
import _Header from '@td/components-common/src/layout/header';
import _Footer from '@td/components-common/src/layout/footer';
import _Aside from '@td/components-common/src/layout/aside';
import _Content from '@td/components-common/src/layout/content';

import '@td/components-common/src/layout/style';

export * from '@td/components/layout/type';
export type HeaderProps = TdHeaderProps;
export type FooterProps = TdFooterProps;
export type AsideProps = TdAsideProps;

export const Aside = withInstall(_Aside);
export const Layout = withInstall(_Layout);
export const Header = withInstall(_Header);
export const Footer = withInstall(_Footer);
export const Content = withInstall(_Content);
export default Layout;
