// Remove Duplicates from an array
function removeDups(array){
    let notDupsArray = [];
    array.forEach(element => {
        if (!notDupsArray.includes(element)) notDupsArray.push(element);
    });
    return notDupsArray;
}