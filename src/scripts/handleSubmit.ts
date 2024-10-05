
// src/scripts/handleSubmit.ts
export async function handleSubmit(event: Event) {
    event.preventDefault();
    const emailInput = document.getElementById('kraken') as HTMLInputElement;
    const email = emailInput?.value;
  
    if (!email) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }
  
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  
    const result = await response.json();
    const statusMessage = document.getElementById('statusMessage');
    if (statusMessage) {
      statusMessage.textContent = result.message;
    }
  }
  