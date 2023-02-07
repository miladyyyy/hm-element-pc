<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 {{ this.total }} 条记录</span>
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
            @click="showDrawer('add')"
          >
            添加面经
          </el-button>
        </div>
      </template>
      <template>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="stem" label="标题" width="400">
          </el-table-column>
          <el-table-column prop="creator" label="作者"> </el-table-column>
          <el-table-column prop="likeCount" label="点赞"> </el-table-column>
          <el-table-column prop="views" label="浏览数"> </el-table-column>
          <el-table-column prop="createdAt" label="更新时间" width="200">
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template #default>
              <el-button
                type="primary"
                icon="el-icon-view"
                size="small"
                circle
                @click="showDrawer('preview')"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit-outline"
                size="small"
                circle
                @click="showDrawer('edit')"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        background
        :current-page="current"
        :page-size="pageSize"
        :total="total"
        @current-change="changePage"
      >
      </el-pagination>
    </el-card>
    <el-drawer :title="drawerTitle" :visible.sync="drawer" size="50%">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'

export default {
  name: 'article-page',
  data() {
    return {
      tableData: [],
      current: 1,
      pageSize: 10,
      total: 0,
      drawer: false,
      drawerType: '',
    }
  },

  computed: {
    drawerTitle() {
      switch (this.drawerType) {
        case 'add':
          return '添加面经'
        case 'preview':
          return '预览'
        case 'edit':
          return '编辑'
        default:
          return '面经'
      }
    },
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const { data } = await getArticleList({
        current: this.current,
        pageSize: this.pageSize,
      })
      this.tableData = data.rows
      this.total = data.total
    },

    changePage(page) {
      this.current = page
      this.initData()
    },

    showDrawer(type) {
      this.drawer = true
      this.drawerType = type
    },
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
