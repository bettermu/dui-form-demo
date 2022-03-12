
const formData = [
  {
    name: 'name',
    comp: 'el-input',
    itemProps: {
      label: '活动名称',
      prop: 'name',
    },
    compProps:{
      type:'textarea'
    },
    value: '',
    rules: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]
  },
  {
    name: 'type',
    comp: 'el-checkbox-group',
    itemProps: {
      label: '活动性质',
      prop: 'type',
    },
    value: [],
    children: [
      {
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
  {
    name: 'resource',
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
    rules:[
      { required: true, message: '请选择活动资源', trigger: 'change' }
    ]
  }
]


export default formData