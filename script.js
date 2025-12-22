const plaintext = document.getElementById("plaintext");
const ciphertext = document.getElementById("ciphertext");
const rotors_to_use = document.getElementById("rotor-nums");
let rotors_used = [];

rotors_to_use.addEventListener(
    "change", function(event) {
        for (const char of rotors_to_use.value){
            rotors_used.push(parseInt(char))
        }
        rotors_to_use.remove()
        document.getElementById("rotor-label").innerHTML = rotors_used
  }
);

plaintext.addEventListener(
    "change", function(event) {
    ciphertext.innerHTML += plaintext.value;
    plaintext.value = "";
  }
);

const ROTORS = [
    {'alphabet':"EKMFLGDQVZNTOWYHXUSPAIBRCJ", 'notches':['Y']},
    {'alphabet':"AJDKSIRUXBLHWTMCQGZNPYFVOE", 'notches':['M']},
    {'alphabet':"BDFHJLCPRTXVZNYEIWGAKMUSQO", 'notches':['D']},
    {'alphabet':"ESOVPZJAYQUIRHXLNFTGKDCMWB", 'notches':['R']},
    {'alphabet':"VZBRGITYUPSDNHLXAWMJQOFECK", 'notches':['H']},
    {'alphabet':"JPGVOUMFYQBENHZRDKASXLICTW", 'notches':['H', 'U']},
    {'alphabet':"NZJHGRCXMYSWBOUFAIVLPEKQDT", 'notches':['H', 'U']},
    {'alphabet':"FKQHTLXOCBJSPDZRAMEWNIUYGV", 'notches':['H', 'U']},
    {'alphabet':"YRUHQSLDPXNGOKMIEBFZCWVJAT", 'notches':['H', 'U']},
    {'alphabet':"FVPJIAOYEDRZXWGCTKUQSBNMHL", 'notches':['H', 'U']},
    {'alphabet':"WDZBIPLTENXGUJQFOSRHMYAKVC", 'notches':[]}//Reflection Rotor(doesn't move)
];

var rotor_pos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


