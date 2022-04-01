import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import productService from "../services/product.service";
import categoryService from "../services/category.service";
const AddProduct = () => {
    const [categoryArr, setcategoryarr] = useState([]);
    const[name, setName] = useState('');
    const[categoryId, setCatId] = useState('');
    const[description, setDescription] = useState('');
    const[image, setImage] = useState('');
    const[price, setPrice] = useState('');
    const[quantity, setQuantity] = useState('');
    const history = useHistory();

    let {productdata} = useParams();
    const {id} = useParams();

    const init = () => {
        categoryService.getAll()
          .then(response => {
            //  alert(response.data);
            
            console.log('Printing category data', response.data);
            setcategoryarr(response.data);
          })
          .catch(error => {
            console.log('Something went wrong', error);
          }) 
      }
      useEffect(() => {
        init();
      }, []);
    
    const saveProduct = (e) => {
        e.preventDefault();
        
        const product = {name, id,categoryId,description,price,quantity};
        productdata=JSON.stringify(product); //js object
       var bodyformdata=new FormData(); //formdata object is created
       //console.log(image);
      
       bodyformdata.append('ProductDto',productdata); //key must match.....key---value based
       bodyformdata.append('ProductImage',image);
       
       
       console.log("product data "+productdata);
       console.log("image "+image);
       console.log("formate "+bodyformdata);
        if (id) {
            //update
            productService.update(bodyformdata)
                .then(response => {
                   alert('Product '+response.data.name+' updated successfully!');
                    history.push('/product');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                }) 
        } else {
            //create
            productService.create(bodyformdata)
            .then(response => {
              alert("Product "+response.data.name+" added successfully!");
                history.push("/product");
            })
            .catch(error => {
                console.log('something went wroing', error);
            })
        }
    }

    useEffect(() => {
        if (id) {
            productService.get(id)
                .then(product => {
                    setName(product.data.productName);//state hooks
                    setCatId(product.data.categoryId);
                    setDescription(product.data.description);
                    setImage(product.data.imageName);
                    setPrice(product.data.price);
                    setQuantity(product.data.quantity);
                   console.log(product.data);
                   // alert("catid "+product.data.catid);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])
    return(
        <div className="container">
            <h3>Add Product</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                    />

                </div>
                <div className="form-group">



                <select  id="exampleFormControlSelect1" value={categoryArr.name} onChange={(e) => setCatId(e.target.value)} >
   {/*  value={school} onChange={e => setSchool(e.target.value)} */}
    {
        categoryArr.map((catg)=>(
          <option value={catg.id} > {catg.name} </option>
          ))
    }
    </select>
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />

                </div>
                <div className = "form-group mb-2">
                                    <label className = "form-label"> Image :</label>
                                    <input
                                        type = "file"
                                        placeholder = "Enter Image"
                                        name = "Image"
                                        className = "form-control"
                                        files = {image}
                                        onChange = {(e) => setImage(e.target.files[0])}
                                    >
                                    </input>
                                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                    />

                </div>
                <div className="form-group">
                    <input 
                        type="number" 
                        className="form-control col-4"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                    />

                </div>
                <div >
                <td>
                    <button onClick={(e) => saveProduct(e)} className="btn btn-primary">Save</button>
                    </td>
                </div>
            </form>
            <hr/>
            <Link to="/product">Back to List</Link>
        </div>
    )
}


export default AddProduct;