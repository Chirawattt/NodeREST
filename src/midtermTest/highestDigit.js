// Highest Digit
function highesDigit(n){
    let ArrayOfNum = n.toString().split('');
    let maxNum = parseInt(ArrayOfNum[0]);
    if (ArrayOfNum.length > 1) {
        for (let i = 1; i < ArrayOfNum.length ; i++) {
            if (parseInt(ArrayOfNum[i]) > maxNum) maxNum = ArrayOfNum[i];
        }
    }
    return maxNum;
}