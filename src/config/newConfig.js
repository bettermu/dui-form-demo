const FormConfigData = {
    formDesc: {
        showName: {
            type:'switch',
            label:'显示活动名称',
            default:true,
        },
        disableName:{
            type:'switch',
            label:'禁用活动名称',
            default:true,
        },
        name: {
            type: 'input',
            label: '活动名称',
            default: 'hh',
            disabled:(data)=>{
                return data.disableName
            },
            vif:(data)=>{
                return data.showName
            },
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
    }
}

export default FormConfigData