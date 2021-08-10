import _Breadcrumb from './breadcrumb';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdBreadcrumbProps, TdBreadcrumbItemProps } from '../../types/breadcrumb/TdBreadcrumbProps';

const Breadcrumb: WithInstallType<typeof _Breadcrumb> = withInstall(_Breadcrumb);

export type BreadcrumbItemProps = TdBreadcrumbItemProps;
export type BreadcrumbProps = TdBreadcrumbProps;
export { Breadcrumb };
export default Breadcrumb;
