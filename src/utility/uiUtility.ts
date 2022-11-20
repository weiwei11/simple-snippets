import * as vscode from 'vscode';
import { Messages } from '../config/messages';
import { GroupType } from '../snippet/snippetsManager';

export class UIUtility {
    static async requestSnippetGroup() {
        return await vscode.window.showInputBox({
            prompt: Messages.snippetGroupPrompt,
            placeHolder: Messages.snippetGroupPlaceHolder,
            validateInput: text => {
                return text === "" ? Messages.snippetGroupValidationMsg : null;
            }
        });
    }

    static async requestSnippetGroupType() {
        return await vscode.window.showQuickPick(
           [GroupType.language, GroupType.global], 
           {title: Messages.snippetGroupTypePrompt, placeHolder: Messages.snippetGroupTypePlaceHolder, canPickMany: false}
        );
    }

    static async requestSnippetName(): Promise<string | undefined> {
        return await vscode.window.showInputBox({
            prompt: Messages.snippetNamePrompt,
            placeHolder: Messages.snippetNamePlaceholder,
            validateInput: text => {
                return text === "" ? Messages.snippetNameValidationMsg : null;
            }
        });
    }

    static async requestSnippetPrefix() {
        return await vscode.window.showInputBox({
            prompt: Messages.snippetPrefixPrompt,
            placeHolder: Messages.snippetPrefixPlaceholder,
            validateInput: text => {
                return text === "" ? Messages.snippetPrefixValidationMsg : null;
            }
        });
    }    

    static async requestSnippetDescription() {
        return await vscode.window.showInputBox({
            prompt: Messages.snippetDescriptionPrompt,
            placeHolder: Messages.snippetDescriptionPlaceholder,
            validateInput: text => {
                return text === "" ? Messages.snippetDescriptionValidationMsg : null;
            }
        });
    }

    static async requestSnippetIsOverwrite() {
        const yesOrNo = await vscode.window.showQuickPick(
            ['Yes', 'No'], 
            {title: Messages.overwriteTitle, placeHoler: Messages.overwritePlaceholder, canPickMany: false} as vscode.QuickPickOptions
        );
        return yesOrNo === 'Yes';
    }
}