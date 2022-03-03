<template>
  <div class="container">
    <div class="title">图书管理</div>
    <el-divider></el-divider>

    <!-- 搜索栏 -->
    <div class="search-box">
      <div class="search-left">
        <div class="search-left-title">标题：</div>
        <el-input v-model="titleInput" placeholder="图书标题" />

        <div class="search-left-title">作者：</div>
        <el-input v-model="authorInput" placeholder="作者" />
      </div>
      <div class="search-buttons">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="info" @click="refresh">取消</el-button>
      </div>
    </div>

    <!-- 添加栏 -->
    <div class="foo-box">
      <el-button type="primary" @click="addItem">添加</el-button>
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

    <!-- 修改或添加弹窗 -->
    <el-dialog
      v-model="showWin"
      title="图书"
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
import { list } from "../../../utils/mock-data/product";

export default {
  name: "Product",
  components: {},
  data() {
    return {
      showWin: false, // 是否显示商品更改弹窗
      titleInput: '',
      authorInput: '',
      list: list,
      req: {
        page: 0,
        limit: 20,
      }
    };
  },
  computed: {
    // 获取弹窗的样式
    getWinClass() {
      return this.showWin ? 'win' : 'win-hidden'
    }
  },
  created() {
    this.getList(true)
  },
  methods: {
    // 请求获取图书数据
    getList(refresh=true) {
      this.req.page = refresh ? 0 : this.req.page + 1
      let req = {
        limit: this.req.limit,
        page: this.req.page,
        title: this.titleInput,
      }
      console.info('getList req:', req)
    },
    // 添加图书
    addItem() {
      this.showWin = true
    },
    updateRow(index) {
      console.info('update row:', index)
      this.showWin = true
    },
    deleteRow(index) {
      console.info('delete row:', index)
      // todo:请求..
      // ...

      // this.$confirm({
      //   title: '删除',
      //   content: `确定要删除选该用户吗？`,
      //   okText: '删除',
      //   okType: 'danger',
      //   async onOk () {
      //     self.$message.success('删除成功')
      //     self.search()
      //   },
      //   onCancel () {
      //     self.$message.warning('取消删除')
      //   }
      // })

      list.splice(index, 1)
    },
    // 弹窗中添加或修改确认
    clickConfirm() {
      // todo:请求..
      // ...
      this.showWin = false
    },
    search() {
      console.info('---', this.titleInput)
      this.getList(true)
    },
    // 重置/刷新
    refresh() {
      this.titleInput = ''
      this.req.page = 0
      this.getList(true)
    },
  }
};
</script>

<style scoped>
.title {
  color: #000;
  padding-top: 20px;
  padding-left: 20px;
}

.search-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;
}

.search-left {
  display: flex;
  flex-direction: row;
  margin: 0 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.search-left-title {
  white-space: nowrap;
  margin-right: 10px;
  margin-left: 30px;
}

.search-buttons {
  margin: 0 40px;
}

.foo-box {
  margin: 20px 0;
  margin-left: 30px;
}

.table-box {
  margin: 20px 20px;
  background-color: aqua;
}


.el-input {
  width: 300px;
}
</style>