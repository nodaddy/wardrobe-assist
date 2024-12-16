import { addDoc, collection, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const createOrUpdateWardrobeItem = async (item) => {
  const userDocRef = doc(db, "Wardrobe", JSON.parse(localStorage.getItem('user')).email);

  // Get the document (optional: check if it exists)
  const docSnapshot = await getDoc(userDocRef);

  if (docSnapshot.data()) {
    console.log('exists');
    const documentData = docSnapshot.data();
    const updatedItems = documentData?.items?.length > 0 ? [...documentData?.items, item] : [item]; // Update the array

    await updateDoc(userDocRef, {
      items: updatedItems
    });
  } else {
    console.log('no exist');

    // Document doesn't exist, consider creating a new one with setDoc
    await setDoc(userDocRef, {
      items: [item] // Initial array with the new item
    });
  }
};

export const getWardrobeItems = async () => {
  const userDocRef = doc(db, "Wardrobe", JSON.parse(localStorage.getItem('user')).email);
  const docSnapshot = await getDoc(userDocRef);
  return docSnapshot.data();
}

export const  deleteWardrobeItem = async (items) => {
  const userDocRef = doc(db, "Wardrobe", JSON.parse(localStorage.getItem('user')).email);
  await updateDoc(userDocRef, {
    items: items
  });
}