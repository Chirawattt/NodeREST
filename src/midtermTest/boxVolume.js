// Total Volume of All Boxes
function totalVolume(...InputArray) {
    // Calculate the total volume for each set of dimensions
    let totalVolumes = InputArray.map(dimensions => {
        // Calculate the volume for each set of dimensions 
        let volume = dimensions.reduce((acc, dimension) => acc * dimension, 1);
        // return volume after calculate back to dimensions parameter
        return volume;
    });
    let returnValue = totalVolumes.reduce((sum, value) => sum + value);
    return returnValue;
}