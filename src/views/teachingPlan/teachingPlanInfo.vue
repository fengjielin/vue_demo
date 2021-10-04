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
        <div class="info_form">
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
</style>