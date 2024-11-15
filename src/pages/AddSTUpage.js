import React, { useState, useEffect } from 'react';
import NewStudent from '../components2/students/newStudent/newStudent';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {if (!auth) {navigate('/');}}, [auth, navigate]);

    const [studentName, setStudentName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [studentPhoneNumber, setStudentPhoneNumber] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [error, setError] = useState(null);

    const studentNameHandler = (event) => setStudentName(event.target.value);
    const studentClassHandler = (event) => setStudentClass(event.target.value);
    const studentPhoneNumberHandler = (event) => setStudentPhoneNumber(event.target.value);
    const studentEmailHandler = (event) => setStudentEmail(event.target.value);

    const addStudent = () => {
        fetch('http://localhost:8080/student/insertStudent.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                student_name: studentName,
                student_class: studentClass,
                student_phone_number: studentPhoneNumber,
                student_email: studentEmail
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.text();
        })
        .then((responseText) => {
            if (responseText.startsWith('<')) {
                setError('Error: Server returned an error page');
            } else {
                try {
                    const responseJson = JSON.parse(responseText);
                    if (responseJson === 'successfull') {
                        navigate('/');
                    } else {
                        setError(`Error: ${responseJson}`);
                    }
                } catch (error) {
                    setError('Error: Unable to parse response as JSON');
                }
            }
        })
        .catch((error) => {
            setError(`Error: ${error.message}`);
        });
    };

return (
    <React.Fragment>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </React.Fragment>
);};
export default AddStudent;