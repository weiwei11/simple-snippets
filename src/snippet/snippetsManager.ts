import { Snippet } from "./snippet";
import fs = require("fs");
import * as path from "path";


export const enum GroupType {
    language = 'language',
    global = 'global',
}

export class SnippetsManager {
    snippetsGroups: Map<string, Map<string, Snippet>>;

    private _fileRoot = 'C:/Users/vivi/AppData/Roaming/Code/User/profiles/-516bcfb2/snippets';
    private _fileExts = ['.json', '.code-snippets'];
    private _type2ext = new Map<string, string>([
        [GroupType.language, this._fileExts[0]],
        [GroupType.global, this._fileExts[1]],
    ]);
    private _encoding: BufferEncoding = 'utf8';

    constructor(snippetsRoot: string) {
        this._fileRoot = snippetsRoot;
        this.snippetsGroups = new Map<string, Map<string, Snippet>>();
        // this.loadAll();
    }

    loadAll() {
        let files = fs.readdirSync(this._fileRoot);
        let jsonFiles = files.filter((value, index, array) => {
            return this._fileExts.includes(path.extname(value));
        });
        
        for (let file of jsonFiles) {
            let text = fs.readFileSync(path.join(this._fileRoot, file), this._encoding);
            let jsonObject = JSON.parse(text);
        }
    }

    loadGroup(groupName: string, groupType: string): boolean {
        if (!this._type2ext.has(groupType)) {
            return false;
        }
        const fileExt = this._type2ext.get(groupType);
        const filePath = path.join(this._fileRoot, `${groupName}${fileExt}`);
        if (!fs.existsSync(filePath)) {
            return false;
        }
        let text = fs.readFileSync(filePath, this._encoding);
        let textMap = JSON.parse(text);
        this.snippetsGroups.set(groupName, new Map<string, Snippet>(Object.entries(textMap)));

        return true;
    }

    hasSnippet(groupName: string, groupType: string, snippetName:string): boolean {
        return this.snippetsGroups.has(groupName) && (this.snippetsGroups.get(groupName) as Map<string, Snippet>)?.has(snippetName);
    }

    addSnippet(groupName: string, groupType: string, snippet: Snippet): boolean {
        if (!this._type2ext.has(groupType)) {
            return false;
        }
        let fileExt = this._type2ext.get(groupType);

        if (this.snippetsGroups.has(groupName) && this.snippetsGroups.get(groupName) !== undefined) {
            this.snippetsGroups.get(groupName)?.set(snippet.name, snippet);
        } else {
            let snippets = new Map<string, Snippet>([
                [snippet.name, snippet]
            ]);
            this.snippetsGroups.set(groupName, snippets);
        }

        // this.loadGroup(groupName, groupType);
        // save the snippet to file
        let textMap = Object.fromEntries(this.snippetsGroups.get(groupName) as Map<string, Snippet>);
        // if (this.snippetsGroups.has(groupName)) {
        //     for (let [k, v] of this.snippetsGroups.get(groupName).entries()) {
        //         // textMap[k] = JSON.stringify(v, null);
        //         textMap[k] = v;
        //     }
        // }
        let text = JSON.stringify(textMap, null, 2);  // add line break characters by using 2
        fs.writeFileSync(path.join(this._fileRoot, `${groupName}${fileExt}`), text, this._encoding);
        return true;
    }
}
