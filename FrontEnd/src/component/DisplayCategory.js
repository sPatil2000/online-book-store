import { useState } from "react";
import { Link, useHistory, useParams} from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import categoryService from "../services/category.service";
import {Dropdown,DropdownButton} from 'react-bootstrap'; 
/* import {Navbar,Nav,NavDropdown,Form,Button} from 'react-bootstrap';  */
const DisplayCategory = () => {
    const [categoryArr, setcategoryarr] = useState([]);
    const[categoryId, setCatId] = useState('');
    const history = useHistory();

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
  



      
    return(
      

<div>
<Dropdown>
  <Dropdown.Toggle variant="info" >
    Category
  </Dropdown.Toggle>

  <Dropdown.Menu >
  {
        categoryArr.map(catg=>(
    <Dropdown.Item href={`/category/${catg.id}`}>{catg.name} </Dropdown.Item>
    ))}
  </Dropdown.Menu>
</Dropdown>

{/* <DropdownButton id="dropdown-basic-button"  variant="primary" title="Category" value={categoryArr.name} onChange={(e) => setCatId(e.target.value)}>
{
categoryArr.map((catg)=>(
  <Dropdown.Item value={catg.id}>{catg.name}</Dropdown.Item>
  ))
}
</DropdownButton> */}


 
  {/* <div className="form-group">



<select  id="exampleFormControlSelect1" value={categoryArr.name} onChange={(e) => setCatId(e.target.value)} > */}
{/*  value={school} onChange={e => setSchool(e.target.value)} */}
{/* {
categoryArr.map((catg)=>(
<option value={catg.id} > {catg.name} </option>
))
}
</select>
</div>  */}
</div>

    )
}

export default DisplayCategory;