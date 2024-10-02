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
    let id, name, classNumber, phoneNumber, email;

    if (location.state) {
        ({ id, name, classNumber, phoneNumber, email } = location.state);
    }

    const [student_id, setStudentId] = useState('');
    const [student_name, setName] = useState(name || '');
    const [student_classNumber, setNumber] = useState(classNumber || '');
    const [student_phoneNumber, setPhoneNumber] = useState(phoneNumber || '');
    const [student_email, setEmail] = useState(email || '');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!auth) {
            navigate('/');
        }
    }, [auth, navigate]);

    const editStudent = () => {
      fetch('http://localhost:8080/student/updateStudent.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            student_id: id,
            student_name: student_name,
            student_class: student_classNumber,
            student_phone_number: student_phoneNumber,
            student_email: student_email
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
                // The response is an HTML page, not a JSON response
                setMessage('Error: Server returned an error page');
            } else {
                try {
                    const responseJson = JSON.parse(responseText);
                    if (responseJson === 'successfull') {
                        navigate('/')
                    } else {
                        setMessage(`Error: ${responseJson}`)
                    }
                } catch (error) {
                    setMessage(`Error: Unable to parse response as JSON`)
                }
            }
        })
        .catch((error) => {
            setMessage(`Error: ${error.message}`)
        })
    };

    return (
        <div className="NewPost">
            <h1>ویرایش دانش آموز</h1>
            <h2>{message}</h2>
            <label>نام و نام خانوادگی</label>
            <input type="text" value={student_name} onChange={(event) => setName(event.target.value)} />
            <label>کلاس</label>
            <input type="text" value={student_classNumber} onChange={(event) => setNumber(event.target.value)} />
            <label>شماره تلفن</label>
            <input type="text" value={student_phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
            <label>ایمیل</label>
            <input type="text" value={student_email} onChange={(event) => setEmail(event.target.value)} />
            <Button clicked={editStudent} btnType="danger">ویرایش اطلاعات</Button>
        </div>
    )
}
export default EditStudent;