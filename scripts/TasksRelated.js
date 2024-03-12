import { renderEmptyState, renderTask } from './AppRelated';
import { TaskInputElement } from './Elements';
import { fetchData, saveToDatabase } from './StorageRelated';
import initTaskListeners from './initTaskListeners';

export const initTaskList = (tasks) => {
  if (tasks?.length) {
    renderTask(tasks);
    initTaskListeners();
  } else {
    renderEmptyState();
  }
};

export const addTask = () => {
  //   const taskList = [];
  const taskValue = TaskInputElement.value;
  if (!taskValue || taskValue.trim() === '') return;
  const task = {
    value: taskValue,
    isCompleted: false,
  };
  const taskList = fetchData('tasks') || [];

  taskList.unshift(task);
  // taskList.push(task);
  saveToDatabase('tasks', taskList);
  TaskInputElement.value = '';
  initTaskList(taskList);
};

export const deleteATask = (event, index) => {
  const answer = confirm('هل أنت متأكد من حذف هذه المهمة؟');
  if (!answer) return;

  const tasks = fetchData('tasks');
  tasks.splice(index, 1);
  saveToDatabase('tasks', tasks);
  initTaskList(tasks);
};

const dropTaskDown = (tasks, index) => {
  if (tasks[index].isCompleted) {
    const completedTask = tasks.splice(index, 1)[0];
    tasks.push(completedTask);
  }
};

export const toggleATask = (event, index) => {
  const tasks = fetchData('tasks');

  event.currentTarget.classList.toggle('TaskList__taskContent--isActive');
  tasks[index].isCompleted = !tasks[index].isCompleted;
  // drop the task at the end of the list when toggle
  dropTaskDown(tasks, index);
  saveToDatabase('tasks', tasks);

  initTaskList(tasks);
};

export const clearCompletedTasks = () => {
  // Fetch the current list of tasks
  const tasks = fetchData('tasks');

  // Filter out the completed tasks
  const activeTasks = tasks.filter((task) => !task.isCompleted);

  // Save the updated tasks array back to the database
  saveToDatabase('tasks', activeTasks);

  // Re-render the task list
  initTaskList(activeTasks);
};
