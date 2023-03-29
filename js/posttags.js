let limit = 4;

const params = new URLSearchParams(window.location.search);
console.log(params.get("tag"));
console.log(params.get("id"));

let url = `https://dummyapi.io/data/v1/tag/${params.get(
  "tag"
)}/post?limit=${limit}`;
function init() {
  //obtenemos el tag para mostrar los tags relacionados y el id del usuario para poder volver atras


  //inyectamos el id a la ruta del boton atras
  // document.getElementById("atras").href = `/user.html?id=${params.get("id")}`;

  //ir atras con window.histori:
  const botonAtras = document.getElementById("atras");

  botonAtras.addEventListener("click", function () {
    window.history.back();
  });

  // llamada a la api



  function hacerFetch(){
    fetch(url, {
      headers: {
        "app-id": "6419f3107fa34063df0edfc6",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const resultado2 = document.getElementById("resultado2");
        resultado2.innerHTML = "";
  
        for (const post of data.data) {
          //iterar dentro de un array que sta dentro del array
          const tags = post.tags;
  
          console.log(tags);
  
          resultado2.innerHTML += `
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
  hacerFetch()
  

  
  const button = document.getElementById("vermas");
  
  button.addEventListener("click", () => {
  vermas();
  
   
   url= `https://dummyapi.io/data/v1/tag/${params.get("tag")}/post?limit=${limit}`
    
   hacerFetch()


});
}
function vermas() {
  console.log(limit);

  return (limit += 4);
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
