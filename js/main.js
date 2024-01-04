// lo primero que hago es llamar del index.html la listaPokemon

const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header"); // all pq son varios


let URL = "https://pokeapi.co/api/v2/pokemon/"; // asi llamo a la API

// ahora recorremos la URL 151 veces para traer los pokemones

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {
// primero creamos el const div y despues creamos al final el let tipos. Let tipos es para elegir los tipos de pokemones

    let tipos = poke.types.map((type) => 
        
        `<p class="${type.type.name} tipo">${type.type.name}</p>`);
// join permite juntar todo lo que hay en el array en una string
        tipos = tipos.join('') // al crear tipos aca despues se usa abajo en el div


    let pokeId = poke.id.toString(); // esto es para cambiar el numero de los pokemones
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div"); // de esta manera creo el div
    div.classList.add("pokemon"); // agrego la clase pokemon al div
    div.innerHTML = `<p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
                </div>
                <div class="pokemon-tipos">
                    ${tipos}
                </div>
                <div class="pokemon-stats">
                    <p class="stat">${poke.height}M</p>
                    <p class="stat">${poke.weight}KG</p>
                </div>
            </div>
        `;
// la forma de acceder a la imagen arriba lo saco de la API, si tiene objetos con "-" hay que usar []
    listaPokemon.append(div); // asi aparece el div
}

// agregamos eventos a los botones 👇

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    // currentTarget permite traer del HTML exactamente a lo q le damos click
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = ""; // si no vaciamos la lista no muestra los tipos

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos") { 
                    mostrarPokemon(data);
                } else {
                
                    const tipos = data.types.map(type => type.type.name); // const tipos por cada uno de los pokemon guarda en la constante tipos un array con los nombres
                    if (tipos.some(tipo => tipo.includes(botonId))) { // este if significa que si alguno (some) de los tipos incluye (includes) el pokemon
                    mostrarPokemon(data);
                }
                }

                })
    }
}))