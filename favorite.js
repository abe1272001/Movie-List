(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  // const dataPanel = document.getElementById('data-panel')
  const data = JSON.parse(localStorage.getItem('favoriteMovies')) || []

  displayDataList(data)

  function displayDataList(data) {
    let htmlContent = "";
    data.forEach(function (item, index) {
      htmlContent += `<div class="col-sm-3">
        <div class="card mb-2">
          <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
          <div class="card-body movie-item-body">
            <h6 class="card-title">${item.title}</h6>
          </div>

          <!-- "More" button 使用dataset傳入item.id -->
          <div class="card-footer">
            <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
          </div>
        </div>
      </div>
      `;
    });
    $("#data-panel").html(htmlContent);
  }



  //顯示當前movie的資訊
  function showMovie(id) {
    const url = INDEX_URL + id
    //將殘留的資訊洗掉
    $("#show-movie-title").html("")
    $("#show-movie-image").html("")
    $("#show-movie-date").html("")
    $("#show-movie-description").html("")
    axios(url).then(response => {
      const data = response.data.results
      // console.log(data)
      $("#show-movie-title").html(data.title)
      $("#show-movie-image").html(`<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`)
      $("#show-movie-date").html(`release at : ${data.release_date}`)
      $("#show-movie-description").html(data.description)
    })
  }

  function removeFavoriteItem(id) {
    //找到陣列中相對應的index
    const index = data.findIndex(movie => movie.id === Number(id))
    console.log(index)
    data.splice(index, 1)
    localStorage.setItem('favoriteMovies', JSON.stringify(data))
    displayDataList(data)

  }

  $("#data-panel").click(function(e){
    if(e.target.matches(".btn-show-movie")) {
      let id = e.target.dataset.id
      showMovie(id)
    }

    if(e.target.matches(".btn-remove-favorite")) {
      let id = e.target.dataset.id
      // console.log(id)
      removeFavoriteItem(id)
    }
  })
})()