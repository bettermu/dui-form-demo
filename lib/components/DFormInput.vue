<template>
  <el-input
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="newValue"
    v-on="onEvent"
  >
    <!-- <template v-for="(render, key) of slots" v-slot:[key]>
      <extend-slot :key="key" :render="render" />
    </template> -->
  </el-input>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'DFormInput',
  mixins: [formMixin],
  data() {
    return {
      type: ['String', 'Number']
    }
  },
  computed: {
    defaultAttrs() {
      return {
        placeholder: '请输入' + this.desc._label
      }
    }
  },
  methods: {
    handleChange(val) {
      if (this.attrs.type === 'number') {
        val = Number(val)
      }
      this.updateForm(val)
    }
  }
}
</script>
