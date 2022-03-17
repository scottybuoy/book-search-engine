import { gql } from '@apollo/client';

export const GET_USER = gql`
    {
        user {
            _id
            username
            email
            savedBooks {
                _id
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;