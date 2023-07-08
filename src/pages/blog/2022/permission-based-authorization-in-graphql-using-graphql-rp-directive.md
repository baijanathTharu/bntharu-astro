---
layout: '../../../layouts/BlogPost.astro'
title: 'Permission Based Authorization in Graphql using @baijanstack/graphql-rp-directive'
description: 'This post shows the difference between synchronous and asynchronous code.'
pubDate: 'July 08 2022'
heroImage: '/code.jpg'
isPublished: true
---

[**@baijanstack/graphql-rp-directive**](https://www.npmjs.com/package/@baijanstack/graphql-rp-directive) is a package published by me. It uses custom directives in order to apply authorization in graphql. We can do field level authorization
using permissions and roles.

## Usage

1. Install the dependency.

```bash
npm install @baijanstack/graphql-rp-directive
```

2. Update your typedefs with the necessary directive.

```ts
const typedefs = gql`
  directive @hasPermission(permissions: [String!]) on FIELD_DEFINITION | OBJECT

  # your other typedefs
  # ...
`;
```

3. Create your role and permission data.

```ts
import { getAuthorizedSchema, TRolePermission } from '@baijanstack/graphql-rp-directive';

const rolePermissionsData: TRolePermission = {
  ADMIN: {
    permissions: ['READ_SECURE_DATA', 'READ_RESTRICTED_FIELD', 'READ_MUTATION_RESPONSE', 'CREATE_FIELD'],
  },
  PUBLIC: {
    permissions: ['READ_MUTATION_RESPONSE'],
  },
};
```

4. Create your executable schema with your typedefs and resolvers.

```ts
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
```

5. Add the permission directives to your schema.

```ts
const schemaWithPermissionDirective = getAuthorizedSchema(schema, {
  rolePermissionsData,
});
```

6. Pass `schemaWithPermissionDirective` as schema to your graphql server and return the `user` object from the context.

```ts
const server = new ApolloServer<{
  user: {
    roles: Array<string>;
  };
}>({
  schema: schemaWithPermissionDirective,
  context: {
    user: {
      roles: ['PUBLIC'],
    },
  },
});
```

7. By default, all your resolvers request will be denied unless you specify the directive on the field or object.

8. Apply directives to your typedefs.

```ts
const typeDefs = `
directive @hasPermission(permissions: [String!]) on FIELD_DEFINITION | OBJECT

type Query {
  # this api will be denied request because it is missing the directive
  publicFields: PublicField
  restrictedFields: RestrictedField @hasPermission(permissions: ["READ_RESTRICTED_FIELD"])
  secureFields: SecureField @hasPermission(permissions: ["READ_SECURE_DATA"])
}

type PublicField {
  name: String!
}

type RestrictedField {
  name: String!
}

type SecureField @hasPermission(permissions: ["READ_SECURE_DATA"]) {
  name: String!
  email: String!
}

type Mutation {
  createFields(id: Int!): MutationResponse! @hasPermission(permissions: ["CREATE_FIELD"])
}

type MutationResponse @hasPermission(permissions: ["READ_MUTATION_RESPONSE"]) {
  done: Boolean!
}
`;
```
