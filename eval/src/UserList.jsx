import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function UserList() {
  const [info, setInfo] = useState([])

  const HandleSumbit = (event) => {
    event.preventDefault()
    axios.post(`http://localhost:3000/users`, formData)
      .catch((error) => console.log(error.message))
    axios.get(`http://localhost:3000/users`)
      .then((res) => setInfo(res.data))
      .then(console.log(info))
  }

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
  })
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleDelete = (id) =>{
    axios.delete(`http://localhost:3000/users/${id}`)
  }
  return (
    <>
      <form onSubmit={HandleSumbit} >
        <input type="text" name="nombre" value={formData.nombre} placeholder="Text" aria-label="Text" onChange={HandleChange} />
        <input type="email" name="email" value={formData.email} placeholder="Email" aria-label="Email" autoComplete="email" onChange={HandleChange} />
        <button type='sumbit'>Enviar</button>
      </form >
      <table>
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Id</th>

          </tr>
        </thead>
        <tbody>
          <tr>
          {info.map((user, id) => {
              <>
                <td key={id}>{user.nombre}</td>
                <td key={id}>{user.email}</td>
                <td key={id}>{user.id}</td>
                <button onClick={() => handleDelete(id)}>eliminar</button>
              </>
            })}
          </tr>
        </tbody>
      </table>
    </>
  )
}
export default UserList
