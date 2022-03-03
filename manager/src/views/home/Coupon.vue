<template>
  <div class="container">
    <div class="title">优惠券</div>
    <el-divider></el-divider>

    <!-- 分类栏 -->
    <div class="tab-box">
      <el-tabs v-model="tab" @tab-click="clickTab">
        <el-tab-pane label="全部" :name="0"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- 列表 -->
    <div class="list-box">

      <el-table :data="list" stripe style="width: 100%" highlight-current-row border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="title" label="标题" />
        <el-table-column fixed="right" label="操作" width="150">
          <!-- <template #default="scope">
            <el-button type="primary" size="small" @click="viewDetail(scope.$index)">查看详情</el-button>
            <el-button type="primary" size="small" @click="clickDeliver(scope)" v-if="checkIfShowButton(0, scope.$index)">发货</el-button>
          </template> -->
        </el-table-column>
      </el-table>

    </div>

    <!-- 修改或添加弹窗 -->
    <el-dialog
      v-model="showWin"
      title="优惠券"
      width="40%"
    >
      <span>This is a message</span>
      <template #footer>
        <div>
          <el-button @click="showWin = false">取消</el-button>
          <el-button type="primary" @click="clickConfirm">确认</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'Coupon',
  data() {
    return {
      tab: 0,
      showWin: false,
    }
  },
  methods: {
    getList() {

    },
    clickConfirm() {
      this.showWin = false
    },
  }
}
</script>

<style scoped>
.title {
  color: #000;
  padding-top: 20px;
  padding-left: 20px;
}
</style>