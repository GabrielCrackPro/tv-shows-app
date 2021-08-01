const mostPopularContainer = document.querySelector(".most-popular-container");
const API_URLS = {
  base: "https://www.episodate.com/api",
  popular: " https://www.episodate.com/api/most-popular?page=1",
  search: "https://www.episodate.com/api/search?q=SHOW&page=1",
  details: "https://www.episodate.com/api/show-details?q=",
};

const getData = async (url) => {
  let data = await fetch(url).then((response) => response.json());
  console.log(data);
  return data;
};

window,
  (onload = async () => {
    let popular = await getData(API_URLS.popular);
    popular.tv_shows.forEach((show) => {
      console.log(show);
      mostPopularContainer.innerHTML += `
        <div class="card">
        <dv class="card-body d-flex">
        <img src="${show.image_thumbnail_path}" alt="${show.name}" height="100" width="100">
        <p class="card-text" p-2>${show.name}</p>
        </div>
        `;
    });
  });
