#!/bin/bash
# ---------------------------------------------------------------------------
# chat 迁移回归网 · 破坏性变更演练
#
# 作用：往 chat 源码里逐个注入典型的 breaking change，跑一遍测试，
#       验证回归网「拦得住」；每次注入后自动还原源码（用备份还原，不影响未提交改动）。
#
# 用法（在仓库根目录）：
#   bash packages/pro-components/chat/test/drill/migration-drill.sh
#   bash packages/pro-components/chat/test/drill/migration-drill.sh 3   # 只跑第 3 项
#
# 期望结果：每一项 exit 均为 1（被拦截），最后基线为 0（全绿）。
# 若某一项 exit=0，说明回归网存在盲区，需要补用例。
# ---------------------------------------------------------------------------
set -u

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../../.." && pwd)"
BACKUP_DIR="$(mktemp -d)"
LOG="$BACKUP_DIR/run.log"

cd "$REPO_ROOT" || exit 1
trap 'rm -rf "$BACKUP_DIR"' EXIT

# 用法: drill "描述" "目标文件" "原字符串" "新字符串"
drill() {
  local name="$1" file="$2" pattern="$3" repl="$4"

  cp "$file" "$BACKUP_DIR/backup" || return
  python3 - "$file" "$pattern" "$repl" <<'PY'
import sys
p, a, b = sys.argv[1:4]
s = open(p, encoding='utf-8').read()
if a not in s:
    print('   !! 未找到注入点，请检查源码是否变更:', p)
    sys.exit(3)
open(p, 'w', encoding='utf-8').write(s.replace(a, b, 1))
PY
  if [ $? -ne 0 ]; then cp "$BACKUP_DIR/backup" "$file"; return; fi

  npx vitest run --project chat > "$LOG" 2>&1
  local code=$?
  echo "────────────────────────────────────────────────"
  echo "[$name]  exit=$code  $([ $code -ne 0 ] && echo '✅ 已拦截' || echo '❌ 漏网，需要补用例')"
  grep -E "^   × " "$LOG" | sed 's/^/   /' | head -8
  grep -E "^ +Tests +" "$LOG" | sed 's/^/   /'

  cp "$BACKUP_DIR/backup" "$file"
}

run_all() {
  drill "① 重命名 prop: ChatSender.stopDisabled" \
    packages/pro-components/chat/chat-sender/chat-sender-props.ts \
    "  stopDisabled: {" "  stopDisabledX: {"

  drill "② 修改默认值: ChatActionbar.actionBar 去掉 share" \
    packages/pro-components/chat/chat-actionbar/chat-actionbar-props.ts \
    "['replay', 'copy', 'good', 'bad', 'share']" "['replay', 'copy', 'good']"

  drill "③ 修改公开 class: t-chat__actions -> t-chat__actions_v2" \
    packages/pro-components/chat/chat-actionbar/chat-actionbar.tsx \
    '__actions`}' '__actions_v2`}'

  drill "④ 删除对外导出: index.ts 的 ChatAction" \
    packages/pro-components/chat/index.ts \
    'export const ChatAction' 'const ChatAction'

  drill "⑤ 篡改组合类 API: Chatbot.regenerate 改名" \
    packages/pro-components/chat/chatbot/index.ts \
    "'regenerate'," "'regenerateX',"

  drill "⑥ 篡改事件名: ChatSender emits send -> submit" \
    packages/pro-components/chat/chat-sender/chat-sender.tsx \
    "emits: ['send'," "emits: ['submit',"
}

case "${1:-all}" in
  1) drill "① 重命名 prop: ChatSender.stopDisabled" \
      packages/pro-components/chat/chat-sender/chat-sender-props.ts \
      "  stopDisabled: {" "  stopDisabledX: {" ;;
  2) drill "② 修改默认值: ChatActionbar.actionBar 去掉 share" \
      packages/pro-components/chat/chat-actionbar/chat-actionbar-props.ts \
      "['replay', 'copy', 'good', 'bad', 'share']" "['replay', 'copy', 'good']" ;;
  3) drill "③ 修改公开 class" \
      packages/pro-components/chat/chat-actionbar/chat-actionbar.tsx \
      '__actions`}' '__actions_v2`}' ;;
  4) drill "④ 删除对外导出: ChatAction" \
      packages/pro-components/chat/index.ts \
      'export const ChatAction' 'const ChatAction' ;;
  5) drill "⑤ 篡改组合类 API: Chatbot.regenerate" \
      packages/pro-components/chat/chatbot/index.ts \
      "'regenerate'," "'regenerateX'," ;;
  6) drill "⑥ 篡改事件名: ChatSender send -> submit" \
      packages/pro-components/chat/chat-sender/chat-sender.tsx \
      "emits: ['send'," "emits: ['submit'," ;;
  *) run_all ;;
esac

echo "────────────────────────────────────────────────"
echo "源码已还原，复跑基线："
npx vitest run --project chat > "$LOG" 2>&1
echo "exit=$? (期望 0)"; grep -E "^ +Tests +" "$LOG"
