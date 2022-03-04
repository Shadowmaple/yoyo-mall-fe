<template>
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
</template>

<script>
export default {
    data() {
        return {
            showWin: false,
        }
    }
}
</script>

<style>

</style>