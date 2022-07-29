import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import FormStyles from './styles/Form';
import { useMutation } from '@apollo/client';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Router from 'next/router';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name,
        description: $description,
        price: $price,
        status: "AVAILABLE"
        photo: {
          create: {
            image: $image,
            altText: $name
          }
        }
      }
    ) {
      id
      price
      description
      name
    }
  }
`
export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: '',
    price: 0,
    description: ''
  });

  const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY}]
  });

  return (
    <FormStyles onSubmit={async (e) => {
      e.preventDefault();
      const res = await createProduct();
      clearForm();
      Router.push({
        pathname: `/product/${res.data.createProduct.id}`,
      })
    }}>
      <DisplayError error={error}/>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Image
          <input 
            required
            type="file" 
            id="image" 
            name="image" 
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input 
            type="number" 
            id="price" 
            name="price" 
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description" 
            name="description" 
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </FormStyles>
  )
}