<template>
  <div class="mx-auto w-50 p-0">
    <!-- Confirm Delete Dialog -->
    <v-dialog persistent v-model="deleteDialog" max-width="500px" scrollable>
      <div class="rounded-xl text-white modal-color mx-auto py-12 px-6">
        <h1 class="fw-semibold text-center fs-4">Delete Task</h1>
        <div class="text-center mt-4">
          <h3 class="fs-6">Are you sure you want to delete this task?</h3>
          <div class="mt-8">
            <v-btn
              rounded
              class="mr-3"
              color="primaryLight"
              @click="deleteDialog = false"
              depressed
              >Cancel</v-btn
            >

            <v-btn
              :loading="isLoading"
              @click="loadDelete"
              rounded
              color="primary"
              depressed
              >Continue</v-btn
            >
          </div>
        </div>
      </div>
    </v-dialog>
    <!-- Edit Dialog -->
    <v-dialog persistent v-model="editDialog" scrollable>
      <div class="rounded-xl text-white modal-color mx-auto py-12 px-6">
        <h1 class="fw-semibold text-center fs-4">Edit Task</h1>
        <div>
          <v-form @submit.prevent="continueEdit">
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
                Update Task
              </v-btn>
              <v-btn
                class="ml-3"
                color="primaryLight"
                @click="editDialog = false"
                depressed
                >Cancel</v-btn
              >
            </div>
          </v-form>
        </div>
      </div>
    </v-dialog>
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
          <div
            role="button"
            class="task-box px-3 py-6 transition-element position-relative"
          >
            <span class="bg-red rounded-pill text-small px-2 py-1 opacity-50">{{
              item?.date
            }}</span>
            <h6 class="text-sm mt-6 mb-4 opacity-75">{{ item?.title }}</h6>
            <h4 class="fs-5">{{ item?.description }}</h4>
            <div class="d-flex justify-content-between align-items-center mt-8">
              <v-btn
                @click="openDelete(i)"
                variant="text"
                size="x-small"
                color="red"
                ><v-icon>mdi-delete</v-icon> <span class="ml-1">Delete</span>
              </v-btn>

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
            </div>

            <div
              class="position-absolute top-0 end-0 d-flex justify-content-center align-items-center"
            >
              <v-tooltip text="View task">
                <template v-slot:activator="{ props }">
                  <v-btn
                    @click="$router.push(`/task/${i + 1}`)"
                    v-bind="props"
                    class="ma-2"
                    color="blue-lighten-2"
                    icon="mdi-eye-circle-outline"
                    size="small"
                    variant="text"
                  ></v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="Edit task">
                <template v-slot:activator="{ props }">
                  <v-btn
                    @click="goToEdit(item, i)"
                    v-bind="props"
                    class="ma-2"
                    color="blue-lighten-2"
                    icon="mdi-circle-edit-outline"
                    size="small"
                    variant="text"
                  ></v-btn>
                </template>
              </v-tooltip>
              <v-tooltip
                :text="
                  item?.completed ? 'Mark as incomplete' : 'Mark as complete'
                "
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    @click="updateStatus(i)"
                    v-bind="props"
                    class="ma-2"
                    color="green"
                    :icon="
                      item?.completed ? 'mdi-check-all' : 'mdi-progress-check'
                    "
                    size="small"
                    variant="text"
                  ></v-btn>
                </template>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTasks } from "@/store/tasks";
import { storeToRefs } from "pinia";

interface Item {
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

const { allTasks, toggleTask, editTask, removeTask } = useTasks();

const editDialog = ref(false);
const deleteDialog = ref(false);
const selectedDelete = ref(null);

const title = ref("");
const description = ref("");
const isLoading = ref(false);
const selectedTask = ref({});

const updateStatus = (index: Number) => {
  console.log(index);
  toggleTask(index);
};

const openDelete = (index: Number) => {
  selectedDelete.value = index;
  console.log(selectedDelete.value);
  deleteDialog.value = true;
};

const goToEdit = (item: Item, index: Number) => {
  selectedTask.value = { ...item, id: index };
  title.value = item.title;
  description.value = item.description;
  editDialog.value = true;
};

const continueEdit = () => {
  isLoading.value = true;
  const data: Item = {
    title: title.value,
    description: description.value,
    date: new Date().toDateString(),
    completed: selectedTask.completed,
  };
  setTimeout(() => {
    isLoading.value = false;
    editTask(selectedTask.id, data);
    editDialog.value = false;
  }, 2000);
};

const loadDelete = () => {
  isLoading.value = true;
  console.log(selectedDelete.value);

  setTimeout(() => {
    removeTask(selectedDelete.value);
    deleteDialog.value = false;
    isLoading.value = false;
  }, 1000);
};
</script>
