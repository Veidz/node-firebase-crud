import firebase from 'firebase';

const firestore = firebase.firestore();

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection('users').doc().set(data);
    return res.send('User successfully created!');
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export { createUser };
