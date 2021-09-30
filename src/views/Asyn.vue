<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      a: "",
      b: "",
    };
  },
  created() {
    this.request();
    this.request2();
  },
  methods: {
    async request() {
      const res1 = await this.$get("comments");
      // console.log(res1);

      const res2 = await this.$get("posts");
      // console.log(res2);

      let that = this;
      this.$get("comments").then((res) => {
        // console.log(res);
      });

      this.$get("posts").then((res) => {
        console.log(res);
        that.a = res;
      });

      let data = { title: "foo", body: "bar", userId: 1 };
      const res3 = await this.$post("posts", this.$qs.stringify(data));
      // console.log(res3);
    },
    request2() {
      this.b = this.a.data;
    },
  },
};
</script>

<style>
</style>