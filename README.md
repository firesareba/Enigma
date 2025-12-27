All of my code is based on Jared Owen's description of the Enigma machine.  
You can watch it [here](https://www.youtube.com/watch?v=ybkkiGtJmkM)

# Rotors
The Rotors were the main part of the Enigma machine. They would do most of the encryption. Once the signal reaches the rotors, it is sent through all rotors used, through the reflector, then back through the rotors.  

Use the slider labeled **"Number of Rotors"** to choose how many rotors you want. You can have anywhere from 0 to 10.  
Next, you can choose which rotors to use in the boxes that show up. You can use the arrows or type in the box to change the numbers.

Since the rotors move, keep in mind that your friend will have to decrypt ***EVERY MESSAGE*** that you send.  
If you want to start fresh/chat with a different friend, you can click the **Reset Rotors** button. This clears your cookie storing rotor position and the rotor positions get set to 0.

# Plugboard
The Plugboard makes 2 way connections between any pair of letters. After a key is pressed, it goes to the plugboard. If it is connected to another letter, the signal is switched to that letter. Otherwise, it stays as the original letter. This is then sent to the rotors, after which the signal goes back through the plugboard.  

To select a letter, click it. To deselect, click it again. To make a pair between letters, select the first letter, then select the second letter. To delete a connection, click on any of the letters whos connection you wish to delete. To reroute a selection, click the letter you wish to reroute to, and then the letter that is connected to the wrong letter.

# Plaintext
The plaintext is the message you wish to send/decrypt. To send a letter, type or paste it into the text box. Keep in mind that you ***CANNOT DELETE*** characters if you make a typo. To decrypt a message, type or paste it into the text box.

# Lampboard and Ciphertext
After the signal goes through the plugboard for the second time, it then gets displayed. 

On an actual Enigma machine, this is done on a lampboard. A lampboard is the alphabet you see at the top of the simulator. Each time a letter is pressed, its encrypted result is lit up and then recorded by somebody monitoring the machine. 

For convenience, the simulator shows you the complete ciphertext as well. To send an encrypted message to somebody, send them this ciphertext. To decrypt it, they will have to use the same rotors and plugboard pairs.