const mainContainer = document.querySelector(".most-popular-container");
const searchForm = document.querySelector("#search-form");
const API_URLS = {
  base: "https://www.episodate.com/api",
  popular: " https://www.episodate.com/api/most-popular?page=1",
  search: "https://www.episodate.com/api/search?q=",
  details: "https://www.episodate.com/api/show-details?q=",
};

const getData = async (url) => {
  let data = await fetch(url).then((response) => response.json());
  return data;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

window.onload = async () => {
  let popular = await getData(API_URLS.popular);
  popular.tv_shows.forEach(async (show) => {
    if (show.end_date == null) {
      show.end_date = "Unknown";
    }
    mainContainer.innerHTML += `
  <div class="card border-primary mb-3 mt-2">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${
        show.image_thumbnail_path
      }" class="img-fluid rounded-start" alt="${show.name}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${popular.tv_shows.indexOf(show) + 1} - ${
      show.name
    }</h5>
        <p class="card-text">Network: ${show.network}</p>
        <p class="card-text">Country: ${show.country}</p>
        <p class="card-text">Start Date: ${formatDate(show.start_date)}</p>
        <p class="card-text">End Date: ${show.end_date}</p>
        <a href="${
          API_URLS.details + show.id
        }" target="blank" class="btn btn-primary">Details</a>
      </div>
    </div>
  </div>
</div>
    `;
  });
};
searchForm.addEventListener("submit", async (event) => {
  const searchData = new FormData(searchForm);
  const query = searchData.get("query");
  const url = API_URLS.search + query + "&page=1";
  let searchResults = await getData(url);
  event.preventDefault();
  console.log(searchResults);
});
