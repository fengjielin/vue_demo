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
            filterable
            v-model="searchData.year"
            @change="search"
            style="width: 200px; margin-right: 24px"
          >
            <Option :value="item.id" :key="item.id" v-for="item in years">{{
              item.year
            }}</Option>
          </Select>

          <label>人才培养方案</label>
          <Select
            transfer
            filterable
            v-model="searchData.trainPlan"
            style="width: 200px"
          >
            <Option
              :value="item.id"
              :key="item.id"
              v-for="item in trainPlans"
              >{{ item.trainPlan }}</Option
            >
          </Select>
        </div>
      </div>
    </div>
    <div class="term_teach_plan_box">
      <div class="box_left">
        <Menu
          theme="light"
          :active-name="searchData.termId"
          @on-select="handleTerm"
        >
          <MenuGroup title="学期名称">
            <MenuItem :name="item.id" v-for="item in terms" :key="item.id">
              {{ item.termName }}
            </MenuItem>
          </MenuGroup>
        </Menu>
      </div>
      <div class="box_right">
        <div class="box_tabs">
          <Tabs :value="searchData.courseTypeId" @on-click="handleCourseType">
            <TabPane
              :label="item.typeName"
              :name="item.id + ''"
              v-for="item in courseType"
              :key="item.id"
            >
              <div class="tab_pane">
                <div
                  class="item_box"
                  v-for="(item, index) in course"
                  :key="index"
                >
                  <div class="item_img">
                    <img
                      src="../../assets/coures-default.jpg"
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <div class="item_desc">
                    <span class="desc_title">课程：</span>
                    <span class="desc_cont">{{ item.courseName }}</span>
                  </div>
                </div>
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
        year: "",
        trainPlan: "",
        termId: "",
        courseTypeId: "",
      },
      years: [],
      trainPlans: [],
      terms: [],
      courseType: [],
      course: [],
      userinfo: "",
    };
  },
  created() {
    this.getYear();
  },
  mounted() {
    // let state = JSON.parse(sessionStorage.state);
    // this.userinfo = state.sysLogin;
    // this.getBaseYear();
  },
  watch: {
    year(val) {
      this.getTrainPlanByYear();
      this.getTermByYear();
    },
  },
  computed: {
    year() {
      return this.searchData.year;
    },
  },
  methods: {
    search() {},

    handleTerm(name) {
      this.searchData.termId = name;
      this.getCourseByYearAndTrainPlanAndTermAndCourseType();
    },

    handleCourseType(name) {
      this.searchData.courseTypeId = name;
      this.getCourseByYearAndTrainPlanAndTermAndCourseType();
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

    // 获取年度
    getYear() {
      let data = {};
      let callback = (res) => {
        if (res.state) {
          this.years = res.data;
          this.searchData.year = res.data[0].id;
        }
      };
      this.MockRequest("/teachPlan/years", data, callback);
    },

    //根据年度获取人才培养方案
    getTrainPlanByYear() {
      let data = {
        year: this.searchData.year,
      };
      let callback = (res) => {
        console.log(res);
        if (res.state) {
          this.trainPlans = res.data;
          this.searchData.trainPlan = res.data[0].id;
        }
      };
      this.MockRequest("/teachPlan/trainPlan", data, callback);
    },

    // 根据年度获取学期
    getTermByYear() {
      let data = {};
      let callback = (res) => {
        // console.log(res);
        if (res.state) {
          this.terms = res.data;
          this.$nextTick(function () {
            this.searchData.termId = res.data[0].id;
          });
          this.getCourseType();
        }
      };
      this.MockRequest("/teachPlan/term", data, callback);
    },

    // 获取课程类别
    getCourseType() {
      let data = {};
      let callback = (res) => {
        // console.log(res);
        if (res.state) {
          this.courseType = res.data;
          this.$nextTick(function () {
            this.searchData.courseTypeId = res.data[0].id + "";
          });
          this.getCourseByYearAndTrainPlanAndTermAndCourseType();
        }
      };
      this.MockRequest("/teachPlan/types", data, callback);
    },

    // 根据年度和人才培养方案和学期和课程类别来获取课程
    getCourseByYearAndTrainPlanAndTermAndCourseType() {
      let data = {
        year: this.searchData.year,
        trainPlan: this.searchData.trainPlan,
        term: this.searchData.termId,
        courseType: "",
      };
      let callback = (res) => {
        console.log(res);
        if (res.state) {
          this.course = res.data;
        }
      };
      this.MockRequest(
        "/teachPlan/getCourseByYearAndTrainPlanAndTerm",
        data,
        callback
      );
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
  box-sizing: border-box;
  padding-bottom: 16px;
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
  width: 20px;
  background-color: #fff;
}

.term_teach_plan .tab_pane {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.term_teach_plan .item_box {
  width: 280px;
  height: 199px;
  margin: 0 16px 16px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.item_box .item_img {
  width: 100%;
  height: 144px;
  background-color: aqua;
}

.item_box .item_desc {
  width: 100%;
  height: 56px;
  padding: 0 12px;
  line-height: 56px;
  text-align: left;
}

.desc_title,
.desc_cont {
  font-size: 14px;
}
.desc_title {
  color: #999999;
}
.desc_cont {
  color: #333333;
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
