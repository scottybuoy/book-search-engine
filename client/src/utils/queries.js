import { gql } from '@apollo/client';

export const QUERY_USER = gql`
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