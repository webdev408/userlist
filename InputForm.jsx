import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const InputForm = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    try {
      const getAllData = async () => {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data)
      }
      getAllData()
    } catch (error) {
      console.log(error)
    }
  },[render])

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/users", input);
    setRender(true);
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/users/${ id }`);

    const newUsers = users.filter((user) => {
      return user.id !== id
    })
    setUsers(newUsers)
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <label htmlFor="name">Your Name</label>
              <input name="name" type="text" className='form-control mb-3' placeholder="Enter your name here..." value={input.name} onChange={(e)=>setInput({...input, [e.target.name]:e.target.value})}/>
            </div>
            <div className="input-group mb-3">
              <label htmlFor="email">Email address</label>
              <input name="email" type="email" className='form-control mb-3' placeholder="Enter your email here..." value={input.email} onChange={(e)=>setInput({...input, [e.target.name]:e.target.value})} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="phone">Phone Number</label>
              <input name="phone" type="text" className='form-control mb-3' placeholder="Your phone number..." value={input.phone} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="address">Your address</label>
              <input name="address" type="text" className='form-control mb-3' placeholder="Your full address..." value={input.address} onChange={(e)=>setInput({...input, [e.target.name]:e.target.value})}/>
            </div>
            <button type="submit" className="btn btn-primary form-control mb-3">Submit</button>
          </form>
          <hr />
        </div>
      </div>
      <table className="table table-bordered border-dark table-striped table-hover mt-4">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => ( 
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.address}</td>
              <td>
                <Link to={`/edit/${user.id}`}>
              <button type="submit" className="btn btn-warning ms-3 me-3">
                <i className="fas fa-pencil"></i>
              </button></Link>
              <button type="submit" className="btn btn-danger" onClick={()=>handleDelete(user.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
};