# tbieditor
*Text-based Image Editor*

CLI tool that allows generation of images out of text script files. Inspired by Markdown and LaTeX.

## Installation
Note: If you get permission errors as a result of running any of the commands below, try to run them again using `sudo` command.
1. Install the Node.js v8.11.4 runtime environment from https://nodejs.org.
2. Update npm package manager (that gets installed with Node.js) to the latest version by running `npm install -g npm` in the command line.
3. Install the TypeScript runtime environment using npm by running `npm install -g typescript@3.0.1 ts-node@7.0.1`
4. Navigate to the tbieditor source code directory using the `cd` command.
5. Install tbieditor dependencies locally by running `npm install`.
6. Add the tbieditor CLI to your command line by running `npm link`.
7. Congratulation, you've got tbieditor installed! Confirm installation has succeeded by running `tbieditor -h`, which should output a welcome message and usage options.

## Usage
1. To run the tool, a script file is needed. For now, let's use the first script file in the `examples` directory called `1-house.tbi` as an example.
2. Run `tbieditor examples/1-house.tbi`. This will generate the outputted images inside the current directory.
3. To run the tool on multiple files, you can supply their names together. For example, you can run `tbieditor examples/1-house.tbi examples/2-kcl.tbi`.
4. To change the output directory of the outputted images, you can supply the output directory using the `-o` flag. For example, you can run `tbieditor examples/2-kcl.tbi -o path/to/output/directory`.
5. Now you could try running all of the examples inside the `exmaples` directory by running `tbieditor examples/1-house.tbi examples/2-kcl.tbi examples/3-web-browser.tbi -o output`.
6. Check the outputted image files in the `output` directory. They should look exactly the same as the images inside `examples/expected`.

## Tests
To run the tests, run:
```
npm run test
```
This will run and output the results of:
- the TypeScript linter.
- unit and end-to-end tests.
- test code coverage report.

## Script File Syntax
To add a new object in the image, we can use the node addition statement:
```
+
```
This will create a new object (which is a 100x100px black rectangle by default).

However, running the tool on this script file wouldn't output anything yet. We need to add an export statement at the end of the file:
```
+
-> 'foo.svg'
```
This will instruct the tool to output an SVG image consisting of all of the objects that has been added so far. We could also use `.png`, `.jpeg` and `.jpg` extensions instead to output images with different formats.

To change the properties of an object, we can use the assignment statement:
```
+
fill = 'blue'
width = 500
-> 'foo.svg'
```

Mathematical expressions can be used:
```
width = 500
height = width / 2
```

Custom variables can be defined (must start with a $ sign and can contain letters, dashes and underscores):
```
$foo = 'bar'
```

Loops can be used:
```
for $colour in ['black', 'blue', 'red'] {
  fill = $colour
}
```

Comments can be used:
```
/**
  * Some multi-line comment.
  */
$foo = 'bar' // inline comment
```

Let's combine what we learnt so far. Try running the following script file and see what you get:
```
+
width = 500
height = width / 2
for $colour in ['black', 'blue', 'red'] {
  fill = $colour
  -> $colour + '.svg'
}
```

## Object Property Reference
Each subsection below will list the properties that could be used by different object types.

### Rectangle Object
```
+
type = 'rect'
width = 100
height = 100
x = 0 // x position from left edge of image
y = 0 // y position from top edge of image
rx = 0 // x radius of rectangle corners
ry = 0 // y radius of rectangle corners
```

### Circle Object
```
+
type = 'circle'
r = 0 // radius
cx = 0 // x position of circle centre
cy = 0 // y position of circle centre
```

### Text Object
```
+
type = 'text'
content = 'Hello World!'
x = 0
y = 0
font-family = 'Times'
font-size = 18
font-weight = 'bold'
font-style = 'italic'
text-decoration = 'underline'
text-anchor = 'middle' // start | middle | end
letter-spacing = 2
word-spacing = 5
```

### Image Object
```
+
type = 'image'
href = 'assets/logo.png' // relative path to image
x = 0
y = 0
width = 100
height = 100
```

### Common Properties
The following properties are presentational and can be used with any object type:
```
fill = 'white'
opacity = 0.5 // from 0 to 1
stroke = 'black'
stroke-width = 1
stroke-opacity = 1
```

### Other Shapes
Other shape type properties can be found in the `src/SVG` directory. Each shape has a class file representing it in that directory.
