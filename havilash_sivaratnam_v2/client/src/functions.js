

function readForm(form) {
    var elements = form.elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        if (item.type != 'submit')
            obj[item.name] = item.value;
    }

    return JSON.stringify(obj);
}


module.exports.readForm = readForm;