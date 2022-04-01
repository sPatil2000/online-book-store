import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import categoryService from "../services/category.service";

const Category = () => {
    const[name, setName] = useState('');
    
    const history = useHistory();
    const {id} = useParams();

    const savecategory = (e) => {
        e.preventDefault();
        
        const category = {name, id};
        if (id) {
            //update
            categoryService.update(category)
                .then(response => {
                   alert('Category '+response.data.name+' updated successfully!');
                    history.push('/category');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                }) 
        } else {
            //create
            categoryService.create(category)
            .then(response => {
              alert("Category "+response.data.name+" added successfully!");
                history.push("/category");
            })
            .catch(error => {
                console.log('something went wroing', error);
            })
        }
    }

    useEffect(() => {
        if (id) {
            categoryService.get(id)
                .then(category => {
                    setName(category.data.name);//state hooks
                    
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])
    return(
        <div className="container">
            <h3>Add category</h3>
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
               
             
                <div >
                    <button onClick={(e) => savecategory(e)}  style={{width:75}} className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/category">Back to List</Link>
        </div>
    )
}

export default Category;