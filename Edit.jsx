import {useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    try {
      const getSingleRecord = async () => {
        const response = await axios.get(`http://localhost:3001/users/${ id }`);
        setInput(response.data);
      }
      getSingleRecord()
    } catch (error) {
      console.log(error)
    }
  }, [id])
  
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/users/${ id }`, input);
      navigate("/")
    } catch (error) {
      console.log(error)
    }    
  }

  return (
    <>
    <div className="panel panel-default m-4 p-4 bg-primary">
      <h2 className="text-center text-white">Update User Record</h2>
      </div>
    <div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleEdit}>
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
            <button type="submit" className="btn btn-primary mb-3">Update</button>
          </form>
          <button type="submit" className="btn btn-block btn-success" onClick={()=>navigate("/")}>Go Home</button>
        </div>
      </div>      
      </div>
      </>
  )
};