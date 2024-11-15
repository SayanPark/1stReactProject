import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components2/UI/Button/button';
import './style/EditSTUpage.css';
import useAuth from './useAuth';
import { useLocation } from 'react-router-dom';
const EditStudent = () => { 
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    // Extract data from location.state (with fallback to default values)    
    const { student_id, student_name, student_class, student_phone_number, student_email } = location.state || {};
    // Set initial state with data from location.state if available    
    const [id, setStudentId] = useState(student_id || '');
    const [name, setName] = useState(student_name || '');
    const [classNumber, setClassNumber] = useState(student_class || '');
    const [phoneNumber, setPhoneNumber] = useState(student_phone_number || '');
    const [email, setEmail] = useState(student_email || '');
    const [message, setMessage] = useState('');
     useEffect(() => {
        if (!auth) { navigate('/');} }, [auth, navigate]);
     const editStudent = () => {fetch('http://localhost:8080/student/updateStudent.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        student_id: id,
        student_name: name,
        student_class: classNumber,
        student_phone_number: phoneNumber,
        student_email: email
    }),
 }).then((response) => {
    if (!response.ok) {
        throw new Error(response.statusText); }
        return response.text();})
        .then((responseText) => {
            if (responseText.startsWith('<')) {
                setMessage('Error: Server returned an error page');
            } else {
                try {
                    const responseJson = JSON.parse(responseText);
                    if (responseJson === 'successfull') {
                        navigate('/');
                    } else {
                        setMessage(`Error: ${responseJson}`);
                    }
                } catch (error) {
                    setMessage('Error: Unable to parse response as JSON');
                 }
                }}).catch((error) => {
                    setMessage(`Error: ${error.message}`);
                });
            };
return (
    <div className="NewPost">
        <h1>ویرایش دانش آموز</h1>
        <h2>{message}</h2>
        <label>نام و نام خانوادگی</label>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        <label>کلاس</label>
        <input type="text" value={classNumber} onChange={(event) => setClassNumber(event.target.value)} />
        <label>شماره تلفن</label>
        <input type="text" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
        <label>ایمیل</label>
        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Button clicked={editStudent} btnType="danger">ویرایش اطلاعات</Button>
        </div>
         );
    };
export default EditStudent;