<template>
  <div class="mx-auto w-50 p-0">
    <div class="text-center" v-if="allTasks.length < 1">
      <img
        src="@/assets/images/no-task.svg"
        class="w-75 d-flex mx-auto justify-content-center align-items-center mt-16 user-select-none pe-none"
        alt=""
      />
      <p class="my-4">You don't have any task at the moment</p>
      <v-btn color="primary" nuxt to="/add-task"> Add New Task </v-btn>
    </div>
    <div class="transition-element" v-else>
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="fw-semibold my-5">My Tasks</h4>
        <v-btn color="primary" nuxt to="/add-task"> Add New Task </v-btn>
      </div>
      <div class="grid">
        <div v-for="(item, i) in allTasks" :key="i">
          <div class="task-box px-3 py-6 transition-element position-relative">
            <span
              class="bg-red rounded-pill text-extra-small px-2 py-1 opacity-50"
              >06/18/2024</span
            >
            <h6 class="text-sm mt-6 mb-4">{{ item?.title }}</h6>
            <h4 class="fs-5">{{ item?.description }}</h4>
            <div class="d-flex justify-content-end">
              <div
                v-if="item.completed"
                class="d-flex justify-content-center align-items-center light-green rounded-pill px-2 py-1 text-extra-small"
              >
                <span class="pill mr-2 rounded-circle bg-success"></span>
                <span class="text-success">Completed</span>
              </div>
              <div
                v-else
                class="d-flex justify-content-center align-items-center light-red rounded-pill px-2 py-1 text-extra-small"
              >
                <span class="pill mr-2 rounded-circle bg-danger"></span>
                <span class="text-danger">Incomplete</span>
              </div>
            </div>
            <div class="position-absolute top-0 end-0">
              <v-btn
                class="ma-2"
                color="blue-lighten-2"
                :ripple="true"
                icon="mdi-circle-edit-outline"
                size="small"
                variant="text"
              ></v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allTasks: [
        {
          title: "Josh Fransix",
          description: "Let get this stack!!",
          completed: true,
        },
        {
          title: "Spiikey",
          description: "Get cheese real quick!!",
          completed: false,
        },
        {
          title: "Josh Fransix",
          description: "Let get this stack!!",
          completed: true,
        },
        {
          title: "David Beckham",
          description: "jdvddfhdfhdf",
          completed: false,
        },
      ],
    };
  },
};
</script>
