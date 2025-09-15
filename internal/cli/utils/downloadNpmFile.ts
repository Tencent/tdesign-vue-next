import * as pacote from 'pacote';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 下载 npm 包中的指定文件
 * @param options 配置参数
 * @param options.packageName npm 包名（可带版本，如 `tdesign-vue-next@latest`）
 * @param options.filePathInPackage 包内文件路径（如 `es/button/style/index.css`）
 * @param options.localDir 本地保存目录（如 `./style`）
 * @param options.localFileName 本地保存的文件名（如 `tdesign-button.css`）
 */
export async function downloadNpmFile(options: {
  packageName: string;
  filePathInPackage: string;
  localDir: string;
  localFileName: string;
}): Promise<void> {
  const { packageName, filePathInPackage, localDir, localFileName } = options;

  try {
    // 1. 创建本地目录（如果不存在）
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const outputPath = path.join(localDir, localFileName);
    // 2. 使用 pacote.extract 提取整个包到临时目录
    const tempDir = path.join(localDir, '.temp-' + Date.now());
    try {
      await pacote.extract(packageName, tempDir);
      // 3. 复制指定文件到目标位置
      const sourceFile = path.join(tempDir, filePathInPackage);
      if (!fs.existsSync(sourceFile)) {
        throw new Error(`文件 '${filePathInPackage}' 在包 '${packageName}' 中未找到`);
      }
      fs.copyFileSync(sourceFile, outputPath);
    } finally {
      // 4. 清理临时目录
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }
  } catch (err) {
    // 错误信息由调用方处理，这里直接抛出
    throw err;
  }
}
