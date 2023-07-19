

interface IResult{
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}
function calculateExercises(): IResult{
    const args = process.argv.slice(2)
    const trainingData:number[] = args.slice(1).map((arg) => parseInt(arg))
    const target = parseInt(args[0])
    console.log({trainingData,target})
    const periodLength = trainingData.length
    const trainingDays = trainingData.reduce((acc,curr) => {
        if(curr != 0) return acc + 1
        return acc
    },0)
    const sum = trainingData.reduce((acc,curr) => {
        return acc + curr
    },0)
    const average = sum / trainingData.length
    const success = (average >= sum)
    const rating = average < sum ? 1 : average === sum ? 2 : 3
    let ratingDescription = ''
    if(rating === 1){
        ratingDescription = 'Failed to make the target'
    }else if(rating === 2){
        ratingDescription = 'Gjorde helt ok av sig'
    }else{
        ratingDescription = 'Did absolutely amazing!'
    }
    const result: IResult = {
        average: average,
        periodLength: periodLength,
        rating: rating,
        ratingDescription: ratingDescription,
        success: success,
        target: target,
        trainingDays: trainingDays
    }
    console.log({result})
    return result
}

calculateExercises()

export {calculateExercises}