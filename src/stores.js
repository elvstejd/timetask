import { create } from 'zustand';

export const useTaskStore = create((set) => ({
  tasks: {},
  taskOrder: [],
  setTaskOrder: (newTaskOrder) => set({ taskOrder: newTaskOrder }),
  addTask: (newTask) => set((state) => ({ tasks: { ...state.tasks, [newTask.id]: newTask } })),
  removeTask: (taskIndex, taskId) => set((state) => {
    const newTaskOrder = Array.from(state.taskOrder);
    newTaskOrder.splice(taskIndex, 1);
    const newTasksObject = Object.assign({}, state.tasks);
    delete newTasksObject[taskId];
    return { tasks: newTasksObject, taskOrder: newTaskOrder };
  }),
  clearCompletedTasks: () => set((state) => {
    const newTasksObject = Object.assign({}, state.tasks);
    const newTaskOrder = Array.from(state.taskOrder);
    const completedTasks = Object.values(newTasksObject).filter((task) => task.done);
    completedTasks.forEach((task) => {
      delete newTasksObject[task.id];
      newTaskOrder.splice(newTaskOrder.indexOf(task.id), 1);
    });
    return { tasks: newTasksObject, taskOrder: newTaskOrder };
  }),
  updateTask: (updatedTask) => set((state) => ({ tasks: { ...state.tasks, [updatedTask.id]: updatedTask } })),
  selectedTask: {},
  setSelectedTask: (task) => set({ selectedTask: task }),
}));


