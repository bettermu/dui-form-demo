<!-- Form 组件代码 -->
<template>
  <div>
    <form>
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  name:'duiForm',
  props: {
    // model: Object,
    // rules: Object
  }
}
</script>