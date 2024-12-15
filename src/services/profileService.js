import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// Function to create or update a user's profile
export const createOrUpdateUserProfile = async (profile) => {
  const userEmail = JSON.parse(localStorage.getItem("user")).email; // Retrieve the email from local storage
  const userDocRef = doc(db, "Profiles", userEmail); // Reference to the user's document

  // Get the document to check if it exists
  const docSnapshot = await getDoc(userDocRef);

  if (docSnapshot.exists()) {
    console.log("Profile exists");
    const existingData = docSnapshot.data();

    // Merge the existing data with the new profile data
    const updatedProfile = { ...existingData, ...profile };

    // Update the user's profile document
    await updateDoc(userDocRef, updatedProfile);
  } else {
    console.log("Profile does not exist");

    // Create a new document for the user's profile
    await setDoc(userDocRef, profile);
  }
};

// Function to fetch a user's profile
export const getUserProfile = async () => {
  const userEmail = JSON.parse(localStorage.getItem("user")).email; // Retrieve the email from local storage
  const userDocRef = doc(db, "Profiles", userEmail); // Reference to the user's document

  // Get the document snapshot
  const docSnapshot = await getDoc(userDocRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data(); // Return the profile data
  } else {
    console.log("Profile not found");
    return null; // Return null if the profile does not exist
  }
};
