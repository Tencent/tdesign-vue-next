//! 之前写在公共 utils 里面，但看起来是公共 ts
export type Gradients = { [percent: string]: string };
export type FromTo = { from: string; to: string };
export type LinearGradient = { direction?: string } & (Gradients | FromTo);