#!/bin/bash
# ---------------------------------------------------------------------------
# chat 迁移回归网 · 破坏性变更演练
#
# 作用：往 chat 源码里逐个注入典型的 breaking change，跑一遍测试，
#       验证回归网「拦得住」；每次注入后自动还原源码（用备份还原，不影响未提交改动）。
#
# 用法（在仓库根目录）：
#   bash packages/pro-components/chat/test/drill/migration-drill.sh
#   bash packages/pro-components/chat/test/drill/migration-drill.sh vue # 等价 Vue 替换
#   bash packages/pro-components/chat/test/drill/migration-drill.sh 7   # 方法空实现
#   bash packages/pro-components/chat/test/drill/migration-drill.sh hooks # 消息状态与实例隔离
#   bash packages/pro-components/chat/test/drill/migration-drill.sh compatible # 不应误拦的兼容变更
#   bash packages/pro-components/chat/test/drill/migration-drill.sh types # 先 build:chat
#
# 期望结果：兼容替换的测试 exit=0，破坏性变更的测试 exit=1，恢复后基线 exit=0。
# 全部符合期望时本脚本 exit=0，否则 exit=1。
# ---------------------------------------------------------------------------
set -eu
set -o pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../../../.." && pwd)"
BACKUP_DIR="$(mktemp -d)"
LOG="$BACKUP_DIR/run.log"

cd "$REPO_ROOT" || exit 1
ACTIVE_FILE=""
ACTIVE_EXTRA_FILE=""
FAILED=0
cleanup() {
  if [ -n "$ACTIVE_FILE" ]; then cp "$BACKUP_DIR/backup" "$ACTIVE_FILE"; fi
  if [ -n "$ACTIVE_EXTRA_FILE" ]; then rm -f "$ACTIVE_EXTRA_FILE"; fi
  rm -rf "$BACKUP_DIR"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

run_tests() {
  if [ "$MODE" = types ]; then
    pnpm test:chat:package > "$LOG" 2>&1
  else
    pnpm exec vitest run --project chat > "$LOG" 2>&1
  fi
}
MODE="${1:-all}"
if ! run_tests; then
  cat "$LOG"
  echo "基线失败，无法将环境错误当成破坏被拦截。"
  exit 1
fi

# 用法: drill "描述" "目标文件" "原字符串" "新字符串"
drill() {
  local name="$1" file="$2" pattern="$3" repl="$4" expected="${5:-fail}"

  cp "$file" "$BACKUP_DIR/backup"
  ACTIVE_FILE="$file"
  python3 - "$file" "$pattern" "$repl" <<'PY'
import sys
p, a, b = sys.argv[1:4]
s = open(p, encoding='utf-8').read()
if a not in s:
    print('   !! 未找到注入点，请检查源码是否变更:', p)
    sys.exit(3)
open(p, 'w', encoding='utf-8').write(s.replace(a, b, 1))
PY

  local code=0
  run_tests || code=$?
  echo "────────────────────────────────────────────────"
  echo "[$name] exit=${code}，期望=${expected}"
  if [ "$expected" = pass ]; then
    if [ "$code" -ne 0 ]; then FAILED=1; cat "$LOG"; fi
  elif [ "$code" -ne 1 ] || ! grep -Eq 'Test Files.*failed|公开类型使用方检查失败' "$LOG"; then
    echo "演练无效：未被测试拦截，或测试运行环境失败。"
    FAILED=1
    cat "$LOG"
  fi
  grep -E "^   × " "$LOG" | sed 's/^/   /' | head -8 || true
  grep -E "^ +Tests +" "$LOG" | sed 's/^/   /' || true

  cp "$BACKUP_DIR/backup" "$file"
  ACTIVE_FILE=""
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

no_op() {
  drill "⑦ Chatbot.setMessages 方法仍存在，但变为空实现" \
    packages/pro-components/chat/chatbot/index.ts \
    'export default Chatbot;' \
    'const originalSetup = (Chatbot as any).setup;
(Chatbot as any).setup = (props: any, context: any) => originalSetup(props, {
  ...context,
  expose: (api: any) => context.expose({ ...api, setMessages: () => {} }),
});
export default Chatbot;'
}

new_dependency() {
  drill "⑧ 新增 webc 引用" \
    packages/pro-components/chat/chat-actionbar/chat-actionbar-props.ts \
    'export default {' \
    "import 'omi-vueify';
export default {"
}

hook_state() {
  drill "⑨ useChat 消息更新后未同步状态" \
    packages/pro-components/chat/chat-engine/hooks/useChat.ts \
    "status.value = state[state.length - 1]?.status || 'idle';" \
    "status.value = 'idle';"
}

hook_isolation() {
  drill "⑩ useChat 所有实例误用同一个引擎" \
    packages/pro-components/chat/chat-engine/hooks/useChat.ts \
    'chatEngineRef.value = new ChatEngine();' \
    'chatEngineRef.value = ((window as any).__chatDrillEngine ||= new ChatEngine());'
}

public_types() {
  drill "公开类型新增可选字段" \
    packages/tdesign-vue-next-chat/es/type.d.ts \
    'export interface TdChatSenderProps {' \
    'export interface TdChatSenderProps { migrationOption?: boolean;' pass
  drill "发布声明删除 ChatSender 导出" \
    packages/tdesign-vue-next-chat/es/index.d.ts \
    'export declare const ChatSender:' 'declare const ChatSender:'
  drill "发布声明将 ChatSender 退化为 any" \
    packages/tdesign-vue-next-chat/es/index.d.ts \
    'export declare const ChatSender:' \
    'export declare const ChatSender: any; declare const OriginalChatSender:'
  drill "发布声明缩窄公开 layout" \
    packages/tdesign-vue-next-chat/es/type.d.ts \
    "layout?: 'both' | 'single';" "layout?: 'single';"
}

vue_replacements() {
  drill "ChatLoading 等价 Vue 替换" \
    packages/pro-components/chat/chat-loading/index.ts \
    "$(cat packages/pro-components/chat/chat-loading/index.ts)" \
    "$(cat "$SCRIPT_DIR/native-chat-loading.ts")" pass
  drill "新增可选 prop 不阻碍迁移" \
    packages/pro-components/chat/chat-actionbar/chat-actionbar-props.ts \
    'export default {' \
    'export default { migrationOption: { type: Boolean, default: false },' pass
  drill "ChatMessage 根节点替换为普通 Vue DOM" \
    packages/pro-components/chat/chat-message/chat-message.tsx \
    "$(cat packages/pro-components/chat/chat-message/chat-message.tsx)" \
    "$(sed 's#../../chat-message/chat-message-props#./chat-message-props#' "$SCRIPT_DIR/native-chat-message.ts")" pass
}

compatibility_changes() {
  drill "运行时 String 类型扩展为 String / Number，旧调用不变" \
    packages/pro-components/chat/chat-sender/chat-sender-props.ts \
    "type: String,
    default: ''," \
    "type: [String, Number] as PropType<TdChatSenderProps['placeholder']>,
    default: ''," pass
  drill "useChat 新增返回字段" \
    packages/pro-components/chat/chat-engine/hooks/useChat.ts \
    'chatEngine: chatEngineRef,' 'migrationReady: true, chatEngine: chatEngineRef,' pass
  drill "操作栏增加包装层，保留按钮及公开容器 class" \
    packages/pro-components/chat/chat-actionbar/chat-actionbar.tsx \
    'return buttonComponents[btnKey];' "return <div style={{ display: 'contents' }}>{buttonComponents[btnKey]}</div>;" pass

  local source=packages/pro-components/chat/chat-loading/index.ts
  local target=packages/pro-components/chat/chat-loading/compatibility-drill.vue
  if [ -e "$target" ]; then echo "演练文件已存在，不能覆盖：$target"; exit 3; fi
  ACTIVE_EXTRA_FILE="$target"
  python3 - "$source" "$target" <<'PY'
import sys
from pathlib import Path
source, target = map(Path, sys.argv[1:])
target.write_text('<script lang="ts">\n' + source.read_text() + '\n</script>\n')
PY
  drill "同一组件内将桥接引用从 TS 搬到 Vue SFC，预算不增" \
    "$source" "$(cat "$source")" \
    "export { default, ChatLoading } from './compatibility-drill.vue';" pass
  rm -f "$target"
  ACTIVE_EXTRA_FILE=""
}

case "$MODE" in
  7) no_op ;;
  8) new_dependency ;;
  9) hook_state ;;
  10) hook_isolation ;;
  hooks) hook_state; hook_isolation ;;
  types) public_types ;;
  compatible) compatibility_changes ;;
  vue) vue_replacements ;;
  all) vue_replacements; compatibility_changes; run_all; no_op; new_dependency; hook_state; hook_isolation ;;
  *) echo "用法：$0 [all|vue|compatible|7|8|9|10|hooks|types]（types 需先 build:chat）"; exit 2 ;;
esac

if ! run_tests; then cat "$LOG"; exit 1; fi
echo "源码已还原，基线通过："
grep -E "^ +Tests +|chat 发布产物检查通过" "$LOG"
exit "$FAILED"
