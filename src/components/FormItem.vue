<template>
  <div>
    <label for="dd">{{label}}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'duiFormItem',
  props: {
    label: String,
    prop: String
  }
}
</script>