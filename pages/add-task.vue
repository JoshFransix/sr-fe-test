<template>
  <div class="mx-auto w-50 p-3">
    <h4 class="text-center fw-semibold">Add New Task</h4>
    <div>
      <v-form @submit.prevent="addNewTask">
        <v-text-field
          v-model="title"
          class="mb-4"
          label="Task title"
          hide-details
          required
        ></v-text-field>
        <v-textarea v-model="description" label="Description"></v-textarea>
        <div class="d-flex justify-content-center align-items-center">
          <v-btn :loading="isLoading" color="primary" type="submit">
            Add Task
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { useTasks } from "@/store/tasks";
import { storeToRefs } from "pinia";

const { addTask } = useTasks();
const router = useRouter();

const isLoading = ref(false);
const title = ref("");
const description = ref("");

const addNewTask = () => {
  const data = {
    title: title.value,
    description: description.value,
    date: new Date().toDateString(),
    completed: false,
  };
  isLoading.value = true;
  setTimeout(() => {
    addTask(data);
    router.push("/");
  }, 2000);
};
</script>

<style></style>