import { collection, addDoc } from 'firebase/firestore';
import db from '../db.js';

const createUser = async (req, res, next) => {
  try {
    const { name, age } = req.body;
    await addDoc(collection(db, 'users'), {
      name,
      age
    });
    return res.send('User successfully created!');
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export { createUser };
