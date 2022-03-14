<template>
<div>
  <div class="">
    <el-row justify="center" type="flex">
      <el-col :span="computedSpan">
        <el-form
          :model="formData"
        >
        <!-- 默认插槽作为表单项 -->
          <slot />

        </el-form>
      </el-col>
    </el-row>

  </div>

  
</div>
</template>

<script>

export default {
  name:'DForm',
  props:{
    // 表单描述
    formDesc: {
      type: Object,
      required: true
    },
    // 表单数据
    formData: {
      type: Object,
      required: true
    },
  }
}

</script>
