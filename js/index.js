function init() {
  
  let url = `https://dummyapi.io/data/v1/user?limit=12`;
  let itemPorPagina = 12;

 function hacerFetch(){
  fetch(url,{
    headers:{
      'app-id': '6419f3107fa34063df0edfc6'
    }
   }) 
   .then(response => response.json())
   .then(data => {
    
    console.log(data)
     
     const totalItem = data.total
     // console.log(this.response)
    
     const paginador = document.getElementById("paginador");
     const limitePaginador = document.getElementById("limite");
    
     while (limitePaginador.firstChild) {
       limitePaginador.removeChild(limitePaginador.firstChild);
     }
    
     let arrayCantidadPaginas = [6, 12, 24];
    
     for (const p of arrayCantidadPaginas) {
       const button = document.createElement("button");
       button.innerText = p;
       limitePaginador.appendChild(button);
       button.addEventListener("click", () => totalPagina(p));
     }
    
     while (paginador.firstChild) {
       paginador.removeChild(paginador.firstChild);
     }
    
     let totalPages = Math.ceil(totalItem / itemPorPagina - 1);
    
     for (let i = 1; i <= totalPages +1; i++) {
       const button = document.createElement("button");
       button.innerText = i;
       paginador.appendChild(button);
       button.addEventListener("click", () => mostrarPagina(i-1));
     }
     const resultadoDiv = document.getElementById("resultado");
     resultadoDiv.innerHTML = "";
     for (const d of data.data) {
       resultadoDiv.innerHTML += `<a href="/user.html?id=${d.id}">
                                   <div class="tarjeta " >
                                       <img src="${d.picture}" alt="usuario" srcset="">
                                       <p>${d.title}:</p>
                                       <p>  ${d.firstName} ${d.lastName} </p>
                                   </div>
                                 </a>`;
     }
  
  
  
   })
   .catch(error => console.log(error))
 }
hacerFetch()



  function totalPagina(numero, pagina) {
    itemPorPagina = numero;
    url = `https://dummyapi.io/data/v1/user?page=${pagina}&limit=${itemPorPagina}`;
    hacerFetch()

  }

  function mostrarPagina(pagina) {
    console.log(`diste click ${pagina}`);
    url = `https://dummyapi.io/data/v1/user?page=${pagina}&limit=${itemPorPagina}`;
    hacerFetch()
  }
};



