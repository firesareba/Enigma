var l1 = [];
var l2 = [];
var idx = 0;
var handling_active = false;
let sleep_time = 250;
var rotor_pos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let plugboard_pairs = {}

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

const plaintext = document.getElementById("plaintext");
const ciphertext = document.getElementById("ciphertext");
const num_rotors = document.getElementById("num-rotors");
const choose_rotors = document.getElementById("choose-rotors");
const plugboard_wrapper = document.getElementById('plugboard-wrapper');
const plugboard_canvas =  document.getElementById("canvas");
const plugboard_canvas_drawable =  plugboard_canvas.getContext("2d");

//Setup (mainly handling cookies)
plaintext.value = "";
choose_rotors.innerHTML = "";
for (let i=0; i<num_rotors.value; i++){
    choose_rotors.innerHTML += `<input type="number" id="rotor_num_${i}" min="0" max="9" value="${i}"> `;
}



window.addEventListener('load', function(){
    plugboard_canvas.width = plugboard_wrapper.clientWidth;
    plugboard_canvas.height = plugboard_wrapper.clientHeight;
});
window.addEventListener('resize', function(){
    plugboard_canvas.width = plugboard_wrapper.clientWidth;
    plugboard_canvas.height = plugboard_wrapper.clientHeight;
});

num_rotors.addEventListener(
    "input", function(event) {
        choose_rotors.innerHTML = "";
        for (let i=0; i<num_rotors.value; i++){
            choose_rotors.innerHTML += `<input type="number" id="rotor_num_${i}" min="0" max="9" value="${i}"> `;
        }
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

plugboard_canvas.addEventListener('mousedown', function(e) {
    const rect = plugboard_canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (var i = 65; i <= 90; i++){
        char = String.fromCharCode(i);
        if (distance(char, x, y) <= 25){
            char_element = document.getElementById(`plug-${char}`);
            if (l1.length == 0) {
                if (char_element.style.backgroundColor == "antiquewhite"){
                    delete_pair(char);
                } else {
                    l1 = char;
                    char_element.style.backgroundColor = "antiquewhite";
                    char_element.style.color = "black";
                }
            } else {
                if (char_element.style.backgroundColor == "antiquewhite"){
                    delete_pair(char);
                }
                l2 = char;
                char_element.style.backgroundColor = "antiquewhite";
                char_element.style.color = "black";
                draw_line(l1, l2);
                plugboard_pairs[l1] = l2;
                plugboard_pairs[l2] = l1;
                l1 = [];
                l2 = [];
            }
        }
    }
});


function distance(char, x, y){
    return ((letter_pos(char)[0]-x)**2 + (letter_pos(char)[1]-y)**2)**0.5;
}

function letter_pos(char){
    const canvas_rect = plugboard_canvas.getBoundingClientRect();
    const letter_element = document.getElementById(`plug-${char}`);
    const letter_rect = letter_element.getBoundingClientRect();
    return [letter_rect.left - canvas_rect.left + (letter_rect.width / 2), letter_rect.top - canvas_rect.top + (letter_rect.height / 2)];
}

function draw_line(letter1, letter2) {
    plugboard_canvas_drawable.beginPath();
    plugboard_canvas_drawable.lineWidth = 5;
    plugboard_canvas_drawable.strokeStyle = "antiquewhite";
    plugboard_canvas_drawable.moveTo(letter_pos(letter1)[0], letter_pos(letter1)[1]);
    plugboard_canvas_drawable.lineTo(letter_pos(letter2)[0], letter_pos(letter2)[1]);
    plugboard_canvas_drawable.stroke();
}

function delete_pair(char){
    char_element = document.getElementById(`plug-${char}`);
    char_element.style.backgroundColor = "black";
    char_element.style.color = "antiquewhite";

    paired_char_element = document.getElementById(`plug-${plugboard_pairs[char]}`);
    paired_char_element.style.backgroundColor = "black";
    paired_char_element.style.color = "antiquewhite";

    delete plugboard_pairs[plugboard_pairs[char]];
    delete plugboard_pairs[char];

    plugboard_canvas_drawable.clearRect(0, 0, plugboard_canvas.width, plugboard_canvas.height);
    for (var i = 65; i <= 90; i++){
        char = String.fromCharCode(i);
        if (char in plugboard_pairs){
            draw_line(char, plugboard_pairs[char]);
        }
    }
}

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

