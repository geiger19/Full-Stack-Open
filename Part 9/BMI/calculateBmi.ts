

  
  export const calculateBMI = (a: number, b: number): string  => {
    
    let printMessage
    let BMIheight = a/100
    let BMIValue = Math.round(b / (BMIheight*BMIheight)*100)/100
    if (BMIValue >= 18.5 && BMIValue <= 24.9)
      {printMessage = "Normal (healthy weight)"}
    else if (BMIValue <18.5)
      {printMessage = "Underweight"}
    else
      {printMessage = "Overweight"}
    return printMessage
  }
