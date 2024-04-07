const URL = "https://tasty.p.rapidapi.com/recipes";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "484f656f83mshd4d330abbd322a6p16c078jsn7b58a02879d5",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};

const recipeList = document.querySelector(".recipe__list");

const url = window.location.href;
const queryString = url.split("?")[1];
const params = new URLSearchParams(queryString);
const id = params.get("id");

const convertStringToHTML = (htmlString) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, "text/html");

  return html.body.firstElementChild;
};

const fetchRecipeById = async (id) => {
  try {
    console.log(`${URL}/get-more-info?id=${id}`);
    const response = await fetch(`${URL}/get-more-info?id=${id}`, options);

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchData = async () => {
  try {
    const data = await fetchRecipeById(id);

    recipeList.innerHTML = "";
    const recipeConverted = `
        <li class="recipe__details">
        <div>
          <img
            src="${data.thumbnail_url}"
            alt="${data.name}"
          />
        </div>
        <div>
          <h2>${data.name}</h2>
          <p>${data.description}</p>
          <p>${data.instructions}</p>
        </div>
      </li>
    `;

    recipeList.insertAdjacentElement(
      "afterbegin",
      convertStringToHTML(recipeConverted)
    );
  } catch (error) {
    console.error(error);
  }
};

fetchData();
