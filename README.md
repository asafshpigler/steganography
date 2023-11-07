# Steganography, 2 Least Significant Bits!
this 30m project was motivated by seeing this awesome video by computerphile
https://www.youtube.com/watch?v=TWEXCYQKyDc

it includes 4 images, 3 scripts, and 2 texts

encrypt.js - uses 2 least significant bit approach to inserting text into our image
decrypt.js - extract the 2 least significant bits to recover the inserted text
text.txt - text to be inserted into image
recovered_txt - text recovered from output image

greyscaleLSB.js - creates a greyscale representation of our input & output images
(extracted_lsb_image_encrypted, extracted_lsb_image_original).
this is a common, easy method to identify wether an image has been tempered with
a regular image 2LSB representation will be a grescale version of it
an encrypted image 2LSB representation will be distorted.
in the provided images, you can see that the (extracted_lsb_image_encrypted) super mario shadow has it's left fingers cut off
that's the infromation the image has lost, in favor of our concealed text
