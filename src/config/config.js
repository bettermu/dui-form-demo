const formData = {
    properties: {
        name: {
            comp: 'el-input',
            itemProps: {
                label: '活动名称',
                prop: 'name',
            },
            compProps: {
                type: 'text'
            },
            disabled: (data) => {
                return data.delivery === false
            },
            value: '',
            rules: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
        },
        delivery: {
            comp: 'el-switch',
            itemProps: {
                label: '即时配送',
                prop: 'delivery',
            },
            value: false
        },
        type: {
            comp: 'el-checkbox-group',
            itemProps: {
                label: '活动性质',
                prop: 'type',
            },
            value: [],
            children: [{
                    comp: 'el-checkbox',
                    compProps: {
                        label: '地推活动',
                        name: 'type',
                    },
                },
                {
                    comp: 'el-checkbox',
                    compProps: {
                        label: '主题活动',
                        name: 'type',
                    },
                },
                {
                    comp: 'el-checkbox',
                    compProps: {
                        label: '品牌曝光',
                        name: 'type',
                    },
                }
            ],
            rules: { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        },
        resource: {
            comp: 'el-radio-group',
            value: '',
            itemProps: {
                label: '活动性质',
                prop: 'resource',
            },
            children: [{
                comp: 'el-radio',
                compProps: {
                    label: '线上品牌商赞助',
                },
            }, {
                comp: 'el-radio',
                compProps: {
                    label: '线下场地免费',
                },
            }],
            rules: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
            ]
        },
        desc: {
            comp: 'el-input',
            compProps: {
                type: 'textarea',
            },
            itemProps: {
                label: '活动形式',
                prop: 'desc',
            },
            value: '',
            rules: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
        }
    },
    data: {

    }
}






export default formData