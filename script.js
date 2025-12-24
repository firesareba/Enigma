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
    {'alphabet':'EKMFLGDQVZNTOWYHXUSPAIBRCJ', 'reversed_alphabet':'UWYGADFPVZBECKMTHXSLRINQOJ', 'notches':['Y']},
    {'alphabet':'AJDKSIRUXBLHWTMCQGZNPYFVOE', 'reversed_alphabet':'AJPCZWRLFBDKOTYUQGENHXMIVS', 'notches':['M']},
    {'alphabet':'BDFHJLCPRTXVZNYEIWGAKMUSQO', 'reversed_alphabet':'TAGBPCSDQEUFVNZHYIXJWLRKOM', 'notches':['D']},
    {'alphabet':'ESOVPZJAYQUIRHXLNFTGKDCMWB', 'reversed_alphabet':'HZWVARTNLGUPXQCEJMBSKDYOIF', 'notches':['R']},
    {'alphabet':'VZBRGITYUPSDNHLXAWMJQOFECK', 'reversed_alphabet':'QCYLXWENFTZOSMVJUDKGIARPHB', 'notches':['H']},
    {'alphabet':'JPGVOUMFYQBENHZRDKASXLICTW', 'reversed_alphabet':'SKXQLHCNWARVGMEBJPTYFDZUIO', 'notches':['H', 'U']},
    {'alphabet':'NZJHGRCXMYSWBOUFAIVLPEKQDT', 'reversed_alphabet':'QMGYVPEDRCWTIANUXFKZOSLHJB', 'notches':['H', 'U']},
    {'alphabet':'FKQHTLXOCBJSPDZRAMEWNIUYGV', 'reversed_alphabet':'QJINSAYDVKBFRUHMCPLEWZTGXO', 'notches':['H', 'U']},
    {'alphabet':'YRUHQSLDPXNGOKMIEBFZCWVJAT', 'reversed_alphabet':'YRUHQSLDPXNGOKMIEBFZCWVJAT', 'notches':['H', 'U']},
    {'alphabet':'FVPJIAOYEDRZXWGCTKUQSBNMHL', 'reversed_alphabet':'FVPJIAOYEDRZXWGCTKUQSBNMHL', 'notches':['H', 'U']},
    {'alphabet':'WDZBIPLTENXGUJQFOSRHMYAKVC', 'reversed_alphabet':'WDZBIPLTENXGUJQFOSRHMYAKVC', 'notches':[]}//Reflection Rotor(doesn't move)
];

var rotor_pos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function apply_plugboard(char){
    if (char in plugboard_pairs){
        char = plugboard_pairs[char];
    }
    return char
}

function rotate_rotors(){
    rotor_pos[rotors_used[0]] = (rotor_pos[rotors_used[0]]+1)%26;
    for (var i = 1; i<rotors_used.length ; i++){
        rotor_num = rotors_used[i]
        if (String.fromCharCode(rotors_used[i-1]+65) in ROTORS[rotors_used[i-1]]['notches']){
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
    shifted_char = ((char.charCodeAt(0)+rotor_pos[rotor_num])-65)%26;
    corr_letter = ROTORS[rotor_num]['reversed_alphabet'][shifted_char];
    letter_out = ((corr_letter.charCodeAt(0)-rotor_pos[rotor_num])-65+26)%26;
    return String.fromCharCode(letter_out+65);
}

function encrypt(char){
    if (65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90){
        rotate_rotors();

        //plugboard
        char = apply_plugboard(char);

        //rotor scrambler
        for (var i = 0; i<rotors_used.length ; i++){
            rotor_num = rotors_used[i];
            char = apply_rotor(rotor_num, char);
        }

        //reflector
        char = ROTORS[10]['alphabet'][((char.charCodeAt(0)+rotor_pos[10])-65)%26];

        //rotor scrambler(reversed)
        for (var i = rotors_used.length-1; i>=0 ; i--){
            rotor_num = rotors_used[i];
            char = apply_reversed_rotor(rotor_num, char);
        }

        //plugboard
        char = apply_plugboard(char);
    }
    ciphertext.innerHTML += char;
}
