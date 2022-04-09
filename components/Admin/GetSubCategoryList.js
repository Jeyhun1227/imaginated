import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CREATE_SUBCATEGORY_MUTATION, DELETE_SUBCATEGORY_MUTATION } from "../../GraphQL/Mutations/Admin";
import { useMutation } from "@apollo/client";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function GetSubCategoryList({data}) {

  const [SubCategoryValues, setSubCategoryValues] = useState([{'id': 1, 'category': null, 'parent': null}]);
  useEffect(() => {
    if (data) {
        setSubCategoryValues(data.getAllSubCategory.rows);
    }
  }, [data]);

  const [subcategory, setSubCategory] = useState("");
  const [categoryname, setcategoryname] = useState("");
  const [DeleteIds, setDeleteIds] = useState([])
  const [createSubCategory, { mutation_error_create }] = useMutation(CREATE_SUBCATEGORY_MUTATION);
  const [deleteSubCategory, { mutation_error_delete }] = useMutation(DELETE_SUBCATEGORY_MUTATION);

  const addUser = async () => {
    if(subcategory === '' || categoryname === '') return;
    let createdsubcategory = await createSubCategory({
      variables: {
        subcategory,
        categoryname
      },
    });

    setSubCategoryValues(SubCategoryValues.concat({subcategory, categoryname, id: createdsubcategory.data.addSubCategory.id}));
    setSubCategory("");
    setcategoryname("");
  };
  const delete_current_values = () => {
    if(DeleteIds.length === 0) return;
    deleteSubCategory({
        variables: {
            DeleteIds
        },
      });
      setTimeout(() => {
      setSubCategoryValues(SubCategoryValues.filter((e) => !DeleteIds.includes(e.id)))
      })
  }
  let columns = [{
    field: 'id', headerName: 'ID', width: 200
  }, {
    field: 'subcategory', headerName: 'SubCategory', width: 200
  }, {
    field: 'categoryname', headerName: 'Category Name', width: 200
  }
    ]
// handleRowSelection = (row_selected) => {
    // console.log('')
// }
  return (
    <div style={{ height: 300, width: '100%', marginTop: 200 }}>
      <h1>SubCategory: </h1>
        <Button variant="outline-danger" onClick={delete_current_values}>Delete</Button>
      <DataGrid rows={SubCategoryValues} columns={columns}  checkboxSelection          onSelectionModelChange={setDeleteIds}
    components={{
          Toolbar: GridToolbar,
        }} />
    <div>
      <input
        type="text"
        placeholder="SubCategory"
        value={subcategory}
        onChange={(e) => {
            setSubCategory(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Category Name"
        value={categoryname}
        onChange={(e) => {
            setcategoryname(e.target.value);
        }}
      />
      <Button onClick={addUser} variant="outline-primary">Add</Button>
    </div>
    </div>
  );
}


export default GetSubCategoryList;