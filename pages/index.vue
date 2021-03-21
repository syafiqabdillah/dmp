<template>
  <div class="dashboard">
    <!-- Welcome -->
    <section class="welcome">
      <h6>Welcome, {{ username }}</h6>
    </section>
    <!-- Summary -->
    <section class="summary">
      <h2>Summary</h2>
      <div class="items">
        <div class="card tasks" @click="toPage('/tasks')">
          <h5 v-if="tasksLoaded">{{ tasks.length }} Tasks Total</h5>
          <h5 v-else>Loading...</h5>
        </div>
        <div class="card bookings" @click="toPage('/booking')">
          <h5 v-if="bookingsLoaded">{{ bookingsCount }} Bookings Total</h5>
          <h5 v-else>Loading...</h5>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      tasks: [],
      tasksLoaded: false,
      bookingsCount: 0,
      bookingsLoaded: false,
    }
  },
  mounted() {
    this.loadTasks()
    this.loadBookings()
  },
  methods: {
    toPage(path) {
      this.$router.push(path)
    },
    loadTasks() {
      this.tasks = []
      this.tasksLoaded = false
      this.$axios
        .get(`${process.env.baseAPI}/task`)
        .then((res) => {
          this.tasks = res.data
        })
        .finally(() => {
          this.tasksLoaded = true
        })
    },
    loadBookings() {
      this.bookingsCount = 0
      this.bookingsLoaded = false
      this.$axios
        .get(`${process.env.baseAPI}/booking/count`)
        .then((res) => {
          this.bookingsCount = res.data
        })
        .finally(() => {
          this.bookingsLoaded = true
        })
    },
  },
  computed: {
    username() {
      return this.$getJwtData().username
    },
  },
}
</script>

<style scoped>
.dashboard {
  margin: 1em;
}
section {
  margin-top: 3em;
}
.items {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.items .card {
  flex: 1;
  min-height: 10em;
  display: flex;
  text-align: right;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  color: white;
  padding: 1em;
}
.items .card h5 {
  font-weight: 700;
  letter-spacing: 1px;
}
.items .card:hover {
  text-decoration: underline;
  cursor: pointer;
}
.tasks {
  background: #a31428;
}
.bookings {
  background: #ef7534;
}
@media (min-width: 480px) {
  .dashboard {
    margin: 5em;
  }
  .items {
    flex-direction: row;
    gap: 2em;
    justify-content: space-evenly;
  }
}
</style>
