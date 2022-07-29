import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';
// import { permissions, rules } from '../access';

export const User = list({
  // access:
  // ui:
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    //  TODO add roles, cart, and orders
  }
})