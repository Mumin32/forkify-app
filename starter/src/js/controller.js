import * as model from './model.js';
import recipeView from './view/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
const controlRecepies = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //Loading recipe
    await model.loadRecipe(id);

    //Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function (params) {
  try {
    resultsView.renderSpinner();
    //1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2 Load search results
    await model.loadSearchResults(query);

    //Render results
    console.log(model.state.search.results);

    resultsView.render(model.getSearchResultsPage(4));

    //4) REnder initial pagination buttons

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function () {
  console.log('Pag controller');
};

const init = function () {
  recipeView.addHandlerRender(controlRecepies);
  searchView.addHanderSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
// window.addEventListener('hashchange', controlRecepies);
// window.addEventListener('load', controlRecepies);
