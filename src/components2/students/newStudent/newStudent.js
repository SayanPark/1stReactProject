import React, { useEffect } from "react";
import classes from './newStudent.module.css';
import Button from "../../UI/Button/button";
import PropTypes from 'prop-types';
import WithClass from "../../HOC/WithClass";
import { useNavigate } from "react-router-dom";

const NewStudent = (props) => {
    useEffect(() => { console.log(props) }, [])

    const { studentName, studentClass, studentPhoneNumber, studentEmail } = props
    const { studentNameHandler, studentClassHandler, studentPhoneNumberHandler, studentEmailHandler } = props;

    const navigate = useNavigate();

    return (
        <React.Fragment>
            <h1>اضافه کردن دانش آموز جدید</h1>
            <label>نام و نام خانوادگی</label>
            <input type="text" value={studentName} onChange={studentNameHandler} />
            <label>کلاس</label>
            <input type="number" value={studentClass} onChange={studentClassHandler} maxLength={3} />
            <label>شماره تلفن</label>
            <input type="number" value={studentPhoneNumber} onChange={studentPhoneNumberHandler} />
            <label>ایمیل</label>
            <input type="email" value={studentEmail} onChange={studentEmailHandler} />
            <Button clicked={props.clicked} btnType="danger">اضافه کردن</Button>
        </React.Fragment>
    )
}

export default React.memo(WithClass(NewStudent, classes.newStudent));

NewStudent.propTypes = {
    studentName: PropTypes.string.isRequired,
    studentClass: PropTypes.string.isRequired, // Change to string if handling input as string
    studentPhoneNumber: PropTypes.string.isRequired, // Change to string
    studentEmail: PropTypes.string.isRequired,
}