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
        const textGenus = document.querySelector('.textGenus')
        
        

        const weaknesses = await fetch(dataAPI.types[0].type.url) 
        const dataWeaknesses = await weaknesses.json()
        const nameWeaknessesArray = dataWeaknesses.damage_relations.double_damage_from;

        spritePokemon.src = await dataAPI['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        spritePokemon.style.display = 'block';

        namePokemon.innerHTML = dataAPI.name[0].toUpperCase() + dataAPI.name.substring(1);
        idPokemon.innerHTML = dataAPI.id;


        textGenus.innerHTML = nameGenus

        const textAbility = document.querySelector('.textAbility')
        textAbility.innerHTML = dataAPI.abilities[0].ability.name

        dataAPI.types.forEach(element => {
            const textTypes_1 = document.querySelector('.textTypes_1')
            textTypes_1.innerHTML = dataAPI.types[0].type.name

            const textTypes_2 = document.querySelector('.textTypes_2')
            if(dataAPI.types.length > 1){
                textTypes_2.innerHTML = dataAPI.types[1].type.name
            }else{
                textTypes_2.innerHTML = ''
            }
            
        });
        

        

        nameWeaknessesArray.forEach(element => {
            
            const textWeaknesses_1 = document.querySelector('.textWeaknesses_1')
            const textWeaknesses_2 = document.querySelector('.textWeaknesses_2')
            const textWeaknesses_3 = document.querySelector('.textWeaknesses_3')
            const textWeaknesses_4 = document.querySelector('.textWeaknesses_4')
            const textWeaknesses_5 = document.querySelector('.textWeaknesses_5')
            
            switch (nameWeaknessesArray.length) {
                case 1:
                    textWeaknesses_5.innerHTML =  ''
                    textWeaknesses_4.innerHTML =  ''
                    textWeaknesses_3.innerHTML =  ''
                    textWeaknesses_2.innerHTML =  ''
                    textWeaknesses_1.innerHTML =  nameWeaknessesArray[0].name
                    break;
            
                case 2:
                    textWeaknesses_5.innerHTML =  ''
                    textWeaknesses_4.innerHTML =  ''
                    textWeaknesses_3.innerHTML =  ''
                    textWeaknesses_2.innerHTML =  nameWeaknessesArray[1].name
                    textWeaknesses_1.innerHTML =  nameWeaknessesArray[0].name
                    break;
            
                case 3:
                    textWeaknesses_5.innerHTML =  ''
                    textWeaknesses_4.innerHTML =  ''
                    textWeaknesses_3.innerHTML =  nameWeaknessesArray[2].name
                    textWeaknesses_2.innerHTML =  nameWeaknessesArray[1].name
                    textWeaknesses_1.innerHTML =  nameWeaknessesArray[0].name
                    break;
            
                case 4:
                    textWeaknesses_5.innerHTML =  ''
                    textWeaknesses_4.innerHTML =  nameWeaknessesArray[3].name
                    textWeaknesses_3.innerHTML =  nameWeaknessesArray[2].name
                    textWeaknesses_2.innerHTML =  nameWeaknessesArray[1].name
                    textWeaknesses_1.innerHTML =  nameWeaknessesArray[0].name
                    break;
            
                case 5:
                    textWeaknesses_5.innerHTML =  nameWeaknessesArray[4].name
                    textWeaknesses_4.innerHTML =  nameWeaknessesArray[3].name
                    textWeaknesses_3.innerHTML =  nameWeaknessesArray[2].name
                    textWeaknesses_2.innerHTML =  nameWeaknessesArray[1].name
                    textWeaknesses_1.innerHTML =  nameWeaknessesArray[0].name
                    break;
            
                default:
                    break;
            }
        });

        input.value = '';
        searchPokemon = dataAPI.id;
        
    } catch (error) {
        console.error(error)
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