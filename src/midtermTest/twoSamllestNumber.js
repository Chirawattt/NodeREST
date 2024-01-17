// Return the Sum of the Two Smallest Numbers
function sumTwoSmallestNums(array){
    if (array.length <= 2) return "elements in array have to more than 2 element";
    else {
        array.sort((a,b) => a-b);
        let i = 0;
        while (i < array.length) {
            if(array[i] < 0) { // remove negative number out from array
                array.splice(i,1); 
                i--; // reduce counter for check front element if is negative number too? [-,-,+,+] -> [-,+,+]
            }
            i++;
        }
        let sum = array[0] + array[1];
        return sum;
    }
}