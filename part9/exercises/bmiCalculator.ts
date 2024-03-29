
function calculateBmi(heightInCm:number,weight: number){

    const bmi = weight / Math.pow(heightInCm/100,2);
    if(bmi < 18.5){
        return(`Your bmi is ${bmi}. It falls within the underweight range`);
    }else if(bmi > 18.5 && bmi < 25){
        return(`Your bmi is ${bmi}. It falls within the healthy range`);
    }else if(bmi > 25 && bmi < 30){
        return(`Your bmi is ${bmi}. It falls within the overweight range`);
    }else{
        return(`Your bmi is ${bmi}. It falls within the obesity`);
    }

}


export {calculateBmi};