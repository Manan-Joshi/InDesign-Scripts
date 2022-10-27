/*Script that will remove all the text XML Nodes which are not placed on the document
Pre Requisite:- The script needs an open document
Warning :- No elaborate error checking

Author:- Manan Joshi
Github Repo :- https://github.com/Manan-Joshi/InDesign-Scripts.git
*/
function cleanXMLStructure(){
    var doc = app.documents[0]
    $.writeln("PageItems before " + doc.allPageItems.length)
    var root = doc.associatedXMLElement.xmlElements[0]
    var dl = []
    for(var i = 0; i < root.xmlElements.length; i++){
        var el = root.xmlElements[i]
        var pe = el.xmlContent
        var isPlaced = null
        if(pe instanceof Text){
            isPlaced = pe.parentStory.textContainers.length
        }else if(pe instanceof Story){
            isPlaced = pe.textContainers.length
        }
        if(isPlaced != null && isPlaced === 0){
            dl.push(el.getElements()[0])
        }
    }
    for(var i = 0; i < dl.length; i++){
        dl[i].remove()
    }
    $.writeln("PageItems after " + doc.allPageItems.length)
}