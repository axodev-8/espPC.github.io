const ESP_IP = "http://192.168.1.50"; // <--- cambia por la IP de tu ESP8266

const statusText = document.getElementById("status");
const btn = document.getElementById("powerBtn");

async function checkStatus() {
  try {
    const res = await fetch(`${ESP_IP}/status`);
    const text = await res.text();
    statusText.textContent = "PC: " + text;
    if (text.includes("Encendida")) {
      statusText.style.color = "limegreen";
    } else {
      statusText.style.color = "red";
    }
  } catch {
    statusText.textContent = "Error al conectar con el ESP8266";
    statusText.style.color = "orange";
  }
}

btn.addEventListener("click", async () => {
  statusText.textContent = "Enviando señal...";
  try {
    const res = await fetch(`${ESP_IP}/wake`);
    const text = await res.text();
    statusText.textContent = text;
    setTimeout(checkStatus, 8000); // espera 8 seg para volver a comprobar
  } catch {
    statusText.textContent = "Error: no se pudo enviar la señal";
  }
});

// Verificar cada 5 segundos
setInterval(checkStatus, 5000);
checkStatus();
