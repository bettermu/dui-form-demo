<template>
<div>
  <div class="">
    1111
    <el-row justify="center" type="flex">
      <el-col>
        <el-form
          ref="form"
          :model="formData"
        >
        <!-- 默认插槽作为表单项 -->
          <slot />
          <el-row :gutter="20">
              <template v-for="(formItem, field) of orderedFormDesc">
                  <el-col
                    :key="field"
                    v-bind="formItem._colAttrs"
                    v-if="formItem._vif"
                    :class="{ 'ele-form-col--break': formItem.break }"
                  >
                    <el-form-item
                      :error="formErrorObj ? formErrorObj[field] : null"
                      :label="
                        isShowLabel && formItem.isShowLabel !== false
                          ? formItem._label
                          : null
                      "
                      :label-width="formItem.labelWidth || null"
                      :prop="field"
                    >
                        <component
                          :disabled="formItem._disabled"
                          :readonly="readonly"
                          :desc="formItem"
                          :is="formItem._type"
                          :options="formItem._options"
                          :ref="field"
                          :field="field"
                          :formData="formData"
                          @input="setValue(field, $event)"
                          :value="formData[field]"
                        />
                    </el-form-item>
                  </el-col>
              </template>
            <slot name="form-footer" />
            <!-- 操作按钮区 -->
            <!-- <el-col class="ele-form-btns" v-if="btns.length">
              <el-form-item :label-width="inline ? '10px' : null"> -->
                <!-- 按钮插槽 -->
                <!-- <slot :btns="btns" name="form-btn">
                  <el-button
                    :key="index"
                    @click="btn.click"
                    v-bind="btn.attrs"
                    v-for="(btn, index) of btns"
                    >{{ btn.text }}</el-button
                  >
                </slot> -->
              <!-- </el-form-item>
            </el-col> -->
          </el-row>

        </el-form>
      </el-col>
    </el-row>

  </div>

  
</div>
</template>

<script>

import { isUnDef, is, castArray, isEmpty } from './tools/utils'
const cloneDeep = require('clone')

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
    // 表单错误信息
    formError: Object,
    // 是否显示标签
    isShowLabel: {
      type: Boolean,
      default: true
    },
    // 标签宽度
    labelWidth: {
      type: [Number, String],
      default: 'auto'
    },
    // 全局的readonly
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return {
      formDescData: {},
      oldFormData: {},
    }
  },
  watch:{
    formDesc:{
      handler(formDesc) {
        const oldFormDescData = {}
        // 去除被删除字段
        Object.keys(this.formDescData)
          .filter(key => formDesc[key])
          .forEach(key => {
            oldFormDescData[key] = this.formDescData[key]
          })
        this.formDescData = Object.assign(
          {},
          oldFormDescData,
          cloneDeep(formDesc)
        )
      },
      immediate: true,
      deep: true
    },
    formDescData: {
      handler(desc) {
        if (desc) {
          Object.keys(desc).forEach(field => {
            // 当全局设置 mock 为 true 时, 所有子项都标记为 true
            // if (this.mock && isUnDef(desc[field].mock)) {
            //   desc[field].mock = true
            // }

            // 设置默认值
            this.setDefaultvalue(desc[field], field)

            // 转换 tip, 内部属性不显示
            // if (desc[field].tip) {
            //   desc[field]._tip = String(desc[field].tip).replace(
            //     /`(.+?)`/g,
            //     '<code>$1</code>'
            //   )
            // }

            // layout值, 内部属性不显示
            //desc[field]._colAttrs = this.getColAttrs(desc[field].layout)

            // 老数据, 用于options切换不同类型和type切换不懂类型时, 保留旧数据
            // 例如 原type为 switch, 后改为 input, 出现类型和值不兼容情况, 就需要保留原数据
            // if (!desc[field]._oldValue) {
            //   desc[field]._oldValue = {}
            // }

            //this.setVif(desc[field], field)

            // if (desc[field]._vif) {
            //   // 设置 options
            //   this.changeOptions(desc[field].options, field)
            // }
          })

          // 检查联动
          this.checkLinkage()
        }
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.clearValidate()
        })
      },
      immediate: true
    },
  },

  computed:{
    // 通过order数组排序后的formDesc
    orderedFormDesc() {
      // if (this.order && this.order.length > 0) {
      //   const orderedFormDesc = {}
      //   // 根据order遍历，先添加到orderedFormDesc的key在之后遍历的时候，会先遍历，从而实现排序的目的。
      //   this.order.forEach(field => {
      //     if (this.formDescData[field]) {
      //       orderedFormDesc[field] = this.formDescData[field]
      //     } else {
      //       throw new Error('order中定义的key在formDesc中不存在')
      //     }
      //   })
      //   // 如果key不在order数组的时候，按照原序添加到orderedFormDesc
      //   Object.keys(this.formDescData).forEach(field => {
      //     // 当key不在order数组的时候
      //     if (!orderedFormDesc[field]) {
      //       orderedFormDesc[field] = this.formDescData[field]
      //     }
      //   })
      //   return orderedFormDesc
      // } else {
        return this.formDescData
      //}
    },
    // 表单错误信息
    formErrorObj() {
      return Object.assign({}, this.formError)
    },
  },

  methods:{

    setValue(field, val) {
      this.handleChange(field, val)
      this.checkLinkage()
    },

    // 检查联动
    checkLinkage(){
      const formDescData = this.formDescData
      const formData = this.formData
      Object.keys(formDescData).forEach(field => {
            const formItem = formDescData[field]

            // 1.设置 type
            let type = formItem.type
            
            type = this.getComponentName(formItem.type)

            // 2.触发 v-if 显示 / 隐藏
            this.setVif(formItem, field)

            
            this.$set(formItem, '_type', type)

          })
    },

    setVif(formItem, field) {
      let vif = true
      if (typeof formItem.vif === 'function') {
        vif = Boolean(this.getFunctionAttr(formItem.vif, field))

        if (!vif) {
          // 如果隐藏, 则使用其默认值
          this.handleChange(field, formItem._defaultValue)
        }
      } else if (typeof formItem.vif === 'boolean') {
        vif = formItem.vif
      }
      this.$set(formItem, '_vif', vif)
    },
    handleChange(field, val) {
      this.oldFormData = cloneDeep(this.formData)
      this.$set(this.formData, field, val)
      this.$emit('input', this.formData)
    },
    // 设置默认值
    setDefaultvalue(formItem, field) {
      let defaultValue =
        typeof formItem.default === 'function'
          ? formItem.default(this.formData)
          : formItem.default
      // 默认值不为空  & (值为空 || 老值和当前值)
      if (!isEmpty(defaultValue) && isEmpty(this.formData[field])) {
        // 判断是否有格式化函数
        if (formItem.displayFormatter) {
          defaultValue = formItem.displayFormatter(defaultValue, this.formData)
        }

        this.handleChange(field, defaultValue)
      }
      this.$set(formItem, '_defaultValue', defaultValue)
    },

    // 获取组件名称
    getComponentName(type) {
      if (this.$DFormBuiltInNames.includes(type)) {
        // 内置组件
        return 'd-form-' + type
      } else {
        // 外部组件
        return type
      }
    },
  }
}

</script>
