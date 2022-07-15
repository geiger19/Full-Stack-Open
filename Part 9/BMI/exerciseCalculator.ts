interface exerciseCalculator {
    exerciseArray: number[];
  }
interface results {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number; 
}
  const parseCalcArguments = (args: Array<string>): exerciseCalculator => {
    if (args.length < 3 ) throw new Error('Not enough arguments');
    //if (args.length > 1) throw new Error('Too many arguments');
    //if (!isNaN(Number(args[0]))) {
    let aValues = Array.from((args.map((x) =>parseFloat(x))))
      return {
        exerciseArray: aValues.splice(2,aValues.length)
      }
    //} else {
//      throw new Error('Provided values were not numbers!');
    //}
  }
  
  const calculateExercises = (arr: number[]): results  => {
    let aTarget : number
    let a = arr.splice(1,arr.length)
    let aPeriodLength : number
    let aTrainingDays : number
    let aSuccess : boolean
    let aRating : number
    let aRatingDescription : string
    aTarget = arr[0]
    aPeriodLength = a.length
    aTrainingDays = a.filter(v => v != 0).length;
    aRating = 0
    aRatingDescription = ''
    if (aTrainingDays == a.length){
        aSuccess = true
    }
    else {
        aSuccess = false
    }
    if (aTrainingDays == 0){
        aRating = 3;
        aRatingDescription = 'not great'
    }
    else if (aTrainingDays > 1 && aTrainingDays < aPeriodLength ){
        aRating = 2;
        aRatingDescription = 'not too bad but could be better'
    }
    else if (aTrainingDays == aPeriodLength){
        aRating = 1;
        aRatingDescription = 'great'
    }
    const sum = a.reduce((b, c) => b + c, 0)
    let aAverage = sum / aPeriodLength;
    return {
        periodLength : aPeriodLength,
        trainingDays: aTrainingDays,
        success: aSuccess,
        rating: aRating,
        ratingDescription: aRatingDescription,
        target: aTarget,
        average: aAverage
    }
  }
  
  try {
    const { exerciseArray } = parseCalcArguments(process.argv);
    console.log(calculateExercises(exerciseArray))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }