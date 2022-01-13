# JavaScript-Homework

The bulk of this assignment was writing the function by which the password would be generated.  I coded this in five main sections

In the first, I simply established in four arrays the characters usable by the generator.  There is an array each for uppercase letters, lowercase letters, numbers, and special characters.

The second section of the function contains the prompts used by the user to set the criteria for the password. An input is required when designating the length, so a "prompt" was used.  The other criteria, however, are simple yes/no questions, so a "confirm" was used.

The third part of the function contains two empty arrays:  one to concatinate the characters selected by the user for use, and one to hold the final, length-appropriate password.

The fourth section of the function contains a series of "if" statements.  These conditionals concatinate characters of the designated type to the first empty array if the user selects them as criteria for the password, while ignoring them if not.

The last section of the function is a "for" statement which ensures that the password generated will not only be random, but will also be of the appropriate length based on the user's preference.