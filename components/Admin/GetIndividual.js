import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_INDIVIDUAL } from "../../GraphQL/Queries/Admin";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CREATE_INDIVIDUAL_MUTATION, DELETE_INDIVIDUAL_MUTATION } from "../../GraphQL/Mutations/Admin";
import { useMutation } from "@apollo/client";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function GetIndividualList({data}) {

  const [IndividualValues, setIndividualValues] = useState([{'id': 1, 'individual': null, 'parent': null}]);
  useEffect(() => {
    if (data) {
        setIndividualValues(data.getAllIndividual.rows);
    }
  }, [data]);

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [aka, setaka] = useState("");
  const [description, setdescription] = useState("");
  const [feature, setfeature] = useState("");
  const [company, setcompany] = useState("");
  const [location, setlocation] = useState("");
  const [founder, setfounder] = useState("");
  const [link, setlink] = useState("");
  const [category, setcategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [verified, setverified] = useState("");
  const [imagelink, setimagelink] = useState("");

  const [DeleteIds, setDeleteIds] = useState([]);
  const [createIndividual, { mutation_error_create }] = useMutation(CREATE_INDIVIDUAL_MUTATION);
  const [deleteIndividual, { mutation_error_delete }] = useMutation(DELETE_INDIVIDUAL_MUTATION);

  const addUser = async () => {
    if(first_name === '' || last_name === '' || description === '') return;
    let Tempverified = verified;
    let temp_sub = subcategory.split('||');
    let createdindividual = await createIndividual({
      variables: {
        first_name,
        last_name,
        aka,
        description,
        feature,
        company,
        location,
        founder,
        link,
        category,
        subcategory: temp_sub,
        imagelink,
        verified
      },
    });

    setIndividualValues(IndividualValues.concat({ first_name, last_name, aka, description, feature, company, location, founder, link, 
        category, subcategory, Tempverified, id: createdindividual.data.addIndividual.id}));
    setfirst_name("");
    setlast_name("");
    setaka("");
    setdescription("");
    setfeature("");
    setcompany("");
    setlocation("");
    setlink("");
    setfounder("");
    setcategory("");
    setsubcategory("");
    setverified("");
    setimagelink("");
  };
  const delete_current_values = () => {
    if(DeleteIds.length === 0) return;
    deleteIndividual({
        variables: {
            DeleteIds
        },
      });
      setTimeout(() => {
      setIndividualValues(IndividualValues.filter((e) => !DeleteIds.includes(e.id)))
      })
  }
  let columns = [{
    field: 'id', headerName: 'ID', width: 100
  }, {
    field: 'first_name', headerName: 'first name', width: 100
  },
  {
    field: 'last_name', headerName: 'last name', width: 100
  },
  {
    field: 'aka', headerName: 'aka', width: 100
  },
  {
    field: 'description', headerName: 'description', width: 100
  },
  {
    field: 'feature', headerName: 'feature', width: 100
  },
  {
    field: 'company', headerName: 'company', width: 100
  },
  {
    field: 'location', headerName: 'location', width: 100
  },
  {
    field: 'founder', headerName: 'founder', width: 100
  },
  {
    field: 'link', headerName: 'link', width: 100
  },
  {
    field: 'category', headerName: 'category', width: 100
  },
  {
    field: 'subcategory', headerName: 'subcategory', width: 100
  },
  {
    field: 'verified', headerName: 'verified', width: 100
  },
  {
    field: 'imagelink', headerName: 'image link', width: 100
  }
    ]



  return (
    <div style={{ height: 300, width: '100%', marginTop: 200 }}>
      <h1>Individual: </h1>
        <Button variant="outline-danger" onClick={delete_current_values}>Delete</Button>
      <DataGrid rows={IndividualValues} columns={columns}  checkboxSelection          onSelectionModelChange={setDeleteIds}
    components={{
          Toolbar: GridToolbar,
        }} />
    <div>

    <input
        type="text"
        placeholder="first name"
        value={first_name}
        onChange={(e) => {
            setfirst_name(e.target.value);
        }}
      />
    <input
        type="text"
        placeholder="last name"
        value={last_name}
        onChange={(e) => {
            setlast_name(e.target.value);
        }}
      />
    <input
        type="text"
        placeholder="aka"
        value={aka}
        onChange={(e) => {
            setaka(e.target.value);
        }}
      />
          <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => {
            setdescription(e.target.value);
        }}
      />
          <input
        type="text"
        placeholder="feature  || MULTI"
        value={feature}
        onChange={(e) => {
            setfeature(e.target.value);
        }}
      />
          <input
        type="text"
        placeholder="company"
        value={company}
        onChange={(e) => {
            setcompany(e.target.value);
        }}
      />
          <input
        type="text"
        placeholder="location"
        value={location}
        onChange={(e) => {
            setlocation(e.target.value);
        }}
      />
                <input
        type="text"
        placeholder="founder"
        value={founder}
        onChange={(e) => {
            setfounder(e.target.value);
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
        placeholder="category"
        value={category}
        onChange={(e) => {
            setcategory(e.target.value);
        }}
      />
                <input
        type="text"
        placeholder="subcategory  || MULTI"
        value={subcategory}
        onChange={(e) => {
            setsubcategory(e.target.value);
        }}
      />
                <input
        type="text"
        placeholder="verified"
        value={verified}
        onChange={(e) => {
            setverified(e.target.value);
        }}
      />
        <input
        type="text"
        placeholder="Image Link"
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


export default GetIndividualList;