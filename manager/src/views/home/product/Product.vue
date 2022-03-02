<template>
  <div class="container">
    <div class="title">图书管理</div>

    <!-- 搜索栏 -->
    <div></div>

    <!-- 添加栏 -->
    <div>
      <el-button type="primary">添加</el-button>
    </div>

    <!-- 列表 -->
    <div class="table-box">
      <el-table :data="list" stripe style="width: 100%" highlight-current-row border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="id" width="50" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="publisher" label="出版社" />
        <el-table-column prop="publish_time" label="出版时间" width="120" />
        <el-table-column prop="price" label="原价" width="80" />
        <el-table-column prop="cur_price" label="优惠价" width="80" />
        <el-table-column prop="sale_num" label="销量" width="80" />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="updateRow(scope.$index)"
            >
              修改
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click.prevent="deleteRow(scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { list } from "../../../utils/mock-data/product";

export default {
  name: "Product",
  components: {},
  data() {
    return {
      list: list,
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {

    },
    updateRow(index) {
      console.info('update row:', index)

    },
    deleteRow(index) {
      console.info('delete row:', index)
      // todo:请求..
      // ...

      list.splice(index, 1)
    },
    confirmUpdate() {
      // todo:请求..
      // ...
    },
    search() {

    },
  }
};
</script>

<style scoped>
.title {
  color: #000;
  border-bottom: 2px solid rgb(0, 0, 0, 0.2);
}

.table-box {
  margin: 20px 20px;
  background-color: aqua;
}
</style>