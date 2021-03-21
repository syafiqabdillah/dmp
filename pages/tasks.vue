<template>
  <div class="dataset">
    <!-- Page Name -->
    <section class="header">
      <h2>Tasks</h2>
      <b-button @click="showModalAdd" size="sm" variant="success">
        <i class="icofont-plus mr-2"></i>Add
      </b-button>
      <b-modal
        @ok.prevent="submitAdd"
        centered
        ref="modal-add"
        title="Form Add Dataset"
        ok-title="Submit"
      >
        <b-form-group label="Dataset Name">
          <b-form-input v-model="form.name"></b-form-input>
        </b-form-group>
        <b-form-group label="Dataset File" description="accepted format: .zip">
          <b-form-file accept=".zip" v-model="form.file"></b-form-file>
        </b-form-group>
      </b-modal>
    </section>
    <!-- Content -->
    <section class="dataset-list">
      <b-card>
        <div v-if="!tasksLoaded">Loading...</div>
        <b-table
          show-empty
          responsive
          v-else
          :items="computedItems"
          :fields="computedFields"
        >
          <template #cell(dataset_url)="rows">
            {{ rows.item.dataset_url.split('/').pop() }}
          </template>
          <template #cell(created_date)="rows">
            {{ new Date(rows.item.created_date).toLocaleString() }}
          </template>
          <template #cell(deleted_date)="rows">
            {{
              rows.item.deleted_date
                ? new Date(rows.item.deleted_date).toLocaleString()
                : ''
            }}
          </template>
          <template #cell(action)="rows">
            <i
              class="icofont-trash clickable"
              @click="confirmDelete(rows.item)"
            ></i>
          </template>
        </b-table>
      </b-card>
      <b-form-checkbox
        class="float-right mt-2"
        v-model="showDeletedTasks"
        :value="true"
        :unchecked-value="false"
      >
        show deleted tasks
      </b-form-checkbox>
    </section>
    <Loading :visible="modalLoading.visible" :message="modalLoading.message" />
    <!-- Modal Delete -->
    <b-modal
      centered
      title="Delete Dataset"
      ref="modal-delete"
      ok-title="Yes, Delete"
      @ok.prevent="submitDelete"
    >
      <div class="text-center" v-if="selectedTask">
        Are you sure that you want to delete dataset
        <b> {{ selectedTask.dataset_name }}</b
        >?
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Task',
  data() {
    return {
      form: {
        file: null,
        name: null,
        dataset_url: null,
      },
      tasks: [],
      fields: [
        {
          label: 'Name',
          key: 'dataset_name',
        },
        'created_by',
        'created_date',
        {
          label: '',
          key: 'action',
        },
      ],
      tasksLoaded: false,
      modalLoading: {
        visible: false,
        message: 'Uploading Dataset',
      },
      selectedTask: null,
      showDeletedTasks: false,
    }
  },
  mounted() {
    this.loadDatasets()
  },
  methods: {
    download(item) {
      console.log(`download ${item.dataset_url}`)
    },
    loadDatasets() {
      this.tasks = []
      this.tasksLoaded = false
      this.$axios
        .get(`${process.env.baseAPI}/task`)
        .then((res) => {
          this.tasks = res.data
        })
        .catch((err) => {
          alert(err)
        })
        .finally(() => {
          this.tasksLoaded = true
        })
    },
    confirmDelete(item) {
      console.log(`delete ${item.id}`)
      this.selectedTask = item
      this.$refs['modal-delete'].show()
    },
    submitDelete() {
      this.modalLoading.message = `Deleting ${this.selectedTask.dataset_name}`
      this.modalLoading.visible = true
      const deleted_by = this.$getJwtData().username
      this.$axios
        .post(`${process.env.baseAPI}/task/delete`, {
          id: this.selectedTask.id,
          deleted_by: deleted_by,
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.modalLoading.visible = false
          this.$refs['modal-delete'].hide()
          this.loadDatasets()
        })
    },
    showModalAdd() {
      this.$refs['modal-add'].show()
    },
    hideModalAdd() {
      this.$refs['modal-add'].hide()
    },
    submitAdd() {
      if (this.form.file && this.form.name) {
        if (this.formatFileValid) {
          this.uploadFile()
        } else {
          alert("File format isn't supported")
        }
      } else {
        alert('Fill the form')
      }
    },
    uploadFile() {
      this.modalLoading.message = `Uploading Dataset`
      this.modalLoading.visible = true
      const file = this.form.file
      const metadata = file.type
      const storage = this.$firebase.storage()
      const filename = `${new Date().getTime()}-${file.name}`
      const fileref = storage.ref(`datasets/${filename}`)
      const uploadTask = fileref
        .put(file, metadata)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL().then((url) => {
            return url
          })
        })
        .catch((err) => {
          console.log('Error uploading file', err)
        })
      uploadTask.then((url) => {
        const created_by = this.$getJwtData().username
        this.$axios
          .post(`${process.env.baseAPI}/task`, {
            dataset_url: url,
            dataset_name: this.form.name,
            created_by: created_by,
          })
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.modalLoading.visible = false
            this.hideModalAdd()
            this.loadDatasets()
            this.clearForm()
          })
      })
    },
    clearForm() {
      this.form.file = null
      this.form.name = null
    },
  },
  computed: {
    formatFileValid() {
      return this.form.file.name.split('.').pop() == 'zip'
    },
    computedItems() {
      if (this.showDeletedTasks) {
        return this.tasks
      } else {
        return this.tasks.filter((task) => {
          return task.deleted_date == null
        })
      }
    },
    computedFields() {
      if (this.showDeletedTasks) {
        return [
          'dataset_name',
          'created_by',
          'created_date',
          'deleted_by',
          'deleted_date',
          {
            label: '',
            key: 'action',
          },
        ]
      } else {
        return [
          'dataset_name',
          'created_by',
          'created_date',
          {
            label: '',
            key: 'action',
          },
        ]
      }
    },
  },
}
</script>

<style scoped>
.dataset {
  margin: 1em;
}
.header {
  display: flex;
  justify-content: space-between;
  margin: 2em 0;
}
@media (min-width: 480px) {
  .dataset {
    margin: 5em;
  }
}
</style>
