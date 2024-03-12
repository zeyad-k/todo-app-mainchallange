import { toggleAppDarkTheme } from './AppRelated';
import {
  TaskInputElement, TaskListElement, ViewActiveButton, ViewAllButton, ViewCompletedButton, clearCompletedButton, toggleDarkThemeButton,
} from './Elements';
import { addTask, clearCompletedTasks } from './TasksRelated';

const initEventListeners = () => {
  toggleDarkThemeButton.addEventListener('click', toggleAppDarkTheme);
  TaskInputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask();
    }
  });

  clearCompletedButton.addEventListener('click', clearCompletedTasks);

  ViewAllButton?.addEventListener('click', () => {
    TaskListElement?.classList.remove('TaskList__list--showCompletedOnly', 'TaskList__list--hideCompleted');
    ViewAllButton?.classList.add('TaskList__link--isActive');
    ViewActiveButton?.classList.remove('TaskList__link--isActive');
    ViewCompletedButton?.classList.remove('TaskList__link--isActive');
  });

  ViewActiveButton?.addEventListener('click', () => {
    TaskListElement?.classList.remove('TaskList__list--showCompletedOnly');
    TaskListElement?.classList.add('TaskList__list--hideCompleted');
    ViewActiveButton?.classList.add('TaskList__link--isActive');
    ViewAllButton?.classList.remove('TaskList__link--isActive');
    ViewCompletedButton?.classList.remove('TaskList__link--isActive');
  });

  ViewCompletedButton?.addEventListener('click', () => {
    TaskListElement?.classList.remove('TaskList__list--hideCompleted');
    TaskListElement?.classList.add('TaskList__list--showCompletedOnly');
    ViewCompletedButton?.classList.add('TaskList__link--isActive');
    ViewAllButton?.classList.remove('TaskList__link--isActive');
    ViewActiveButton?.classList.remove('TaskList__link--isActive');
  });
};

export default initEventListeners;
