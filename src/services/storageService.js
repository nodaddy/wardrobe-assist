import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export const uploadImageToFirebase = async (file, folder = 'images') => {
  try {
    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `${folder}/${file.name}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);

    // Get the file's download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('File uploaded successfully:', downloadURL);
    return downloadURL; // Return the download URL for further use
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Propagate error for handling
  }
};
