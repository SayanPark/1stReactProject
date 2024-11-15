import React, {useState, useEffect, useRef, useContext} from 'react';
import Students from '../components2/students/students';
import Button from '../components2/UI/Button/button';
import { useNavigate } from 'react-router';
import Spinner from '../components2/UI/spinner/spinner';
import ErrorHandler from '../components2/HOC/ErrorHandler';
import axios from '../axios';
// import {AuthContext} from '../context/Auth/authContext';
import {StudentsContext} from '../context/Students/studentsContext';

const HomePage =(props)=>{
    // const {/*authenticated*/} = useContext(AuthContext);
    const inputEl = useRef(null);
    const navigate = useNavigate();

    const [searchBarValue,setSearchBarValue] = useState('');
    const [arrayHolder,setArrayHolder] = useState([]);
    const [toggle,setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const {dispatch,studentsState} = useContext(StudentsContext);

    const searchFilterFunction=(event)=>{
        const itemData = arrayHolder.filter((item)=>{
        const itemData = item.student_name.toUpperCase();
        const textData = event.target.value.toUpperCase();
        return itemData.indexOf(textData)>-1
        })
        dispatch({type:'search',payload:itemData})
        setSearchBarValue(event.target.value)
      }
      useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/student/showStudent.php')
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false);
            dispatch({ type: 'fetch', payload: responseJson });
            setArrayHolder(responseJson);
          })
            .catch((error) => {
              console.error('Error fetching data:', error);
              setLoading(false);
            });
      }, [dispatch]);
    useEffect(()=>{},[studentsState])

      const deleteStudent = (id) => {
        fetch('http://localhost:8080/student/deleteStudent.php',{
          method:'POST',
          headers:{
              'Accept' : 'application/json',
              'Content-Type':'application/json',
          },
          body:JSON.stringify({
              student_id:id
          })
        }).then((response)=>response.json())
            .then((responseJson)=>{
                dispatch({type:'remove',id:id})
            }).catch((error)=>{
                alert(error)
            })}
        const toggleHandler=()=>{
          console.log(toggle)
          setToggle(!toggle)
      }
      const edited = (id) => {
        fetch(`http://localhost:8080/student/showStudent.php?id=${id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error fetching data');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            navigate(`/student/${id}`, { state: data }); // Pass student data as state
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    };

      // const nameChanged = (event, id) => {
      //   console.log(`Name changed for student ${id}`);
      // };

      return(
        <React.Fragment>
            <input type="text" value={searchBarValue} onChange={searchFilterFunction} className="search-bar" ref={inputEl} style={{marginTop:'70px'}} />
            <Button btnType="success" clicked={toggleHandler}>تغییر وضعیت نمایش </Button>
            {
              loading ?<Spinner />:
              <Students
                studentsList={studentsState}              
                deleted={deleteStudent}
                toggle={toggle}
                edited={edited}
              />
            } 
        </React.Fragment>
    )
}
export default ErrorHandler(HomePage,axios);