import React, {useState} from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { ArrowLeftCircleFill } from 'react-bootstrap-icons';
import {createCategory} from "./helper/adminapicall"
function AddCategory() {
    const [name, setName ]=useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const {user, token} = isAuthenticated(); //to get userId and token to verify

    const goback=()=>(
        <div className="mt-3">
           <Link className="btn btn-sm btn-success mb-2" to ="/admin/dashboard"><ArrowLeftCircleFill className="m-2" color="white" size={20}/>Admin Home</Link>
        </div>
    )
    const handleChange=event=>{
        setError("");
        setName(event.target.value);
    }
    const onSubmit=(event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false);
        // backend request fired
        createCategory(user._id, token ,{name})//{name}-> bcz we are passing JSON.stringify
        .then(data =>{
            if( data.error){
                setError(true);
            }else{
                setError("");
                setSuccess(true);
                setName("")
            }
        }) 
    }
    const successMessage = () =>{
        if(success){
            return <h4 className="text-success">Category created successfully</h4>
        }
    }

    const warningMessage = () =>{
        if(error){
            return <h4 className="text-success">Failed to create category  </h4>
        }
    }
    const myCategoryForm=()=>(
        <form>
           <div className="form-group">
            <p className="lead text-white">Enter the category</p>
            <input type="text" 
            className="form-control my-3" 
            onChange={handleChange}
            value={name}
            autoFocus
            placeholder="enter category here" 
            required/>
            <div className="col-sm-12 text-center">
            <button onClick={onSubmit} className="btn btn-outline-success mb-3"> Create category</button>
            </div>
           </div>
        </form>
    )


    return ( 
        <Base description="Create new category here"
        className="container bg-info p-4" >
             {goback()}
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2">
                        {successMessage()}
                        {warningMessage()}
                        {myCategoryForm()}
                       
                </div>
            </div>

        </Base>
     );
}

export default AddCategory;