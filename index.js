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
      console.log(data);
      console.log(data.length);
    })
    .catch((err) => console.log(err));
})();
