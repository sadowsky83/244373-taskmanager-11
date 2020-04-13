const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

import {createBoardTemplate} from './components/board.js';
import {createFilterTemplate} from './components/filter.js';
import {createLoadMoreButtonTemplate} from './components/loadMoreButton.js';
import {createMenuTemplate} from './components/menu.js';
import {createTaskEditTemplate} from './components/taskEdit.js';
import {createTaskTemplate} from './components/task.js';
import {generateFilters} from "./mock/generateFilters.js";
import {generateTasks} from "./mock/task.js";

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

render(mainControl, createMenuTemplate());
render(main, createFilterTemplate(filters));
render(main, createBoardTemplate());

const board = main.querySelector(`.board`);
const boardTasks = main.querySelector(`.board__tasks`);

render(boardTasks, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount)
  .forEach((task) => render(boardTasks, createTaskTemplate(task)));

render(board, createLoadMoreButtonTemplate());

const loadMoreButton = board.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => render(boardTasks, createTaskTemplate(task)));
  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
