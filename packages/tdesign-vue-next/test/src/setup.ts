import { vi } from 'vitest';
import { config } from '@vue/test-utils';
import createFetchMock from 'vitest-fetch-mock';
import TDesign from '@tdesign/components';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

config.global.plugins = [TDesign];
