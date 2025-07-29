document.addEventListener('DOMContentLoaded', function () {
  const motivo = document.getElementById('motivo');
  const datosGenerales = document.getElementById('datosGenerales');
  const secciones = ['escuela', 'torneo', 'examenGups', 'examenDan'];
  const form = document.getElementById('formInscripcion');
  const mensajeFinal = document.getElementById('mensajeFinal');

  motivo.addEventListener('change', function () {
    const seleccion = motivo.value;

    // Oculta todo
    datosGenerales.classList.add('oculto');
    secciones.forEach(id => {
      document.getElementById(id).classList.add('oculto');
    });
    mensajeFinal.innerHTML = '';

    // Si se selecciona algo válido
    if (secciones.includes(seleccion)) {
      datosGenerales.classList.remove('oculto');

      // Muestra la sección correspondiente
      const seccion = document.getElementById(seleccion);
      seccion.classList.remove('oculto');

      if (seleccion === 'examenDan') {
        seccion.innerHTML = '<p><strong>Atención:</strong> El registro de examen DAN se realiza en otra sede.</p>';
      }
    }
  });

  // para tener en cuenta como hacer una sola validacion y mostrar texto en español

  const nombre = document.getElementById('nombre');

  nombre.addEventListener('change', function() {
    nombre.setCustomValidity('');
    console.log('!nombre.validity.valid', !nombre.validity.valid)
    
    if (!nombre.validity.valid) {
      nombre.setCustomValidity('Completa el nombre');  
    }
  })

  form.addEventListener('submit', function (event) {
    event.preventDefault();
   
    if (!form.checkValidity()) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const seleccion = motivo.value;

    if (seleccion === 'examenGups') {
      const categoria = document.getElementById('categoriaExamen')?.value;
      if (!categoria) {
        alert('Debe seleccionar una categoría');
        return;
      }

      const links = {
        blanco: 'https://ejemplo.com/teoria/blanco',
        'blanco-amarilla': 'https://ejemplo.com/teoria/blanco-amarilla',
        amarillo: 'https://ejemplo.com/teoria/amarillo',
        'amarillo-verde': 'https://ejemplo.com/teoria/amarillo-verde',
        verde: 'https://ejemplo.com/teoria/verde',
        'verde-azul': 'https://ejemplo.com/teoria/verde-azul',
        azul: 'https://ejemplo.com/teoria/azul',
        'azul-roja': 'https://ejemplo.com/teoria/azul-roja',
        rojo: 'https://ejemplo.com/teoria/rojo',
        'rojo-negro': 'https://ejemplo.com/teoria/rojo-negro'
      };

      const url = links[categoria];
      mensajeFinal.innerHTML = `Formulario enviado. Estudia la teoría: <a href="${url}" target="_blank">${url}</a>`;
    } else if (seleccion === 'examenDan') {
      mensajeFinal.innerHTML = 'Formulario enviado con exito.';
    } else {
      mensajeFinal.innerHTML = 'Formulario enviado con éxito. ¡Gracias!';
    }
  });
});
