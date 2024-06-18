import { defineStore } from "pinia";

export const useTasks = defineStore("taskStore", () => {
  const allTasks: Array = ref([
    {
      title: "Josh Fransix",
      description: "Let get this stack!!",
      completed: true,
      date: "Tue Jun 18 2024",
    },
    {
      title: "Spiikey",
      description: "Get cheese real quick!!",
      completed: false,
      date: "Tue Jun 18 2024",
    },
    {
      title: "Josh Fransix",
      description: "Let get this stack!!",
      completed: true,
      date: "Tue Jun 18 2024",
    },
    {
      title: "David Beckham",
      description: "jdvddfhdfhdf",
      completed: false,
      date: "Tue Jun 18 2024",
    },
  ]);

  function addTask(value: Object) {
    allTasks.value.push(value);
  }
  function removeTask(index: number) {
    allTasks.value.splice(index, 1);
  }
  function toggleTask(index: number) {
    allTasks.value[index].completed = !allTasks.value[index].completed;
  }
  function editTask(index: number, value: Object) {
    allTasks.value[index] = value;
  }
  return { allTasks, addTask, removeTask, toggleTask, editTask };
});
