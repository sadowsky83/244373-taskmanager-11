const TASK_COUNT = 3;

import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/taskEdit.js';
import {createLoadMoreButtonTemplate} from './components/loadMoreButton.js';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

render(mainControl, createMenuTemplate());
render(main, createFilterTemplate());
render(main, createBoardTemplate());

const board = main.querySelector(`.board`);
const boardTasks = main.querySelector(`.board__tasks`);

render(boardTasks, createTaskEditTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  render(boardTasks, createTaskTemplate());
}

render(board, createLoadMoreButtonTemplate());
