
<template>
  <div>
    <!-- <el-form :model="ruleForm" :rules="rules"  label-width="100px" class="demo-ruleForm">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送" prop="delivery">
    <el-switch v-model="ruleForm.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form> -->

    <el-form
      label-width="100px"
      ref="ruleForm"
      :model="formKey"
      :rules="formRules"
    >
      <el-form-item
        v-for="(value, key, index) in visableFormData.properties"
        :key="index"
        v-bind="value.itemProps"
      >
        <component
          :is="value.comp"
          v-model="value.value"
          v-bind="value.compProps"
          v-on="makeEventCallback(value.eventObj, value.linkage)"
        >
          <template v-if="value.children">
            <component
              v-for="(it, ind) in value.children"
              :key="ind"
              :is="it.comp"
              v-bind="it.compProps"
            ></component>
          </template>
        </component>
      </el-form-item>
      <!-- 提交表单slot -->
      <el-form-item v-if="hasSlot">
        <slot :form="formRef"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      formRef: null,
      visableFormData: {},
    };
  },
  watch: {
    formData: {
      handler(val) {
        console.log(111)
        let map = {
          properties: {},
        };
        for (let key in val.properties) {
          if (val.properties[key].visable !== false) {
            map.properties[key] = val.properties[key];
          }
        }
        this.$nextTick(()=>{
          this.visableFormData = map;
        });
        
        //this.$forceUpdate()
      },
      deep:true,
      immediate: true,
    },
  },
  mounted() {
    console.log(this);
    this.formRef = this.$refs.ruleForm;
  },
  computed: {
    hasSlot() {
      return this.$scopedSlots.default;
    },
    // visableFormData(){
    //   console.log(111)
    //   let map = {
    //     properties:{}
    //   }
    //   for(let key in this.formData.properties){
    //     if(this.formData.properties[key].visable !== false){
    //       map.properties[key] = this.formData.properties[key]
    //     }
    //   }
    //   return map
    // },
    formKey() {
      let map = {};
      Object.keys(this.formData.properties).forEach((item) => {
        map[item] = this.formData.properties[item].value;
      });
      return map;
    },
    formRules() {
      let map = {};
      Object.keys(this.formData.properties).forEach((item) => {
        map[item] = this.formData.properties[item].rules;
      });
      return map;
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    makeEventCallback(eventObj, linkage) {
      let that = this;
      let resultObj = {};
      if (linkage) {
        for (let key in linkage) {
          resultObj[key] = function (val) {
            linkage[key].forEach((item) => {
              console.log(val)
              if (JSON.stringify(val) === JSON.stringify(item.equalValue)) {
                console.log(that);
                that.formData.properties[item.target].visable = false;
                console.log(that.formData.properties[item.target].visable);
                //that.$forceUpdate();
              } else {
                that.formData.properties[item.target].visable = true;
              }
            });
          };
        }
        // resultObj[linkage.trigger] = function(val){
        //   if(JSON.stringify(val) === JSON.stringify(linkage.equalValue)){
        //     alert(111)
        //   }
        // }
      }
      for (let func in eventObj) {
        let rfunc = function (ref) {
          return function () {
            // 切面 做任何想做的处理
            console.log(111);

            eventObj[func](ref);

            console.log(222);
          };
        };
        resultObj[func] = rfunc(this.$refs.ruleForm);
      }

      return resultObj;
    },
  },
};
</script>