import React,{useEffect} from "react";
import Student from "./student/student";
import './student/student.css';
import PropTypes from 'prop-types';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const Students=(props)=>{
    useEffect(()=>{},[props.students]);
    let studentsList = (props.studentsList.map((person, index)=>
        <ErrorBoundary key={index}>
            <Student 
                id={person.student_id}
                name={person.student_name}
                classNumber={parseInt(person.student_class)}
                phoneNumber={parseInt(person.student_phone_number)}
                email={person.student_email}
                classChanged={(event)=>props.classChanged(event,person.student_class)}
                numberChanged={(event)=>props.numberChanged(event,person.student_phone_number)}
                emailChanged={(event)=>props.emailChanged(event,person.student_email)}
                deleted={()=>props.deleted(person.student_id)}
                edited={()=>props.edited(
                    person.student_id, person.student_name, person.student_class, person.student_phone_number, person.student_email
                )}
            />
        </ErrorBoundary>
        )
    )
    if(props.toggle){
        return(
            <div className="student-section">
                {
                studentsList
                }
            </div>
        )
    }
    return studentsList
}

export default React.memo(Students);
Students.propTypes={
    studentsList:PropTypes.array.isRequired,
    deleted:PropTypes.func.isRequired,
    toggle:PropTypes.bool.isRequired
}