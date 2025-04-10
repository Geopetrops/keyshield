
function validateKey(input, mpourdascounter) {
  if (input.value.length > 16) {
    input.value = input.value.substring(0, 16);
  }
  document.getElementById(mpourdascounter).textContent = input.value.length + "/16";
}

function encryptAES(text, key) {
  const keyBytes = CryptoJS.enc.Utf8.parse(key);
  const textBytes = CryptoJS.enc.Utf8.parse(text);

  const encrypted = CryptoJS.AES.encrypt(textBytes, keyBytes, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  return encrypted.toString();
}

function encryptText() {
  const originalText = document.getElementById('mpourdastext').value;
  const key = document.getElementById('mpourdaskey').value;

  if (key.length !== 16) {
    alert("Key must be exactly 16 characters long!");
    return;
  }

  if (originalText.trim() === "") {
    alert("Please enter text to encrypt!");
    return;
  }

  const encryptedText = encryptAES(originalText, key);
  document.getElementById('encryptedOutput').textContent = encryptedText;

  document.getElementById('copyButton').style.display = 'inline-block';
}

function copyEncryptedText() {
  const encryptedText = document.getElementById('encryptedOutput').textContent;

  if (encryptedText) {
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = encryptedText;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert("Encrypted text copied to clipboard!");
  }
}