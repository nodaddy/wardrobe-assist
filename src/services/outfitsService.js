import { addDoc, collection, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const createOrUpdateOutfitCollection = async (collectionData) => {
  const userDocRef = doc(db, "Outfits", JSON.parse(localStorage.getItem('user')).email);

  // Get the document (optional: check if it exists)
  const docSnapshot = await getDoc(userDocRef);

  if (docSnapshot.data()) {
    console.log('exists');
    const documentData = docSnapshot.data();
    const updatedCollections = documentData?.collections?.length > 0 
      ? [...documentData.collections, collectionData] 
      : [collectionData]; // Update the array with the new collection

    await updateDoc(userDocRef, {
      collections: updatedCollections
    });
  } else {
    console.log('no exist');

    // Document doesn't exist, create a new one with setDoc
    await setDoc(userDocRef, {
      collections: [collectionData] // Initial array with the new collection
    });
  }
};

export const getOutfits = async () => {
  const userDocRef = doc(db, "Outfits", JSON.parse(localStorage.getItem('user')).email);
  const docSnapshot = await getDoc(userDocRef);
  return docSnapshot.data();
};

export const deleteOutfitCollection = async (collections) => {
  const userDocRef = doc(db, "Outfits", JSON.parse(localStorage.getItem('user')).email);
  await updateDoc(userDocRef, {
    collections: collections
  });
};