import ExtendSlot from '../tools/ExtendSlot'
import attrsMixin from './attrsMixin'
import { is, isDef } from '../tools/utils'

export default {
  components:{
    ExtendSlot
  },
    mixins: [attrsMixin],
    props: {
        value: {},
        disabled: Boolean,
        readonly: Boolean,
        options: {
            type: Array,
            default () {
                return []
            }
        },
        formData: Object,
        desc: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    
    data() {
        return {
            // 新值, 因为Vue不能修改props传递过来的值, 所以借助新的值进行传递
            newValue: this.value
        }
    },
    watch: {
        // 当值发生变化时
        value: {
          handler(value) {
            this.handleValueChanged(value)
          },
          immediate: true
        }
      },
      computed: {
        // slots() {
        //   return this.desc.slots || {}
        // },
        // scopedSlots() {
        //   return this.desc.scopedSlots || {}
        // },
        // onEvents() {
        //   return Object.assign({}, this.defaultOn, this.desc.on)
        // }
      },
    methods: {
        // 变化处理
    handleChange(value) {
        this.$emit('update', value)
      },
  
      // 检查类型
      checkType(val, isDefault = false) {
        if (this.type && isDef(val)) {
          const isOk = is(val, this.type)
          if (!isOk) {
            // eslint-disable-next-line
            console.error(
              `[vue-ele-form warn]: ${this.desc._label} 的${
              // eslint-disable-next-line indent
              isDefault ? '默认' : ''
              }值类型错误, 期望 [${this.type}] 类型, 但`,
              val,
              '不是该类型, 请检查'
            )
          }
          return isOk
        } else {
          return true
        }
      },
  
      // 初始化数据
      handleValueChanged(value) {
        if (this.desc.displayFormatter) {
          value = this.desc.displayFormatter(value)
        }
  
        if (this.checkType(value)) {
          if (this.customInit) {
            value = this.customInit(value)
          }
          this.newValue = value
        }
      }
    },
}