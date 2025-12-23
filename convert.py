ROTORS = [
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
    {'alphabet':"WDZBIPLTENXGUJQFOSRHMYAKVC", 'notches':[]}#Reflection Rotor(doesn't move)
]

for rotor in ROTORS:
    reversed_alphabet = [" "]*26
    for i in range(26):
        letter = rotor['alphabet'][i]
        reversed_alphabet[ord(letter)-65] = chr(i+65)
    reversed_alphabet_string = "".join(reversed_alphabet)
    print(f"{chr(123)}'alphabet':'{rotor['alphabet']}', 'reversed_alphabet':'{reversed_alphabet_string}', 'notches':{rotor['notches']}{chr(125)},")

