import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import categoryService from '../services/category.service';

const CategoryList = () => {

  const [categorys, setcategorys] = useState([]);

  const init = () => {
    categoryService.getAll()
      .then(response => {
        console.log('Printing category data', response.data);
        setcategorys(response.data);
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
    categoryService.remove(id)
      .then(response => {
        alert('Category deleted successfully!');
        init();
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
  }

  return (
    <div className="container">
      <h3>List of category</h3>
      <hr/>
      <div>
        <Link to="/category/add" className="btn btn-primary mb-2">Add category</Link>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
          
              <th>Name</th>
            <th>Update</th>
            <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {
            categorys.map(category => (
              <tr key={category.id}>
                <td>{category.name}</td>
               
                <td>
                  <Link className="btn btn-info" to={`/category/edit/${category.id}`}>Update</Link>
                  </td>
                  <td>
                  <button className="btn btn-danger" style={{width:75}}  onClick={() => {
                    handleDelete(category.id);
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

export default CategoryList;
