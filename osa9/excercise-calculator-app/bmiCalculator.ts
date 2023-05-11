interface countingValues {
    value1: number;
    value2: number;
  }

const parseArguments = (args: string[]): countingValues => {

    if (args.length != 4) throw new Error('Wrong amount of arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };


export const calculateBmi = (h: number, w: number): string => {
    const hInCm = h/100;
    const bmi = w/(hInCm*hInCm);
    if (bmi >= 25) {
        return 'Overweight';
    } else if (bmi < 18.5) {
        return 'Underweight';
    } else {
        return 'Normal (healthy weight)';
    }   
};


try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }



// should print Normal (healthy weight)