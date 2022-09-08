/*
https://community.adobe.com/t5/indesign-discussions/accepting-track-changes-in-tables/td-p/13181717

Script to get an array of all the tables present in a document
Pre Requisite:- The script needs an open document
Warning :- No elaborate error checking

Author:- Manan Joshi
Github Repo :- https://github.com/Manan-Joshi/InDesign-Scripts.git
*/
function getTables(pCol){
    var retval = [];
    var tables = pCol.everyItem().tables.everyItem().getElements()
    retval = retval.concat(tables)
    for(var i = 0; i < tables.length; i++){
        retval = retval.concat(getTables(tables[i].cells))
    }
    return retval
}

var tables = getTables(app.documents[0].stories)