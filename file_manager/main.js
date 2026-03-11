/*features to implement: 1. Allow users to go back to previous directory 
2 search fn, 3. copy and move  files across different directories 3 let the program interact with the system*/

import fs from 'fs/promises';
import path from 'path';
import inquirer from 'inquirer';
const directories = [
    { name: 'Desktop', value: 'C:\\Users\\chimdi\\Desktop' },
    { name: 'Documents', value: 'C:\\Users\\chimdi\\Documents' },
    { name: 'Downloads', value: 'C:\\Users\\chimdi\\Downloads' },
    { name: 'Pictures', value: 'C:\\Users\\chimdi\\Pictures' },
    { name: 'Videos', value: 'C:\\Users\\chimdi\\Videos' },
    { name: 'Music', value: 'C:\\Users\\chimdi\\Music' }]

let currentPath = '';
let history = [];

const search = async (fileToSearch) => {
    if (!currentPath) {
        console.log('No directory selected.');
        return;
    }
    const content = await fs.readdir(currentPath);
    const found = content.find(item => item.toLowerCase().includes(fileToSearch.toLowerCase()));
    if (found) {
        console.log('Found:', found, 'in', currentPath);
    } else {
        console.log('Not found in', currentPath);
    }
}

const open = async (targetPath) => {
    try {
        // Check if path exists and get stats
        const stats = await fs.stat(targetPath);// fs.stat to get info about directory or file
        // Check if it's a directory or file

        if (stats.isDirectory()) {
            console.log('Directory:', targetPath);
            const content = await fs.readdir(targetPath);
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'selected',
                    message: 'Choose a sub-directory to open:',
                    choices: content.map(item => ({ name: item, value: path.join(targetPath, item) })),
                    //take all the items in the directory and map them to a list of choices
                }
            ])
            .then((answers) => {
                console.log('Now Opening:', path.basename(answers.selected));
                open(answers.selected); // Recursively open the selected sub-directory
                currentPath = answers.selected; // Update current path
                history.push(currentPath); // Track the current path
            });
            
        } else if (stats.isFile()) {
            console.log(`Showing Properties of file: ${targetPath}`);
            console.log('File:', targetPath);
            console.log('Size:', stats.size, 'bytes');
            console.log('Last Modified:', stats.mtime);
        } else {
            console.log('Not a regular file or directory:', targetPath);
        }
    } catch (error) {
        console.error('Error accessing path:', error.message);
    }
}
const main = async () => {

console.log('File  Manager on Terminal')
// Example usage:

 inquirer.prompt([
        {
            type: 'list',
            name: 'selected',
            message: 'Choose a directory to open:',
            choices: directories,
        }
    ]).then((answers) => {
  console.log('Now Opening:', path.basename(answers.selected)); // This will be the value, e.g., the full path
  currentPath = answers.selected;
  history.push(currentPath); // Track the current path
  open(answers.selected);
});
}
main();