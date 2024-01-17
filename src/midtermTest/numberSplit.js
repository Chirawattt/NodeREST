// Number Split
function numberSplit(n) {
	let Answer = [];
	if (n%2 == 0) {
		Answer.push(n/2);
		Answer.push(n/2);
	}else {
        Answer.push(Math.round(n/2) - 1);
        Answer.push(Math.round(n/2));
	}
    return Answer;
}