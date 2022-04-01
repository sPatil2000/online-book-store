import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import productService from '../services/product.service';
import "../assests/css/btnpro.css"
const ProductList = () => {

  const [products, setproducts] = useState([]);

  const init = () => {
    productService.getAll()
      .then(response => {
        console.log('Printing product data', response.data);
        setproducts(response.data);
      })
      .catch(error => {
        console.log('Something went wrong', error);
      }) 
  }

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log('Printing id', id);
    productService.remove(id)
      .then(response => {
        alert('product deleted successfully!');
        init();
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
  }

  return (
    <div className="container">
      <h3>List of product</h3>
      <hr/>
      <div>
        <Link to="/product/add" className="btn btn-primary mb-2">Add product</Link>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Preview</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Update</th>
            <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {
            products.map(product => (
              <tr key={product.id}>
              <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.description}</td>
                <td><img src={`data:image/jpeg;base64,${product.data}`} width="100px" alt={product.name}/></td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.categoryName}</td>
               
                <td>
                  <Link className="btn btn-info" to={`/product/edit/${product.id}`}>Update</Link>
                  </td>
                  <td>
                  <button className="btn btn-danger" onClick={() => {
                    handleDelete(product.id);
                  }}>Delete</button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        
      </div>
    </div>
  );
}

export default ProductList;
