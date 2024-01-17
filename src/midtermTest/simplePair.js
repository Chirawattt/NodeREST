// A simple Pair
function simplePair(array,number) {
    let pairArray = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = i+1; j < array.length; j++) {
            if ((array[i] * array[j])== number) {
                pairArray.push(array[i]);
                pairArray.push(array[j]);
            }
        }
    }
    if (pairArray.length == 0) return null;
    else return pairArray;
}