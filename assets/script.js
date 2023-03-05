const form = document.querySelector("#search");

// Define clearCardContainer function
function clearCardContainer() {
  const cardContainer = document.querySelector("#cardContainer");
  cardContainer.innerHTML = "";
}


form.addEventListener("submit", event => {
  event.preventDefault();
  const bandName = encodeURIComponent(document.getElementById("search-input").value);
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '16f87e2059mshe937410fce7f782p1d1cc9jsnae5dd54150f4',
      'X-RapidAPI-Host': 'Metal-archives-api1.p.rapidapi.com'
    }
  };

  fetch(`https://Metal-archives-api1.p.rapidapi.com/band?name=${bandName}`, options)
    .then(response => response.json())
    .then(data => {
      clearCardContainer();
      const metalArchivesResults = document.querySelector("#metalArchivesResults");
      metalArchivesResults.innerHTML = "";
      data.results.forEach(result => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = "#";
        anchor.textContent = result.name;
        anchor.addEventListener("click", event => {
          event.preventDefault();
          clearCardContainer();
          const cardContainer = document.querySelector("#cardContainer");
          const card = document.createElement("div");
          card.classList.add("card");
          const cardContent = `
		  <div class="card-content">
		  <div class="media">
			<div class="media-left">
			  <figure class="image is-2by1">
				<img src="./assets/metalarchiveslogo.jpg" alt="Metal Archives">
			  </figure>
			</div>
		  </div>
		  <div class="card-footer">
			<span>${result.name}</span>
			<a href="${result.link}">View on Metal Archives</a>
		  </div>
		</div>
          `;
          card.innerHTML = cardContent;
          cardContainer.appendChild(card);
        });
        listItem.appendChild(anchor);
        metalArchivesResults.appendChild(listItem);
      });
    })
    .catch(err => console.error(err));
});
