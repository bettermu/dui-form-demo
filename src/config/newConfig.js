const FormConfigData = {
    formDesc: {
        showName: {
            type:'switch',
            label:'显示活动名称',
            labelSlot:(h)=>{
                return h('div',{},[h('span',{},'自定义label') , h('el-tooltip',{
                    props:{
                        content:'活动名称tooltip',
                        placement:'top-start'
                    },
                },[ h('i',{
                    class:"el-icon-question",
                    style:{
                        cursor:'pointer'
                    },
                    on:{
                        click:()=>{
                            alert(111)
                        }
                    }
                })]) ])
            },
            default:true,
            span:6,
        },
        
        disableName:{
            type:'switch',
            label:'禁用活动名称',
            default:true,
            span:6,
        },
        name: {
            type: 'input',
            label: '活动名称',
            default: 'hh',
            disabled:(data)=>{
                return data.disableName
            },
            break:true,
            tip: '密码长度`大于6位`',
            span:12,
            vif:(data)=>{
                return data.showName
            },
            required:true,
            rules:[
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            
        },

        

    },
    // rules:{
    //     name: [
    //         { required: true, message: '请输入名称', trigger: 'blur' },
    //         { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    //       ]
    // },
    formData: {
        name:'hhhhh',
        showName:true,
        disableName:false,
    },
    inline:false,
    formBtns:[
        {
            text:'自定义',
            click:()=>{
                alert(111)
            }
        }
    ],
    isShowSubmitBtn:true,
    submitBtnText:'查询'
}


// const DFormProps = {
//     //  表单描述  同dcp config字段 
//     formDesc:{
//         fieldName:{
//             /////////// 与dcp类似的字段  //////////
//             comp:'',    // 表单项组件   如 q-input dui-color-picker 以及自定义组件的name 均可
//             label:'',   // 表单项label
//             default:'',  // 表单项默认值 
//             disabled: Function | Boolean , //是否禁用
//             options: [],   // checkbox, select等组件的 options 
//             isShowLabel:Boolean,   // 是否显示标签  dcp的做法是判断label字段是否为空值
//             displayFormatter: Function,  // 表单回显值处理  同DCP的 preHook
//             valueFormatter:  Function,  //  表单输出值处理  同DCP的 hook
//             monitor:{     // 表单联动，修改所对应的表单项数据值  自由度较大
//                 key:[],  //产生联动的表单field
//                 handler:Function
//             },
//             vif: Function | Boolean,   //表单联动  是否显示  dcp里是通过showPanel实现
//             class:'',  //自定义class
 
//             ///////////  DForm需要有的部分  有部分属性后边dcp可能需要扩展  /////////
//             span:Number, //栅格布局配置
//             break: Boolean,  // 是否强制换行  
//             required:Boolean, // 是否必填  
//             rules:[] ,    // 表单项验证规则 
//             slots:{
//                 slotName:Function
//             }, // 组件插槽   比如input等组件本身支持的插槽功能
//             scopedSlots:{
//                 slotName:Function
//             }, // 组件作用域插槽
//             labelSlots:{},   //  自定义label插槽  
            
//             // 还会有一些与组件强相关的属性配置
//         }
//     },
//     // q-form 自身属性配置
//     formAttrs:{
//         labelPosition: String,  //标签位置  right left top
//         labelWidth:Number,   // 标签宽度
//     },
//     formData:{
//         fieldName:fieldValue   // 表单数据 同dcp data字段 
//     },
//     inline: Boolean,    // 行内模式 q-form本身支持的配置
//     rules:{},   // 表单整体的校验规则
//     disabled: Boolean, // 全局禁用状态
//     readonly: Boolean,  // 全局只读
//     formBtns:{},    // 表单的按钮组   如 提交  重置  取消  需要自定义文字
//     // 内置请求配置 
//     http:{
//         id:''
//     },
//     // 请求成功或者失败的钩子函数 beforeRequest requestSuccess requestError
// }

export default FormConfigData






