import firebase from "../firebase"

export default {
  add: (userId, todo) =>
    firebase.database
      .doc(`users/${userId}`)
      .collection("todos")
      .add({ ...todo, createdAt: new Date(), updatedAt: new Date() }),
  update: (userId, todo) =>
    firebase.database
      .doc(`users/${userId}/todos/${todo.id}`)
      .update({ ...todo, updatedAt: new Date() }),
  updateComplete: (userId, todo) =>
    firebase.database
      .doc(`users/${userId}/todos/${todo.id}`)
      .update({ ...todo, status : !todo.status, updatedAt: new Date() }),
  remove: (userId, todoId) =>
    firebase.database.doc(`users/${userId}/todos/${todoId}`).delete(),
  onChange: (userId, callback) =>
    firebase.database
      .collection(`users`)
      .doc(userId)
      .collection("todos")
      .onSnapshot(snapshot =>
        callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      ),
  database: firebase.database,
}
