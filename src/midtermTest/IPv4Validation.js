// IPv4 Validation
function isValidIP(IPv4){
    let dotValid = 0;
    let IPArray = [];
    for (let str of IPv4) {
        if (str == ".") ++dotValid;
    }
    if (dotValid == 3) {
        let rangeNumberValid = 0;
        IPArray = IPv4.split('.');
        for (let element of IPArray) {
            if (element.length > 1) {
                if (element.charAt(0) == '0') return false;
            }
        }
        IPArray = IPArray.map(str => parseInt(str));
        for (let i = 0; i < IPArray.length; i++) {
            if (IPArray[i] >= 1 && IPArray[i] <= 255) rangeNumberValid++;
        }
        if (rangeNumberValid == 4) return true;
        else return false;
    }else return false;
}
console.log(isValidIP("1.2.3.4"));
console.log(isValidIP("1.2.3"));
console.log(isValidIP("1.2.3.4.5"));
console.log(isValidIP("123.45.67.89"));
console.log(isValidIP("123.456.78.90"));
console.log(isValidIP("123.045.067.089"));