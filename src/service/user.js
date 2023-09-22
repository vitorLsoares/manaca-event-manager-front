import { API, graphqlOperation } from 'aws-amplify';
import { createUser, updateUser, deleteUser } from '../graphql/mutations';
import { listUsers, getUser } from '../graphql/queries';


/* create a user */
const create = async (user) => {
    return await API.graphql(graphqlOperation(createUser, { input: user }));
}

/* update a user */
const update = async (id, params) => {
    return await API.graphql(graphqlOperation(updateUser, { input: { id, ...params } }),);
}

/* delete a user */
const deleteById = async (id) => {
    await API.graphql(graphqlOperation(deleteUser, { input: { id }}));
}

/* get all users */
const getAll = async () => await API.graphql(graphqlOperation(listUsers));

/* get user by id */
const getById = async (id) => await API.graphql(graphqlOperation(getUser, { id }));

const UserService = {
    create,
    update,
    deleteById,
    getAll,
    getById
}

export default UserService;
