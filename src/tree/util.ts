import { VNode } from 'vue';

export function getParentsToRoot(element?: HTMLElement, root?: HTMLElement): Array<HTMLElement> {
  const list = [];
  let el: any = element;
  while (el && el.parentNode) {
    list.push(el);
    if (el === root) {
      break;
    }
    el = el.parentNode;
  }
  return list;
}

export interface Role {
  name: string;
  el?: HTMLElement;
}

export function getParentRoles(element?: HTMLElement, root?: HTMLElement): Array<Role> {
  const list = getParentsToRoot(element, root);
  return (
    list.map((el) => {
      const role: Role = {
        name: el.getAttribute('role') || '',
        el,
      };
      return role;
    }).filter(role => role.name)
  );
};

export function getRole(element?: HTMLElement, root?: HTMLElement): Role {
  const list = getParentRoles(element, root);
  const info = list.pop() || null;
  return info;
};

export function getTNode(prop: any, options: any): string | VNode {
  let tnode = null;
  let item = null;
  if (typeof prop === 'function') {
    item = prop(options);
  }
  if (typeof item === 'string') {
    tnode = item;
  } else if (item) {
    tnode = item as VNode;
  }
  return tnode;
}
