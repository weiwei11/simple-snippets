import * as vscode from 'vscode';
import { SnippetsManager } from '../snippet/snippetsManager';
import { UIUtility } from '../utility/uiUtility';
import { Messages } from '../config/messages';


export const enum CommandsConsts {
    addSnippet = "simple-snippets.save_as_snippet",
}

export async function saveAsSnippet(snippetsManager: SnippetsManager) {
    var text: string | undefined;

    const editor = vscode.window.activeTextEditor;
    // if no editor is open or editor has no text, return
    if (!editor || editor.document.getText(editor.selection) === "") {
        vscode.window.showWarningMessage(Messages.noTextSelected);
        return;
    }

    text = editor.document.getText(editor.selection);
    if (text === undefined || text === '' || text.length === 0) {
        vscode.window.showWarningMessage(Messages.noTextSelected);
        return;
    }

    // get snippet group name
    const groupName = await UIUtility.requestSnippetGroup();
    if (groupName === undefined || groupName === "") {
        vscode.window.showWarningMessage(Messages.snippetGroupErrorMsg);
        return;
    }

    // get snippet group type
    const groupType = await UIUtility.requestSnippetGroupType();
    if (groupType === undefined || groupName === "") {
        vscode.window.showWarningMessage(Messages.snippetGroupTypeErrorMsg);
        return;
    }

    snippetsManager.loadGroup(groupName, groupType);

    // get snippet name
    const name = await UIUtility.requestSnippetName();
    if (name === undefined || name === "") {
        vscode.window.showWarningMessage(Messages.snippetNameErrorMsg);
        return;
    }
    if (snippetsManager.hasSnippet(groupName, groupType, name)) {
        const isOverwrite = await UIUtility.requestSnippetIsOverwrite();
        if (isOverwrite !== true) {
            vscode.window.showInformationMessage(Messages.overwriteQuitMsg);
            return;
        }
    }

    // get snippet prefix
    const prefix = await UIUtility.requestSnippetPrefix();
    if (prefix === undefined || prefix === "") {
        vscode.window.showWarningMessage(Messages.snippetPrefixErrorMsg);
        return;
    }

    // get snippet description
    const description = await UIUtility.requestSnippetDescription();
    if (description === undefined || description === "") {
        vscode.window.showWarningMessage(Messages.snippetDescriptionErrorMsg);
        return;
    }

    // add snippet
    let body = text.split("\n");
    const isSuccess = snippetsManager.addSnippet(groupName, groupType, {name: name, prefix: prefix, body: body, description: description});
    if (isSuccess) {
        vscode.window.showInformationMessage(Messages.saveSuccessfulMsg);
    } else {
        vscode.window.showInformationMessage(Messages.saveFailedMsg);
    }
}
