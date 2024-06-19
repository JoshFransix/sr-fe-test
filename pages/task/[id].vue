<template>
  <div class="mx-auto w-50 p-5">
    <h3 class="fs-4">My {{ Number($route.params.id) }} Task</h3>

    <div>
      <h3 class="fw-semibold fs-5 mt-4">Title</h3>
      <p>{{ currentTask?.title }}</p>
      <h3 class="fw-semibold fs-5 mt-4">Description</h3>
      <p>{{ currentTask?.description }}</p>
      <h3 class="fw-semibold fs-5 mt-4">Status</h3>
      <div class="w-max">
        <div
          v-if="currentTask.completed"
          class="d-flex justify-content-center w-max align-items-center light-green rounded-pill px-2 py-1 text-extra-small"
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
    </div>
  </div>
</template>
<script setup>
import { useTasks } from "@/store/tasks";

const { allTasks } = useTasks();
const route = useRoute();
const id = Number(route.params.id);
const currentTask = allTasks[id - 1];
console.log(id);

console.log(currentTask);
</script>
