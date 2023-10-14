import { db } from "firebase-config/firebase-config";
import { postsCollection } from "firebase-config/firebase-config";
import Quill from "quill";
import React, { useState, useEffect } from "react";
import TextEditor from "../../createPost/components/TextEditor";

const CollabEditor = (props) => {
  const [postRef, setPostRef] = useState();
  const [collaborationSessionRef, setCollaborationSessionRef] = useState();
  const [post, setPost] = useState();
  const [collaborators, setCollaborators] = useState([]);

  const quill = new Quill("#quill-editor");
  useEffect(() => {
    // Get the post document reference
    const postDocRef = postsCollection.doc('post');

    // Set the post document reference
    setPostRef(postDocRef);
    
    // Subscribe to the post document for changes
    postDocRef.onSnapshot((snapshot) => {
      // Get the current state of the post
      const currentPost = snapshot.data();

      // Set the post state
      setPost(currentPost);
    });

    // Get the collaboration session document reference
    const collaborationSessionDocRef = postDocRef.collection('collaborationSessions').doc();

    // Set the collaboration session document reference
    setCollaborationSessionRef(collaborationSessionDocRef);

    // Subscribe to the collaboration session document for changes
    collaborationSessionDocRef.onSnapshot((snapshot) => {
      // Get the current state of the collaboration session
      const currentCollaborationSession = snapshot.data();

      // Set the collaboration session state
      setCollaborators(currentCollaborationSession.collaborators);
    });
  }, []);

  // Publish a real-time event with the new post content
  useEffect(() => {
    if(quill){
      const handler = () => {
        const collaborationSessionId = collaborationSessionRef.id;
        db().ref(`collaborationSessions/${collaborationSessionId}/post`).set(post);
      };
  
      // Publish a real-time event whenever the post content changes
      quill.on("text-change", handler);
  
      return () => {
        quill.off("text-change", handler);
      };
    }
  }, [post]);

  // Return the Quill editor
  return (
  <div>
    <TextEditor quill={quill} content={post.content} />;
  </div> 
)};

export default CollabEditor