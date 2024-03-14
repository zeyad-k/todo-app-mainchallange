import Sortable from 'sortablejs';
import {
  TaskListElement, getTaskListCheckboxElements, getTaskListDeleteElements, getTasksElements,
} from './Elements';
import { deleteATask, toggleATask } from './TasksRelated';

export const initTaskListeners = () => {
  getTaskListDeleteElements().forEach((icon, index) => {
    icon.addEventListener('click', (e) => deleteATask(e, index));
  });

  getTaskListCheckboxElements().forEach((box, index) => {
    setTimeout(() => {
      box.addEventListener('click', (e) => toggleATask(e, index));
      box.addEventListener('keydown', (e) => e.key === 'Enter' && toggleATask(e, index));
    }, 0);
  });

  //   getTasksElements().forEach((task) => {
  //     task.addEventListener('dragstart', () => {
  //       //  Adding dragging class after a delay
  //       setTimeout(() => task.classList.add('dragging'), 0);
  //     });

  //     // Adding touch events for mobile support
  //     task.addEventListener('touchstart', () => {
  //       // Adding dragging class after a delay
  //       setTimeout(() => task.classList.add('dragging'), 0);
  //     });

  //     // Removing dragging on dragend event
  //     task.addEventListener('dragend', () => {
  //       task.classList.remove('dragging');
  //     });

  //     // Removing dragging on touchend event
  //     task.addEventListener('touchend', () => {
  //       task.classList.remove('dragging');
  //     });
  //   });

  //   const initSortableList = (e) => {
  //     e.preventDefault();
  //     const draggingItem = TaskListElement.querySelector('.dragging');
  //     const siblings = [...TaskListElement.querySelectorAll('.TaskList__TaskContent:not(.dragging)')];

  //     const nextSibling = siblings.find((sibling) => e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2);
  //     TaskListElement.insertBefore(draggingItem, nextSibling);
  //   };

  //   TaskListElement.addEventListener('dragover', initSortableList);
  //   TaskListElement.addEventListener('dragenter', (e) => e.preventDefault());
  //   TaskListElement.addEventListener('drop', initSortableList);
  // };

  // Initialize Sortable on your list

  const sortable = Sortable.create(TaskListElement);
  // var sortable = Sortable.create(TaskListElement, {
  //   onStart: function (evt) {
  //     // Custom code to run when a drag starts
  //   },
  //   onEnd: function (evt) {
  //     // Custom code to run when a drag ends
  //   },
  // });
};
export default initTaskListeners;
