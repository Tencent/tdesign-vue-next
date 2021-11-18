<template>
  <div>
    <div>
      <div>
        <div class="t-progress-domo-margin">
          默认样式
        </div>
        <t-progress
          theme="plump"
          :percentage="30"
        />
      </div>
      <div>
        <div class="t-progress-domo-margin">
          进度0-10%时数字数字位置出现在目前进度的右边区域
        </div>
        <t-progress
          theme="plump"
          :percentage="5"
        />
      </div>
      <div class="t-progress-domo-margin">
        100%
      </div>
      <t-progress
        theme="plump"
        :percentage="100"
      />
      <div class="t-progress-domo-margin">
        进度完成
      </div>
      <t-progress
        theme="plump"
        :status="'success'"
        :percentage="30"
      />
      <div class="t-progress-domo-margin">
        进度状态发生重大错误
      </div>
      <t-progress
        theme="plump"
        :status="'error'"
        :percentage="30"
      />
      <div class="t-progress-domo-margin">
        进度被中断
      </div>
      <t-progress
        theme="plump"
        :status="'warning'"
        :percentage="30"
      />
      <div class="t-progress-domo-margin">
        active
      </div>
      <t-progress
        theme="plump"
        :status="'active'"
        :percentage="30"
      />
      <div class="t-progress-domo-margin">
        不显示数字
      </div>
      <t-progress
        theme="plump"
        :label="false"
        :percentage="30"
      />
      <div class="t-progress-domo-margin">
        自定义内容
      </div>
      <t-progress
        theme="line"
        :label="'75day'"
        :status="'active'"
        :percentage="30"
      />
      <div class="t-progress-domo-margin">
        自定义颜色与高度
      </div>
      <t-progress
        theme="plump"
        :stroke-width="30"
        :color="'#00f'"
        :track-color="'#0f0'"
        :status="'active'"
        :percentage="30"
      />
      <div class="t-progress-domo-margin">
        渐变色
      </div>
      <t-progress
        theme="plump"
        :color="['#f00', '#0ff', '#f0f']"
        :status="'active'"
        :percentage="30"
      />
      <br>
      <t-progress
        theme="plump"
        :color="{ '0%': '#f00', '100%': '#0ff' }"
        :status="'active'"
        :percentage="30"
      />
      <br>
      <t-progress
        theme="plump"
        :color="{ from: '#f00', to: '#0f0' }"
        :percentage="30"
        :status="'active'"
      />
    </div>
  </div>
</template>

<script />

<style scoped>
.t-progress-domo-margin{
  margin: 15px 0 10px
}
</style>
