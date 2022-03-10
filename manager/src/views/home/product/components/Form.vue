<template>
  <!-- 修改或添加弹窗 -->
  <el-dialog
    v-model="showWin"
    title="优惠券"
    width="40%"
  >
    <!-- 表单 -->
    <el-form ref="formRef" :model="form" label-width="100px" label-position="right">
      <el-form-item label="图书名称" :rules="[{ required: true, message: '名称不能为空'}]">
        <el-input v-model="form.title" placeholder="请输入图书标题"></el-input>
      </el-form-item>
      <el-form-item label="作者" :rules="[{ required: true, message: '作者不能为空'}]">
        <el-input v-model="form.author" placeholder="请输入作者"></el-input>
      </el-form-item>
      <el-form-item label="出版社" :rules="[{ required: true, message: '出版社不能为空'}]">
        <el-input v-model="form.publisher" placeholder="请输入出版社"></el-input>
      </el-form-item>
      <!-- todo: cid cid2 -->
      <!-- todo: status -->
      <!-- todo: pictures -->
      <el-form-item label="原价" :rules="[{ required: true, message: '原价不能为空'}]">
        <el-input v-model.number="form.price" placeholder="请输入原价"></el-input>
      </el-form-item>
      <el-form-item label="优惠价" :rules="[{ required: true, message: '优惠价不能为空'}]">
        <el-input v-model.number="form.cur_price" placeholder="请输入优惠价"></el-input>
      </el-form-item>
      <!-- <el-form-item label="库存" :rules="[{ required: true, message: '优惠金额不能为空'}]">
        <el-input v-model.number="form.stokc" placeholder="请输入库存"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <el-input v-model="form.detail" placeholder="请输入兑换码"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="出版时间" :rules="[{ required: true, message: '出版时间不能为空'}]">
        <el-date-picker v-model="form.publish_time" type="datetime" format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss">
        </el-date-picker>
      </el-form-item> -->
    </el-form>

    <template #footer>
      <div>
        <el-button @click="clickCancel">取消</el-button>
        <el-button type="primary" @click="clickConfirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { RequestProductAddOrUpdate } from "../../../../utils/request/product";

export default {
  name: "Form",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default() {
        return {
          id: 0,
          title: "",
          author: "",
          publisher: "",
          price: 0,
          cur_price: 0,
        };
      },
    },
  },
  data() {
    return {
      // showWin: false,
      form: {},
    };
  },
  computed: {
    showWin() {
      return this.show;
    },
  },
  watch: {
    formData(newData) {
      console.info("--- formData:", newData);
      this.form = {
        id: newData.id,
        title: newData.title,
        author: newData.author,
        publisher: newData.publisher,
        // book_name: newData.book_name,
        price: newData.price,
        cur_price: newData.cur_price,
        // publish_time: newData.publish_time,
        // images: newData.images,
        // cid: newData.cid,
        // cid2: newData.cid2,
        // stock: newData.stock,
        // status: newData.status,
        // detail: newData.detail,
      };
    },
  },
  emits: {
    submit: () => {
      return true;
    },
    cancel: true,
  },
  methods: {
    clickConfirm() {
      console.info("-- confirm form: ", this.form);
      let req = {
        id: this.form.id,
        title: this.form.title,
        author: this.form.author,
        publisher: this.form.publisher,
        price: Number(this.form.price),
        cur_price: Number(this.form.cur_price),
      }
      RequestProductAddOrUpdate(req, (res) => {
        if (res.code != 0) {
          console.warn("RequestProductAddOrUpdate error:", res);
          return;
        }
        console.log("RequestProductAddOrUpdate ok: req=", req);
        this.$emit("submit");
      });
    },
    clickCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
</style>