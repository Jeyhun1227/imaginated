import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CREATE_CATEGORY_MUTATION, DELETE_CATEGORY_MUTATION } from "../../GraphQL/Mutations/Admin";
import { useMutation } from "@apollo/client";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function GetCategoryList({data}) {

  const [CategoryValues, setCategoryValues] = useState([{'id': 1, 'category': null, 'parent': null}]);
  useEffect(() => {
    if (data) {
        setCategoryValues(data.getAllCategory.rows);
    }
  }, [data]);

  const [category, setCategory] = useState("");
  const [parent, setParent] = useState("");
  const [ranking, setRanking] = useState("");
  const [DeleteIds, setDeleteIds] = useState([])
  const [createCategory, { mutation_error_create }] = useMutation(CREATE_CATEGORY_MUTATION);
  const [deleteCategory, { mutation_error_delete }] = useMutation(DELETE_CATEGORY_MUTATION);

  const addUser = async () => {
    if(category === '' || parent === '') return;
    let createdcategory = await createCategory({
      variables: {
        ranking,
        category,
        parent
      },
    });
    // console.log(createdcategory.data.addCategory.id)
    // CategoryValues.push({category, parent, id: createdcategory.data.addCategory.id});
    setCategoryValues(CategoryValues.concat({category, parent, ranking, id: createdcategory.data.addCategory.id}));
    setCategory("");
    setParent("");
    setRanking("");
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
    field: 'category', headerName: 'Category', width: 200
  }, {
    field: 'parent', headerName: 'Parent', width: 200
  },
  {
    field: 'ranking', headerName: 'Ranking', width: 200
  }
    ]
// handleRowSelection = (row_selected) => {
    // console.log('')
// }
  return (
    <div style={{ height: 300, width: '100%' }}>
      <h1>Category: </h1>
        <Button variant="outline-danger" onClick={delete_current_values}>Delete</Button>
      <DataGrid rows={CategoryValues} columns={columns}  checkboxSelection          onSelectionModelChange={setDeleteIds}
    components={{
          Toolbar: GridToolbar,
        }} />
    <div>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => {
            setCategory(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Parent"
        value={parent}
        onChange={(e) => {
            setParent(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Ranking"
        value={ranking}
        onChange={(e) => {
          setRanking(parseInt(e.target.value));
        }}
      />
      <Button onClick={addUser} variant="outline-primary">Add</Button>
    </div>
    </div>
  );
}


export default GetCategoryList;