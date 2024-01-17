// Sort Characters by Frequency, Case, Alphabet
function FrequencySort(originalString) {
    ogStrArray = originalString.split('');
    ogStrArray = ogStrArray.sort();
    lowerArray = [];
    upperArray = [];
    lowerDup = [];
    upperDup = [];
    for (let i = 0; i < ogStrArray.length; i++) {
        const element = ogStrArray[i];
        let notDup = true;
        for (let j = 0; j < lowerArray.length; j++) 
            if (element == lowerArray[j].charAt(0)) notDup = false;
        for (let c = 0; c < upperArray.length; c++)
            if (element == upperArray[c].charAt(0)) notDup = false;

        if (notDup) {
            if (element >= 'A' && element <= 'Z') upperArray.push(element);
            else lowerArray.push(element);
        }else if (!notDup) {
            if (element >= 'a' && element <= 'z') {
                for (let j = 0; j < lowerArray.length; j++) {
                    if (element == lowerArray[j].charAt(0)) {
                        lowerArray[j] += element;
                    }
                }
            }else {
                for (let j = 0; j < upperArray.length; j++) {
                    if (element == upperArray[j].charAt(0)) {
                        upperArray[j] += element;
                    }
                }
            }
        }
    }
    
    for (let i = 0; i < lowerArray.length; i++) {
        if (lowerArray[i].length > 1) {
            lowerDup.push(lowerArray[i])
            lowerArray.splice(i,1);
        }
    }

    for (let j = 0; j < upperArray.length; j++) {
        if (upperArray[j].length > 1) {
            upperDup.push(upperArray[j])
            upperArray.splice(j,1);
        }
    }

    lowerArray = lowerArray.sort();
    lowerDup = lowerDup.sort();
    upperArray = upperArray.sort();
    upperDup = upperDup.sort();

    lowerArray = joinElement(lowerArray);    
    lowerDup = joinElement(lowerDup);    
    upperArray = joinElement(upperArray);    
    upperDup = joinElement(upperDup);    


    return `${upperDup}${lowerDup}${upperArray}${lowerArray}`;
}

function joinElement(array) {
    if (array.length > 1) return array.join('');
    else return array;
}


console.log(FrequencySort("tree"));
console.log(FrequencySort("cccaaa"));
console.log(FrequencySort("Aabb"));
console.log(FrequencySort("AABBabbb"));


