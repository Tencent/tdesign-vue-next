import _Breadcrumb from './breadcrumb';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdBreadcrumbProps, TdBreadcrumbItemProps } from './type';

export * from './type';
export type BreadcrumbProps = TdBreadcrumbProps;
export type BreadcrumbItemProps = TdBreadcrumbItemProps;

const Breadcrumb: WithInstallType<typeof _Breadcrumb> = withInstall(_Breadcrumb);

export { Breadcrumb };
export default Breadcrumb;
