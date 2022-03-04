<template>
  <div class="container">
    <div class="title">优惠券</div>
    <el-divider></el-divider>

    <!-- 添加栏 -->
    <div class="foo-box">
      <el-button type="primary" @click="this.showWin = true">添加</el-button>
    </div>

    <!-- 分类栏 -->
    <div class="tab-box">
      <el-tabs v-model="tab" @tab-click="clickTab">
        <el-tab-pane label="全部" :name="0"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- 列表 -->
    <div class="table-box">

      <el-table :data="list" stripe style="width: 100%" highlight-current-row border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="title" label="标题" width="130" />
        <el-table-column prop="discount" label="优惠金额" />
        <el-table-column prop="threshold" label="优惠门槛" />
        <el-table-column prop="remain" label="剩余数" />
        <el-table-column prop="grab_num" label="领取人数" />
        <el-table-column prop="is_public_str" label="是否可公共领取" />
        <el-table-column prop="code" label="兑换码" />
        <el-table-column prop="grab_time" label="可领取时间" width="180" />
        <el-table-column prop="valid_time" label="有效时间" width="180" />
        <el-table-column prop="code_time" label="可兑换时间" width="180" />
        <el-table-column prop="create_time" label="创建时间" width="170" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="clickUpdateRow(scope.$index)">修改</el-button>
            <el-button type="danger" size="small" @click="clickDeleteRow(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <!-- 修改或添加弹窗 -->
    <el-dialog
      v-model="showWin"
      title="优惠券"
      width="40%"
    >
      <!-- 表单 -->
      <el-form ref="formRef" :model="form" label-width="100px" label-position="right">
        <el-form-item label="标题" :rules="[{ required: true, message: '优惠金额不能为空'}]">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="优惠金额"
          :rules="[
            { required: true, message: '优惠金额不能为空' },
            { type: 'number', message: '必须是数字' },
          ]"
        >
          <el-input v-model.number="form.discount" placeholder="请输入优惠金额"></el-input>
        </el-form-item>
        <el-form-item label="优惠券门槛" :rules="[{ required: true, message: '优惠金额不能为空'}]">
          <el-input v-model.number="form.threshold" placeholder="请输入优惠门槛"></el-input>
        </el-form-item>
        <el-form-item label="剩余数量" :rules="[{ required: true, message: '优惠金额不能为空'}]">
          <el-input v-model.number="form.remain" placeholder="请输入剩余数量"></el-input>
        </el-form-item>
        <el-form-item label="可公共领取" :rules="[{ required: true, message: '优惠金额不能为空'}]">
          <el-switch v-model="form.is_public"></el-switch>
        </el-form-item>
        <el-form-item label="可兑换" :rules="[{ required: true, message: '优惠金额不能为空'}]">
          <el-switch v-model="form.can_by_code"></el-switch>
        </el-form-item>
        <el-form-item label="兑换码">
          <el-input v-model="form.code" placeholder="请输入兑换码"></el-input>
        </el-form-item>

        <el-form-item label="有效时间" :rules="[{ required: true, message: '优惠金额不能为空'}]">
          <el-col :span="11">
            <el-date-picker v-model="form.begin_time" type="datetime" format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss">
            </el-date-picker>
          </el-col>
          <el-col :span="2" style="text-align: center;">
            <span style="width: 20px">~</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker v-model="form.end_time" type="datetime" format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss">
            </el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="可领取时间" :rules="[{ required: true, message: '优惠金额不能为空'}]">
          <el-col :span="11">
            <el-date-picker v-model="form.grab_begin_time" type="datetime" format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss">
            </el-date-picker>
          </el-col>
          <el-col :span="2" style="text-align: center;">
            <span style="width: 20px">~</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker v-model="form.grab_end_time" type="datetime" format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss">
            </el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="可兑换时间" :rules="[{ required: true, message: '优惠金额不能为空'}]">
          <el-col :span="11">
            <el-date-picker v-model="form.code_begin_time" type="datetime" format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss">
            </el-date-picker>
          </el-col>
          <el-col :span="2" style="text-align: center;">
            <span style="width: 20px">~</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker v-model="form.code_end_time" type="datetime" format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss">
            </el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>

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
const mock = require('../../../utils/mock-data/coupon')

const staticForm = {
  title: '大额优惠券',
  discount: 10,
  threshold: 100,
  remain: 100,
  is_public: true,
  can_by_code: true, // 是否可兑换
  code: '',
  begin_time: '',
  end_time: '',
  grab_begin_time: '',
  grab_end_time: '',
  code_begin_time: '',
  code_end_time: '',
}

export default {
  name: 'Coupon',
  components: {},
  data() {
    return {
      tab: 0,
      showWin: false,
      list: [],
      req: {
        limit: 20,
        page: 0,
        cid: 0,
        cid2: 0,
      },
      selectedIdx: -1, // 选中正在修改的index
      form: staticForm,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      let items = mock.couponList
      let list = new Array
      for (let i in items) {
        let item = items[i]
        list.push({
          id: item.id,
          begin_time: item.begin_time,
          end_time: item.end_time,
          cid: item.cid,
          cid2: item.cid2,
          title: item.title,
          discount: item.discount,
          threshold: item.threshold,
          kind: item.kind,
          remain: item.remain,
          is_public: item.is_public,
          code: item.code,
          grab_begin_time: item.begin_time,
          grab_end_time: item.grab_end_time,
          code_begin_time: item.code_begin_time,
          code_end_time: item.code_end_time,
          grab_num: item.grab_num,
          create_time: item.create_time,
          is_public_str: item.is_public ? '是' : '否',
          grab_time: item.grab_begin_time + ' ~ ' + item.grab_end_time,
          valid_time: item.begin_time + ' ~ ' + item.end_time,
          code_time: item.code_begin_time + ' ~ ' + item.code_end_time,
        })
      }
      this.list = list
    },
    // 点击切换标签
    clickTab() {
      this.getList()
    },
    // 点击添加或修改表单确认
    clickConfirm() {
      this.showWin = false
      console.info('form:', this.form)

      let req = {
        "id": this.selectedIdx == -1 ? 0 : this.list[this.selectedIdx].id,
        "cid": 0,
        "cid2": 0,
        "title": this.form.title,
        "discount": this.form.discount,
        "threshold": this.form.threshold,
        "kind": 0, // 优惠券种类，默认为0
        "remain": this.form.remain,
        "is_public": this.form.is_public,
        "code": this.form.code,
        "begin_time": this.form.begin_time,
        "end_time": this.form.end_time,
        "grab_begin_time": this.form.grab_begin_time,
        "grab_end_time": this.form.grab_end_time,
        "code_begin_time": this.form.code_begin_time,
        "code_end_time": this.form.code_end_time,
      }
      console.info('--- req:', req)

      // todo: 请求
      // ...

      // 界面数据更新
      if (this.selectedIdx == -1) {
        return
      }
      // 修改
      let item = this.list[this.selectedIdx]
      item.title = this.form.title
      item.discount = this.form.discount
      item.threshold = this.form.threshold
      item.remain = this.form.remain
      item.is_public = this.form.is_public
      item.code = this.form.can_by_code ? this.form.code : ''
      item.begin_time = this.form.begin_time
      item.end_time = this.form.end_time
      item.grab_begin_time = this.form.grab_begin_time
      item.grab_end_time = this.form.grab_end_time
      item.code_begin_time = this.form.code_begin_time
      item.code_end_time = this.form.code_end_time
      item.is_public_str = item.is_public ? '是' : '否',
      item.grab_time = item.grab_begin_time + ' ~ ' + item.grab_end_time,
      item.valid_time = item.begin_time + ' ~ ' + item.end_time,
      item.code_time = item.code_begin_time + ' ~ ' + item.code_end_time,

      this.list[this.selectedIdx] = item
    },
    // 点击修改
    clickUpdateRow(index) {
      let item = this.list[index]
      let form = {
        title: item.title,
        discount: item.discount,
        threshold: item.threshold,
        remain: item.remain,
        is_public: item.is_public,
        can_by_code: item.code.length == 0 ? false : true,
        code: item.code,
        begin_time: item.begin_time,
        end_time: item.end_time,
        grab_begin_time: item.grab_begin_time,
        grab_end_time: item.grab_end_time,
        code_begin_time: item.code_begin_time,
        code_end_time: item.code_end_time,
      }
      this.selectedIdx = index
      this.form = form
      this.showWin = true
    },
    // 点击删除
    clickDeleteRow(index) {
      console.info(index)
      let req = {
        id: this.list[index].id,
      }
      console.info('delete row:', req)
      // todo
      // ..
      this.list.splice(index, 1)
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

.foo-box {
  margin: 20px 0;
  margin-left: 30px;
}

.tab-box {
  margin: 10px 20px;
}

.table-box {
  margin: 10px 20px;
}
</style>