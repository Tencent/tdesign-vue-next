import type { InjectionKey } from '@td/adapter-vue';

export const AnchorInjectionKey: InjectionKey<{
  registerLink: (link: string) => void;
  unregisterLink: (link: string) => void;
  handleScrollTo: (link: string) => void;
  handleLinkClick: (link: { href: string; title: string; e: MouseEvent }) => void;
  active: string;
}> = Symbol('AnchorInjectionProvide');
