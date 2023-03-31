const FetchPokemon = async (pokemon)=>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}
const FetchGenus = async (pokemon) => { 
    const genus = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    if(genus.status === 200){
        const dataGenus = await genus.json();
        const genusNameEnglish = dataGenus.genera[7].genus;
        const nameGenus = genusNameEnglish.replace('Pokémon', '');


        console.log(`Genus: ${nameGenus}`);
        return dataGenus;
    }
}
const Renderpokemon = async (pokemon)=>{
    const data = await FetchPokemon(pokemon);
    if(data){
        
        console.log(`id: ${data.id} name: ${data.name}`)
        await FetchGenus(pokemon)
        console.log(`ability: ${data.abilities[0].ability.name}`)
        data.types.forEach(element => {
            console.log(`types: ${element.type.name}`)
        });
        
        

        const FetchWeaknesses = async (pokemon) => {
            const url = await fetch(data.types[0].type.url) 
            if(url.status === 200){
                const dataWeaknesses = await url.json();
                const nameWeaknessesArray = dataWeaknesses.damage_relations.double_damage_from
                nameWeaknessesArray.forEach(element => {
                    console.log(`weaknesses: ${element.name}`)
                });
                return dataWeaknesses;
            }
        }
        FetchWeaknesses(pokemon)
        
    }
}


module.exports = Renderpokemon;