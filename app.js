let precios = {};

window.onload = async () => {

  try {

    const response = await fetch('./data/precios.json');

    precios = await response.json();

    cargarLocalidades();

    console.log('Precios cargados');

  } catch (error) {

    console.error('Error cargando JSON', error);

  }

};
