import { collection, addDoc, getDocs } from 'firebase/firestore';

import db from '../db.js';
import User from '../models/userModel.js';

const createUser = async (req, res, _next) => {
  try {
    const { firstName, lastName, age } = req.body;
    await addDoc(collection(db, 'users'), {
      firstName,
      lastName,
      age
    });
    return res.send('User successfully created!');
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getDocs(collection(db, 'users'));
    const usersArray = [];
    
    if (users.empty) {
      return res.status(404).send('No registered user');
    } else {
      users.forEach((user) => {
        const user = new User(
          user.id,
          user.firstName,
          user.lastName,
          user.age,
        );
        usersArray.push(user);
      });
      return res.send(usersArray);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export { createUser, getAllUsers };
