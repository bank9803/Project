import React from 'react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  console.log({student})
  return (
    <div className='max-w-md mx-auto mt-10 p-4 bg-purple-400 rounded-lg shadow-lg'>
      <h3 className='font-bold text-xl mb-2'>Name :{student.firstname} {student.lastname}</h3>
      <p className='font-bold text-xl mb-2'>Nickname: {student.nickname}</p>
      <p className='font-bold text-xl mb-2'>Gender: {student.gender}</p>
      <p className='font-bold text-xl mb-2'>Age: {student.age}</p>
      <p className='font-bold text-xl mb-2'>Grade: {student.grade}</p>
      <button className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-4 mb-2' onClick={onEdit}>Edit</button>
      <button className='shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-2' onClick={onDelete}>Delete</button>
    </div>
  );
};

export default StudentCard;
