// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import fs = require('fs');
import path = require('path');
import * as vscode from 'vscode';
import * as commands from './config/commands';
import { SnippetsManager } from './snippet/snippetsManager';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "simple-snippets" is now active!');

	let snippetsFolder = vscode.workspace.getConfiguration('simple-snippets').get('saveFolder');
	if (snippetsFolder === undefined || snippetsFolder === null || snippetsFolder === '') {
		let userFolder = context.globalStorageUri.path.split('globalStorage')[0];
		if (userFolder.substring(0, 3) === '/C:') {
			userFolder = userFolder.substring(1, userFolder.length);
		}
		snippetsFolder = path.join(userFolder, 'snippets');
	}
	if (snippetsFolder === undefined || snippetsFolder === null || !fs.existsSync(snippetsFolder as string)) {
		vscode.window.showWarningMessage('Snippets saved folder is not exists!');
		return;
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let snippetsManager = new SnippetsManager(snippetsFolder as string);
	let disposable = vscode.commands.registerCommand(commands.CommandsConsts.addSnippet, () => {commands.saveAsSnippet(snippetsManager)}); 

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
