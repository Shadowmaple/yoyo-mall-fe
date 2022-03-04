<template>
  <div class="container">
    <div class="title">订单中心</div>
    <el-divider></el-divider>

    <!-- 筛选菜单 -->
    <div class="tab-box">
      <el-tabs v-model="tab" @tab-click="clickTab">
        <el-tab-pane label="全部订单" :name="0"></el-tab-pane>
        <el-tab-pane label="待发货" :name="2"></el-tab-pane>
        <el-tab-pane label="待收货" :name="3"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- 列表 -->
    <div class="table-box">
      <el-table :data="list" stripe style="width: 100%" highlight-current-row border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="order_code" label="订单编号" width="120" />
        <el-table-column prop="status_str" label="状态" />
        <el-table-column prop="product_num" label="商品数目" />
        <el-table-column prop="total_fee" label="付款金额" />
        <el-table-column prop="create_time" label="创建时间" width="170" align="center" />
        <el-table-column prop="pay_time" label="付款时间" width="170" align="center" v-if="tab == 0 || tab > 1" />
        <el-table-column prop="deliver_time" label="发货时间" width="170" align="center" v-if="tab == 0 || tab >= 3" />
        <el-table-column prop="confirm_time" label="签收时间" width="170" align="center" v-if="tab == 0 || tab >= 4" />
        <el-table-column prop="receive_name" label="收货人" />
        <el-table-column prop="receive_tel" label="联系电话" />
        <el-table-column prop="receive_addr" label="收货地址" width="300" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="viewDetail(scope.$index)">查看详情</el-button>
            <el-button type="primary" size="small" @click="clickDeliver(scope)" v-if="checkIfShowButton(0, scope.$index)">发货</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="table-page">
        <el-button type="primary" @click="prePage">上一页</el-button>
        <el-button type="primary" @click="nextPage">下一页</el-button>
      </div>
    </div>

    <!-- 订单详情弹窗 -->
    <el-drawer v-model="showInfoWin" title="订单详情" size='40%'>
      <el-descriptions border :column="1">
        <el-descriptions-item label="订单编号">{{showInfo.item.order_code}}</el-descriptions-item>
        <el-descriptions-item label="订单状态">
          <el-tag size="small">{{showInfo.item.status_str}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="商品数量">{{showInfo.item.product_num}}</el-descriptions-item>
        <el-descriptions-item label="应付总金额">￥{{showInfo.item.total_fee}}</el-descriptions-item>
        <el-descriptions-item label="运费">￥{{showInfo.item.freight}}</el-descriptions-item>
        <el-descriptions-item label="优惠金额">-￥{{showInfo.item.coupon}}</el-descriptions-item>
        <el-descriptions-item label="实付总金额">￥{{showInfo.item.payment}}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{showInfo.item.create_time}}</el-descriptions-item>
        <el-descriptions-item label="付款时间">{{showInfo.item.pay_time}}</el-descriptions-item>
        <el-descriptions-item label="发货时间">{{showInfo.item.deliver_time}}</el-descriptions-item>
        <el-descriptions-item label="签收时间">{{showInfo.item.confirm_time}}</el-descriptions-item>
        <el-descriptions-item label="收货人">{{showInfo.item.receive_name}}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{showInfo.item.receive_tel}}</el-descriptions-item>
        <el-descriptions-item label="收货地址">{{showInfo.item.receive_addr}}</el-descriptions-item>
      </el-descriptions>

      <div class="detailWin-buttons">
        <el-button type="primary" @click="clickDeliver(scope.$index)" v-if="checkIfShowButton(0, showInfo.idx)">发货</el-button>
      </div>
    </el-drawer>

    <!-- 确认弹窗 -->
    <el-dialog
      v-model="showDialog"
      :title="dialog.title"
      width="20%"
    >
      <div>确认发货？</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="clickConfirmDialog">确认</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
const mock = require('../../../utils/mock-data/order')
const statusMp = ['待付款', '待发货', '待收货', '待评价', '交易完成', '交易取消', '退货中', '交易关闭']

export default {
  name: "Order",
  components: {},
  data() {
    return {
      tab: 0, // 0全部订单，1待付款，2待发货，3待收货，4待评价，5退款售后
      // activeTab: '0',
      list: [],
      req: {
        limit: 20,
        page: 0,
      },
      // 订单详情弹窗
      showInfoWin: false,
      showInfo: {
        idx: 0,
        item: {},
      },
      // 确认弹窗
      showDialog: false,
      dialog: {
        title: '确认弹窗',
        content: '',
        selectedIndex: 0,
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 是否显示按钮
    // kind: 0->发货
    checkIfShowButton(kind, index) {
      if (kind == 0) {
        return this.tab == 2 || this.tab == 0 && this.list[index].status == 2
      }
    },
    // 获取订单数据列表
    getList() {
      let req = {
        page: this.req.page,
        limit: this.req.limit,
        kind: Number(this.tab),
      }
      console.log('order getList req:', req)

      // todo:请求
      // ...

      let items = mock.orderList
      let list = new Array
      for (let i in items) {
        let item = items[i]
        list.push({
          id: item.id,
          status: item.status,
          status_str: statusMp[item.status],
          total_fee: item.total_fee,
          payment: item.payment,
          coupon: item.coupon,
          freight: item.freight,
          receive_name: item.receive_name,
          receive_tel: item.receive_tel,
          receive_addr: item.receive_addr,
          order_code: item.order_code,
          create_time: item.create_time,
          pay_time: item.pay_time,
          deliver_time: item.deliver_time,
          confirm_time: item.confirm_time,
          product_num: item.product_num,
        })
      }
      this.list = list
    },
    clickTab() {
      // this.tab = Number(this.activeTab)
      this.getList()
    },
    viewDetail(index) {
      console.info('viewDetail:', index)
      this.showInfoWin = true
      this.showInfo.idx = index
      this.showInfo.item = this.list[index]
    },
    // 点击发货
    clickDeliver(index) {
      console.info('clickDeliver:', index)
      this.showDialog = true
      this.dialog.content = '确认发货？'
      this.dialog.selectedIndex = index
    },
    // 弹窗确认
    clickConfirmDialog() {
      this.showDialog = false
      this.showInfoWin = false
      // todo
    },
    prePage() {
      this.req.page = this.req.page <= 0 ? 0 : this.req.page-1
      this.getList()
    },
    nextPage() {
      this.req.page++
      this.getList()
    },
  },
};
</script>

<style scoped>
.title {
  color: #000;
  padding-top: 20px;
  padding-left: 20px;
}

.tab-box {
  margin: 10px 20px;
}

.table-box {
  margin: 10px 20px;
}

.table-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 20px;
}

.detailWin-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 20px 10px;
}
</style>