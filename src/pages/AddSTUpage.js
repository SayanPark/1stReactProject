import React, { useState, useEffect, useContext} from 'react';
import NewStudent from '../components2/students/newStudent/newStudent';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const AddStudent = (props) => {
    const auth = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {if (!auth) {navigate('/');}}, [auth, navigate]);

    const [studentName, setStudentName] = useState('');
    const [studentClass, setStudentClass] = useState(0);
    const [studentPhoneNumber, setStudentPhoneNumber] = useState(0);
    const [studentEmail, setStudentEmail] = useState('');
    const [error, setError]  = useState(false);

    const studentNameHandler = (event) => setStudentName(event.target.value);
    const studentClassHandler = (event) => setStudentClass(event.target.value);
    const studentPhoneNumberHandler = (event) => setStudentPhoneNumber(event.target.value);
    const studentEmailHandler = (event) => setStudentEmail(event.target.value);

    const addStudent=()=>{
        fetch('http://localhost:8080/student/insertStudent.php',{
          method:'POST',
          headers:{
              'Accept' : 'applicaion/json',
              'Content-Type':'application/json',
          },
          body:JSON.stringify({
              student_name:studentName,
              studet_class:studentClass,
              student_phone_number:studentPhoneNumber,
              student_email:studentEmail
          })
      }).then((response)=>response.json())
          .then((responseJson)=>{
           
              props.history.replace('/');
          }).catch((error)=>{
            setError(error)
          })
      }
        let ErrorMessage=null;
        if(error){
          ErrorMessage = <h1 style={{textAlign:'center',color:'red'}}>متاسفانه عملیات شما با شکست روبرو شد.لطفا مجددا تلاش کنید</h1>
        }

    return (
        <React.Fragment>
           {ErrorMessage}
            <NewStudent
                studentName={studentName}
                studentClass={studentClass}
                studentPhoneNumber={studentPhoneNumber}
                studentEmail={studentEmail}
                studentNameHandler={studentNameHandler}
                studentClassHandler={studentClassHandler}
                studentPhoneNumberHandler={studentPhoneNumberHandler}
                studentEmailHandler={studentEmailHandler}
                clicked={addStudent}
            /> 
        </React.Fragment>
    );
};

export default AddStudent;
