import React from 'react'

const Persons = (props) => {
    return(
        <p key={props.id}>{props.name} {props.number}<button onClick={props.deleteName}>delete</button></p>
      )
  }

export default Persons