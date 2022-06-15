import { collection, doc, addDoc, getDocs, getDoc, updateDoc } from 'firebase/firestore';

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

const getAllUsers = async (_req, res, _next) => {
  try {
    const users = await getDocs(collection(db, 'users'));
    const usersArray = [];
    
    if (users.empty) {
      return res.status(404).send('No registered user');
    } else {
      users.forEach((doc) => {
        const user = new User(
          doc.id,
          doc.data().firstName,
          doc.data().lastName,
          doc.data().age,
        );
        usersArray.push(user);
      });
      return res.send(usersArray);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

const getUserById = async (req, res, _next) => {
  try {
    const { id } = req.params;

    const docRef = doc(db, 'users', id);
    const user = await getDoc(docRef);

    if (user.exists()) {
      return res.send(user.data());
    } else {
      return res.status(404).send('User not found');
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

const updateUser = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const docRef = doc(db, 'users', id);
    await updateDoc(docRef, {
      firstName,
      lastName,
      age
    });
    return res.send('User successfully updated');
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export { createUser, getAllUsers, getUserById, updateUser };
