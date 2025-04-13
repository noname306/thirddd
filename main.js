const form = document.getElementById('form');
const textArea = document.getElementById('text');
const langSelect = document.getElementById('til');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const text = textArea.value.trim();
    const targetLang = langSelect.value;

    if (!text) return;

    try {
        // Перевод через API
        const translatedText = await translateText(text, targetLang);

        // Озвучка переведённого текста
        const utterance = new SpeechSynthesisUtterance(translatedText);
        utterance.lang = targetLang;
        speechSynthesis.speak(utterance);
    } catch (error) {
        console.error('Ошибка при переводе или озвучке:', error);
    }
});

// Функция перевода через API (например, LibreTranslate)
async function translateText(text, targetLang) {
    const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: text,
            source: 'auto',
            target: targetLang.split('-')[0], // ru-RU → ru
            format: 'text'
        })
    });

    const data = await response.json();
    return data.translatedText;
}
