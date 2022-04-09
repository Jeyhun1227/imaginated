import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_REVIEW } from "../../GraphQL/Queries/Admin";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CREATE_REVIEW_MUTATION, DELETE_REVIEW_MUTATION } from "../../GraphQL/Mutations/Admin";
import { useMutation } from "@apollo/client";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function GetReview({data}) {

  const [IndividualValues, setIndividualValues] = useState([{'id': 1, 'individual': null, 'parent': null}]);
  useEffect(() => {
    if (data) {
        console.log(data)
        setIndividualValues(data.getAllReview.rows);
    }
  }, [data]);

  const [individual, setindividual] = useState("");
  const [user, setuser] = useState("");
  const [premium_offer, setpremium_offer] = useState("");
  const [description, setdescription] = useState("");
  const [like, setlike] = useState("");
  const [dislike, setdislike] = useState("");
  const [benefit, setbenefit] = useState("");
  const [review, setreview] = useState("");
  const [title, settitle] = useState("");
  const [type, settype] = useState("");
  const [validation, setvalidation] = useState("");


  const [DeleteIds, setDeleteIds] = useState([]);
  const [createIndividual, { mutation_error_create }] = useMutation(CREATE_REVIEW_MUTATION);
  const [deleteIndividual, { mutation_error_delete }] = useMutation(DELETE_REVIEW_MUTATION);

  const addUser = async () => {
    if(individual === '') return;
    
    let createdindividual = await createIndividual({
      variables: {
        individual,
        user,
        premium_offer,
        description,
        like,
        dislike,
        benefit,
        review,
        title, 
        type,
        validation
      },
    });

    setIndividualValues(IndividualValues.concat({         
        individual,
        user,
        premium_offer,
        description,
        like,
        dislike,
        benefit,
        review,
        title, 
        type,
        validation, id: createdindividual.data.addReview.id}));
    

        setindividual("");
    setuser("");
    setpremium_offer("");
    setdescription("");
    setlike("");
    setdislike("");
    setbenefit("");
    setreview("");
    settitle("");
    settype("");
    setvalidation("");
    
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
  },{
    field: 'user', headerName: 'user', width: 100
  },{
    field: 'premium_offer', headerName: 'Premium Offer ID', width: 100
  },
  {
    field: 'description', headerName: 'Description', width: 100
  },
  {
    field: 'like', headerName: 'Like', width: 100
  },
  {
    field: 'dislike', headerName: 'Dislike', width: 100
  },
  {
    field: 'benefit', headerName: 'Benefit', width: 100
  },
  {
      field: 'review', headerName: 'Review'
  },
  {
    field: 'title', headerName: 'Title'
},
{
    field: 'type', headerName: 'Review Type'
},
{
    field: 'validation', headerName: 'Validation'
},
    ]


  return (
    <div style={{ height: 300, width: '100%', marginTop: 200 }}>
      <h1>Review: </h1>
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
        placeholder="user ID"
        value={user}
        onChange={(e) => {
            setuser(parseInt(e.target.value));
        }}
      />
    <input
        type="text"
        placeholder="Premium Offer ID"
        value={premium_offer}
        onChange={(e) => {
            setpremium_offer(parseInt(e.target.value));
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
        placeholder="like"
        value={like}
        onChange={(e) => {
            setlike(e.target.value);
        }}
      />
            <input
      type="text"
      placeholder="dislike"
      value={dislike}
      onChange={(e) => {
          setdislike(e.target.value);
      }}
    />
    <input
        type="text"
        placeholder="benefit"
        value={benefit}
        onChange={(e) => {
            setbenefit(e.target.value);
        }}
      />  
          <input
        type="text"
        placeholder="review NUMBER"
        value={review}
        onChange={(e) => {
            setreview(parseInt(e.target.value));
        }}
      />  
          <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => {
            settitle(e.target.value);
        }}
      />  
          <input
        type="text"
        placeholder="Review type"
        value={type}
        onChange={(e) => {
            settype(e.target.value);
        }}
      />  
          <input
        type="text"
        placeholder="validation"
        value={validation}
        onChange={(e) => {
            setvalidation(e.target.value);
        }}
      />   
      <Button onClick={addUser} variant="outline-primary">Add</Button>
    </div>
    </div>
  );
}


export default GetReview;