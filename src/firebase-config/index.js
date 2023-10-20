import { db, postsCollection, auth } from "./firebase-config";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  runTransaction,
  onSnapshot,
} from "firebase/firestore";

export const createPost = async (rest) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated.");
    }

    // user ka auth id
    const userId = user.uid;

    const newPost = {
      ...rest,
      author: {
        name: user.displayName,
        userId: userId,
      },
      createdAt: Date.now(),
    };
    const docRef = await addDoc(postsCollection, newPost);
    // can be used to identify current note id
    return docRef.id;
  } catch (error) {
    console.error("Error creating post", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated.");
    }
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    if (postDoc.exists() && postDoc.data().author.userId === user.uid) {
      await deleteDoc(postRef);
    } else {
      console.error("Unauthorized to delete this post.");
    }
  } catch (error) {
    console.error("Error deleting post", error);
    throw error;
  }
};

export const editPost = async (postId, updatedData) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated.");
    }
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    if (postDoc.exists() && postDoc.data().author.userId === user.uid) {
      await updateDoc(postRef, updatedData);
      // console.log("Post updated successfully.");
    } else {
      console.error("Unauthorized to edit this post.");
    }
  } catch (error) {
    console.error("Error editing post", error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const postRef = collection(db, "posts");
    const querySnapshot = await getDocs(postRef);
    const posts = [];
    querySnapshot.forEach((doc) => {
      const postData = {
        id: doc.id,
        ...doc.data(),
      };
      posts.push(postData);
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts", error);
    throw error;
  }
};

export const getAllPostsById = async (userId) => {
  try {
    const postRef = collection(db, "posts");
    const querySnapshot = await getDocs(postRef);
    const posts = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().author.userId === userId) {
        const postData = {
          id: doc.id,
          ...doc.data(),
        };
        posts.push(postData);
      }
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts", error);
    throw error;
  }
};

export const updateUserDetails = async (uid, userDetails) => {
  try {
    // console.log(uid);
    const { bio, location, twiter, instagram } = userDetails;
    const postRef = collection(db, "users");
    const postDoc = await getDocs(postRef);
    // console.log(postDoc);
    const updatedDetails = {
      bio,
      location,
      twiter,
      instagram,
    };
    // console.log(updatedDetails)
    postDoc.forEach(async (docs) => {
      // console.log(docs.data().userUid);
      if (docs.data().userUid === uid) {
        // console.log(docs.data());
        await updateDoc(doc(db, "users", docs.id), { updatedDetails });
      }
    });
  } catch (error) {
    console.log("Error updating user details : ", error);
    throw error;
  }
};

// fetch like

export const fetchLike = async (postId) => {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  // console.log(docSnap.data().likes);
  return docSnap.data().likes;
};

// Updating likes
export const updateLikes = async (postId) => {
  // console.log("console from updatelikes---> ",postId);
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  let likes = 0;
  // console.log(typeof docSnap.data().likes);
  if (docSnap.data().likes) {
    // console.log("exist");
    likes = docSnap.data().likes + 1;
    // console.log(typeof likes);
  } else {
    // console.log("not exist");
    likes = 1;
    // console.log(typeof likes);
  }
  await updateDoc(docRef, { likes });
};

// User Collection

export const createUserDocument = async (uid, user) => {
  try {
    const userRef = collection(db, "users");
    const userDocRef = doc(userRef, user.uid);
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
        createdAt: serverTimestamp(),
        userUid: uid,
      });
    }
  } catch (error) {
    console.error("Error creating user document", error);
    throw error;
  }
};

export const addCollabMail = async (postId, newMail) => {
  try {
    const postRef = doc(db, "posts", postId);

    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postRef);

      if (postDoc.exists()) {
        const existingData = postDoc.data();

        // array to store existing or new mails
        const collabMails = existingData.collabMails || [];

        //check if mail is already invited or not
        if (collabMails.includes(newMail)) {
          // console.log("Mail already invited");
          return; // exits the runTransaction
        }
        // Add the new mail to the existing array
        collabMails.push(newMail);

        transaction.set(postRef, { collabMails: collabMails }, { merge: true });
        // console.log("Updated");
      } else {
        console.error("Unauthorized to add collaborators.");
      }
    });
  } catch (error) {
    console.error("Error updating collab mails: ", error);
    throw error;
  }
};

//show collab invites
export const collabInvites = async (userId) => {
  try {
    // post db reference
    const getRef = collection(db, "posts");
    const getDoc = await getDocs(getRef);
    //user db reference
    const postRef = doc(db, "users", userId);

    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postRef);
      if (postDoc.exists()) {
        const email = postDoc.data().email;
        const collabDocs = postDoc.data().collabDocs || []; // collab doc array

        for (const doc of getDoc.docs) {
          const collabMails = doc.data().collabMails || []; // collab mail array
          // Check if the document is already in collabDocs
          if (collabDocs.includes(doc.id)) {
            //  console.log("Document already exists in collabDocs. Exiting.");
            break; // Exit early if the document is already in collabDocs
          }

          if (collabMails.includes(email)) {
            // console.log("mail present",email);

            // Add the new doc to the existing array
            collabDocs.push(doc.id);
            // console.log(doc.id);
            try {
              transaction.set(
                postRef,
                { collabDocs: collabDocs },
                { merge: true }
              );
              // console.log("Updated");
            } catch (error) {
              console.error("Error updating doc: ", error);
              throw error;
            }
            break;
          } else {
            console.log("Mail is not present");
          }
        }
      }
    });
  } catch (error) {
    console.error("Error showing collab mails: ", error);
    throw error;
  }
};

// get invites docs

export const getInvites = async (userId) => {
  try {
    //all posts collections reference
    const getRef = collection(db, "posts");
    const getSnapshot = await getDocs(getRef);

    //current user's user collection reference
    const postRef = doc(db, "users", userId);
    const postDoc = await getDoc(postRef);

    //getting my mail from user doc
    const mail = postDoc.data().email;
    // console.log(mail);

    // converting the query Snapshot of posts collections to an array
    const dataArray = getSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // collab docs array
    const docs = [];

    // iterating through the query Array
    for (let i = 0; i < dataArray.length; i++) {
      const doc = dataArray[i];

      // if collabMails exists
      if (doc.collabMails) {
        // console.log(Object.entries(doc.collabMails));
        if (Object.values(doc.collabMails).includes(mail)) {
          // checking the collabMails object through an array
          //console.log(doc);
          docs.push(doc);
        }
      }
    }
    return docs;
  } catch (error) {
    console.error("Error getting collab docs: ", error);
    throw error;
  }
};

export const collabEdit = async (postId, updatedData) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);

    //current user's user collection reference
    const getRef = doc(db, "users", user.id);
    const getSnapshot = await getDoc(getRef);

    //getting my mail from user doc
    const mail = getSnapshot.data().email;
    //  console.log(mail);

    if (
      postDoc.exists() &&
      Object.values(postDoc.data().collabMails).includes(mail)
    ) {
      await updateDoc(postRef, updatedData);
      // console.log("Post updated successfully.");
      // Implementing real-time updates
      onSnapshot(postRef, (snapshot) => {
        // The snapshot will contain the updated data
        const updatedPostData = snapshot.data().content;
        // this updated data to reflect changes on the screen
        // console.log("Real-time update:", updatedPostData);
      });
    } else {
      console.error("Unauthorized to edit this post.");
    }
  } catch (error) {
    console.error("Error editing collab post", error);
    throw error;
  }
};

const snapshotToArray = (snapshot) =>
  Object.entries(snapshot).filter((data) => data[0] === "collabDocs");

export const matchCollabDoc = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    const arr = snapshotToArray(docSnap.data());
    return arr[0][1];
  } catch (error) {
    console.error("Error matching collab doc id", error);
    throw error;
  }
};

export const findCurrentCollabPost = async (id) => {
  try {
    const docRef = db.collection("posts").doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
      return doc.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
};

export const collabUpdatePost = async (postId, updatedData) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated.");
    }
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
      await updateDoc(postRef, updatedData);
      // console.log("Post updated successfully.");
    } else {
      console.error("Unauthorized to edit this post.");
    }
  } catch (error) {
    console.error("Error editing post", error);
    throw error;
  }
};
