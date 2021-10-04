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
          style="margin: 20px auto 32px; display: flex; justify-content: center"
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
                v-model="formItem.input"
                placeholder="请输入"
                style="width: 380px"
              ></Input>
            </FormItem>
            <FormItem label="授课班级">
              <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="任课老师">
              <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="教研组组长">
              <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="教务科科长">
              <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="教学系主任">
              <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="教学副校长">
              <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
        <div class="info_explain" v-else-if="activeIndex === 1">
          <!-- <Table
            :columns="explainColumns"
            :data="explainData"
            border
            height="500"
          ></Table> -->
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
                <td colspan="2" rowspan="2">教学大纲</td>
                <td>名称</td>
                <td colspan="3"></td>
                <td colspan="8" rowspan="6"></td>
              </tr>
              <tr>
                <td>编号</td>
                <td></td>
                <td>版次</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="2" rowspan="2">使用教材</td>
                <td>名称</td>
                <td colspan="3"></td>
              </tr>
              <tr>
                <td>版本</td>
                <td colspan="3"></td>
              </tr>
              <tr>
                <td colspan="2">主要参考资料</td>
                <td colspan="4"></td>
              </tr>
              <tr>
                <td colspan="2">参观见习安排</td>
                <td colspan="4"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="info_arrange" v-else-if="activeIndex === 2">
          <Table
            :columns="arrangeColumns"
            :data="arrangeData"
            border
            height="500"
          ></Table>
        </div>
      </div>
    </div>
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
        input: "",
        select: "",
      },

      explainColumns: [
        {
          title: "本课程总课时",
          key: "name",
          align: "center",
          width: 134,
        },
        {
          title: "已授课时",
          key: "name",
          align: "center",
          width: 134,
        },
        {
          title: "本学期",
          align: "center",
          children: [
            {
              title: "计划课时",
              key: "age",
              align: "center",
              width: 134,
            },
            {
              title: "实际教学周数",
              key: "age",
              align: "center",
              width: 134,
            },
            {
              title: "本课程周课数",
              key: "age",
              align: "center",
              width: 134,
            },
          ],
        },
        {
          title: "本学期课时分配",
          align: "center",
          children: [
            {
              title: "实际课时",
              key: "caddress",
              align: "center",
              width: 134,
            },
            {
              title: "其中",
              align: "center",
              children: [
                {
                  title: "讲授课",
                  key: "street",
                  align: "center",
                  width: 134,
                },
                {
                  title: "习题课",
                  key: "street",
                  align: "center",
                  width: 134,
                },
                {
                  title: "实验课",
                  key: "street",
                  align: "center",
                  width: 134,
                },
                {
                  title: "参观见习",
                  key: "street",
                  align: "center",
                  width: 134,
                },
                {
                  title: "考核",
                  key: "street",
                  align: "center",
                  width: 134,
                },
                {
                  title: "机动课时",
                  key: "street",
                  align: "center",
                  width: 134,
                },
              ],
            },
            {
              title: "余（缺）课时",
              key: "caddress",
              align: "center",
              width: 134,
            },
            {
              title: "余（缺）课时处理意见",
              key: "caddress",
              align: "center",
              width: 134,
            },
          ],
        },
      ],
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
          key: "name",
          align: "center",
          width: 134,
        },
        {
          title: "章节（课题）",
          key: "name",
          align: "center",
          width: 300,
        },
        {
          title: "主要内容",
          key: "name",
          align: "center",
          width: 497,
        },
        {
          title: "教学安排及学时分配",
          align: "center",
          children: [
            {
              title: "讲授课",
              key: "age",
              align: "center",
              width: 134,
            },
            {
              title: "习题课",
              key: "age",
              align: "center",
              width: 134,
            },
            {
              title: "实验课",
              key: "age",
              align: "center",
              width: 134,
            },
            {
              title: "参观见习",
              key: "age",
              align: "center",
              width: 134,
            },
            {
              title: "考核",
              key: "age",
              align: "center",
              width: 134,
            },
          ],
        },
        {
          title: "操作",
          key: "name",
          align: "center",
          width: 134,
        },
      ],
      arrangeData: [],
    };
  },
  methods: {
    changeBtn(index) {
      this.activeIndex = index;
    },
  },
};
</script>

<style scoped>
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
}
.info_explain,
.info_arrange {
  padding: 0 16px 16px;
  box-sizing: border-box;
}

.info_explain table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.info_explain td,
.info_explain th {
  border: 1px solid #999999;
}
</style>