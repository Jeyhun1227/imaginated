import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_INDIVIDUALPREMIUMOFFER } from "../../GraphQL/Queries/Admin";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CREATE_INDIVIDUAL_PREMIUM_OFFER_MUTATION, DELETE_INDIVIDUAL_PREMIUM_OFFER_MUTATION } from "../../GraphQL/Mutations/Admin";
import { useMutation } from "@apollo/client";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function GetIndividualPremiumOffers({data}) {

  const [IndividualValues, setIndividualValues] = useState([{'id': 1, 'individual': null, 'parent': null}]);
  useEffect(() => {
    if (data) {
        setIndividualValues(data.getAllIndividualPremiumOffer.rows);
    }
  }, [data]);

  const [individual, setindividual] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [subheader, setsubheader] = useState("");
  const [link, setlink] = useState("");
  const [imagelink, setimagelink] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [type, settype] = useState("");
  const [rank, setrank] = useState("");


  const [DeleteIds, setDeleteIds] = useState([]);
  const [createIndividual, { mutation_error_create }] = useMutation(CREATE_INDIVIDUAL_PREMIUM_OFFER_MUTATION);
  const [deleteIndividual, { mutation_error_delete }] = useMutation(DELETE_INDIVIDUAL_PREMIUM_OFFER_MUTATION);

  const addUser = async () => {
    if(individual === '') return;
    
    let createdindividual = await createIndividual({
      variables: {
        individual,
        name,
        description,
        subheader,
        subcategory,
        imagelink,
        link,
        type,
        rank
      },
    });

    setIndividualValues(IndividualValues.concat({ individual, name, description, subheader, link, subcategory: parseInt(subcategory), imagelink, type, rank, id: createdindividual.data.addIndividualPremiumOffer.id}));
    setindividual("");
    setname("");
    setdescription("");
    setsubheader("");
    setlink("");
    setsubcategory("");
    setimagelink("");
    settype("");
    setrank("");

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
    field: 'individual', headerName: 'Individual', width: 100
  },
  {
    field: 'name', headerName: 'Name', width: 100
  },
  {
    field: 'description', headerName: 'Description', width: 100
  },
  {
    field: 'subheader', headerName: 'Subheader', width: 100
  },
  {
    field: 'imagelink', headerName: 'Image Link', width: 100
  },
  {
    field: 'link', headerName: 'Link', width: 100
  },
  {
      field: 'subcategory', headerName: 'Subcategory'
  },
  {
    field: 'type', headerName: 'Content Type'
},
{
  field: 'rank', headerName: 'Rank'
}
    ]


  return (
    <div style={{ height: 300, width: '100%', marginTop: 200 }}>
      <h1>Individual Premium Offering: </h1>
        <Button variant="outline-danger" onClick={delete_current_values}>Delete</Button>
      <DataGrid rows={IndividualValues} columns={columns}  checkboxSelection          onSelectionModelChange={setDeleteIds}
    components={{
          Toolbar: GridToolbar,
        }} />
    <div>

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
        placeholder="Subcategory || MULTI"
        value={subcategory}
        onChange={(e) => {
            setsubcategory(e.target.value);
        }}
      />
    <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
            setname(e.target.value);
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
          <input
        type="text"
        placeholder="Subheader"
        value={subheader}
        onChange={(e) => {
            setsubheader(e.target.value);
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
        placeholder="Content Type"
        value={type}
        onChange={(e) => {
            settype(e.target.value);
        }}
      />   
      <input
        type="text"
        placeholder="Rank"
        value={rank}
        onChange={(e) => {
            setrank(parseInt(e.target.value));
        }}
      />   
      <Button onClick={addUser} variant="outline-primary">Add</Button>
    </div>
    </div>
  );
}


export default GetIndividualPremiumOffers;