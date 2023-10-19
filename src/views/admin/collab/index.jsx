import React, { useEffect, useState } from 'react'
//import  CollabEditor from './components/CollabEditor'
import CollabList  from './components/CollabList';
import { getInvites } from 'firebase-config';
import { useAuth } from 'contexts/AuthContext';


const CollabPost = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();
  const fetchApiData = async () => {
    try {
      const res = await getInvites(currentUser.uid);
      console.log(res);
      setPosts(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApiData();
  }, []);
  return (
    <div className="flex mt-14 w-full flex-wrap items-center justify-start overflow-hidden">
      {/* <CollabEditor/> */}
      {posts && posts
        .filter((post) => post.published)
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((post) => {
          return (
            <CollabList
              post={post}
              authorData={post.author}
            />
          );
        })
      }
    </div>
  )
}
export default CollabPost;