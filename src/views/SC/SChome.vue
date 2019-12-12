<!-- 实时信息 -->
<template>
  <div>
<div class="left">
  <!-- 地图（） -->
  <div class="right">
    <!-- 列表 -->
    <div class="list">
      <Table :loading="loading" max-height="280" border :columns="listTitle" :data="datalist" size="small"  :width="tableWidth" stripe></Table>
    </div>
    <!-- 图表 -->
    <div class="bars">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar list"></div>
    </div>
  </div>
</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableWidth: '1200'
    }
  }
}
</script>
