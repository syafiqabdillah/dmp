<template>
  <div class="bookings">
    <!-- Header -->
    <section class="header">
      <h2>Booked Tasks</h2>
      <b-button @click="showModalAdd" variant="success">
        <i class="icofont-plus mr-2"></i>Add
      </b-button>
      <b-modal
        centered
        ref="modal-add"
        title="Form Add Booking"
        ok-title="Book This Task"
        @ok.prevent="submitBook"
      >
        <b-form-group label="Choose A Task">
          <b-form-select
            v-model="form.task_id"
            :options="tasks"
          ></b-form-select>
        </b-form-group>
      </b-modal>
    </section>
    <!-- Booked Tasks -->
    <section class="tasks">
      <b-card>
        <b-table
          v-if="itemsLoaded"
          responsive
          show-empty
          :items="items"
          :fields="fields"
        >
          <template #cell(booking_date)="rows">
            {{ new Date(rows.item.booking_date).toLocaleString() }}
          </template>
          <template #cell(action)="rows">
            <div class="float-right">
              <b-button
                variant="primary"
                size="sm"
                @click="download(rows.item)"
              >
                <i class="icofont-download mr-1"></i>download
              </b-button>
              <b-button variant="danger" size="sm" @click="revoke(rows.item)">
                <i class="icofont-trash mr-1"></i>revoke
              </b-button>
            </div>
          </template>
        </b-table>
        <div v-else>Loading...</div>
      </b-card>
    </section>
    <Loading :visible="modalLoading.visible" :message="modalLoading.message" />
    <b-modal
      ref="modal-revoke"
      ok-title="Yes, Revoke"
      @ok.prevent="submitRevoke"
      title="Revoke Booking"
      centered
    >
      <div class="text-center">
        Are you sure that you want to revoke booking of task
        <b>{{ selectedBooking ? selectedBooking.dataset_name : '' }}</b
        >?. You'll lose access to this dataset.
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Bookings',
  data() {
    return {
      tasks: [],
      tasksloaded: false,
      items: [],
      itemsLoaded: false,
      fields: [
        'dataset_name',
        'booking_date',
        {
          label: '',
          key: 'action',
        },
      ],
      form: {
        task_id: null,
      },
      modalLoading: {
        visible: false,
        message: null,
      },
      selectedBooking: null,
    }
  },
  mounted() {
    this.loadTasks()
    this.loadBookings()
  },
  methods: {
    download(item) {
      var link = document.createElement('a')
      link.download = item.dataset_name
      link.href = item.dataset_url
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    revoke(item) {
      this.showModalRevoke(item)
    },
    submitRevoke() {
      this.modalLoading.message = `Revoking booking of ${this.selectedBooking.dataset_name}`
      this.modalLoading.visible = true
      this.$axios
        .post(`${process.env.baseAPI}/booking/revoke`, {
          booking_id: this.selectedBooking.id,
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.modalLoading.visible = false
          this.modalLoading.message = null
          this.$refs['modal-revoke'].hide()
          this.loadBookings()
          this.loadTasks()
        })
    },
    showModalAdd() {
      this.$refs['modal-add'].show()
    },
    submitBook() {
      if (this.form.task_id) {
        this.modalLoading.message = 'Booking the task'
        this.modalLoading.visible = true
        const created_by = this.$getJwtData().username
        const data = {
          task_id: this.form.task_id,
          created_by: created_by,
        }
        console.log(data)
        this.$axios
          .post(`${process.env.baseAPI}/booking`, data)
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.modalLoading.visible = false
            this.modalLoading.message = null
            this.$refs['modal-add'].hide()
            this.clearForm()
            this.loadBookings()
            this.loadTasks()
          })
      } else {
        alert('Fill the form')
      }
    },
    showModalRevoke(item) {
      this.selectedBooking = item
      this.$refs['modal-revoke'].show()
    },
    clearForm() {
      this.form.task_id = null
    },
    loadTasks() {
      this.tasks = []
      this.tasksloaded = false
      this.$axios
        .get(`${process.env.baseAPI}/task/available`)
        .then((res) => {
          this.tasks = res.data.map((task) => {
            return {
              value: task.id,
              text: task.dataset_name,
            }
          })
        })
        .catch((err) => {
          alert(err)
        })
        .finally(() => {
          this.tasksloaded = true
        })
    },
    loadBookings() {
      this.items = []
      this.itemsLoaded = false
      this.$axios
        .get(`${process.env.baseAPI}/booking/by-user`, {
          params: {
            username: this.$getJwtData().username,
          },
        })
        .then((res) => {
          this.items = res.data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.itemsLoaded = true
        })
    },
  },
}
</script>

<style scoped>
.bookings {
  margin: 1em;
}
.header {
  display: flex;
  justify-content: space-between;
  margin: 2em 0;
}
@media (min-width: 480px) {
  .bookings {
    margin: 5em;
  }
}
</style>
