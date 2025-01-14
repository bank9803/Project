

import StudentCard from './Appstudent/studentCard'
import StudentForm from './Appstudent/StudentForm'

import React from 'react'
import { useState } from 'react'

function AppStudent() {
  const [students, setStudent] = useState([])
  const [editStudent, setEditStudent] = useState(null)


  // add student and crate id
  const addStudent = (student) => {
    setStudent([...students, { id: Date.now(), ...student }])
    console.log('Add data success ')
  }

  // update Data
  const updataStudent = (updataStudent) => {
    setStudent(
      students.map((student) =>
        student.id === updataStudent.id ? updataStudent : student
      )
    )

    setEditStudent(null);
    console.log('update data success')
  }
  //del student fun 
  const delStudent = (id) => {
    setStudent(students.filter((student) => student.id !== id))
    console.log('Delete data success ')
  }

  return (
    <div>
      
      <StudentForm
        addStudent={addStudent}
        updataStudent={updataStudent}
        editingStudent={editStudent}
      />
      <div className=''>
        {students.length > -1 ?(
          students.map((student)=>(
            <StudentCard
              key={student.id}
              student={student}
              onEdit={()=> setEditStudent(student)}
              onDelete={()=>delStudent(student.id)}
            />
          ))

        ):(
          <p>No data pls input data in form </p>
        )
      }

      </div>
    </div>

  )
}

export default AppStudent
