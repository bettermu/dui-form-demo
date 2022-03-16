<template>
  <el-switch
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    @change="handleChange"
  />
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'DFormSwitch',
  mixins: [formMixin],
  data() {
    return {
      //mockRule: '@boolean'
    }
  }
}
</script>
