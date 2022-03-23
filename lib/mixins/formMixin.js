import ExtendSlot from '../tools/ExtendSlot'
import attrsMixin from './attrsMixin'
import { is, isDef } from '../tools/utils'

export default {
  components:{
    ExtendSlot
  },
  inject:{
    $DForm: {
      default: null
    },
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

      created(){
        this.registerMonitor()
      },
      computed: {
        slots() {
          return this.desc.slots || {}
        },
        scopedSlots(){
          return this.desc.scopedSlots || {}
        },
        onEvent(){
          return {
            // 默认为change触发update
            [this.desc.trigger || 'change']: this.handleChange
          }
        }
      },
    methods: {
        // 变化处理
      handleChange(value) {
        this.updateForm(value)
      },

      // 更新表单value值
      updateForm(value){
        console.log(value)
        this.$emit('update', value)
      },
  
      // 检查类型
      checkType(val, isDefault = false) {
        if (this.type && isDef(val)) {
          const isOk = is(val, this.type)
          if (!isOk) {
            // eslint-disable-next-line
            console.error(
              `[DForm warn]: ${this.desc._label} 的${
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
      },

      //注册联动的函数
      registerMonitor(){
        if(!this.desc.monitor) return
        const { key } = this.desc.monitor
        this.$DForm.registerMonitor(key,this.handleMonitor)
      },

      // 联动函数内部处理
      handleMonitor(monitorField,monitorValue){
        console.log(monitorField,monitorValue)
        if(!this.desc.monitor.handler) {
          console.warn(`${this.desc._name}注册了监听，但是没有处理方法！`)
          return
        }
        const selfData = {
          value: this.newValue,
          desc: this.desc
        }

        const data = this.desc.monitor.handler(monitorValue,selfData)

        if(data && data.hasOwnProperty('value')) {
          this.newValue = data.value
          this.updateForm(this.newValue)
        }
      }
    },

}