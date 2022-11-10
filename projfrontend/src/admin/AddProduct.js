import React, {useState, useEffect} from "react";
import Base from "../core/Base";
import { ArrowLeftCircleFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import {getAllCategories,createaProduct} from "./helper/adminapicall"
import { isAuthenticated } from "../auth/helper/index";

 const AddProduct= ()=> {
  const [categoryF, setCategoryF] = useState([])
  const {user, token}=isAuthenticated()
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  });
  
  const {
    name,
    description,
    price,
    stock,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;
  const preload = () => {
    getAllCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, formData: new FormData() });
        setCategoryF(data.items)
      }
      

    });
  };

  useEffect(() => {
    preload();
  },[]);

 const goback=()=>(
        <div className="mt-3">
           <Link className="btn btn-sm btn-success mb-2" to ="/admin/dashboard">
            <ArrowLeftCircleFill className="m-2" color="white" size={20}/>
            Admin Home
          </Link>
        </div>
    )

const handleChange= name => event =>{
  const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
}
const onSubmit = (event)=>{
  event.preventDefault();
  setValues({...values, error: "",loading: true});
  createaProduct(user._id,token,formData).then(data => {
    if (data.error) {
      setValues({...values, error: data.error});
    } else {
      setValues({...values,
      name:"",
      description:"",
      price:"",
      photo:"",
      stock:"",
      loading:false,
      createdproduct: data.name });
     

    }
  });
}
const successMessage=()=>(
  <div className="alert alert-success mt-3"
  style={{display : createdProduct ? "": "none"}}>
   
    <h4>{createdProduct} created successfully</h4>
  </div>
)
// const errorMessage=()=>{
//   if(!successMessage()){
//     return <div className="alert alert-success mt-3"
//     style={{display : createdProduct ? "": "none"}}>
     
//       <h4>{createdProduct} is not created successfully</h4>
//     </div>
//   }
// }
    const createProductForm = () => (
        <form >
          <span className="text-white">Post photo</span>
          <div className="form-group text-white mt-3">
            {/* <label className="btn btn-success"> */}
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
                className="text-dark form-control"
              />
            {/* </label> */}
          </div>
          <div className="form-group mt-3">
            <input
              onChange={handleChange("name")}
              type="text"
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group mt-3">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group mt-3">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group mt-3">
            <select
              onChange={handleChange("category")}
               className="form-control"
              placeholder="Category"
            >
              <option>Select Category</option>
              {categoryF && categoryF.map((cate, index) => (
              <option  key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
            </select>
          </div>
          <div className="form-group mt-3">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mt-3 mb-3">
            Create Product
          </button>
        </form>
      );


    return ( 
        <Base description="welcome to product creation section"
        className="container bg-info p-4">
            {goback()}
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                  {/* {errorMessage()} */}
                    {createProductForm()}
                       
                </div>
            </div>
        </Base>

     );
 }
 
 export default AddProduct ;