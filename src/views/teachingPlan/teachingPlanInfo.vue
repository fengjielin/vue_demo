<template>
  <div class="plan_info">
    <div class="breadcrumb" style="display: flex">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/"
          ><Icon
            type="ios-pin-outline"
            style="color: #5784ff; margin-right: 12px"
          />教学管理</BreadcrumbItem
        >
        <BreadcrumbItem to="/teaching/trainPlan">学期授课计划</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="info_content">
      <div class="info_title">理论教学2021~2022学年 第一学期</div>
      <div class="info_btn">
        <ButtonGroup
          style="margin: 20px auto 0px; display: flex; justify-content: center"
        >
          <Button
            v-for="(item, index) in btn"
            :key="index"
            :type="activeIndex == index ? 'primary' : 'default'"
            @click="changeBtn(index)"
            style="width: 100px; height: 34px; padding: 0"
          >
            <span>{{ item }}</span>
          </Button>
        </ButtonGroup>
      </div>
      <div class="info_con">
        <div class="info_form" v-if="activeIndex === 0">
          <Form :model="formItem" :label-width="90">
            <FormItem label="课程名称">
              <Input
                v-model="formItem.courseName"
                placeholder="请输入"
                maxlength="40"
                style="width: 380px"
              ></Input>
            </FormItem>
            <FormItem label="授课班级">
              <Select v-model="formItem.teachingClass">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="任课老师">
              <Select v-model="formItem.teacher">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="教研组组长">
              <Select v-model="formItem.teachResearchGroupLeader">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="教务科科长">
              <Select v-model="formItem.teachResearchGroupChief">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="教学系主任">
              <Select v-model="formItem.teachingDepartmentDirector">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="教学副校长">
              <Select v-model="formItem.teachingVicePrincipal">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
        <div class="info_explain" v-else-if="activeIndex === 1">
          <div class="table">
            <table>
              <thead>
                <tr>
                  <th rowspan="3">本课程总课时</th>
                  <th rowspan="3">已授课时</th>
                  <th colspan="3">本学期</th>
                  <th colspan="9">本学期课时分配</th>
                </tr>
                <tr>
                  <th rowspan="2">计划课时</th>
                  <th rowspan="2">实际教学周数</th>
                  <th rowspan="2">本课程周课数</th>
                  <th rowspan="2">实际课时</th>
                  <th colspan="6">其中</th>
                  <th rowspan="2">余（缺）课时</th>
                  <th rowspan="2">余（缺）课时处理意见</th>
                </tr>
                <tr>
                  <th>讲授课</th>
                  <th>习题课</th>
                  <th>实验课</th>
                  <th>参观见习</th>
                  <th>考核</th>
                  <th>机动课时</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ explainData[0].classHour }}</td>
                  <td>{{ explainData[0].alreadyClassHour }}</td>
                  <td>{{ explainData[0].planClassHour }}</td>
                  <td>{{ explainData[0].actualCourseNum }}</td>
                  <td>{{ explainData[0].weekCourseNum }}</td>
                  <td>{{ explainData[0].actualClassHour }}</td>
                  <td>{{ explainData[0].lectureCourse }}</td>
                  <td>{{ explainData[0].exampleCourse }}</td>
                  <td>{{ explainData[0].experimentalCourse }}</td>
                  <td>{{ explainData[0].visitInternship }}</td>
                  <td>{{ explainData[0].examine }}</td>
                  <td>{{ explainData[0].flexibleClassHour }}</td>
                  <td>{{ explainData[0].absenceClassHour }}</td>
                  <td>{{ explainData[0].opinion }}</td>
                </tr>
                <tr>
                  <td class="bgColor" colspan="2" rowspan="2">教学大纲</td>
                  <td class="bgColor">名称</td>
                  <td colspan="3"></td>
                  <td colspan="8" rowspan="6">
                    <div class="explain_cell">说明：</div>
                  </td>
                </tr>
                <tr>
                  <td class="bgColor">编号</td>
                  <td></td>
                  <td class="bgColor">版次</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="bgColor" colspan="2" rowspan="2">使用教材</td>
                  <td class="bgColor">名称</td>
                  <td colspan="3"></td>
                </tr>
                <tr>
                  <td class="bgColor">版本</td>
                  <td colspan="3"></td>
                </tr>
                <tr style="height: 104px">
                  <td class="bgColor" colspan="2">主要参考资料</td>
                  <td colspan="4"></td>
                </tr>
                <tr style="height: 104px">
                  <td class="bgColor" colspan="2">参观见习安排</td>
                  <td colspan="4"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="save_btn">
            <Button type="primary">保存</Button>
          </div>
        </div>
        <div class="info_arrange" v-else-if="activeIndex === 2">
          <div class="add_btn">
            <Button type="primary" @click="show">添加</Button>
          </div>
          <Table
            :columns="arrangeColumns"
            :data="arrangeData"
            border
            disabled-hover
          ></Table>
        </div>
      </div>
    </div>

    <Modal v-model="modalFlag" :title="title" :mask-closable="false">
      <div class="modal">
        <Form
          :model="modelData"
          ref="formValidate"
          :rules="ruleValidate"
          :label-width="90"
        >
          <FormItem label="周/次" prop="week">
            <Input
              v-model="modelData.week"
              placeholder="请输入"
              maxlength="40"
              style="width: 380px"
            ></Input>
          </FormItem>
          <FormItem label="章节（课题）" prop="chapter">
            <Input
              v-model="modelData.chapter"
              placeholder="请输入"
              maxlength="40"
              style="width: 380px"
            ></Input>
          </FormItem>
          <FormItem label="主要内容" prop="mainContent">
            <Input
              v-model="modelData.mainContent"
              placeholder="请输入"
              maxlength="40"
              style="width: 380px"
            ></Input>
          </FormItem>
          <FormItem> 教学安排及学时分配：</FormItem>
          <FormItem label="讲授课" prop="lectureCourse">
            <InputNumber
              :min="0"
              v-model="modelData.lectureCourse"
              placeholder="请输入"
              style="width: 380px"
            ></InputNumber>
          </FormItem>
          <FormItem label="习题课" prop="exampleCourse">
            <InputNumber
              :min="0"
              v-model="modelData.exampleCourse"
              placeholder="请输入"
              style="width: 380px"
            ></InputNumber>
          </FormItem>
          <FormItem label="实验课" prop="experimentalCourse">
            <InputNumber
              :min="0"
              v-model="modelData.experimentalCourse"
              placeholder="请输入"
              style="width: 380px"
            ></InputNumber>
          </FormItem>
          <FormItem label="参观见习" prop="visitInternship">
            <InputNumber
              :min="0"
              v-model="modelData.visitInternship"
              placeholder="请输入"
              style="width: 380px"
            ></InputNumber>
          </FormItem>
          <FormItem label="考核" prop="examine">
            <InputNumber
              :min="0"
              v-model="modelData.examine"
              placeholder="请输入"
              style="width: 380px"
            ></InputNumber>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="ok" :loading="loading">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btn: ["授课计划信息", "授课计划说明", "授课计划安排"],
      // 用于控制选择了那个按钮
      activeIndex: 0,

      formItem: {
        courseName: "", // 课程名称
        teachingClass: "", // 授课班级
        teacher: "", // 任课老师
        teachResearchGroupLeader: "", // 教研组组长
        teachResearchGroupChief: "", // 教务科科长
        teachingDepartmentDirector: "", //教学系主任
        teachingVicePrincipal: "", // 教学副校长
      },

      explainData: [
        {
          classHour: "141", // 本课程总课时
          alreadyClassHour: "0", // 已授课时
          planClassHour: "141", // 计划课时
          actualCourseNum: "5", // 实际教学周数
          weekCourseNum: "25", // 本课程周课数
          actualClassHour: "125", // 实际课时
          lectureCourse: "25", // 讲授课
          exampleCourse: "30", // 习题课
          experimentalCourse: "20", // 实验课
          visitInternship: "10", //参观见习
          examine: "2", // 考核
          flexibleClassHour: "0", //机动课时
          absenceClassHour: "0", //余（缺）课时
          opinion: "", // 余（缺）课时处理意见
        },
      ],

      arrangeColumns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 134,
        },
        {
          title: "周/次",
          key: "week",
          align: "center",
          width: 134,
        },
        {
          title: "章节（课题）",
          key: "chapter",
          align: "center",
          width: 300,
        },
        {
          title: "主要内容",
          key: "mainContent",
          align: "center",
          mixWidth: 400,
        },
        {
          title: "教学安排及学时分配",
          align: "center",
          children: [
            {
              title: "讲授课",
              key: "lectureCourse",
              align: "center",
              width: 134,
            },
            {
              title: "习题课",
              key: "exampleCourse",
              align: "center",
              width: 134,
            },
            {
              title: "实验课",
              key: "experimentalCourse",
              align: "center",
              width: 134,
            },
            {
              title: "参观见习",
              key: "visitInternship",
              align: "center",
              width: 134,
            },
            {
              title: "考核",
              key: "examine",
              align: "center",
              width: 134,
            },
          ],
        },
        {
          title: "操作",
          align: "center",
          width: 134,
          render: (h, params) => {
            return h("span", [
              h(
                "a",
                {
                  props: {},
                  style: {
                    marginRight: "22px",
                    color: "#1B81FF",
                  },
                  on: {
                    click: () => {
                      this.show(params.row);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "a",
                {
                  props: {},
                  style: {
                    color: "#FF7A7A",
                  },
                  on: {
                    click: () => {
                      this.removeIndicator(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      arrangeData: [
        {
          id: 1,
          week: "2", // 周次
          chapter: "第2章", // 章节
          mainContent: "主题班会", // 主要内容
          lectureCourse: 25, // 讲授课
          exampleCourse: 30, // 习题课
          experimentalCourse: 20, // 实验课
          visitInternship: 10, //参观见习
          examine: 2, // 考核
        },
        {},
        {},
        {},
      ],

      loading: false,
      modalFlag: false,
      title: "",
      ruleValidate: {
        week: [
          {
            required: true,
            message: "请输入周次",
            trigger: "blur",
          },
          {
            type: "string",
            pattern: "[^\\s+]",
            message: "不能输入空格字符串",
            trigger: "blur",
          },
        ],
        chapter: [
          {
            required: true,
            message: "请输入章节（课题）",
            trigger: "blur",
          },
          {
            type: "string",
            pattern: "[^\\s+]",
            message: "不能输入空格字符串",
            trigger: "blur",
          },
        ],
        mainContent: [
          {
            required: true,
            message: "请输入主要内容",
            trigger: "blur",
          },
          {
            type: "string",
            pattern: "[^\\s+]",
            message: "不能输入空格字符串",
            trigger: "blur",
          },
        ],
        lectureCourse: [
          {
            required: true,
            type: "number",
            message: "请输入讲授课的学时分配",
            trigger: "blur",
          },
        ],
        exampleCourse: [
          {
            required: true,
            type: "number",
            message: "请输入习题课的学时分配",
            trigger: "blur",
          },
        ],
        experimentalCourse: [
          {
            required: true,
            type: "number",
            message: "请输入实验课的学时分配",
            trigger: "blur",
          },
        ],
        visitInternship: [
          {
            required: true,
            type: "number",
            message: "请输入参观见习的学时分配",
            trigger: "blur",
          },
        ],
        examine: [
          {
            required: true,
            type: "number",
            message: "请输入考核的学时分配",
            trigger: "blur",
          },
        ],
      },
      modelData: {
        week: "", // 周次
        chapter: "", // 章节
        mainContent: "", // 主要内容
        lectureCourse: 0, // 讲授课
        exampleCourse: 0, // 习题课
        experimentalCourse: 0, // 实验课
        visitInternship: 0, //参观见习
        examine: 0, // 考核
      },
    };
  },
  methods: {
    changeBtn(index) {
      this.activeIndex = index;
    },

    // 添加、编辑
    show(row) {
      this.modalFlag = true;
      if (row.id) {
        this.title = "编辑";
        this.modelData.week = row.week;
        this.modelData.chapter = row.chapter;
        this.modelData.mainContent = row.mainContent;
        this.modelData.lectureCourse = row.lectureCourse;
        this.modelData.exampleCourse = row.exampleCourse;
        this.modelData.experimentalCourse = row.experimentalCourse;
        this.modelData.visitInternship = row.visitInternship;
        this.modelData.examine = row.examine;
      } else {
        this.title = "添加";
        this.modelData.week = "";
        this.modelData.chapter = "";
        this.modelData.mainContent = "";
        this.modelData.lectureCourse = 0;
        this.modelData.exampleCourse = 0;
        this.modelData.experimentalCourse = 0;
        this.modelData.visitInternship = 0;
        this.modelData.examine = 0;
      }
    },
    // 删除
    removeIndicator(row) {
      this.$Modal.confirm({
        closable: true,
        title: "提示",
        content: "<p>确认要删除吗?</p>",
        onOk: () => {
          console.log("删除");
        },
      });
    },

    ok() {
      let flag = true;
      this.$refs["formValidate"].validate((valid) => {
        if (!valid) {
          this.$Modal.error({
            title: "提示",
            content: "表单填写有误",
            closable: true,
          });
          flag = false;
        }
      });
      if (!flag) {
        return;
      }
      this.modalFlag = false;
    },
    cancel() {
      this.modalFlag = false;
      this.$refs["formValidate"].resetFields();
    },
  },
};
</script>

<style>
.info_content {
  margin-top: 16px;
  padding-top: 32px;
  box-sizing: border-box;
  background: #ffffff;
}
.info_title {
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  line-height: 24px;
  color: #82899f;
}
.info_form {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
.info_explain .table,
.info_arrange {
  padding: 32px 16px 0;
  box-sizing: border-box;
}
.info_arrange {
  padding: 0 16px 16px;
}

.info_explain table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-bottom: 52px;
}
.info_explain table thead,
.info_explain table .bgColor {
  background-color: #ecf8ff;
}
.info_explain td,
.info_explain th {
  border: 1px solid #999999;
  height: 52px;
}

.info_explain .explain_cell {
  width: 100%;
  height: 100%;
  text-align: left;
  padding: 8px 16px;
  box-sizing: border-box;
}

.info_explain .save_btn {
  border-top: 1px solid #ddd;
  padding: 12px 88px;
  box-sizing: border-box;
}

.info_arrange .add_btn {
  padding: 10px 0;
  box-sizing: border-box;
  text-align: right;
}

.info_arrange .ivu-table-header th {
  background-color: #ecf8ff;
}

.info_arrange .ivu-table-wrapper-with-border {
  border: 1px solid #999;
  border-right: 0;
  border-bottom: 0;
}
.ivu-table-border:after,
.ivu-table:before {
  background-color: #999999;
}
.info_arrange th,
.info_arrange td {
  border-color: #999999;
}
</style>