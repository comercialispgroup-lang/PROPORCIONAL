let precios = {};

const meses = [
  { nombre: 'Enero', dias: 31 },
  { nombre: 'Febrero', dias: 28 },
  { nombre: 'Marzo', dias: 31 },
  { nombre: 'Abril', dias: 30 },
  { nombre: 'Mayo', dias: 31 },
  { nombre: 'Junio', dias: 30 },
  { nombre: 'Julio', dias: 31 },
  { nombre: 'Agosto', dias: 31 },
  { nombre: 'Septiembre', dias: 30 },
  { nombre: 'Octubre', dias: 31 },
  { nombre: 'Noviembre', dias: 30 },
  { nombre: 'Diciembre', dias: 31 }
];

const excelFile = document.getElementById('excelFile');
const status = document.getElementById('status');

const localidad = document.getElementById('localidad');
const tecnologia = document.getElementById('tecnologia');
const tipoCliente = document.getElementById('tipoCliente');
const planViejo = document.getElementById('planViejo');
const planNuevo = document.getElementById('planNuevo');
const valorViejo = document.getElementById('valorViejo');
const valorNuevo = document.getElementById('valorNuevo');

const mesSelect = document.getElementById('mes');

meses.forEach((m, i) => {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = m.nombre;
  mesSelect.appendChild(option);
});

excelFile.addEventListener('change', leerExcel);

function leerExcel(e) {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = function(evt) {

    const data = new Uint8Array(evt.target.result);

    const workbook = XLSX.read(data, { type: 'array' });

    const sheetName = workbook.SheetNames[0];

    const sheet = workbook.Sheets[sheetName];

    const json = XLSX.utils.sheet_to_json(sheet, {
      defval: ''
    });

    procesarExcel(json);
  };

  reader.readAsArrayBuffer(file);
}

function procesarExcel(rows) {

  precios = {};
  document.getElementById('resultadoCambio').innerHTML = 
