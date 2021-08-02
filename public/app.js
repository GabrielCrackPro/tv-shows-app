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
      if (show.end_date == null) {
        show.end_date = "Unknown";
      }
      console.log(show);
      mostPopularContainer.innerHTML += `
      <div class="d-flex p-2">
      <img src="${show.image_thumbnail_path}" alt="${
        show.name
      }" height="100" width="100">
      <div class="d-flex flex-column p-2">
      <h3>${show.name} <a href="${
        API_URLS.details + show.id
      }" target="_blank" class="btn btn-primary btn-sm">Details</a></h3>
      <p>Network: ${show.network}</p>
      <p>Country: ${show.country}</p>
      <p>Start Date: ${show.start_date} - End Date: ${show.end_date}</p>
      <p>Status: ${show.status}</p>
      </div>
      </div>
      `;
    });
  });
