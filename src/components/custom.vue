<template>
  <el-input
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    @input="handleChange"
  >
    
  </el-input>
</template>

<script>

export default {
  name: 'CustomInput',
  data() {
    return {
      type: ['String', 'Number']
    }
  },
  computed: {
    defaultAttrs() {
      return {
        placeholder: '我就是自定义组件'
      }
    }
  },
  methods: {
    // 如果需要对val进行特殊处理，可以重写handleChange的方法 但是需要手动调用updateForm方法
    handleChange(val) {
      if (this.attrs.type === 'number') {
        val = Number(val)
      }
      this.updateForm(val)
    }
  }
}
</script>
