<template>
  <div id="app">
    <!-- <dui-form>
      <dui-form-item :label="label">
        <el-input></el-input>
      </dui-form-item>
    </dui-form> -->
    <!-- <el-form-comp :formData.sync="formData" >
      <template #default="slot">
        <div >
          <el-button type="primary" @click="submitForm(slot.form)">提交</el-button>
          <el-button @click="addItem">新增表单项</el-button>
        </div>
      </template>
    </el-form-comp> -->
    <d-form 
    :form-data="FormConfigData.formData"
    :form-desc="FormConfigData.formDesc"
    :inline="FormConfigData.inline">
    </d-form>
  </div>
</template>

<script>
import DuiForm from "./components/Form.vue";
import DuiFormItem from "./components/FormItem.vue";
import ElFormComp from "./components/elForm.vue";
import EleFormComp from './components/newForm.vue'
//import formData from "./config/config";
import FormConfigData from './config/newConfig'

export default {
  name: "App",
  components: {
    DuiForm,
    DuiFormItem,
    ElFormComp,
    EleFormComp
  },
  data() {
    return {
      label: "hhh",
      FormConfigData: FormConfigData,
    };
  },
  methods: {
    
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
