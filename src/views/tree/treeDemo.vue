<template>
  <div class="container">
    <div class="box_left">
      <Menu theme="light" :active-name="activeName" style="position: relative">
        <MenuGroup title="课程目录" class="menu">
          <div
            class="add-area"
            style="position: absolute; right: 8px; top: 8px; border: none"
          >
            <div class="add-area-icon">
              <Tooltip content="新增父级" placement="bottom">
                <Icon type="ios-add-circle" color="#2d8cf0"></Icon>
              </Tooltip>
            </div>
            <div class="add-area-icon">
              <Tooltip content="新增子级" placement="bottom">
                <Icon type="ios-list" color="#2d8cf0"></Icon>
              </Tooltip>
            </div>
            <div class="add-area-icon">
              <Tooltip content="编辑目录" placement="bottom">
                <Icon type="ios-create-outline" color="#2d8cf0"></Icon>
              </Tooltip>
            </div>
            <div class="add-area-icon">
              <Tooltip content="应用至公共" placement="bottom">
                <Icon type="md-paper-plane" color="#2d8cf0"></Icon>
              </Tooltip>
            </div>
            <div class="add-area-icon">
              <Tooltip content="删除" placement="bottom">
                <Icon type="ios-trash" color="#F1524D"></Icon>
              </Tooltip>
            </div>
          </div>
          <Tree
            class="demo-tree-render"
            :data="treeData"
            :render="renderContent"
          ></Tree>
        </MenuGroup>
      </Menu>
    </div>
    <div class="box_right"></div>
  </div>
</template>

<script>
import treeData from "../../mock/treeData.json";
export default {
  data() {
    return {
      treeData,
      activeName: "0",
      buttonProps: {
        type: "default",
        size: "small",
      },
      editZoneDisplayBoolean: false,
      beforeSubmitNodeTitleString: "",
      edit_root: null,
      edit_node: null,
      edit_data: null,
    };
  },
  created() {
    this.parseTreeJson(this.treeData);
  },
  mounted() {
    console.log(this.treeData);
  },
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          attrs: {
            class: "mouse_on",
          },
          style: {
            display: "inline-block",
            width: "100%",
            position: "relative",
            height: "24px",
          },
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: "ios-paper-outline",
              },
              style: {
                marginRight: "8px",
              },
            }),
            h(
              "Tooltip",
              {
                props: {
                  content: data.chapterName,
                  theme: "light",
                  placement: "top-start",
                  transfer: true,
                },
              },
              [h("span", data.chapterName)]
            ),
          ]),
          h(
            "span",
            {
              attrs: {
                class: "mouse_hover",
              },
              style: {
                display: "none",
                position: "absolute",
                top: "0px",
                right: "10px",
              },
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-add",
                }),
                style: {
                  marginRight: "8px",
                },
                on: {
                  click: () => {
                    this.append(data);
                  },
                },
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-remove",
                }),
                style: {
                  marginRight: "8px",
                },
                on: {
                  click: () => {
                    this.remove(root, node, data);
                  },
                },
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-create",
                }),
                style: {
                  marginRight: "8px",
                },
                on: {
                  click: () => {
                    this.openEditName(root, node, data);
                  },
                },
              }),
            ]
          ),
        ]
      );
    },

    append(data) {
      const children = data.children || [];
      children.push({
        title: "appended node",
        expand: true,
      });
      this.$set(data, "children", children);
    },
    remove(root, node, data) {
      const parentKey = root.find((el) => el === node).parent;
      const parent = root.find((el) => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },
    openEditName(root, node, data) {
      this.editZoneDisplayBoolean = true;
      this.edit_root = root;
      this.edit_node = node;
      this.edit_data = data;
      this.beforeSubmitNodeTitleString = this.edit_node.node.chapterName;
    },
    // https://www.cnblogs.com/foxcharon/p/10389098.html
    parseTreeJson(treeNodes) {
      if (!treeNodes || !treeNodes.length) return;
      for (let i = 0; i < treeNodes.length; i++) {
        let childs = treeNodes[i].children;
        treeNodes[i]._showChildren = true;
        treeNodes[i].expand = true;
        if (childs && childs.length > 0) {
          this.parseTreeJson(childs);
        }
      }
    },
  },
};
</script>

<style>
.container {
  box-sizing: border-box;
  padding-bottom: 16px;
  display: flex;
  justify-content: space-between;
}
.box_left {
  width: 300px;
  height: 700px;
  margin-right: 16px;
  background-color: #fff;
  border: 1px solid #cccccc;
}

.box_right {
  flex: 1;
  width: 20px;
  background-color: #fff;
  border-bottom: 1px solid #cccccc;
  overflow: hidden;
}

.menu > ul {
  overflow: auto;
  max-height: 650px;
  padding: 0 9px !important;
}

.add-area {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  box-sizing: border-box;
  padding: 5px;
}

.add-area-icon {
  cursor: pointer;
  font-size: 20px;
}

.add-area-icon > div {
  margin-right: 10px;
}

.ivu-menu-item-group-title {
  border: 1px solid #dddee1;
  background: #f5f5f5;
  height: 52px;
}

.mouse_on:hover .mouse_hover {
  display: inline-block !important;
}

.demo-tree-render .ivu-tree-title {
  width: 100%;
}

/*修改滚动条样式*/
.menu > ul::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  /**/
}
.menu > ul::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
.menu > ul::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
.menu > ul::-webkit-scrollbar-thumb:hover {
  background: #333;
}
.menu > ul::-webkit-scrollbar-corner {
  background: #179a16;
}

/* ::-webkit-scrollbar 滚动条整体部分
::-webkit-scrollbar-thumb  滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
::-webkit-scrollbar-track  滚动条的轨道（里面装有Thumb）
::-webkit-scrollbar-button 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）
::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处
::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件 */
</style>