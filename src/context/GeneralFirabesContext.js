import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { createContext } from "react";
import * as firebaseApp from "../firebase/firebase";

export const GeneralFirebaseContext = createContext();
const refcollection = collection(firebaseApp.fireStore, "foods");

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allOrders, setAllOrders] = useState(null);
  const [allFoods, setAllFoods] = useState(null);

  const loginWithEmail = async (email, password) => {
    try {
      const newUser = await signInWithEmailAndPassword(
        firebaseApp.auth,
        email,
        password
      );
    } catch (error) {
      alert(error.message);
    }
  };

  onAuthStateChanged(firebaseApp.auth, (createdUser) => {
    setUser(createdUser);
  });

  const logOut = async () => {
    try {
      await signOut(firebaseApp.auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  // const addFood = async (food) => {
  //   try {
  //     await addDoc(refcollection, food);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const addFood = async (newProduct, image) => {
    const refHosting = ref(firebaseApp.storage, `images/${image.name}`);
    const uploadImage = uploadBytesResumable(refHosting, image);

    uploadImage.on(
      "state_change",
      (snapshot) => {},
      (err) => {
        console.log(err.message);
      },
      () =>
        getDownloadURL(uploadImage.snapshot.ref).then((url) =>
          addDoc(collection(firebaseApp.fireStore, "foods"), {
            ...newProduct,
            img: url,
          })
        )
    );
  };

  const addOrder = async (order) => {
    try {
      await addDoc(collection(firebaseApp.fireStore, "orders"), order);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getOrdersFromFirebase = async () => {
    const data = await getDocs(collection(firebaseApp.fireStore, "orders"));
    await setAllOrders(
      data.docs.map((order) => ({
        data: order.data(),
        id: order.id,
      }))
    );
  };

  const getAllFoods = async () => {
    try {
      const data = await getDocs(collection(firebaseApp.fireStore, "foods"));
      await setAllFoods(
        data.docs.map((food) => ({
          data: food.data(),
          id: food.id,
        }))
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateOrder = (id, newData) => {
    const refToDoc = doc(firebaseApp.fireStore, "orders", id);
    updateDoc(refToDoc, { ...newData });
  };

  const deleteOrder = async (id) => {
    await deleteDoc(doc(firebaseApp.fireStore, "orders", id));
  };

  const deleteFood = async (id) => {
    await deleteDoc(doc(firebaseApp.fireStore, "foods", id));
  };

  useEffect(() => {
    getAllFoods();
    getOrdersFromFirebase();
    console.log("asd");
  }, []);

  const data = {
    user,
    loginWithEmail,
    logOut,
    addFood,
    addOrder,
    getOrdersFromFirebase,
    allFoods,
    allOrders,
    getAllFoods,
    updateOrder,
    deleteOrder,
    deleteFood,
  };

  return (
    <GeneralFirebaseContext.Provider value={data}>
      {children}
    </GeneralFirebaseContext.Provider>
  );
};
