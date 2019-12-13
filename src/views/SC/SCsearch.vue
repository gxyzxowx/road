<!-- 综合查询 -->
<style lang="less" scoped>
  .scsearch{
    padding: .4rem;
    .content{
      margin-top: .2rem;
    }
  }
</style>
<template>
  <div class="scsearch">
    <div class="search">
      <Search></Search>
    </div>

    <div class="content">
      <h4>综合查询</h4>
      <Table  height="300" border :columns="listTitle" :data="datalist" size="small"  :width="tableWidth2" stripe></Table>
    </div>

  </div>
</template>
<script>
import Search from '@/components/SC/DataSearch.vue'
import titledata from '@/data/scsearch.json'
export default {
  data () {
    return {
      listTitle: titledata,
      datalist: []
    }
  },
  components: {
    Search
  }
}
</script>
