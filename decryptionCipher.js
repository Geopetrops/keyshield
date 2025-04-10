function decryptCaesarText() {
    const encryptedText = document.getElementById("caesarEncryptedText").value;
    const key = parseInt(document.getElementById("caesarDecryptKey").value);
    if (encryptedText === "" || isNaN(key)) {
        alert("Please enter valid encrypted text and key");
        return;
    }

    let decryptedText = "";
    for (let i = 0; i < encryptedText.length; i++) {
        let char = encryptedText.charAt(i);
        if (char.match(/[a-z]/i)) {
            const code = encryptedText.charCodeAt(i);
            const isLowerCase = char === char.toLowerCase();
            const base = isLowerCase ? 97 : 65;
            decryptedText += String.fromCharCode((code - base - key + 26) % 26 + base);
        } else {
            decryptedText += char;
        }
    }
    document.getElementById("decryptedCaesarOutput").textContent = decryptedText;
    document.getElementById("copyCaesarDecryptButton").style.display = "inline-block";
}

function copyDecryptedCaesarText() {
    const text = document.getElementById("decryptedCaesarOutput").textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("Decrypted text copied to clipboard!");
    });
}
