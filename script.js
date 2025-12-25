const plaintext = document.getElementById("plaintext");
const ciphertext = document.getElementById("ciphertext");
const num_rotors = document.getElementById("num-rotors");
const rotors_form = document.getElementById("rotors-form");
const plugboard_to_use = document.getElementById("plugboard-pairs");
const plugboard_label = document.getElementById("plugboard-label");

var idx = 0;
var handling_active = false;
let sleep_time = 100;

const ROTORS = [
    {'alphabet':'EKMFLGDQVZNTOWYHXUSPAIBRCJ', 'notches':['Y']},
    {'alphabet':'AJDKSIRUXBLHWTMCQGZNPYFVOE', 'notches':['M']},
    {'alphabet':'BDFHJLCPRTXVZNYEIWGAKMUSQO', 'notches':['D']},
    {'alphabet':'ESOVPZJAYQUIRHXLNFTGKDCMWB', 'notches':['R']},
    {'alphabet':'VZBRGITYUPSDNHLXAWMJQOFECK', 'notches':['H']},
    {'alphabet':'JPGVOUMFYQBENHZRDKASXLICTW', 'notches':['H', 'U']},
    {'alphabet':'NZJHGRCXMYSWBOUFAIVLPEKQDT', 'notches':['H', 'U']},
    {'alphabet':'FKQHTLXOCBJSPDZRAMEWNIUYGV', 'notches':['H', 'U']},
    {'alphabet':'YRUHQSLDPXNGOKMIEBFZCWVJAT', 'notches':['H', 'U']},
    {'alphabet':'FVPJIAOYEDRZXWGCTKUQSBNMHL', 'notches':['H', 'U']},
    {'alphabet':'WDZBIPLTENXGUJQFOSRHMYAKVC', 'notches':[]}//Reflection Rotor(doesn't move)
];

var rotor_pos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let plugboard_pairs = {}

//Because git pages uses cookies and it's annoying
plugboard_to_use.value = "";
plaintext.value = "";
rotors_form.innerHTML = "";
for (let i=0; i<num_rotors.value; i++){
    rotors_form.innerHTML += `<input type="number" id="rotor_num_${i}" min="0" max="9" value="${i}"> `;
}

num_rotors.addEventListener(
    "input", function(event) {
        rotors_form.innerHTML = "";
        for (let i=0; i<num_rotors.value; i++){
            rotors_form.innerHTML += `<input type="number" id="rotor_num_${i}" min="0" max="9" value="${i}"> `;
        }
  }
);

plugboard_to_use.addEventListener(
    "change", function(event) {
        plugboard_to_use.value = plugboard_to_use.value.toUpperCase();
        plugboard_pairs[plugboard_to_use.value[0]] = plugboard_to_use.value[1];
        plugboard_pairs[plugboard_to_use.value[1]] = plugboard_to_use.value[0];
        plugboard_to_use.value = "";
        plugboard_label.innerHTML = JSON.stringify(plugboard_pairs);
  }
);

plaintext.addEventListener(
    "input", function(event) {
        plaintext.value = plaintext.value.toUpperCase();
        if (!handling_active){
            handle_input();
        }
    }
);

async function handle_input(){
    handling_active = true;

    if (ciphertext.innerHTML == "Ciphertext Shows Up Here"){
        ciphertext.innerHTML = "";
    }

    if (idx > plaintext.value.length){
        idx = 0;
        ciphertext.innerHTML = "";
    }

    while (idx < plaintext.value.length){
        const char = plaintext.value[idx];
        idx++;
        encrypted_char = encrypt(char);
        ciphertext.innerHTML += encrypted_char;
    
        if (65 <= encrypted_char.charCodeAt(0) && encrypted_char.charCodeAt(0) <= 90){
            document.getElementById(encrypted_char).style.backgroundColor = "yellow";
            document.getElementById(encrypted_char).style.color = "black";
            await sleep(sleep_time);
            document.getElementById(encrypted_char).style.backgroundColor = "black";
            document.getElementById(encrypted_char).style.color = "antiquewhite";
        }else{
            await sleep(sleep_time);
        }
    }

    handling_active = false;
    if (ciphertext.innerHTML == ""){
        ciphertext.innerHTML = "Ciphertext Shows Up Here";
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


function apply_plugboard(char){
    if (char in plugboard_pairs){
        char = plugboard_pairs[char];
    }
    return char
}

function rotors_used(i){
    return document.getElementById(`rotor_num_${i}`).value;
}

function rotate_rotors(){
    rotor_pos[rotors_used(0)] = (rotor_pos[rotors_used(0)]+1)%26;
    for (var i = 1; i<num_rotors.value ; i++){
        rotor_num = rotors_used(i)
        if (String.fromCharCode(rotors_used(i-1)+65) in ROTORS[rotors_used(i-1)]['notches']){
            rotor_pos[rotor_num] = (rotor_pos[rotor_num]+1)%26;
        }
    }
}

function apply_rotor(rotor_num, char){
    shifted_char = ((char.charCodeAt(0)+rotor_pos[rotor_num])-65)%26;
    corr_letter = ROTORS[rotor_num]['alphabet'][shifted_char];
    letter_out = ((corr_letter.charCodeAt(0)-rotor_pos[rotor_num])-65+26)%26;
    return String.fromCharCode(letter_out+65);
}

function apply_reversed_rotor(rotor_num, char){
    shifted_char = String.fromCharCode(((char.charCodeAt(0)+rotor_pos[rotor_num])-65)%26+65);
    for (var i = 0; i<26; i++){
        if (shifted_char == ROTORS[rotor_num]['alphabet'][i]){
            corr_letter = String.fromCharCode(i+65);
        }
    }
    letter_out = ((corr_letter.charCodeAt(0)-rotor_pos[rotor_num])-65+26)%26;
    return String.fromCharCode(letter_out+65);
}

function encrypt(char){
    if (65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90){
        rotate_rotors();

        //plugboard
        char = apply_plugboard(char);

        //rotor scrambler
        for (var i = 0; i<num_rotors.value ; i++){
            rotor_num = rotors_used(i);
            char = apply_rotor(rotor_num, char);
        }

        //reflector
        char = ROTORS[10]['alphabet'][((char.charCodeAt(0)+rotor_pos[10])-65)%26];

        //rotor scrambler(reversed)
        for (var i = num_rotors.value-1; i>=0 ; i--){
            rotor_num = rotors_used(i);
            char = apply_reversed_rotor(rotor_num, char);
        }

        //plugboard
        char = apply_plugboard(char);
    }
    return char;
}

