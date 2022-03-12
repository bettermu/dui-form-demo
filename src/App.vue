<template>
  <div id="app">
    <dui-form>
      <dui-form-item :label="label">
        <el-input></el-input>
      </dui-form-item>
    </dui-form>

    <el-form-comp :formData="formData"></el-form-comp>

  </div>
</template>

<script>
import DuiForm from './components/Form.vue'
import DuiFormItem from './components/FormItem.vue'
import ElFormComp from './components/elForm.vue'
import formData from './config/config'

export default {
  name: 'App',
  components: {
    DuiForm,
    DuiFormItem,
    ElFormComp
  },
  data(){
    return {
      label:'hhh',
      formData:formData
    }
  }
}
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
