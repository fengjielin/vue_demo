<template>
  <div class="term_teach_plan">
    <div class="breadcrumb">
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
    <div class="term_teach_plan_header">
      <div class="header_handle">
        <div class="year">
          <Icon
            type="ios-bookmark"
            style="color: #5784ff; margin-right: 12px"
          />
          <label>年度</label>
          <Select
            transfer
            placeholder="请选择年度"
            filterable
            v-model="searchData.year"
            style="width: 200px; margin-right: 24px"
          >
            <Option value="-1">全部</Option>
            <Option
              :value="year.paramCd"
              :key="year.paramCd"
              v-for="year in years"
              >{{ year.paramDesc }}</Option
            >
          </Select>

          <label>人工培养方案</label>
          <Select
            transfer
            placeholder="请选择年度"
            filterable
            v-model="searchData.year"
            style="width: 200px"
          >
            <Option
              :value="year.paramCd"
              :key="year.paramCd"
              v-for="year in years"
              >{{ year.paramDesc }}</Option
            >
          </Select>
        </div>
      </div>
    </div>
    <div class="term_teach_plan_box">
      <div class="box_left">
        <Menu theme="light" :active-name="activeName">
          <MenuGroup title="学期名称">
            <MenuItem
              :name="index"
              v-for="(item, index) in terms"
              :key="item.id"
            >
              {{ item.termName }}
            </MenuItem>
          </MenuGroup>
        </Menu>
      </div>
      <div class="box_right">
        <div class="box_tabs">
          <Tabs :value="activeTabs">
            <TabPane
              :label="item.typeName"
              :name="index + ''"
              v-for="(item, index) in courseType"
              :key="index"
            >
              <div class="tab_pane">
                <div
                  class="item_box"
                  v-for="(item, index) in 20"
                  :key="index"
                ></div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: {
        year: "-1",
      },
      activeName: "0",
      activeTabs: "0",
      years: [],
      terms: [],
      courseType: [],
      userinfo: "",
    };
  },
  created() {
    this.getTermByYear();
    this.getCourseType();
  },
  mounted() {
    // let state = JSON.parse(sessionStorage.state);
    // this.userinfo = state.sysLogin;
    // this.getBaseYear();
  },
  methods: {
    //根据年度查询培养方案
    searchTrainPlan() {
      this.page.pageNum = 1;
    },

    //获取年度
    getBaseYear() {
      let data = {
        paramType: "DM_Year_Type",
      };
      let callback = (res) => {
        if (res.state) {
          this.years = res.sysParamDicts;
        } else {
          this.$Message.error(res.message);
        }
      };
      this.dealRequest("param/getParamsByParamType", data, callback);
    },

    // 根据年度获取学期
    getTermByYear() {
      let data = {};
      let callback = (res) => {
        console.log(res);
        this.terms = res.data;
        this.$nextTick(function () {
          this.activeName = 0;
        });
      };
      this.MockRequest("/teachPlan/term", data, callback);
    },

    // 获取课程类别
    getCourseType() {
      let data = {};
      let callback = (res) => {
        console.log(res);
        this.courseType = res.data;
        this.$nextTick(function () {
          this.activeTabs = "0";
        });
      };
      this.MockRequest("/teachPlan/types", data, callback);
    },

    // 处理请求
    dealRequest(url, data, callback) {
      let that = this;
      this.axios
        .post(this.interfaceUrl + url, this.qs(data))
        .then(function (res) {
          if (res.data.state) {
            callback(res.data);
          } else {
            console.error(res.data);
            that.$Message.error(res.data.msg);
          }
        })
        .catch(function (err) {
          console.error(err);
          that.$Message.error(err.message);
        });
    },

    // Mock 处理请求
    MockRequest(url, data, callback) {
      let that = this;
      let baseUrl =
        "https://www.fastmock.site/mock/91e3cccd3b8c8f292d58da9cb27c7b1a/jielin";
      this.axios
        .post(baseUrl + url, this.qs(data))
        .then(function (res) {
          if (res.data.state) {
            callback(res.data);
          } else {
            console.error(res.data);
            // that.$Message.error(res.data.msg);
          }
        })
        .catch(function (err) {
          console.error(err);
          // that.$Message.error(err.message);
        });
    },
  },
};
</script>

<style>
.term_teach_plan .breadcrumb {
  display: flex;
}
.term_teach_plan_header {
  width: 100%;
  background-color: #fff;
  height: 52px;
  padding: 0 16px 0;
  box-sizing: border-box;
  margin-top: 14px;
}
.term_teach_plan .header_handle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.term_teach_plan .header_handle .year label {
  margin-right: 10px;
}
.term_teach_plan .term_teach_plan_box {
  margin-top: 16px;
  /* background-color: #fff; */
  box-sizing: border-box;
  padding-bottom: 16px;
  /* height: 700px; */
  display: flex;
  justify-content: space-between;
}

.term_teach_plan .box_left {
  width: 300px;
  height: 700px;
  margin-right: 16px;
  background-color: #fff;
}

.term_teach_plan .box_right {
  flex: 1;
  width: 120px;
  background-color: #fff;
  overflow: hidden;
}

.term_teach_plan .box_tabs {
  height: 52px;
}
.term_teach_plan .tab_pane {
  padding: 16px;
  box-sizing: border-box;
  /* overflow: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; */
  /* display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-template-rows: repeat(auto-fill, 169px);
  grid-column-gap: 32px;
  grid-row-gap: 16px; */
}
.term_teach_plan .item_box {
  width: 280px;
  height: 169px;
  background-color: aqua;
  margin-bottom: 16px;
  cursor: pointer;
}

.term_teach_plan .formInput {
  width: 240px;
}

.term_teach_plan .ivu-menu-item-group-title {
  background-color: #5784ff !important;
  color: #fff !important;
}

.term_teach_plan .ivu-tabs-tab {
  height: 52px;
  line-height: 36px;
}
</style>
