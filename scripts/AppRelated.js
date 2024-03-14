import { AppFooterCounter, TaskListElement, appContainerElement } from './Elements';
import { fetchData, saveToDatabase } from './StorageRelated';
import { initTaskList } from './TasksRelated';

const toggleAppDarkTheme = () => {
  appContainerElement.classList.toggle('App--isDark');
  saveToDatabase(
    'darkThemeFlag',
    appContainerElement?.classList.contains('App--isDark'),
  );
};

const initDataOnStartup = () => {
  if (fetchData('darkThemeFlag')) toggleAppDarkTheme();
  initTaskList(fetchData('tasks'));
};

const renderEmptyState = () => {
  TaskListElement.innerHTML = `<li class='EmptyList  TaskList__TaskContent'>
<p>   No tasks yet...</p>  </li>`;
};

const taskTemplate = (task, index) => `
<div class='TaskList__checkbox' tabindex="0" role="button">

 <input  
  type="checkbox" ${task.isCompleted ? 'checked' : ''}
  class="TaskList__checkboxImg"
  id="checkbox${index}"
/>
<label for="checkbox${index}"></label>
</div>

<div class="TaskInputBar__form">
    <p class="TaskInputBar__input">${task.value}</p>
  </div>
  <button class="TaskInputBar__Delete">
    <img class="TaskInputBar__DeleteIcon" src="./images/icon-cross.svg" alt="Delete Icon" />
  </button>
`;

const renderTask = () => {
  const taskList = fetchData('tasks') || [];
  const numberOfTasks = taskList.length;
  AppFooterCounter.innerHTML = numberOfTasks.toString();

  // Clear the innerHTML of taskListElement
  TaskListElement.innerHTML = '';

  taskList.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.draggable = true;
    // taskElement.className = `TaskList__TaskContent animate__animated animate__fadeInDown ${task.isCompleted ? ' TaskList__taskContent--isActive' : ''}`;
    taskElement.className = `TaskList__TaskContent animate__animated animate__fadeInDown ${task.isCompleted ? ' TaskList__taskContent--isActive' : ''}`;
    taskElement.innerHTML = taskTemplate(task, index);
    TaskListElement.appendChild(taskElement);
  });
};

export {
  initDataOnStartup, toggleAppDarkTheme, renderEmptyState, renderTask,
};
