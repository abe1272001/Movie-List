(function () {
  //   write your code here
  const BASE_URL = "https://movie-list.alphacamp.io";
  const INDEX_URL = BASE_URL + "/api/v1/movies/";
  const POSTER_URL = BASE_URL + "/posters/"; //取得圖片海報
  const data = [];
  axios
    .get(INDEX_URL)
    .then((response) => {
      response.data.results.forEach((item) => {
        data.push(item);
      });
      displayDataList(data);
      console.log(data);
      console.log(data.length);
    })
    .catch((err) => console.log(err));

  function displayDataList(data) {
    let htmlContent = "";
    data.forEach(function (item, index) {
      htmlContent += `<div class="col-sm-3">
        <div class="card mb-2">
          <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
          <div class="card-body movie-item-body">
            <h6 class="card-title">${item.title}</h6>
          </div>
        </div>
      </div>
      `;
    });
    $("#data-panel").html(htmlContent);
  }
})();
