import { vLoading } from "./directive";
import _Loading from "./loading";
import { withInstall } from "@td/adapter-utils";
import type { TdLoadingProps } from "@td/intel/components/loading/type";

import "./style";

export * from '@td/intel/components/loading/type';

export * from "./plugin";
export type LoadingProps = TdLoadingProps;

export { default as LoadingPlugin } from "./plugin";

export const Loading = withInstall(_Loading, _Loading.name, {
  name: "loading",
  comp: vLoading,
});
export default Loading;
