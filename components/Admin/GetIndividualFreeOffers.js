import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_INDIVIDUALFREEOFFER } from "../../GraphQL/Queries/Admin";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CREATE_INDIVIDUAL_FREE_OFFER_MUTATION, DELETE_INDIVIDUAL_FREE_OFFER_MUTATION } from "../../GraphQL/Mutations/Admin";
import { useMutation } from "@apollo/client";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function GetIndividualFreeOffers({data}) {

  const [IndividualValues, setIndividualValues] = useState([{'id': 1, 'individual': null, 'parent': null}]);
  useEffect(() => {
    if (data) {
        setIndividualValues(data.getAllIndividualFreeOffer.rows);
    }
  }, [data]);

  const [individual, setindividual] = useState("");
  const [youtube, setyoutube] = useState("");
  const [facebook, setfacebook] = useState("");
  const [twitter, settwitter] = useState("");
  const [tiktok, settiktok] = useState("");
  const [instagram, setinstagram] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [slack, setslack] = useState("");
  const [discord, setdiscord] = useState("");


  const [DeleteIds, setDeleteIds] = useState([]);
  const [createIndividual, { mutation_error_create }] = useMutation(CREATE_INDIVIDUAL_FREE_OFFER_MUTATION);
  const [deleteIndividual, { mutation_error_delete }] = useMutation(DELETE_INDIVIDUAL_FREE_OFFER_MUTATION);

  const addUser = async () => {
    if(individual === '') return;
    
    let createdindividual = await createIndividual({
      variables: {
        individual,
        youtube,
        facebook,
        twitter,
        tiktok,
        instagram,
        linkedin,
        slack,
        discord
      },
    });

    setIndividualValues(IndividualValues.concat({ individual, youtube, facebook, twitter, tiktok, instagram, linkedin, slack, discord, id: createdindividual.data.addIndividualFreeOffer.id}));
    setindividual("");
    setyoutube("");
    setfacebook("");
    settwitter("");
    settiktok("");
    setinstagram("");
    setlinkedin("");
    setslack("");
    setdiscord("");
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
  }, 
  {
    field: 'individual', headerName: 'Individual ID', width: 100
  },
  {
    field: 'youtube', headerName: 'Youtube', width: 100
  },
  {
    field: 'facebook', headerName: 'Facebook', width: 100
  },
  {
    field: 'twitter', headerName: 'Twitter', width: 100
  },
  {
    field: 'tiktok', headerName: 'TikTok', width: 100
  },
  {
    field: 'instagram', headerName: 'Instagram', width: 100
  },
  {
    field: 'linkedin', headerName: 'Linkedin', width: 100
  },
  {
    field: 'slack', headerName: 'Slack', width: 100
  },
  {
    field: 'discord', headerName: 'Discord', width: 100
  }
    ]


  return (
    <div style={{ height: 300, width: '100%', marginTop: 200 }}>
      <h1>Individual Free Offering: </h1>
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
            setindividual(e.target.value);
        }}
      />
    <input
        type="text"
        placeholder="Youtube"
        value={youtube}
        onChange={(e) => {
            setyoutube(e.target.value);
        }}
      />
    <input
        type="text"
        placeholder="Facebook"
        value={facebook}
        onChange={(e) => {
            setfacebook(e.target.value);
        }}
      />
          <input
        type="text"
        placeholder="Twitter"
        value={twitter}
        onChange={(e) => {
            settwitter(e.target.value);
        }}
      />
          <input
        type="text"
        placeholder="TikTok"
        value={tiktok}
        onChange={(e) => {
            settiktok(e.target.value);
        }}
      />
          <input
        type="text"
        placeholder="Instagram"
        value={instagram}
        onChange={(e) => {
            setinstagram(e.target.value);
        }}
      />
          <input
        type="text"
        placeholder="Linkedin"
        value={linkedin}
        onChange={(e) => {
            setlinkedin(e.target.value);
        }}
      />
                <input
        type="text"
        placeholder="Slack"
        value={slack}
        onChange={(e) => {
            setslack(e.target.value);
        }}
      />
              <input
        type="text"
        placeholder="Discord"
        value={discord}
        onChange={(e) => {
            setdiscord(e.target.value);
        }}
      />
              
      <Button onClick={addUser} variant="outline-primary">Add</Button>
    </div>
    </div>
  );
}


export default GetIndividualFreeOffers;