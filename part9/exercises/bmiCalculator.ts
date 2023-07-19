
function calculateBmi(){
    const args = process.argv.slice(2)
    const parsedArgs:number[] = args.map((arg) => parseInt(arg))
    console.log({parsedArgs})
    const heightInCm = parsedArgs[0]
    const weight = parsedArgs[1]
    console.log({heightInCm,weight})

    const bmi = weight / Math.pow(heightInCm/100,2)
    console.log(`Your bmi is ${bmi}. It is Normal (healthy weight)`)
    if(bmi < 18.5){
        console.log(`Your bmi is ${bmi}. It falls within the underweight range`)
    }else if(bmi > 18.5 && bmi < 25){
        console.log(`Your bmi is ${bmi}. It falls within the healthy range`)
    }else if(bmi > 25 && bmi < 30){
        console.log(`Your bmi is ${bmi}. It falls within the overweight range`)
    }else{
        console.log(`Your bmi is ${bmi}. It falls within the obesity`)
    }

}
calculateBmi()

export {calculateBmi}