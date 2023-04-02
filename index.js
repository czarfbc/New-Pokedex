const namePokemon = document.querySelector('.pokemon_name');
const idPokemon = document.querySelector('.pokemon_number');
const spritePokemon = document.querySelector('.pokemon_sprite');


const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const submit = document.querySelector('.btn_submit')
const prev = document.querySelector('.btn_prev');
const next = document.querySelector('.btn_next');

var searchPokemon = 1;


const FetchPokemon = async (pokemon) => {
    try {
        const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const data = await apiResponse.json()
        return data;

    } catch (error) {
        console.error(error);
    }
}
const InfoPokemon = async (pokemon) => {
    try {
        namePokemon.innerHTML = 'Loanding...';
        idPokemon.innerHTML = '';

        const dataAPI = await FetchPokemon(pokemon);

        const genus = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
        const dataGenus = await genus.json()
        const genusNameEnglish = dataGenus.genera[7].genus;
        const nameGenus = genusNameEnglish.replace('Pokémon', '');

        const weaknesses = await fetch(dataAPI.types[0].type.url) 
        const dataWeaknesses = await weaknesses.json()
        const nameWeaknessesArray = dataWeaknesses.damage_relations.double_damage_from;

        console.log(dataAPI['sprites']['versions']['generation-v']['black-white']['animated']['front_default']) 
        spritePokemon.src = dataAPI['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        spritePokemon.style.display = 'block';

        console.log(`id: ${dataAPI.id} name: ${dataAPI.name}`)
        namePokemon.innerHTML = dataAPI.name;
        idPokemon.innerHTML = dataAPI.id;

        console.log(`Genus: ${nameGenus}`);

        console.log(`ability: ${dataAPI.abilities[0].ability.name}`)

        dataAPI.types.forEach(element => {
            console.log(`types: ${element.type.name}`)
        });

        nameWeaknessesArray.forEach(element => {
            console.log(`weaknesses: ${element.name}`)
        });
        input.value = '';
        searchPokemon = dataAPI.id;
    } catch (error) {
        console.log(error)
        spritePokemon.style.display = 'none';
        namePokemon.innerHTML = 'Not Found :(';
        idPokemon.innerHTML = '';
        input.value = '';
    }
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    InfoPokemon(input.value.toLowerCase());
});
submit.addEventListener('click', ()=>{
    if(input.value != ""){
        InfoPokemon(input.value.toLowerCase());
    }
})
prev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon--;
        InfoPokemon(searchPokemon);
    }
});
next.addEventListener('click', ()=>{
    searchPokemon++;
    InfoPokemon(searchPokemon);
});


InfoPokemon(searchPokemon)