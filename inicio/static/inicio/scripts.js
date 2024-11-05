// ----------  FECHA Y HORA  ------------

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('horas').textContent = hours;
    document.getElementById('minutos').textContent = minutes;
    document.getElementById('segundos').textContent = seconds;

    // Actualizar la fecha
    const day = now.getDate();
    const monthNames = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", 
                        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();

    document.getElementById('fecha').textContent = `${day} ${month} ${year}`;
}

setInterval(updateTime, 1000);

// Función para mostrar el día actual en el encabezado
function mostrarDiaActual() {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fechaActual = new Date();
    const diaSemana = diasSemana[fechaActual.getDay()].toUpperCase();
    const diaNumero = fechaActual.getDate();
    
    document.getElementById('current-day').textContent = `${diaSemana} ${diaNumero}`;
}

// ----------  CLIMA  ------------

const apiKey = '2abe0509728e9c6f401eb355c235c6c0';
const ciudad = 'Buenos Aires';

async function obtenerClima() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`);
        
        if (!response.ok) throw new Error('Error al obtener el clima');
        
        const data = await response.json();
        
        document.getElementById('temperature').textContent = `AHORA: ${Math.round(data.main.temp)}°C`;
        document.getElementById('temp-max').textContent = `MAX: ${Math.round(data.main.temp_max)}°C`;
        document.getElementById('temp-min').textContent = `MIN: ${Math.round(data.main.temp_min)}°C`;
        document.getElementById('humidity').textContent = `HUMEDAD: ${data.main.humidity}%`;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        obtenerPronostico();

    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo obtener el clima. Intenta nuevamente más tarde.'); // Mostrar error al usuario
    }
}

async function obtenerPronostico() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`);
        
        if (!response.ok) throw new Error('Error al obtener el pronóstico');
        
        const data = await response.json();
        const pronosticos = data.list;

        for (let i = 1; i <= 4; i++) {
            const pronostico = pronosticos[i * 8];

            const fecha = new Date(pronostico.dt * 1000);
            const opcionesDia = { weekday: 'long' };
            const dia = fecha.toLocaleDateString('es-ES', opcionesDia).toUpperCase();
            const diaNumero = fecha.getDate();

            document.getElementById(`hora-${i * 24}h`).textContent = `${dia} ${diaNumero}`;

            const maxTemp = Math.round(pronosticos.slice(i * 8 - 8, i * 8).reduce((max, p) => Math.max(max, p.main.temp_max), -Infinity));
            const minTemp = Math.round(pronosticos.slice(i * 8 - 8, i * 8).reduce((min, p) => Math.min(min, p.main.temp_min), Infinity));
            
            document.getElementById(`temperature-${i * 24}h`).innerHTML = `MAX: ${maxTemp}°C<br>MIN: ${minTemp}°C`;
            document.getElementById(`weather-icon-${i * 24}h`).src = `http://openweathermap.org/img/wn/${pronostico.weather[0].icon}@2x.png`;
        }

    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo obtener el pronóstico. Intenta nuevamente más tarde.'); // Mostrar error al usuario
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    mostrarDiaActual();
    obtenerClima();
});

// Actualiza el clima cada 10 minutos
setInterval(obtenerClima, 600000);

// Cambia el color de los segundos y el fondo del clima al presionar el botón
const colorToggleBtn = document.getElementById('color-toggle');
let colorState = 0; // 0: azul claro, 1: rojo suave, 2: verde suave

colorToggleBtn.addEventListener('click', () => {
    const segundos = document.getElementById('segundos');
    const climaActual = document.getElementById('clima-actual');

    colorState = (colorState + 1) % 4; // Incrementa el estado y vuelve a 0 si llega a 3

    switch (colorState) {
        case 0: // Azul claro
            segundos.style.color = '#1e90ff'; // Color para los segundos
            climaActual.style.backgroundColor = '#1e90ff'; // Color original para el fondo del clima
            colorToggleBtn.style.backgroundColor = '#1e90ff'; // Color del botón
            break;
        case 1: // Blanco
            segundos.style.color = '#ffffff'; // Cambia a Blanco
            climaActual.style.backgroundColor = '#929292'; // Cambia el fondo a Gris
            colorToggleBtn.style.backgroundColor = '#484848'; // Color del botón
            break;
        case 2: // Verde suave
            segundos.style.color = '#4caf50'; // Cambia a verde suave
            climaActual.style.backgroundColor = '#4caf50'; // Cambia el fondo a verde suave
            colorToggleBtn.style.backgroundColor = '#4caf50'; // Color del botón
            break;
        case 3: // Violeta
            segundos.style.color = '#8535c6'; // Color para los segundos
            climaActual.style.backgroundColor = '#8535c6'; // Color del fondo del clima
            colorToggleBtn.style.backgroundColor = '#8535c6'; // Color del botón
            break;
    }
});
