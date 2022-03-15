const FormConfigData = {
    formDesc: {
        name: {
            type: 'input',
            label: '活动名称',
            default: '',
            disabled:(data)=>{
                return data.name === 'hhhh'
            },
            rules:[
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            
        }

    },
    // rules:{
    //     name: [
    //         { required: true, message: '请输入名称', trigger: 'blur' },
    //         { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    //       ]
    // },
    formData: {
        name:'hhhhh'
    }
}

export default FormConfigData