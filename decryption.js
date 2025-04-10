function validateKey(input, mpourdascounter) {
  if (input.value.length > 16) {
    input.value = input.value.substring(0, 16);
  }
  document.getElementById(mpourdascounter).textContent = input.value.length + "/16";
}

function decryptAES(encryptedText, key) {
  const keyBytes = CryptoJS.enc.Utf8.parse(key);
  const bytes = CryptoJS.AES.decrypt(encryptedText, keyBytes, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  return decrypted || "Decryption failed! Check your key or input.";
}

function decryptText() {
  const encryptedText = document.getElementById('mpourdasinput').value;
  const key = document.getElementById('mpourdasdecrypt').value;

  if (key.length !== 16) {
    alert("Key must be exactly 16 characters long!");
    return;
  }

  if (encryptedText.trim() === "") {
    alert("Please enter encrypted text!");
    return;
  }

  const decryptedText = decryptAES(encryptedText, key);
  document.getElementById('decryptedOutput').textContent = decryptedText;

  document.getElementById('copyButton').style.display = 'inline-block';
}

function copyDecryptedText() {
  const decryptedText = document.getElementById('decryptedOutput').textContent;

  if (decryptedText) {
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = decryptedText;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert("Decrypted text copied to clipboard!");
  }
}