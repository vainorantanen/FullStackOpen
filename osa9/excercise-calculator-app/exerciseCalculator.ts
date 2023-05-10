interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string
    target: number,
    average: number
}

interface countValuesEx {
    array: number[];
    target: number;
  }

const parseArgs = (args: string[]): countValuesEx => {
    //console.log(args)
    if (args.length < 4) throw new Error('Not enough arguments provided');
  
    
    const target = Number(args[2]);
    const array = args.slice(3).map(Number);

    if (!isNaN(target) && !array.some(isNaN)) {
      return {
        array,
        target,
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

const calculateExercises = (arr: number[], target: number): Result => {

    let avg = arr.reduce((acc, curr) => acc + curr, 0)/arr.length;
    // lasketaan rating
    var rated = 1
    var ratingdesc = 'Great job!'
    if (avg == target) {
        rated = 2
        ratingdesc = 'Got to the goal!'
    } else if (avg > target) {
        rated = 3
        ratingdesc =  'Great job!'
    } else {
        rated = 1
        ratingdesc = 'You can do better!'
    }

    return {
        periodLength: arr.length,
        trainingDays: arr.filter(a => a > 0).length,
        success: avg >= target,
        rating: rated,
        ratingDescription: ratingdesc,
        target: target,
        average: avg
    }
}

try {
    const { array, target } = parseArgs(process.argv);
    console.log(calculateExercises(array, target))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }



/*
Returni:

{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }

*/