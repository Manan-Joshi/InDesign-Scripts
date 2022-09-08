/*
https://community.adobe.com/t5/indesign-discussions/validate-paragraph-style-names-based-on-list/td-p/13184430

Script to get get a create a collection of used and not used paragraph styles for the input style name collection
To search for styles in groups use / as the path seperator
Pre Requisite:- The script needs an open document
Warning :- No elaborate error checking

Author:- Manan Joshi
Github Repo :- https://github.com/Manan-Joshi/InDesign-Scripts.git
*/

function getPStyleGroup(nmCol){
    var pg = app.documents[0]
    for(var i = 0 ; i < nmCol.length - 1; i++){
        pg = pg.paragraphStyleGroups.itemByName(nmCol[i])
        if(!pg.isValid)
            return ""
    }
    return pg
}

function getUsedUnusedStyleFromList(inStyleList, outUsed, outUnused){
    var styleCol = app.documents[0].paragraphStyles
    for(var i = 0; i < inStyleList.length; i++){
        var styleCol = app.documents[0].paragraphStyles
        try{
            var grps = inStyleList[i].split("/")
            if(grps.length > 1)
                styleCol = getPStyleGroup(grps)

            if(styleCol === ""){
                outUnused.push(inStyleList[i])
                continue;
            }
            styleCol.add({name:grps[grps.length - 1]})
            app.documents[0].undo()
            outUnused.push(inStyleList[i])
        }catch(e){
            outUsed.push(inStyleList[i])   
        }
    }
}

var styleList = ["abc/def/PS1", "abc/PS2", "PS3","PS8"]
var used = [], unused = []
getUsedUnusedStyleFromList(styleList, used, unused)
alert("Unused " + unused + " Used " + used)