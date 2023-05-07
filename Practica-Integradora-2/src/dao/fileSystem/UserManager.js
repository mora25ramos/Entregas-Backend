import userDAO from '../mongoDB/userDAO.js';

export async function createUser(userInfo) {
  try {
    const result = await userDAO.createUser(userInfo);
    return { success: true, userId: result.insertedId };
  } catch (error) {
    console.error(`Error occurred while creating new user, ${error}`);
    return { error };
  }
}

export async function getUserByEmail(email) {
  try {
    const user = await userDAO.getUser(email);
    return user;
  } catch (error) {
    console.error(`Error occurred while finding user by email, ${error}`);
    return { error };
  }
}

export async function updateUser(userId, userInfo) {
  try {
    const result = await userDAO.updateUser(userId, userInfo);
    return { success: result.modifiedCount === 1 };
  } catch (error) {
    console.error(`Error occurred while updating user, ${error}`);
    return { error };
  }
}