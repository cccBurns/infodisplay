// ----------  FECHA AQUI  ------------

function actualizarFecha() {
    const diasSemana = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

    const fechaActual = new Date();
    const diaSemana = diasSemana[fechaActual.getDay()];
    const diaMes = fechaActual.getDate();
    const mes = meses[fechaActual.getMonth()];
    const anio = fechaActual.getFullYear();

    document.getElementById('dia').textContent = `${diaSemana} ${diaMes}`;
    document.getElementById('mes').textContent = mes;
    document.getElementById('anio').textContent = anio;
}

window.onload = function() {
    actualizarFecha();
    setInterval(actualizarFecha, 60000);
};

// ----------  HORA AQUI  ------------

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('hora').textContent = `${hours}:${minutes}:${seconds}`;
}

updateTime();
setInterval(updateTime, 1000);

// Función para mostrar el día actual en el encabezado
function mostrarDiaActual() {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fechaActual = new Date();
    const diaSemana = diasSemana[fechaActual.getDay()].toUpperCase(); // Convertir el día a mayúsculas
    const diaNumero = fechaActual.getDate(); // Obtener el número del día
    
    // Cambiar el contenido del <h3 id="current-day">
    document.getElementById('current-day').textContent = `${diaSemana} ${diaNumero}`;
}

// Clave de API y ciudad
const apiKey = '2abe0509728e9c6f401eb355c235c6c0';
const ciudad = 'Buenos Aires';

async function obtenerClima() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`);
        
        if (!response.ok) {
            throw new Error('Error al obtener el clima');
        }
        
        const data = await response.json();
        
        // Elementos del clima actual
        document.getElementById('temperature').textContent = `Ahora: ${Math.round(data.main.temp)}°C`;
        document.getElementById('temp-max').textContent = `Máx: ${Math.round(data.main.temp_max)}°C`; // Mostrar temperatura máxima
        document.getElementById('temp-min').textContent = `Mín: ${Math.round(data.main.temp_min)}°C`; // Mostrar temperatura mínima
        document.getElementById('humidity').textContent = `Humedad: ${data.main.humidity}%`;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // Obtener el pronóstico
        obtenerPronostico();

    } catch (error) {
        console.error('Error:', error);
    }
}

async function obtenerPronostico() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`);
        
        if (!response.ok) {
            throw new Error('Error al obtener el pronóstico');
        }
        
        const data = await response.json();
        const pronosticos = data.list;

        // Mostrar los pronósticos para los próximos días
        for (let i = 1; i <= 4; i++) {
            const pronostico = pronosticos[i * 8];
            
            const fecha = new Date(pronostico.dt * 1000);
            const opciones = { weekday: 'long' };
            const dia = fecha.toLocaleDateString('es-ES', opciones).toUpperCase();
            document.getElementById(`hora-${i * 24}h`).textContent = dia;

            const maxTemp = Math.round(pronosticos.slice(i * 8 - 8, i * 8).reduce((max, p) => Math.max(max, p.main.temp_max), -Infinity));
            const minTemp = Math.round(pronosticos.slice(i * 8 - 8, i * 8).reduce((min, p) => Math.min(min, p.main.temp_min), Infinity));
            
            document.getElementById(`temperature-${i * 24}h`).innerHTML = `Max: ${maxTemp}°C<br>Min: ${minTemp}°C`;
            document.getElementById(`weather-icon-${i * 24}h`).src = `http://openweathermap.org/img/wn/${pronostico.weather[0].icon}@2x.png`;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

// Llamada inicial para obtener el clima y el día
document.addEventListener('DOMContentLoaded', (event) => {
    mostrarDiaActual(); // Mostrar el día actual
    obtenerClima();     // Obtener el clima actual
});

// Actualiza el clima cada 10 minutos
setInterval(obtenerClima, 600000);
