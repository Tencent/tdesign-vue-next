import { setupServer } from 'msw/node';
import { rest } from 'msw';

export function getUploadServer() {
  return setupServer(
    ...[
      // mock file upload success
      rest.post('https://tdesign.test.com/upload/file_success', (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            ret: 0,
            data: {
              name: 'tdesign.min.js',
              url: 'https://tdesign.gtimg.com/site/spline/script/tdesign.min.js',
            },
          }),
        ),
      ),
      // mock image upload success
      rest.post('https://tdesign.test.com/upload/image_success', (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            code: 200,
            name: 'demo-image-1.png',
            url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
          }),
        ),
      ),
      // mock upload failed on status
      rest.post('https://tdesign.test.com/upload/fail/status_error', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({})),
      ),
      // mock upload failed in response
      rest.post('https://tdesign.test.com/upload/fail/response_error', (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            code: 1001,
            name: 'file-name.txt',
            error: 'upload failed',
          }),
        ),
      ),
    ],
  );
}

export default getUploadServer;
