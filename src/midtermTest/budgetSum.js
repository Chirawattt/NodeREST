// Get Sum of People's Budget
function getBudgets(object) {
    let sum = 0;
    object.forEach(element => {
        for (let key in element) if (key == "budget") sum += element.budget;
    });
    return sum;
}