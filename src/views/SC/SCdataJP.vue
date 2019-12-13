<!-- 质量监管--级配 -->
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
<!-- 质量监管--级配 -->
  <div>
    <div class="search">
      <!-- 条件 -->
      <Search></Search>
    </div>
    <div class="content">
      <div class="curve">
        <h4>级配曲线图</h4>
        <!-- 级配曲线图 -->
        <CurveChart :id="'curve1'" :data="datacurve1" class = "chart"></CurveChart>
      </div>
      <div class="total">
        <!-- 汇总信息 -->
        <h4>标准</h4>
        <Table  height="82" border :columns="listTitle1" :data="datalist" size="small"  :width="tableWidth2" stripe></Table>
      </div>
      <div class="desc">
        <h4>详细数据</h4>
        <!-- 详细信息 -->
        <Table  height="82" border :columns="listTitle2" :data="datalist" size="small"  :width="tableWidth2" stripe></Table>
      </div>
    </div>

  </div>
</template>

<script>
// 0.075 ，0.15,0.3,0.6,1.18,2.36,4.75,9.5,19.0,26.5,31.5,37.5共12项
import Search from '@/components/SC/DataSearch.vue'
import CurveChart from '@/components/CurveChart.vue'
export default {
  data () {
    return {
      tableWidth2: '1200',
      datacurve1: null,
      listTitle1: [
        {
          title: '0.075筛孔率',
          key: 'title'
        },
        {
          title: '0.15筛孔率',
          key: 'mDateTime'
        },
        {
          title: '0.3筛孔率',
          key: 'mItemBid'
        },
        {
          title: '0.6筛孔率',
          key: 'mItemBid'
        },
        {
          title: '1.18筛孔率',
          key: 'mAlarmLevel'
        },
        {
          title: '2.36筛孔率',
          key: 'title'
        },
        {
          title: '4.75筛孔率',
          key: 'mDateTime'
        },
        {
          title: '9.5筛孔率',
          key: 'mItemBid'
        },
        {
          title: '19.0筛孔率',
          key: 'mItemBid'
        },
        {
          title: '26.5筛孔率',
          key: 'mAlarmLevel'
        },
        {
          title: '31.5筛孔率',
          key: 'mItemBid'
        },
        {
          title: '37.5筛孔率',
          key: 'mAlarmLevel'
        }
      ],
      listTitle2: [
        {
          title: '0.075筛孔率',
          key: 'title'
        },
        {
          title: '0.15筛孔率',
          key: 'mDateTime'
        },
        {
          title: '0.3筛孔率',
          key: 'mItemBid'
        },
        {
          title: '0.6筛孔率',
          key: 'mItemBid'
        },
        {
          title: '1.18筛孔率',
          key: 'mAlarmLevel'
        },
        {
          title: '2.36筛孔率',
          key: 'title'
        },
        {
          title: '4.75筛孔率',
          key: 'mDateTime'
        },
        {
          title: '9.5筛孔率',
          key: 'mItemBid'
        },
        {
          title: '19.0筛孔率',
          key: 'mItemBid'
        },
        {
          title: '26.5筛孔率',
          key: 'mAlarmLevel'
        },
        {
          title: '31.5筛孔率',
          key: 'mItemBid'
        },
        {
          title: '37.5筛孔率',
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
