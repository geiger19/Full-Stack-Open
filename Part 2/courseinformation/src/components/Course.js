import React from 'react'

const Course = (props) => {
    console.log(props)
    return( 
      <div>
    {props.course.map(x => 
      <Header key={x.id} course={x.name} parts={x.parts} />
    )}
    
   </div> 
    )
  }
  
  const Header = (props) => {
    return (
      <div><h2>{props.course}</h2>
      <Content course={props.parts} />
      <Total course={props.parts} /></div>
    )
  }
  
  const Content = (props) => {
    
    return( 
      <div>
      {props.course.map(x => 
            <Part key={x.id} name={x.name} exercises={x.exercises} />
          )}
      </div>
        )
  }
  
  const Part = (course) => {
    console.log(course)
    return (
      <p>
         {course.name} {course.exercises}
      </p>
    )
  }
  
  const Total = (props) => {
    return(
      <p><b>Total of {props.course.reduce(function(sum, amount) {
        return sum + amount.exercises},0)} exercises</b>
      </p>
    )
  }

  export default Course
