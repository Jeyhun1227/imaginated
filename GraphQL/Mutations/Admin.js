import { gql } from "@apollo/client";

const CREATE_CATEGORY_MUTATION = gql`
  mutation addCategory(
    $category: String!
    $parent: String!
    $ranking: Int!
  ) {
    addCategory(
        category: $category
        parent: $parent
        ranking: $ranking
    ) {
      id
    }
  }
`;


const DELETE_CATEGORY_MUTATION = gql`
  mutation deleteCategory(
    $DeleteIds: [Int!]
  ) {
    deleteCategory(
      DeleteIds: $DeleteIds
    ) {
      DeleteIds
    }
  }
`;

const CREATE_SUBCATEGORY_MUTATION = gql`
  mutation addSubCategory(
    $subcategory: String!
    $categoryname: String!
  ) {
    addSubCategory(
        subcategory: $subcategory
        categoryname: $categoryname
    ) {
      id
    }
  }
`;

const DELETE_SUBCATEGORY_MUTATION = gql`
  mutation deleteSubCategory(
    $DeleteIds: [Int!]
  ) {
    deleteSubCategory(
      DeleteIds: $DeleteIds
    ) {
      DeleteIds
    }
  }
`;

const CREATE_INDIVIDUAL_MUTATION = gql`
  mutation addIndividual(
    $first_name: String!
    $last_name: String! 
    $aka: String! 
    $description: String! 
    $feature: String! 
    $company: String! 
    $location: String! 
    $founder: String! 
    $link: String! 
    $category: String! 
    $subcategory: [String!]
    $verified: String!
    $imagelink: String!
  ) {
    addIndividual(
      first_name: $first_name
      last_name: $last_name
      aka : $aka
      description : $description
      feature : $feature
      company : $company
      location : $location
      founder : $founder
      link : $link
      category : $category
      subcategory : $subcategory
      verified: $verified
      imagelink: $imagelink
    ) {
      id
    }
  }
`;

const DELETE_INDIVIDUAL_MUTATION = gql`
  mutation deleteIndividual(
    $DeleteIds: [Int!]
  ) {
    deleteIndividual(
      DeleteIds: $DeleteIds
    ) {
      DeleteIds
    }
  }
`;

const CREATE_INDIVIDUAL_FREE_OFFER_MUTATION = gql`
  mutation addIndividualFreeOffer(
    $individual: String!
    $youtube: String!
    $facebook: String!
    $twitter: String!
    $tiktok: String!
    $instagram: String!
    $linkedin: String!
    $slack: String!
    $discord: String!
  ) {
    addIndividualFreeOffer(
      individual: $individual
      youtube: $youtube
      facebook: $facebook
      twitter: $twitter
      tiktok: $tiktok
      instagram: $instagram
      linkedin: $linkedin
      slack: $slack
      discord: $discord
    ) {
      id
    }
  }
`;

const DELETE_INDIVIDUAL_FREE_OFFER_MUTATION = gql`
  mutation deleteIndividualFreeOffer(
    $DeleteIds: [Int!]
  ) {
    deleteIndividualFreeOffer(
      DeleteIds: $DeleteIds
    ) {
      DeleteIds
    }
  }
`;

const CREATE_INDIVIDUAL_PREMIUM_OFFER_MUTATION = gql`
  mutation addIndividualPremiumOffer(
    $individual: Int!
    $name: String!
    $description: String!
    $subheader: String!
    $link: String!
    $subcategory: [String!]
    $imagelink: String!
    $type: String!
    $rank: Int!
  ) {
    addIndividualPremiumOffer(
      individual: $individual
      name: $name
      description: $description
      subheader: $subheader
      link: $link
      subcategory: $subcategory
      imagelink: $imagelink
      type: $type
      rank: $rank
    ) {
      id
    }
  }
`;

const DELETE_INDIVIDUAL_PREMIUM_OFFER_MUTATION = gql`
  mutation deleteIndividualPremiumOffer(
    $DeleteIds: [Int!]
  ) {
    deleteIndividualPremiumOffer(
      DeleteIds: $DeleteIds
    ) {
      DeleteIds
    }
  }
`;

const CREATE_REVIEW_MUTATION = gql`
  mutation addReview(
    $individual: Int!
    $user: Int!
    $premium_offer: Int!
    $description: String!
    $like: String!
    $dislike: String!
    $benefit: String!
    $review: Int!
    $title: String!
    $type: String!
    $validation: String!
  ) {
    addReview(
      individual: $individual
      user: $user
      premium_offer: $premium_offer
      description: $description
      like: $like
      dislike: $dislike
      benefit: $benefit
      review: $review
      title: $title
      type: $type
      validation: $validation
    ) {
      id
    }
  }
`;

const DELETE_REVIEW_MUTATION = gql`
  mutation deleteReview(
    $DeleteIds: [Int!]
  ) {
    deleteReview(
      DeleteIds: $DeleteIds
    ) {
      DeleteIds
    }
  }
`;

const CREATE_FAVORITES_MUTATION = gql`
  mutation addFavorites(
    $individual: Int!
    $name: String!
    $description: String!
    $link: String!
    $imagelink: String!
    $validation: String!
    $category: String!
  ) {
    addFavorites(
      individual: $individual
      name: $name
      description: $description
      link: $link
      imagelink: $imagelink
      validation: $validation
      category: $category
    ) {
      id
    }
  }
`;

const DELETE_FAVORITES_MUTATION = gql`
  mutation deleteFavorites(
    $DeleteIds: [Int!]
  ) {
    deleteFavorites(
      DeleteIds: $DeleteIds
    ) {
      DeleteIds
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation addUser(
    $individual: Int!
    $name: String!
    $description: String!
    $password: String!
    $verified: String!
    $email: String!
    $imagelink: String!
  ) {
    addUser(
      individual: $individual
      name: $name
      description: $description
      password: $password
      verified: $verified
      email: $email
      imagelink: $imagelink
    ) {
      id
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation deleteUser(
    $DeleteIds: [Int!]
  ) {
    deleteUser(
      DeleteIds: $DeleteIds
    ) {
      DeleteIds
    }
  }
`;


export {DELETE_CATEGORY_MUTATION, CREATE_CATEGORY_MUTATION, CREATE_SUBCATEGORY_MUTATION, DELETE_SUBCATEGORY_MUTATION, 
  CREATE_INDIVIDUAL_MUTATION, DELETE_INDIVIDUAL_MUTATION, CREATE_INDIVIDUAL_FREE_OFFER_MUTATION, DELETE_INDIVIDUAL_FREE_OFFER_MUTATION,
  CREATE_INDIVIDUAL_PREMIUM_OFFER_MUTATION, DELETE_INDIVIDUAL_PREMIUM_OFFER_MUTATION,
  CREATE_REVIEW_MUTATION, DELETE_REVIEW_MUTATION, CREATE_FAVORITES_MUTATION, DELETE_FAVORITES_MUTATION,
  CREATE_USER_MUTATION, DELETE_USER_MUTATION};