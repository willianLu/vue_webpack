<template>
  <div>
    <h1>{{config}}</h1>
    <img src="@/assets/image/avatar.jpg" />
    <div class="back"></div>
  </div>
</template>
<script>
import "@/assets/css/app.less";
import config from "@/config/test.json";
import { delayExecute } from "@/assets/js/tool";

export default {
  name: "index",
  data() {
    return {
      config: {...config, sex: '男'},
      title: "测试打包"
    };
  },
  created() {
    console.log(config, "----------->");
    this.init();
  },
  methods: {
    async init() {
      // 测试使用
      await delayExecute();
      console.log('-----------初始化');
    }
  }
};
</script>