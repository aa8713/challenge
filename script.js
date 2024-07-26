
document.addEventListener('DOMContentLoaded', () => {
    const encryptButton = document.getElementById('encrypt-btn');
    const decryptButton = document.getElementById('decrypt-btn');
    const copyButton = document.getElementById('copy-btn');
    const textarea = document.getElementById('texto');
    const messageTitle = document.getElementById('message-title');
    const messageText = document.getElementById('message-text');
    const illustrationImg = document.getElementById('illustration-img');
    const messageContainer = document.getElementById('message-container');

    const shift = 3; // Cantidad de desplazamiento para el cifrado César

    function encrypt(text) {
        return text.split('')
            .map(char => {
                if (char >= 'a' && char <= 'z') {
                    return String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
                }
                return char;
            })
            .join('');
    }

    function decrypt(text) {
        return text.split('')
            .map(char => {
                if (char >= 'a' && char <= 'z') {
                    return String.fromCharCode((char.charCodeAt(0) - 97 - shift + 26) % 26 + 97);
                }
                return char;
            })
            .join('');
    }

    function validateText(text) {
        const hasUppercase = /[A-Z]/.test(text);
        const hasAccent = /[áéíóúü]/.test(text);

        if (hasUppercase && hasAccent) {
            alert('El texto no puede contener letras mayúsculas ni acentos.');
            return false;
        } else if (hasUppercase) {
            alert('El texto no puede contener letras mayúsculas.');
            return false;
        } else if (hasAccent) {
            alert('El texto no puede contener letras con acento.');
            return false;
        }
        return true;
    }

    function showResult(title, text) {
        messageTitle.textContent = title;
        messageText.textContent = text;
        messageContainer.classList.remove('hidden');
        copyButton.classList.remove('hidden'); // Muestra el botón de copiar
        illustrationImg.classList.add('hidden'); // Oculta la imagen
    }

    function hideResult() {
        messageTitle.textContent = 'Ningún mensaje fue encontrado';
        messageText.textContent = 'Ingresa el texto que desees encriptar o desencriptar.';
        messageContainer.classList.remove('hidden');
        copyButton.classList.add('hidden'); // Ocultar el botón de copiar
        illustrationImg.classList.remove('hidden'); // Muestrar la imagen
    }

    encryptButton.addEventListener('click', () => {
        const inputText = textarea.value.trim();
        if (validateText(inputText)) {
            const encryptedText = encrypt(inputText);
            showResult('Mensaje Encriptado', encryptedText);
        } else {
            hideResult();
        }
    });

    decryptButton.addEventListener('click', () => {
        const inputText = textarea.value.trim();
        if (validateText(inputText)) {
            const decryptedText = decrypt(inputText);
            showResult('Mensaje Desencriptado', decryptedText);
        } else {
            hideResult();
        }
    });

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(messageText.textContent)
            .then(() => alert('Mensaje copiado al portapapeles!'))
            .catch(err => console.error('Error al copiar el mensaje:', err));
    });

    // oculta el botón de copiar
    copyButton.classList.add('hidden');
});

