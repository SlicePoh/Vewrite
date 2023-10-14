import React, { useEffect, useState } from 'react'
//import  CollabEditor from './components/CollabEditor'
import CollabList  from './components/CollabList';
import { getAllPosts } from 'firebase-config';


const CollabPost = () => {
  const [posts, setPosts] = useState([]);
  const fetchApiData = async (url) => {
    try {
      const res = await getAllPosts();
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
              createdAt={post.createdAt}
            />
          );
        })
      }
    </div>
  )
}
export default CollabPost;