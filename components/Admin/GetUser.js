import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_CATEGORIES } from "../../GraphQL/Queries/Admin";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CREATE_USER_MUTATION, DELETE_USER_MUTATION } from "../../GraphQL/Mutations/Admin";
import { useMutation } from "@apollo/client";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function GetUsers({data}) {
  
  const [CategoryValues, setCategoryValues] = useState([{'id': 1, 'category': null, 'parent': null}]);
  useEffect(() => {
    if (data) {
      let data_val = data.getAllUser.rows.filter((e) => e.id)
      setCategoryValues(data_val);
    }
  }, [data]);

  const [individual, setIndividual] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState("");
  const [email, setEmail] = useState("");
  const [imagelink, setimagelink] = useState("");


  const [DeleteIds, setDeleteIds] = useState([])
  const [createCategory, { mutation_error_create }] = useMutation(CREATE_USER_MUTATION);
  const [deleteCategory, { mutation_error_delete }] = useMutation(DELETE_USER_MUTATION);

  const addUser = async () => {
    if(individual === '' || name === '' || password === '' || email === '') return;
    let createdcategory = await createCategory({
      variables: {
        individual,
        name,
        imagelink,
        description,
        password,
        verified,
        email
      },
    });
    // console.log(createdcategory.data.addCategory.id)
    // CategoryValues.push({category, parent, id: createdcategory.data.addCategory.id});
    setCategoryValues(CategoryValues.concat({individual, imagelink, name, description, password, verified, email, id: createdcategory.data.addUser.id}));
    setIndividual("");
    setName("");
    setDescription("");
    setPassword("");
    setVerified("");
    setimagelink("");
    setEmail("");
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
    field: 'id', headerName: 'ID', width: 100
  }, {
    field: 'individual', headerName: 'Individual', width: 100
  }, {
    field: 'name', headerName: 'Name', width: 100
  },  {
    field: 'description', headerName: 'Description', width: 100
  }, {
    field: 'password', headerName: 'Password', width: 100
  }, {
    field: 'verified', headerName: 'Verified', width: 100
  }, {
    field: 'email', headerName: 'Email', width: 100
  },
  {
    field: 'imagelink', headerName: 'Image Link', width: 100
  }
    ]
// handleRowSelection = (row_selected) => {
    // console.log('')
// }
  return (
    <div style={{ height: 300, width: '100%', marginTop: 200 }}>
      <h1>User: </h1>
        <Button variant="outline-danger" onClick={delete_current_values}>Delete</Button>
      <DataGrid rows={CategoryValues} columns={columns}  checkboxSelection          onSelectionModelChange={setDeleteIds}
    components={{
          Toolbar: GridToolbar,
        }} />
    <div>
      <input
        type="text"
        placeholder="Individual"
        value={individual}
        onChange={(e) => {
          setIndividual(parseInt(e.target.value));
        }}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Verified"
        value={verified}
        onChange={(e) => {
          setVerified(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Imagelink"
        value={imagelink}
        onChange={(e) => {
          setimagelink(e.target.value);
        }}
      />
      <Button onClick={addUser} variant="outline-primary">Add</Button>
    </div>
    </div>
  );
}


export default GetUsers;