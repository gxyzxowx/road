<style lang="less" scoped>
.search{
  height: 1.05rem;
  background:rgba(240,244,254,1);
  padding: .25rem 0 0 .4rem;
}
.content{
  padding:.2rem .4rem;
}
  .curve{
    height: 2.88rem;
  }
</style>
<template>
<!-- 质量监管--温度 -->
  <div>
    <div class="search">
      <!-- 条件 -->
      <Search></Search>
    </div>
    <div class="content">
      <div class="curve">
        <h4>温度曲线图</h4>
        <!-- 温度曲线 -->
        <CurveChart :id="'curve1'" :data="datacurve1" class = "chart"></CurveChart>
      </div>
      <div class="total">
        <!-- 汇总信息 -->
        <h4>汇总信息</h4>
        <Table  height="82" border :columns="listTitle1" :data="datalist" size="small"  :width="tableWidth2" stripe></Table>
      </div>
      <div class="desc">
        <h4>详细信息</h4>
        <!-- 详细信息 -->
        <Table  height="82" border :columns="listTitle2" :data="datalist" size="small"  :width="tableWidth2" stripe></Table>
      </div>
    </div>

  </div>
</template>
<script>
import Search from '@/components/SC/DataSearch.vue'
import CurveChart from '@/components/CurveChart.vue'
export default {
  data () {
    return {
      tableWidth2: '1200',
      datacurve1: null,
      listTitle1: [
        {
          title: '平均值',
          key: 'title',
          width: 90
        },
        {
          title: '目标值',
          key: 'mDateTime'
        },
        {
          title: '上限',
          key: 'mItemBid'
        },
        {
          title: '下限',
          key: 'mItemBid'
        },
        {
          title: '合格率',
          key: 'mAlarmLevel'
        }
      ],
      listTitle2: [
        {
          title: '时间',
          key: 'title'
        },
        {
          title: '材料类型',
          key: 'title'
        },
        {
          title: '温度',
          key: 'mDateTime'
        },
        {
          title: '目标值',
          key: 'mItemBid'
        },
        {
          title: '上限',
          key: 'mItemBid'
        },
        {
          title: '下限',
          key: 'mItemBid'
        },
        {
          title: '合格',
          key: 'mAlarmLevel'
        }
      ],
      datalist: []
    }
  },
  components: {
    Search,
    CurveChart
  }
}
</script>
