<template>
  <el-main class="container">
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
          <el-button type="info" @click="refresh">重置</el-button>
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
        <el-table-column prop="id" label="id" width="70" />
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
    <Form :show="showWin" :formData="form" @submit="formSubmit" @cancel="formCancel"></Form>

    <el-dialog
      v-model="showDelWin"
      title="弹窗确认"
      width="30%"
    >
      <span>确认删除？</span>

      <template #footer>
        <div>
          <el-button @click="showDelWin = false">取消</el-button>
          <el-button type="primary" @click="clickDelConfirm">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </el-main>
</template>

<script>
import { list } from "../../../utils/mock-data/product"
import { RequestProductDelete, RequestProducts, RequestProductSearch } from "../../../utils/request/product"
import Form from './components/Form.vue'

const staticForm = {
  id: 0,
  title: '',
  author: '',
  publisher: '',
  price: 0,
  cur_price: 0,
}

export default {
  name: "Product",
  components: {
    Form,
  },
  data() {
    return {
      showWin: false, // 是否显示商品更改弹窗
      titleInput: '',
      authorInput: '',
      list: list,
      req: {
        page: 0,
        limit: 20,
      },
      selectedIdx : 0,
      form: staticForm,
      showDelWin: false, // 删除确认弹窗
    };
  },
  created() {
    this.getList()
  },
  methods: {
    // 请求获取图书数据
    getList() {
      let req = {
        limit: this.req.limit,
        page: this.req.page,
      }

      RequestProducts(req, res => {
        if (res.code != 0) {
          console.error('requestProducts error:', res)
          return
        }
        let data = res.data
        this.list = data.list
      })
    },
    // 添加图书
    addItem() {
      this.showWin = true
    },
    updateRow(index) {
      console.info('update row:', index)
      this.selectedIdx = index
      this.getFormData()
      this.showWin = true
    },
    deleteRow(index) {
      console.info('delete row:', index)
      this.selectedIdx = index
      this.showDelWin = true
    },
    clickDelConfirm() {
      let list = this.list
      let idx = this.selectedIdx
      let req = {
        id: list[idx].id,
      }
      RequestProductDelete(req, res => {
        if (res.code != 0) {
          console.warn('RequestProductDelete error:', res)
          return
        }
        console.log('删除商品成功; id=', req.id)
        list.splice(idx, 1)
        this.list = list
        this.selectedIdx = 0
        this.showDelWin = false
      })
    },
    requestSearch() {
      let req = {
        title: this.titleInput,
        author: this.authorInput,
        limit: this.req.limit,
        page: this.req.page,
      }
      RequestProductSearch(req, res => {
        if (res.code != 0) {
          console.warn('request productSearch error:', res)
          return
        }
        let data = res.data
        this.list = data.list
      })
    },
    // 点击搜索
    search() {
      this.req.page = 0
      if (this.titleInput == '' && this.authorInput == '') {
        this.getList()
      } else {
        this.requestSearch()
      }
    },
    // 重置/刷新
    refresh() {
      this.titleInput = ''
      this.authorInput = ''
      this.req.page = 0
      this.getList()
    },
    // Form 组件
    getFormData() {
      let item = this.list[this.selectedIdx]
      this.form = {
        id: item.id,
        title: item.title,
        author: item.author,
        publisher: item.publisher,
        price: Number(item.price),
        cur_price: Number(item.cur_price),
      }
    },
    formSubmit() {
      this.showWin = false
      this.form = {}
      this.selectedIdx = 0
      // todo:更新数据
    },
    formCancel() {
      this.showWin = false
      this.form = {}
      this.selectedIdx = 0
    }
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