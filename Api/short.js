const display = async () => {
  let cnt = 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50`);
  const data = await response.json();
  for (let i = 0; i < data.results.length; i++) {
    console.log(`============================
          \n[ Pokemon # ${cnt + i} ]> : ${data.results[i].name} ]`);

    const pokemon = await fetch(`${data.results[i].url}`);
    const tdata = await pokemon.json();

    console.log(` ___________\n[ > Types < ]\n`);
    for (let j = 0; j < tdata.types.length; j++) {
      console.log(` ${j + cnt}. ${tdata.types[j].type.name} `);
    }
    console.log(`\n _________\n[- Moves -]`);
    for (let j = 0; j < 2; j++) {
      // iterate children
      const moves = await fetch(`${tdata.moves[j].move.url}`);
      const mdata = await moves.json();
      console.log(
        `\n[${j + cnt}]\n[- ${tdata.moves[j].move.name} -] \n[- Hit_rate: ${
          mdata.accuracy
        } -]\n`
      );
      if (mdata.flavor_text_entries.length > j) {
        if (mdata.flavor_text_entries[j].language.name == "en") {
          console.log(
            ` _____________\n[ Flavor Text ]\n${mdata.flavor_text_entries[j].flavor_text}\n`
          );
        }
      }
    }
  }
};
display();