import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_FAVORITES } from "../../GraphQL/Queries/Admin";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CREATE_FAVORITES_MUTATION, DELETE_FAVORITES_MUTATION } from "../../GraphQL/Mutations/Admin";
import { useMutation } from "@apollo/client";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function GetFavorites({data}) {
  const [CategoryValues, setCategoryValues] = useState([{'id': 1, 'category': null, 'parent': null}]);
  useEffect(() => {
    if (data) {
        setCategoryValues(data.getAllFavorites.rows);
    }
  }, [data]);

  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [imagelink, setimagelink] = useState("");
  const [link, setlink] = useState("");
  const [individual, setindividual] = useState("");
  const [validation, setvalidation] = useState("");
  const [description, setdescription] = useState("");

  const [DeleteIds, setDeleteIds] = useState([])
  const [createCategory, { mutation_error_create }] = useMutation(CREATE_FAVORITES_MUTATION);
  const [deleteCategory, { mutation_error_delete }] = useMutation(DELETE_FAVORITES_MUTATION);

  const addUser = async () => {
    if(individual === '' || name === '') return;
    let createdcategory = await createCategory({
      variables: {
        name,
        category,
        subcategory, imagelink, link, individual, validation, description
      },
    });
    // console.log(createdcategory.data.addCategory.id)
    // CategoryValues.push({category, parent, id: createdcategory.data.addCategory.id});
    setCategoryValues(CategoryValues.concat({name, category, subcategory, imagelink, link, individual, validation, description, id: createdcategory.data.addFavorites.id}));
    setname("");
    setcategory("");
    setimagelink("");
    setlink("");
    setindividual("");
    setvalidation("");
    setdescription("");

  };
  const delete_current_values = () => {
    if(DeleteIds.length === 0) return;
    deleteCategory({
        variables: {
            DeleteIds
        },
      });
      setTimeout(() => {
      setCategoryValues(CategoryValues.filter((e) => !DeleteIds.includes(e.id)))
      })
  }
  
  
  let columns = [{
    field: 'id', headerName: 'ID', width: 200
  }, {
    field: 'name', headerName: 'Title', width: 200
  }, 
  {
    field: 'category', headerName: 'Category', width: 200
  },
  {
    field: 'imagelink', headerName: 'ImageLink', width: 200
  },
  {
    field: 'link', headerName: 'Link', width: 200
  },
  {
    field: 'individual', headerName: 'Individual', width: 200
  },
  {
    field: 'validation', headerName: 'Valid', width: 200
  },
  {
    field: 'description', headerName: 'Description', width: 200
  }
    ]

  return (
    <div style={{ height: 300, width: '100%', marginTop: 200 }}>
      <h1>Favorites: </h1>
        <Button variant="outline-danger" onClick={delete_current_values}>Delete</Button>
      <DataGrid rows={CategoryValues} columns={columns}  checkboxSelection          onSelectionModelChange={setDeleteIds}
    components={{
          Toolbar: GridToolbar,
        }} />
    <div>
    <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => {
            setname(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Category Name"
        value={category}
        onChange={(e) => {
          setcategory(e.target.value);
        }}
      />
      {/* <input
        type="text"
        placeholder="Sub Category ID"
        value={subcategory}
        onChange={(e) => {
            setsubcategory(parseInt(e.target.value));
        }}
      /> */}
      <input
        type="text"
        placeholder="Imagelink"
        value={imagelink}
        onChange={(e) => {
            setimagelink(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Link"
        value={link}
        onChange={(e) => {
            setlink(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Individual ID"
        value={individual}
        onChange={(e) => {
            setindividual(parseInt(e.target.value));
        }}
      />
      <input
        type="text"
        placeholder="Valid"
        value={validation}
        onChange={(e) => {
          setvalidation(e.target.value);
        }}
      />
     <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => {
            setdescription(e.target.value);
        }}
      />
      <Button onClick={addUser} variant="outline-primary">Add</Button>
    </div>
    </div>
  );
}


export default GetFavorites;