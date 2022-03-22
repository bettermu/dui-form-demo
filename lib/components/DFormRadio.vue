<template>
  <el-radio-group
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    @change="handleChange"
  >
    <el-radio
      :key="option.value"
      :label="option.value"
      v-bind="option.attrs"
      v-for="option of options"
    >{{option.label}}</el-radio>
  </el-radio-group>
</template>

<script>
import formMixin from '../mixins/formMixin'
export default {
  name:'DFormRadio',
  mixins: [formMixin],
  data() {
    return {
      type: ['String', 'Number', 'Boolean'],
      newValue: this.value || null
    }
  }
}
</script>
