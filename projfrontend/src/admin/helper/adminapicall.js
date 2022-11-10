import { API } from "../../backend";

export const createCategory=async (userId, token, category)=>{
   
    try {
    const response = await fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
}

//get all categories
export const  getAllCategories =async ()=> {
    try {
    const response = await fetch(`${API}/categories`, {
      method: "GET"
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
  };

//products calls

//create a product
export const createaProduct = async (userId, token, product) => {
  try {
    const response = await fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",

        Authorization: `Bearer ${token}`
      },
      body: product
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
  };

  //get all products
export const getProducts = async () => {
    try {
    const response = await fetch(`${API}/products`, {
      method: "GET"
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
  };

//delete a product

export const deleteProduct =  async (productId, userId, token) => {
    try{
    const response = await fetch(`${API}/${productId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await response.json();
}catch(err){
  return console.log(err);
}
   
  } 

//get a product

export const getProduct = async productId => {
    try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: "GET"
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
  };

//update a product

export const updateProduct = async (productId, userId, token, product) => {
    try {
    const response = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: product
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
  };

