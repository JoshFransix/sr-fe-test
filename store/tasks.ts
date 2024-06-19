import { defineStore } from "pinia";

interface Item {
  title: string;
  description: string;
  date: string;
  completed: boolean;
}
export const useTasks = defineStore("taskStore", () => {
  const allTasks: Array = ref([
    {
      title: "Josh Fransix",
      description: "This is my first task",
      completed: true,
      date: "Tue Jun 18 2024",
    },
    {
      title: "Spiikey",
      description: "Get cheese from the store",
      completed: false,
      date: "Mon Jun 17 2024",
    },
    {
      title: "S.R FE",
      description: "Check my schedule",
      completed: true,
      date: "Tue Jun 18 2024",
    },
    {
      title: "Test",
      description: "This is another task",
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
  return {
    allTasks,
    addTask,
    removeTask,
    toggleTask,
    editTask,
  };
});
