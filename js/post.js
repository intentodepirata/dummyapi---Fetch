
const params = new URLSearchParams(window.location.search);
let url = `https://dummyapi.io/data/v1/post/${params.get("id")}`;

function init() {
  //obtenemos el tag para mostrar los tags relacionados y el id del usuario para poder volver atras


  console.log(params.get("id"));

  const botonAtras = document.getElementById("atras");

  botonAtras.addEventListener("click", function () {
    window.history.back();
  });

  fetch(url, { headers: { "app-id": "6419f3107fa34063df0edfc6" } })
    .then((response) => response.json())
    .then((data) => {
      const resultado2 = document.getElementById("resultado2");

      const post = data;

      resultado2.innerHTML = `
            <div class="tarjeta-post">
            <a href='/user.html?id=${
              post.owner.id
            }'>  <div class="tarjeta-owner"><img src="${post.owner.picture}"
                      alt="${post.owner.title} ${post.owner.firstName} ${
        post.owner.lastName
      }">
                  <div class='tarjeta-owner-name'>${post.owner.title} ${
        post.owner.firstName
      } ${post.owner.lastName}<br><small>${formatearFecha(
        post.publishDate,
        fechaHoraCorta
      )}</small></div>
              </div></a>
              
              <div class="tarjeta-post-contenido">
                  <div class="tarjeta-post-img">
                    <img style='width: 100%; height:15rem; object-fit: cover;' src="${
                      post.image
                    }"
                        alt="foto post">
                  </div>
  
                  <div class="tarjeta-post-texto">
                    <p >${post.text}</p>
                    <div class='tags' >
                     
                    </div>
    
                      <div class="megusta">
                        <div class="megusta-boton">
                          <img 
                          src="/img/like.svg " 
                          
                          alt="like">
                          <p>${post.likes}</p>
                        </div>
                        <p>${formatearFecha(
                          post.publishDate,
                          fechaHoraCortisima
                        )}</p>
                      </div>
                  </div>
              </div>
          </div>`;

      const divTags = document.querySelector(".tags");

      for (const tag of data.tags) {
        divTags.innerHTML += `<a href='postbytags.html?tag=${tag.replace(
          /\s/g,
          "-"
        )}' class="tag">${tag.replace(/\s/g, "-")} </a>`;
      }
    })
    .catch((error) => console.log(error));

  let messageUrl = `https://dummyapi.io/data/v1/post/${params.get(
    "id"
  )}/comment?limit=10`;
  fetch(messageUrl, {
    headers: { "app-id": "6419f3107fa34063df0edfc6" },
  })
    .then((response) => response.json())
    .then((data) => {
      const messages = data;

      console.log(messages);

      const comentarioDiv = document.getElementById("comentarios");
      comentarioDiv.innerHTML = "";
      for (const message of messages.data) {
        comentarioDiv.innerHTML += `
      <div class="tarjeta-post">
      <div class="tarjeta-owner"><img src="${message.owner.picture}"
              alt="${message.owner.title} ${message.owner.firstName} ${
          message.owner.lastName
        }">
          <div class='tarjeta-owner-name'>${message.owner.title} ${
          message.owner.firstName
        } ${message.owner.lastName}<br><small>${formatearFecha(
          message.publishDate,
          fechaHoraCorta
        )}</small></div>
      </div>
      <div class="tarjeta-post-contenido">
      <p>${message.message}</p>
      </div>
      </div>
      `;
      }
    })
    .catch((error) => console.log(error));
}

function formatearFecha(unafecha, opciones) {
  const fecha = new Date(unafecha);
  return fecha.toLocaleDateString("es-ES", opciones);
}

const fechaHora = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Europe/Madrid",
};
const fechaHoraCorta = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Europe/Madrid",
};
const fechaHoraCortisima = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Europe/Madrid",
};
const soloFecha = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Europe/Madrid",
};

const soloHora = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Europe/Madrid",
};
