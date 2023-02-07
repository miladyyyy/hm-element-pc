<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never">
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
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
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="stem" label="标题" width="400">
          </el-table-column>
          <el-table-column prop="creator" label="作者" width="300">
            <template #default="{ row }">
              <el-avatar :src="row.avatar" size="small" /> {{ row.creator }}
            </template>
          </el-table-column>
          <el-table-column prop="likeCount" label="点赞"> </el-table-column>
          <el-table-column prop="views" label="浏览数"> </el-table-column>
          <el-table-column prop="createdAt" label="更新时间" width="200">
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template #default="{ row }">
              <el-button
                type="primary"
                icon="el-icon-view"
                size="small"
                circle
                @click="showDrawer('preview', row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit-outline"
                size="small"
                circle
                @click="showDrawer('edit', row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                circle
                @click="handleRemove(row.id)"
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
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawer"
      size="50%"
      @close="handleClose"
    >
      <div v-if="drawerType === 'preview'" class="article-preview">
        <h5>{{ form.stem }}</h5>
        <div v-html="form.content"></div>
      </div>
      <el-form
        v-else
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="标题" prop="stem">
          <el-input placeholder="请输入面经标题" v-model="form.stem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quillEditor
            v-model="form.content"
            @blur="$refs.form.validateField('content')"
          ></quillEditor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit(form)">确认</el-button>
          <el-button @click="handleCancer">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import {
  getArticleList,
  createArticle,
  removeArticle,
  updateArticleDetail,
} from '@/api/article'

export default {
  name: 'article-page',
  components: { quillEditor },
  data() {
    return {
      tableData: [],
      current: 1,
      pageSize: 10,
      total: 0,
      drawer: false,
      drawerType: '',
      currentId: '',
      loading: false,

      form: {
        stem: '',
        content: '',
      },
      rules: {
        stem: [{ required: true, message: '请输入面经标题', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入面经标题', trigger: 'blur' },
        ],
      },
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
      try {
        this.loading = true
        const { data } = await getArticleList({
          current: this.current,
          pageSize: this.pageSize,
        })
        this.loading = false
        this.tableData = data.rows
        this.total = data.total
      } catch (error) {
        this.loading = false
      }
    },

    changePage(page) {
      this.current = page
      this.initData()
    },

    showDrawer(type, row) {
      this.drawer = true
      this.drawerType = type
      if (type !== 'add') {
        this.form.stem = row.stem
        this.form.content = row.content
        this.currentId = row.id
      }
    },

    async handleSubmit(form) {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        else {
          switch (this.drawerType) {
            case 'add':
              await this.$refs.form.validate()
              await createArticle(form)
              this.$message.success('添加成功')
              this.$refs.form.resetFields()
              this.current = 1
              this.initData()
              this.drawer = false
              // this.handleClose()
              break
            case 'edit':
              await updateArticleDetail({
                id: this.currentId,
                stem: this.form.stem,
                content: this.form.content,
              })
              this.$refs.form.resetFields()
              this.drawer = false
              this.initData()
              this.$message.success('编辑成功')
              break
          }
        }
      })
    },
    handleCancer() {
      this.$refs.form.resetFields()
      this.drawer = false
      this.currentId = ''
    },
    handleClose() {
      this.currentId = ''
      this.form.content = ''
      this.form.stem = ''
    },
    async handleRemove(id) {
      try {
        await this.$confirm('确认删除吗？')
        await removeArticle({ id })
        this.initData()
        this.$message.success('删除成功')
      } catch (error) {}
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
::v-deep .cell {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  .el-avatar {
    margin-right: 8px;
  }
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
