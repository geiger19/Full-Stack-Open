interface results {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number; 
}
  export const calculateExercises = (arr: number[], target: number): results  => {
    const aTarget = target;
    const a = arr.splice(0,arr.length);
    let aSuccess : boolean;
    let aRating : number;
    let aRatingDescription : string;
    
    const aPeriodLength = a.length;
    const aTrainingDays = a.filter(v => v != 0).length;
    aRating = 0;
    aRatingDescription = '';
    const sum = a.reduce((b, c) => b + c, 0);
    const aAverage = sum / aPeriodLength;
    if (aTrainingDays == a.length){
        aSuccess = true;
    }
    else {
        aSuccess = false;
    }
    if (aTarget/2 > aAverage){
        aRating = 1;
        aRatingDescription = 'bad';
    }
    else if (aTarget > aAverage ){
        aRating = 2;
        aRatingDescription = 'not too bad but could be better';
    }
    else if (aTarget <= aAverage){
        aRating = 3;
        aRatingDescription = 'great';
    }
    
    return {
        periodLength : aPeriodLength,
        trainingDays: aTrainingDays,
        success: aSuccess,
        rating: aRating,
        ratingDescription: aRatingDescription,
        target: aTarget,
        average: aAverage
    };
  };