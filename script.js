const plaintext = document.getElementById("plaintext");
const ciphertext = document.getElementById("ciphertext");
const rotors_to_use = document.getElementById("rotor-nums");
const plugboard_to_use = document.getElementById("plugboard-pairs");
const plugboard_label = document.getElementById("plugboard-label");
let rotors_used = [];
let plugboard_pairs = {}

plugboard_to_use.addEventListener(
    "change", function(event) {
        plugboard_to_use.value = plugboard_to_use.value.toUpperCase();
        plugboard_pairs[plugboard_to_use.value[0]] = plugboard_to_use.value[1];
        plugboard_pairs[plugboard_to_use.value[1]] = plugboard_to_use.value[0];
        plugboard_to_use.value = "";
        plugboard_label.innerHTML = JSON.stringify(plugboard_pairs);
  }
);

rotors_to_use.addEventListener(
    "change", function(event) {
        for (const char of rotors_to_use.value){
            if (char >= '0' && char <= '9'){
                rotors_used.push(parseInt(char))
            }
        }
        rotors_to_use.remove()
        document.getElementById("rotor-label").innerHTML = rotors_used
  }
);

plaintext.addEventListener(
    "change", function(event) {
        for (const char of plaintext.value.toUpperCase()){
            encrypt(char);
        }
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

function encrypt(char){
    if (65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90){
        if (char in plugboard_pairs){
            char = plugboard_pairs[char];
        }
    }
    ciphertext.innerHTML += char;
}
