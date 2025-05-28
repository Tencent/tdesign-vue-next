import { buildTypes } from './build-types';
import { buildComponents } from './build-components';

async function build() {
  await buildComponents();
  await buildTypes();
}

build();
