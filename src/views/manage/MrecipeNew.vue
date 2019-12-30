<!-- 新增材料页面 -->
<style lang="less" scoped>
.newrecipe {
  position: relative;
  width: 100%;
  padding: 0.2rem 0.39rem;
  height: 100%;

  .cel{
    display: flex;
    height: 0.35rem;
    line-height: 0.35rem;
    border-bottom: 1px solid #999;
  }
  .top {
    .content {
      .info {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #999;
        .info-cel {
          width: 50%;
          .info-cel-title {
            width: 2rem;
            height: 100%;
            background: #f0f4fe;
            padding-left: 0.2rem;
          }
        }
      }
      .desc{
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #999;
        .desc-cel {
          width: 14.28%;
          .desc-cel-title {
            width: 2rem;
            height: 100%;
            background: #f0f4fe;
            text-indent: 0.2rem;
            // overflow-x: hidden;
          }
        }
      }
      .stand{
        border: 1px solid #999;
        .stand-title{
          display: flex;
          height: .35rem;
          line-height: .35rem;
          border-bottom: 1px solid #999;
          .stand-title-cel{
            width: 7.69%;
            height: 100%;
            border-right: 1px solid #999;
            background: #f0f4fe;
            text-align: center;
          }
        }
        .stand-content{
          display: flex;
          height: .3rem;
          line-height: .3rem;
          border-bottom: 1px solid #999;
          text-align: center;
          .stand-content-title{
            width: 7.69%;
            background: #f0f4fe;
            text-indent: 0.05rem;
          }
          .sand-content-con{
            display: flex;
            width: 92.31%;
            height: 100%;
            border-right: 1px solid #999;
            text-align: center;
            .stand-content-cel{
              width: 8.333%;
              border-left: 1px solid #999;
              input{
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
  .bottom{
    // width: 15.5rem;
    // height: 2.8rem;
    // overflow-y: auto;
    // overflow-x: auto;
    margin-top: .2rem;
    .content{
      border: 1px solid #999;
      width: 15.5rem;
      height: 2.5rem;
      overflow-y: auto;
      overflow-x: auto;
      .content-title,.content-rep{
        display: flex;
        height: .4rem;
        line-height: .4rem;

        div,.content-rep-cel{
          flex-shrink: 0;
          width: 1.2rem;
          background: #f0f4fe;
          text-align: center;
          border-left: 1px solid #999;
          border-bottom: 1px solid #999;
          border-top: 1px solid #999;
        }
        .btns{
          flex: 1;
        }
      }
      .content-title {
          div:nth-of-type(n+4){
            width:.84rem;
          }
          div:last-of-type{
            flex:1;
          }
      }
      .content-rep{
        .content-rep-cel{
          background: #fff;
          &:nth-of-type(n+3){
            width:.84rem;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="newrecipe">
    <div @click="go()" class="road-back"></div>
    <main>
      <!-- 材料表 -->
      <div class="top">
        <h3>材料表</h3>
        <div class="content">
          <!-- 材料表6项基本信息 -->
          <div class="info">
            <div class="info-cel cel">
              <div class="info-cel-title">项目名称</div>
              <div class="info-cel-input">
                <Select v-model="dataobj.mItemID" @on-change="getItemBid(dataobj.mItemID)" style="width:200px" size="small">
                    <Option v-for="item in itemlist" :value="item.mItemID" :key="item.mItemID">{{ item.mItemJC }}</Option>
                </Select>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">标段</div>
              <div class="info-cel-input">
                <Select v-model="dataobj.mItemBid" style="width:200px" size="small">
                    <Option v-for="item in bdlist" :value="item.mItemBid" :key="item.mItemBid">{{ item.mItemBDJC }}</Option>
                </Select>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">材料类型</div>
              <div class="info-cel-input">
                <Select v-model="dataobj.mClType" style="width:200px" size="small" @on-change="clChange"  :label-in-value="true">
                    <Option v-for="item in cllist" :value="item.mClTypeValue" :key="item.mClTypeValue">{{ item.mClTypeName }}</Option>
                </Select>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">材料名称</div>
              <div class="info-cel-input">
                <input type="text" v-model="dataobj.mClName" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">层位</div>
              <div class="info-cel-input">
                <Select v-model="dataobj.mClCW" style="width:200px" size="small">
                    <Option v-for="item in mClCWList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">预计产量（KG）</div>
              <div class="info-cel-input">
                <input type="text" v-model="dataobj.mClYJCL" />
              </div>
            </div>
          </div>
          <!-- 材料表余下信息 -->
          <div class="desc">
            <div class="desc-cel cel">
              <div class="desc-cel-title">油石比标准</div>
              <div class="desc-cel-input">
                <input type="text"  v-model="dataobj.mClYSB"/>
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">上限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClYSB_Up1" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">下限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClYSB_Down1" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">二级上限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClYSB_Up2" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">二级下限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClYSB_Down2" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">三级上限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClYSB_Up3" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">三级下限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClYSB_Down3" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">温度</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClTemp" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">上限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClTemp_Up1" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">下限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClTemp_Down1" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">二级上限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClTemp_Up2" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">二级下限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClTemp_Down2" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">三级上限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClTemp_Up3" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">三级下限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClTemp_Down3" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">拌和周期</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClBHPeriod" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">上限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClBHPeriod_Up1" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">下限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClBHPeriod_Down1" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">二级上限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClBHPeriod_Up2" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">二级下限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClBHPeriod_Down2" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">三级上限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClBHPeriod_Up3" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">三级下限</div>
              <div class="desc-cel-input">
                <input type="text" v-model="dataobj.mClBHPeriod_Down3" />
              </div>
            </div>
          </div>
          <div class="stand">
            <div class="stand-title">
              <div class="stand-title-cel" v-for="item in jpArr" :key="item">{{item}}</div>
            </div>
            <div class="stand-content">
              <div class="stand-content-title">上限</div>
            <div class="sand-content-con">
              <div class="stand-content-cel" v-for="(value, key, index) in upObj" :key="index">
                <input type="text" v-model="upObj[key]" />
              </div>
            </div>
            </div>

            <div class="stand-content">
              <div class="stand-content-title">目标值</div>
            <div class="sand-content-con">
              <div class="stand-content-cel" v-for="(value, key, index) in mbzObj" :key="index">
                <input type="text" v-model="mbzObj[key]" />
              </div>
            </div>
            </div>

            <div class="stand-content">
              <div class="stand-content-title">下限</div>
            <div class="sand-content-con">
              <div class="stand-content-cel" v-for="(value, key, index) in downObj" :key="index">
                <input type="text" v-model="downObj[key]" />
              </div>
            </div>
            </div>

            <div class="stand-content">
              <div class="stand-content-title">一级波动范围</div>
            <div class="sand-content-con">
              <div class="stand-content-cel" v-for="(value, key, index) in bd1Obj" :key="index">
                <input type="text" v-model="bd1Obj[key]" />
              </div>
            </div>
            </div>

            <div class="stand-content">
              <div class="stand-content-title">二级波动范围</div>
            <div class="sand-content-con">
              <div class="stand-content-cel" v-for="(value, key, index) in bd2Obj" :key="index">
                <input type="text" v-model="bd2Obj[key]" />
              </div>
            </div>
            </div>

            <div class="stand-content">
              <div class="stand-content-title">三级波动范围</div>
            <div class="sand-content-con">
              <div class="stand-content-cel" v-for="(value, key, index) in bd3Obj" :key="index">
                <input type="text" v-model="bd3Obj[key]" />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <Button type="success" style="float:right;" @click ="newKl()">添加矿料</Button>
      <Button type="primary" style="float:right;" @click="saveBtn()">保存{{text}}</Button>

      <div class="bottom">
        <h3>配方表</h3>
        <div class="content">
          <div class="content-title">
            <div v-for="item in pfArr" :key="item">{{item}}</div>
          </div>
          <!-- 内容一条（横） -->
          <div class="content-rep" v-for="(item, index) in repice_list" :key="index">
            <!-- 一条的子项 -->
            <!-- <div class="content-rep-cel">
              <Select v-model="model1" style="width:130px" size="small">
                  <Option v-for="item in jpArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div> -->
            <!-- 矿料ID -->
            <Select v-model="item.mKlID" size="small" style="width:1.2rem" class="content-rep-cel" @on-change="klChange"  :label-in-value="true">
                <Option v-for="item1 in repice_list_active" :value="item1.mKlID" :key="item1.mKlID">{{ item1.mKlName }}</Option>
            </Select>
            <!-- <input type="text" class="content-rep-cel" v-model="item.mKlID"> -->
            <!-- 矿料名称 -->
            <input type="text" class="content-rep-cel" v-model="item.mKlName">
            <!-- 用量比 -->
            <input type="text" class="content-rep-cel" v-model="item.mKlYLB">
            <!-- 37.5---0.075 -->
            <input type="text" class="content-rep-cel" v-model="item.mJP375">
            <input type="text" class="content-rep-cel" v-model="item.mJP315">
            <input type="text" class="content-rep-cel" v-model="item.mJP265">
            <input type="text" class="content-rep-cel" v-model="item.mJP190">
            <input type="text" class="content-rep-cel" v-model="item.mJP095">
            <input type="text" class="content-rep-cel" v-model="item.mJP0475">
            <input type="text" class="content-rep-cel" v-model="item.mJP0236">
            <input type="text" class="content-rep-cel" v-model="item.mJP0118">
            <input type="text" class="content-rep-cel" v-model="item.mJP006">
            <input type="text" class="content-rep-cel" v-model="item.mJP003">
            <input type="text" class="content-rep-cel" v-model="item.mJP0015">
            <input type="text" class="content-rep-cel" v-model="item.mJP00075">
            <div class="btns">
              <Button type="primary" size="small" @click="saveKl(index)">保存</Button>
              <Button type="error" size="small" @click="deleteKl(index)">删除</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import recipenew from '@/data/recipenew.json'
export default {
  data () {
    return {
      mItemID: this.$route.query.mItemID,
      // 编辑的材料id
      mClID: this.$route.query.id,
      mUserID: 0,
      // 级配数据6项指标,格式是obj
      upObj: recipenew[0],
      downObj: recipenew[1],
      bd1Obj: recipenew[2],
      bd2Obj: recipenew[3],
      bd3Obj: recipenew[4],
      mbzObj: recipenew[5],
      // 级配数据6项指标结束
      // 获取材料信息时得到的北方列表
      repice_list: [
      ],
      // 材料原有多个矿料的id集合（用于判断是新建还是修改矿料）
      repice_list_ids: [],
      // 获取该材料还可以使用的矿料
      repice_list_active: [],
      // 项目下拉框列表
      itemlist: [],
      // 标段下拉框列表
      bdlist: [],
      // 材料类型下拉框列表
      cllist: [],
      dataobj: {
        'mClID': null,
        'mItemID': null,
        'mItemJC': '项目简称',
        'mItemBid': 0,
        'mItemBDJC': '标段简称',
        'mClType': '',
        'mClName': null,
        'mClCW': '上层位',
        'mClYJCL': '',
        'mClYSB': 0,
        'mClYSB_Up1': 0,
        'mClYSB_Down1': 0,
        'mClYSB_Up2': 0,
        'mClYSB_Down2': 0,
        'mClYSB_Up3': 0,
        'mClYSB_Down3': 0,
        'mClTemp': 0,
        'mClTemp_Up1': 0,
        'mClTemp_Down1': 0,
        'mClTemp_Up2': 0,
        'mClTemp_Down2': 0,
        'mClTemp_Up3': 0,
        'mClTemp_Down3': 0,
        'mClBHPeriod': 0,
        'mClBHPeriod_Up1': 0,
        'mClBHPeriod_Down1': 0,
        'mClBHPeriod_Up2': 0,
        'mClBHPeriod_Down2': 0,
        'mClBHPeriod_Up3': 0,
        'mClBHPeriod_Down3': 0,
        'mClJP375': 0,
        'mClJP375_Up': 0,
        'mClJP375_Down': 0,
        'mClJP375_BD1': 0,
        'mClJP375_BD2': 0,
        'mClJP375_BD3': 0,
        'mClJP315': 0,
        'mClJP315_Up': 0,
        'mClJP315_Down': 0,
        'mClJP315_BD1': 0,
        'mClJP315_BD2': 0,
        'mClJP315_BD3': 0,
        'mClJP265': 0,
        'mClJP265_Up': 0,
        'mClJP265_Down': 0,
        'mClJP265_BD1': 0,
        'mClJP265_BD2': 0,
        'mClJP265_BD3': 0,
        'mClJP190': 0,
        'mClJP190_Up': 0,
        'mClJP190_Down': 0,
        'mClJP190_BD1': 0,
        'mClJP190_BD2': 0,
        'mClJP190_BD3': 0,
        'mClJP095': 0,
        'mClJP095_Up': 0,
        'mClJP095_Down': 0,
        'mClJP095_BD1': 0,
        'mClJP095_BD2': 0,
        'mClJP095_BD3': 0,
        'mClJP0475': 0,
        'mClJP0475_Up': 0,
        'mClJP0475_Down': 0,
        'mClJP0475_BD1': 0,
        'mClJP0475_BD2': 0,
        'mClJP0475_BD3': 0,
        'mClJP0236': 0,
        'mClJP0236_Up': 0,
        'mClJP0236_Down': 0,
        'mClJP0236_BD1': 0,
        'mClJP0236_BD2': 0,
        'mClJP0236_BD3': 0,
        'mClJP0118': 0,
        'mClJP0118_Up': 0,
        'mClJP0118_Down': 0,
        'mClJP0118_BD1': 0,
        'mClJP0118_BD2': 0,
        'mClJP0118_BD3': 0,
        'mClJP006': 0,
        'mClJP006_Up': 0,
        'mClJP006_Down': 0,
        'mClJP006_BD1': 0,
        'mClJP006_BD2': 0,
        'mClJP006_BD3': 0,
        'mClJP003': 0,
        'mClJP003_Up': 0,
        'mClJP003_Down': 0,
        'mClJP003_BD1': 0,
        'mClJP003_BD2': 0,
        'mClJP003_BD3': 0,
        'mClJP0015': 0,
        'mClJP0015_Up': 0,
        'mClJP0015_Down': 0,
        'mClJP0015_BD1': 0,
        'mClJP0015_BD2': 0,
        'mClJP0015_BD3': 0,
        'mClJP00075': 0,
        'mClJP00075_Up': 0,
        'mClJP00075_Down': 0,
        'mClJP00075_BD1': 0,
        'mClJP00075_BD2': 0,
        'mClJP00075_BD3': 0,
        'mClTypeName': 'AC-10'
      },
      text: '新建',
      model1: '测试',
      jpArr: ['级配标准', 37.5, 31.5, 26.5, 19.0, 9.5, 4.75, 2.36, 1.18, 0.6, 0.3, 0.15, 0.075],
      pfArr: ['矿料ID', '矿料名称', '用量比', 37.5, 31.5, 26.5, 19.0, 9.5, 4.75, 2.36, 1.18, 0.6, 0.3, 0.15, 0.075, '操作'],
      mClCWList: [{ value: 1, label: '上层面' }, { value: 2, label: '中层面' }, { value: 3, label: '下层面' }]
    }
  },
  mounted () {
    this.mUserID = this.comFun.getCookie('roadmUserID')
    if (this.mClID !== -1) {
      this.text = '修改'
      this.getData()
    }
    // 获得全部矿料列表
    this.getKlActive()

    // 获得该用户所有项目，便于下拉选项修改项目
    this.getUserItem()

    // 得到材料类型下拉框列表
    this.getClTypeList()
  },
  methods: {
    // 得到材料类型下拉框列表
    getClTypeList () {
      let obj = {
      }
      this.comFun.post('/Cl/getClTypeList', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.cllist = rs.data
        }
      }, (err) => { console.log(err) })
    },
    // 得到某个项目的所有标段
    getItemBid (mItemID) {
      let obj = {
        mUserID: this.mUserID,
        mItemID: mItemID
      }
      this.comFun.post('/Item/getItemBid', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.bdlist = rs.data
        }
      }, (err) => { console.log(err) })
    },
    // 得到所有项目
    getUserItem () {
      let obj = {
        mUserID: this.mUserID
      }
      this.comFun.post('/User/getItemList', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.itemlist = rs.data
          this.getItemBid(this.dataobj.mItemID)
        }
      }, (err) => { console.log(err) })
    },
    go () {
      this.$router.push('/manage/recipe')
    },
    // 得到材料信息（包括它的矿料）
    getData () {
      let obj = {
        mUserID: this.mUserID,
        mClID: this.mClID
      }
      // console.log(JSON.stringify(obj))
      this.comFun.post('/Cl/getBhClInfo', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.dataobj = rs.data
          let _data = rs.data
          // 找出所有级配数据（72个）
          // let jpObj = {}
          // let item
          // let upObj = {}
          // let downObj = {}
          // let bd1Obj = {}
          // let bd2Obj = {}
          // let bd3Obj = {}
          // let mbzObj = {}
          let [jpObj, item, upObj, downObj, bd1Obj, bd2Obj, bd3Obj, mbzObj] = [{}, '', {}, {}, {}, {}, {}, {}]
          for (item in _data) {
            if (item.indexOf('mClJP') !== -1) {
              jpObj[item] = _data[item]
            }
          }
          // console.log(JSON.stringify(jpObj))
          // 分别找出上限up,down,bd1.bd2,bd3剩下的是目标值
          for (let i in jpObj) {
            if (i.indexOf('_Up') !== -1) {
              upObj[i] = jpObj[i]
            } else if (i.indexOf('_Down') !== -1) {
              downObj[i] = jpObj[i]
            } else if (i.indexOf('_BD1') !== -1) {
              bd1Obj[i] = jpObj[i]
            } else if (i.indexOf('_BD2') !== -1) {
              bd2Obj[i] = jpObj[i]
            } else if (i.indexOf('_BD3') !== -1) {
              bd3Obj[i] = jpObj[i]
            } else {
              // 剩下的是目标值
              mbzObj[i] = jpObj[i]
            }
          }
          // console.log(JSON.stringify(upObj))
          // console.log(JSON.stringify(downObj))
          // console.log(JSON.stringify(bd1Obj))
          // console.log(JSON.stringify(bd2Obj))
          // console.log(JSON.stringify(bd3Obj))
          // console.log(JSON.stringify(mbzObj))
          this.upObj = upObj
          this.downObj = downObj
          this.bd1Obj = bd1Obj
          this.bd2Obj = bd2Obj
          this.bd3Obj = bd3Obj
          this.mbzObj = mbzObj
          // 关联矿料数据
          this.repice_list = rs.data.repice_list
          // 保存已有的矿料id
          this.repice_list.map((item, index) => {
            this.repice_list_ids.push(item['mKlID'])
          })
        }
      }, (err) => { console.log(err) })
    },
    // 保存修改 or 保存新建材料
    saveBtn () {
      // 合并多个对象到obj
      let obj = Object.assign(this.dataobj, this.upObj, this.downObj, this.bd1Obj, this.bd2Obj, this.bd3Obj, this.bd4Obj, this.mbzObj)
      // obj['mItemID'] = this.mItemID
      obj['mUserID'] = this.mUserID
      if (this.mClID === -1) {
        // 新建材料
      } else {
        // 编辑
        obj['mClID'] = this.mClID
      }
      console.log(JSON.stringify(obj))
      this.comFun.post('/Cl/createBhCl', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.$Message.success(rs.message)
          this.mClID = rs.data.mClID
          // 操作成功刷新数据
          this.getData()
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    // 添加矿料按钮
    newKl () {
      this.repice_list.push({
      })
    },
    // 保存某个矿料修改的信息
    saveKl (_index) {
      console.log(JSON.stringify(this.repice_list))
      let obj = this.repice_list[_index]
      obj['mClID'] = this.mClID
      obj['mUserID'] = this.mUserID
      let mKlID = obj['mKlID']
      console.log(JSON.stringify(obj))

      if (this.repice_list_ids.indexOf(mKlID) === -1) {
        // 是新建的保存
        console.log('新建矿料')
        this.comFun.post('/Cl/addRepice', obj, this).then((rs) => {
          console.log(JSON.stringify(rs))
          if (rs.code === 0) {
            this.$Message.success(rs.message)
            // 操作成功刷新数据
            this.getData()
          } else {
          //  失败
            this.$Message.error(rs.message)
          }
        }, (err) => { console.log(err) })
      } else {
        // 是编辑保存
        console.log('修改矿料')
        this.comFun.post('/Cl/updateRepiceRecord', obj, this).then((rs) => {
          console.log(JSON.stringify(rs))
          if (rs.code === 0) {
            this.$Message.success(rs.message)
            // 操作成功刷新数据
            this.getData()
          } else {
          //  失败
            this.$Message.error(rs.message)
          }
        }, (err) => { console.log(err) })
      }
    },
    // 删除某个矿料信息
    deleteKl (_index) {
      let obj = {
        mUserID: this.mUserID,
        mID: this.repice_list[_index]['mID']
      }
      this.comFun.post('/Cl/delRepice', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.$Message.success(rs.message)
          // 操作成功刷新数据
          this.getData()
        } else {
          //  失败
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    // 获取该材料还可以使用的矿料repice_list_active
    getKlActive () {
      let obj = {
        mUserID: this.mUserID,
        mClID: this.mClID
      }
      this.comFun.post('/Cl/getAvailableKlList', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.repice_list_active = rs.data
        } else {
        }
      }, (err) => { console.log(err) })
    },
    // 选择矿料ID的时候
    klChange (e) {
      console.log(e.value)
      console.log(e.label)
      this.repice_list.map((item, index, arr) => {
        if (item['mKlID'] === e.value) {
          this.repice_list[index]['mKlName'] = e.label
        }
      })
    },
    // 选择材料切换的时候
    clChange (e) {
      console.log(e.value)
      console.log(e.label)
      this.dataobj.mClName = e.label
    }
  }
}

</script>
