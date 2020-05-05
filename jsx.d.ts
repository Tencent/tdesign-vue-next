declare namespace JSX {
  interface Element {} //eslint-disable-line

  interface ElementAttributesProperty { $props: {} }

  // allows to use "noImplicitAny": true in tsconfig.json
  interface IntrinsicElements {
    [elemName: string]: any;
  }

}
