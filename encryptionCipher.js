function encryptCaesarText() {
    const text = document.getElementById("caesarText").value;
    const key = parseInt(document.getElementById("caesarKey").value);
    if (text === "" || isNaN(key)) {
        alert("Please enter valid text and key");
        return;
    }

    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);
        if (char.match(/[a-z]/i)) {
            const code = text.charCodeAt(i);
            const isLowerCase = char === char.toLowerCase();
            const base = isLowerCase ? 97 : 65;
            encryptedText += String.fromCharCode((code - base + key) % 26 + base);
        } else {
            encryptedText += char;
        }
    }
    document.getElementById("encryptedCaesarOutput").textContent = encryptedText;
    document.getElementById("copyCaesarButton").style.display = "inline-block";
}

function copyEncryptedCaesarText() {
    const text = document.getElementById("encryptedCaesarOutput").textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("Encrypted text copied to clipboard!");
    });
}