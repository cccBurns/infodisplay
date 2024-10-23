// scripts.js

// ----------  FECHA AQUI  ------------

function actualizarFecha() {
    const diasSemana = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

    const fechaActual = new Date();
    
    // Obtener el día de la semana y el día del mes
    const diaSemana = diasSemana[fechaActual.getDay()];
    const diaMes = fechaActual.getDate();

    // Obtener el mes y el año
    const mes = meses[fechaActual.getMonth()];
    const anio = fechaActual.getFullYear();

    // Actualizar los elementos en el HTML
    document.getElementById('dia').textContent = `${diaSemana} ${diaMes}`;
    document.getElementById('mes').textContent = mes;
    document.getElementById('anio').textContent = anio;
}

// Llamar a la función cuando la página cargue
window.onload = function() {
    actualizarFecha();
    setInterval(actualizarFecha, 60000); // Actualiza la fecha cada minuto
};


function updateTime() {
    const now = new Date(); // Obtiene la fecha y hora actuales

    // Obtiene las horas, minutos y segundos
    const hours = String(now.getHours()).padStart(2, '0'); // Formato de 24 horas
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Actualiza el elemento con el ID 'hora' sin AM/PM
    document.getElementById('hora').textContent = `${hours}:${minutes}:${seconds}`;
}

// Llama a la función para actualizar la hora al cargar la página
updateTime();
// Configura la función para que se ejecute cada segundo
setInterval(updateTime, 1000);



// Llama a la función de hora cada segundo
setInterval(updateTime, 1000);

// Llama a la función de fecha al cargar la página
updateDate();


const apiKey = '2abe0509728e9c6f401eb355c235c6c0';
const ciudad = 'Buenos Aires';

// Función para obtener los datos del clima
async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`);
        const data = await response.json();

        // Clima actual
        const currentWeatherElement = document.getElementById('current-weather');
        currentWeatherElement.innerHTML = `Clima actual: ${data.list[0].weather[0].description}, ${data.list[0].main.temp}°C`;

        // Pronósticos
        document.getElementById('forecast-1').innerHTML = `Mañana: ${data.list[8].weather[0].description}, ${data.list[8].main.temp_max}°C / ${data.list[8].main.temp_min}°C`;
        document.getElementById('forecast-2').innerHTML = `Pasado mañana: ${data.list[16].weather[0].description}, ${data.list[16].main.temp_max}°C / ${data.list[16].main.temp_min}°C`;
        document.getElementById('forecast-3').innerHTML = `3 días después: ${data.list[24].weather[0].description}, ${data.list[24].main.temp_max}°C / ${data.list[24].main.temp_min}°C`;
    } catch (error) {
        console.log('Error obteniendo los datos del clima', error);
    }
}

// Llama a la función de clima al cargar la página
getWeather();
