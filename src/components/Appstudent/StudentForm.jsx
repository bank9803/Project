import React, { useState, useEffect } from 'react';

const StudentForm = ({ addStudent, updataStudent, editingStudent }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [nickname, setNickname] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [grade, setGrade] = useState('')

  useEffect(() => {
    console.log('useEffect Success')
    if (editingStudent) {
      setFirstname(editingStudent.firstname)
      setLastname(editingStudent.lastname)
      setNickname(editingStudent.nickname)
      setGender(editingStudent.gender)
      setAge(editingStudent.age)
      setGrade(editingStudent.grade)
    } else {
      setFirstname('')
      setLastname('')
      setNickname('')
      setGender('')
      setAge('')
      setGrade('')
    }
  }, [editingStudent])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !nickname || !age || !grade || !gender) {
      alert('Please fill in all fields')
      return;
    }

    const student = { firstname, lastname, nickname, age, grade, gender }

    if (editingStudent) {
      updataStudent({ id: editingStudent.id, ...student })
    } else {
      addStudent(student)
    }
    setFirstname('')
    setLastname('')
    setNickname('')
    setGender('')
    setAge('')
    setGrade('')
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-4 bg-gradient-to-l from-violet-300 via-violet-500  to-violet-700 rounded-lg shadow-lg'>
      <form className=" rounded px-8 pb-8 pt-6 mb-4" onSubmit={handleSubmit}>
        <h1 className='block text-black text-4xl font-bold mb-2'>Student Form</h1>
        <h2 className='block text-black-100 text-xl font-bold mb-2'>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>

        {/* Firstname */}
        <div className="form-group">
          <label className='block text-gray-100 text-l font-bold mb-2'>Firstname:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        {/* Lastname */}
        <div className="form-group">
          <label className='block text-gray-100 text-l font-bold mb-2'>Lastname:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        {/* nickname */}
        <div className="form-group">
          <label className='block text-gray-100 text-l font-bold mb-2'>Nickname:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label className='block text-gray-100 text-l font-bold mb-2'>gender:</label>
          <label className='text-blue-700'>
            <input
            className='mr-1 ml-1'
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label className='text-pink-700'>
            <input
            className='mr-1 ml-1'
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
          <label>
            <input
            className='mr-1 ml-1'
              type="radio"
              name="gender"
              value="other"
              checked={gender === 'other'}
              onChange={(e) => setGender(e.target.value)}
            />
            Other
          </label>
        </div>

        {/* Age */}
        <div className="form-group">
          <label className='block text-gray-100 text-l font-bold mb-2'>Age:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Grade */}
        <div className="form-group">
          <label className='block text-gray-100 text-l font-bold mb-2'>Grade:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>

        {/* button on update and add */}
        <button className=" mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          {editingStudent ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
