import firebase from './firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {toast} from 'react-toastify';

const storage = getStorage(firebase);

export const firebaseUploadImage = (file, folder) => {

    return new Promise((resolve ,reject) =>{
        let state = {
            success : false,
            false: false,
            loading: false,
        };
    
        let firebaseURL;
    
        if (
            file.type === 'image/png' ||
            file.type === 'image/svg' ||
            file.type === 'image/jpeg' ||
            file.type === 'image/gif' ||
            file.type === 'image/tiff' ||
            file.type === 'image/webp'
        ) {
            state.loading = true;
    
            // Create the file metadata
            var metadata = {
                contentType: file.type,
            };
            const storageRef = ref(storage, folder + '/' + file.name);
            var uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
            // Listen for state changes, errors, and completion of the upload.
    
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                  
                    switch (snapshot.state) {
                        case 'paused':
                            break;
                        case 'running':
                            break;
                    }
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            toast.error("User doesn't have permission to access the object");
                            break;
    
                        case 'storage/canceled':
                            toast.error('User canceled the upload');
                            break;
    
                        case 'storage/unknown':
                            toast.error('Unknown error occurred, inspect error.serverResponse');
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setTimeout(() => {
                            state.loading = false;
                            firebaseURL = downloadURL;
                            resolve(downloadURL)
                        }, 0);
                    });
                },
            );
        } else {
           state.error = 'Image wrong type';
           reject('error')
        }
    }) ;
};

