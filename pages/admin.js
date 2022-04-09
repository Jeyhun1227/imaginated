import React from 'react';
import { ApolloProvider } from "@apollo/client";
import GetCategoryList from "../Components/Admin/GetCategoryList";
import GetSubCategoryList from '../components/Admin/GetSubCategoryList';
import GetIndividualList from '../components/Admin/GetIndividual';
import GetIndividualFreeOffers from '../components/Admin/GetIndividualFreeOffers';
import GetIndividualPremiumOffers from '../components/Admin/GetIndividualPremiumOffers';
import GetUsers from '../components/Admin/GetUser';
import GetReview from  '../components/Admin/GetReview';
import GetFavorites from '../components/Admin/GetFavorites';
import client from '../components/GraphQL';
import { LOAD_CATEGORIES, LOAD_SUBCATEGORIES, LOAD_INDIVIDUAL, LOAD_INDIVIDUALFREEOFFER, LOAD_INDIVIDUALPREMIUMOFFER, LOAD_REVIEW, LOAD_FAVORITES, LOAD_USER } from "../GraphQL/Queries/Admin";




const admin_panel = (props) => {
    return (
        <ApolloProvider client={client}>
            <GetCategoryList data={props.load_category}/>
            <GetSubCategoryList data={props.load_subcategory}/>
            <GetIndividualList data={props.load_individual}/>
            <GetIndividualFreeOffers data={props.load_individualfreeoffer}/>
            <GetIndividualPremiumOffers data={props.load_individualpremiumoffer}/>
            <GetReview data={props.load_review}/>
            <GetFavorites data={props.load_favorites}/>
            <GetUsers data={props.load_user}/>
        </ApolloProvider>
    );
};

export async function getServerSideProps(){
    const load_category = await client.query({query:LOAD_CATEGORIES})
    const load_subcategory = await client.query({query:LOAD_SUBCATEGORIES})
    const load_individual = await client.query({query:LOAD_INDIVIDUAL})
    const load_individualfreeoffer = await client.query({query:LOAD_INDIVIDUALFREEOFFER})
    const load_individualpremiumoffer = await client.query({query:LOAD_INDIVIDUALPREMIUMOFFER})
    const load_review = await client.query({query:LOAD_REVIEW})
    const load_favorites = await client.query({query:LOAD_FAVORITES})
    const load_user = await client.query({query:LOAD_USER}) 
    return {
      props: {
        load_category: load_category.data,
        load_subcategory: load_subcategory.data,
        load_individual: load_individual.data,
        load_individualfreeoffer: load_individualfreeoffer.data,
        load_individualpremiumoffer: load_individualpremiumoffer.data,
        load_review: load_review.data,
        load_favorites: load_favorites.data,
        load_user: load_user.data
      }
    }
}


export default admin_panel;