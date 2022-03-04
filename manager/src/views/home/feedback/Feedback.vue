<template>
  <div class="container">
    <div class="title">用户反馈</div>
    <el-divider></el-divider>

    <!-- 分类栏 -->
    <div class="tab-box">
      <el-select v-model="selected.kind" placeholder="Select" size="default" class="tab-select">
        <el-option
          v-for="item in kindOptions"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-select v-model="selected.read" placeholder="Select" size="default">
        <el-option
          v-for="item in readOptions"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <div class="tab-buttons">
          <el-button type="primary" @click="clickSearch">搜索</el-button>
          <el-button type="info" @click="clickRefresh">重置</el-button>
      </div>
    </div>

    <!-- 列表 -->
    <div class="table-box">

      <el-table :data="list" stripe style="width: 100%" border>
        <el-table-column type="expand">
          <template #default="props">
            <div class="table-expand-content">
              <div class="table-expand-title">反馈内容：</div>
              <div>{{props.row.content}}</div>
            </div>
            <div class="table-expand-image" v-if="props.row.picture.length > 0">
              <div class="table-expand-title">图片：</div>
              <template v-for="src in props.row.picture" v-bind:key="src">
                <el-image
                  class="table-expand-image-item"
                  :src="src"
                  :preview-src-list="props.row.picture"
                  fit="cover"
                ></el-image>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="has_read_str" label="状态" width="80" />
        <el-table-column prop="kind_str" label="反馈类型" width="100" />
        <el-table-column prop="content" label="反馈内容" header-align="center" />
        <el-table-column prop="user_nickname" label="反馈用户" width="150"></el-table-column>
        <el-table-column prop="time" label="反馈时间" width="170" header-align="center" />
        <el-table-column label="操作" width="120" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" @click="clickRead(scope.$index)" :disabled="this.list[scope.$index].has_read">已读</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script scope>
const mock = require('../../../utils/mock-data/feedback')
const StaticKindOptions = [{
  id: -1,
  value: '全部',
}, {
  id: 0,
  value: '产品建议',
}, {
  id: 1,
  value: '功能异常',
}, {
  id: 2,
  value: '违规举报',
}, {
  id: 3,
  value: '交易投诉'
}]
const StaticReadOptions = [{
  id: -1,
  value: '全部',
}, {
  id: 0,
  value: '未读',
}, {
  id: 1,
  value: '已读',
}]
// 反馈类型：-1全部，0产品建议，1功能异常，2违规举报，3交易投诉
const KindStr = (kind) => {
  switch (kind) {
    case 0: return '产品建议'
    case 1: return '功能异常'
    case 2: return '违规举报'
    case 3: return '交易投诉'
    default: return 'Unknown'
  }
}

export default {
    name: 'Feedback',
    components: {},
    data() {
      return {
        selected: {
          kind: -1,
          read: -1,
          index: 0,
        },
        kindOptions: StaticKindOptions,
        readOptions: StaticReadOptions,
        list: [],
        req: {
          limit: 20,
          page: 0,
        },
        selectedIdx: 0,
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let req = {
          limit: this.req.limit,
          page: this.req.page,
          kind: this.selected.kind,
          read: this.selected.read,
        }
        console.info('feedback getList req:', req)
        // todo
        // ...

        let items = mock.feedbackList
        let list = new Array
        for (let i in items) {
          let item = items[i]
          list.push({
            id: item.id,
            content: item.content,
            has_read: item.has_read,
            time: item.time,
            kind: item.kind,
            picture: item.picture,
            user_nickname: item.user_nickname,
            user_avatar: item.user_avatar,
            kind_str: KindStr(item.kind),
            has_read_str: item.has_read ? '已读' : '未读',
          })
        }
        this.list = list
      },
      // 点击已读
      clickRead(index) {
        let item = this.list[index]
        if (item.has_read) {
          return
        }
        let req = {
          data: [item.id]
        }
        console.info('-- clickRead:', req)

        // todo
        // ...

        item.has_read = true
        item.has_read_str = '已读'
        this.list[index] = item
      },
      clickSearch() {
        this.getList()
      },
      clickRefresh() {
        this.selected.kind = -1
        this.selected.read = -1
        this.getList()
      },
    }
}
</script>

<style scoped>
.title {
  color: #000;
  padding-top: 20px;
  padding-left: 20px;
}

.tab-box {
  margin: 20px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.tab-select {
  margin: 0 20px;
}

.tab-buttons {
  margin-left: 80px;
}

.table-box {
  margin: 10px 20px;
}

.table-expand-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.table-expand-content {
  margin: 10px 10px;
}

.table-expand-image {
  margin: 10px 10px;
}

.table-expand-image-item {
  height: 120px;
  widows: 100px;
  margin: 5px 10px;
}

.detailWin-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 20px 10px;
}


</style>