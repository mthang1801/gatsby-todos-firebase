import firebase from "../firebase"

export default {
  add: (userId, todo) =>
    firebase.database
      .doc(`users/${userId}`)
      .collection("todos")
      .add({ ...todo, createdAt: new Date(), updatedAt: new Date() }),
  update: (userId, todo) =>
    firebase.database
      .doc(`users/${userId}/todos`)
      .update({ ...todo, updatedAt: new Date() }),
  remove: (userId, todoId) =>
    firebase.database.doc(`users/${userId}/todos/${todoId}`).delete(),
  onChange: (userId, callback) =>
    firebase.database
      .collection(`users`)
      .doc(userId)
      .collection("todos")
      .onSnapshot(snapshot => callback(snapshot.docs.map(doc => ({id : doc.id, ...doc.data()}))))
}
