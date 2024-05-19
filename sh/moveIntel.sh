#!/bin/bash

# 定义源目录和目标目录
src_dir="packages/components/vue3/src"
dest_dir="packages/intel/vue3/src"

# 查找并移动文件
find $src_dir -type d \( -name '__tests__' -o -name '_example' -o -name '_example-ts' -o -name '_usage' \) -o -type f \( -name '*.md' -o -name 'props.ts' -o -name 'type.ts' -o -name '*-props.ts' \) | while read src_file; do
    # 计算目标文件的路径
    dest_file="${dest_dir}${src_file#${src_dir}}"

    # 创建目标文件的父目录
    mkdir -p "$(dirname "$dest_file")"

    # 移动文件
    git mv "$src_file" "$dest_file"
done