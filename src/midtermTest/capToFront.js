// Move Capital Letters to the Front
function capToFront(str){
    let ArrayofStr = str.split('');
    let lowerArray = [];
    let upperArray = [];
    ArrayofStr.forEach(element => {
        if (element >= 'A' && element <= 'Z') upperArray.push(element);
        else lowerArray.push(element);
    });
    return upperArray.join('') + lowerArray.join('');
}