let limit = 4;
function init() {
  //sacar el ide de la barra de url del navegador
  const params = new URLSearchParams(window.location.search);

  let url = `https://dummyapi.io/data/v1/user/${params.get("id")}`;
  fetch(url, {
    headers: {
      "app-id": "6419f3107fa34063df0edfc6",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const {
        id,
        title,
        firstName,
        lastName,
        picture,
        dateOfBirth,
        email,
        gender,
        location,
        phone,
        registerDate,
        updatedDate,
      } = data;

      const { street, city, state, country, timezone } = location;
      const resultado = document.getElementById("resultado");
      const titulo = document.getElementById("titulo");
      titulo.innerHTML = `<h3> ${title}: <span>${firstName} ${lastName}</span> </h3>`;
      resultado.innerHTML = `
                
      <div class="user-img">
          <img src="${picture}" alt="imagen" >
      </div>
      <div class="user-informacion">
              <li class="user-campo">Fecha de nacimiento: ${formatearFecha(
                dateOfBirth,
                soloFecha
              )}</li>
              <li class="user-campo">Email: ${email}</li>
              <li class="user-campo">Genero: ${gender}</li>
              <li class="user-campo">Fecha de registro: ${formatearFecha(
                registerDate,
                soloFecha
              )}</li>
              <li class="user-campo">Fecha de actualizacion: ${formatearFecha(
                updatedDate,
                soloFecha
              )}</li>
              <li class="user-campo">Telefono: ${phone}</li>
              <li class="user-campo">Calle: ${street}</li>
              <li class="user-campo">Ciudad: ${city}</li>
              <li class="user-campo">Estado: ${state} </li>
              <li class="user-campo">Pais: ${country}</li>
              <li class="user-campo">Zona Horaria: ${timezone}</li>
      </div> 
            `;
    })
    .catch((error) => console.log(error));

  let urlPost = `https://dummyapi.io/data/v1/user/${params.get(
    "id"
  )}/post?limit=${limit}`;

  function hacerFetch() {
    fetch(urlPost, {
      headers: {
        "app-id": "6419f3107fa34063df0edfc6",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const resultado2 = document.getElementById("resultado2");
        resultado2.innerHTML = "";

        for (const post of data.data) {
          //iterar dentro de un array que sta dentro del array

          resultado2.innerHTML += `
            <div class="tarjeta-post">
              <div class="tarjeta-owner"><img src="${post.owner.picture}"
                      alt="${post.owner.title} ${post.owner.firstName} ${
            post.owner.lastName
          }">
                  <div class='tarjeta-owner-name'>${post.owner.title} ${
            post.owner.firstName
          } ${post.owner.lastName}<br><small>${formatearFecha(
            post.publishDate,
            fechaHoraCorta
          )}</small></div>
              </div>
              <a href="/post.html?id=${post.id}">
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
          </div></a>`;
        }

        const divTags = document.querySelectorAll(".tags");
        let contador = 0;
        for (const post of data.data) {
          const tags = post.tags;

          for (const tag of tags) {
            divTags[
              contador
            ].innerHTML += `<a href='postbytags.html?tag=${tag.replace(
              /\s/g,
              "-"
            )}&id=${params.get("id")}' class='tag'>${tag.replace(
              /\s/g,
              "-"
            )} </a>`;
          }
          contador++;
        }
      })
      .catch((error) => console.log(error));
  }
  hacerFetch();
  const button = document.getElementById("vermas");

  button.addEventListener("click", () => {
    vermas();
    urlPost = `https://dummyapi.io/data/v1/user/${params.get(
      "id"
    )}/post?limit=${limit}`;
    hacerFetch();
  });

  function vermas() {
    console.log(limit);

    return (limit += 4);
  }


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
