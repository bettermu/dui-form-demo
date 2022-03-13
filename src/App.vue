<template>
  <div id="app">
    <!-- <dui-form>
      <dui-form-item :label="label">
        <el-input></el-input>
      </dui-form-item>
    </dui-form> -->
    <el-form-comp :formData.sync="formData" >
      <template #default="slot">
        <div >
          <el-button type="primary" @click="submitForm(slot.form)">提交</el-button>
          <el-button @click="addItem">新增表单项</el-button>
        </div>
      </template>
    </el-form-comp>
  </div>
</template>

<script>
import DuiForm from "./components/Form.vue";
import DuiFormItem from "./components/FormItem.vue";
import ElFormComp from "./components/elForm.vue";
import formData from "./config/config";

export default {
  name: "App",
  components: {
    DuiForm,
    DuiFormItem,
    ElFormComp,
  },
  data() {
    return {
      label: "hhh",
      formData: formData,
    };
  },
  methods: {
    addItem() {
      this.formData.push({
        name: "desc",
        comp: "el-input",
        compProps: {
          type: "textarea",
        },
        itemProps: {
          label: "活动形式",
          prop: "desc",
        },
        value: "",
        rules: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      });
    },
    submitForm(ref){
      ref.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
