import { writeFileSync } from 'node:fs';
import { manifest } from 'tdesign-icons-vue-next';

function main() {
  writeFileSync(
    'src/icons.json',
    JSON.stringify(
      manifest.map((item) => item.icon + 'Icon'),
      null,
      4,
    ),
    'utf-8',
  );
}

main();
