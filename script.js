const plaintext = document.getElementById("plaintext");
const ciphertext = document.getElementById("ciphertext");

plaintext.addEventListener(
    "change", function(event) {
    ciphertext.innerHTML += plaintext.value;
    plaintext.value = "";
  }
);
