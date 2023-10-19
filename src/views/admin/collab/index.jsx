import React, { useEffect, useState } from 'react'
//import  CollabEditor from './components/CollabEditor'
import CollabList  from './components/CollabList';
import { getInvites } from 'firebase-config';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { matchCollabDoc } from 'firebase-config';


const CollabPost = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();
  const [currentCollabId, setCurrentCollabId] = useState(null);
  const navigate = useNavigate();
  const [docArr, setDocArr] = useState([]);

  useEffect(()=> {
    matchCollabDoc(currentUser.uid)
    .then(res => { 
      // console.log(res) 
      setDocArr(res);
    })
    .catch(error=>console.log(error))
  },[currentUser.uid])


  console.log(docArr);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const res = await getInvites(currentUser.uid);
        // console.log(res);
        setPosts(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiData();
  }, [currentUser.uid]);
  
  const findCurrentCollabPost=(id)=>{
    return posts.filter((post)=>post.id===id)
  }
  const handleEdit = (id) => {
    setCurrentCollabId(id);
    console.log(findCurrentCollabPost(id));
    
    // const selectedPost = posts.find((post) => docArr.includes(id));
    const selectedPost = findCurrentCollabPost(id);
    console.log(selectedPost);
    navigate("/admin/createPost", { state: { selectedPost } });
  };

  return (
    <div className="flex mt-14 w-full flex-wrap items-center justify-center md:justify-start overflow-hidden">
      {/* <CollabEditor/> */}
      {posts && posts
        .filter((post) => post.published)
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((post) => {
          return (
            <CollabList
              post={post}
              postId={post.id}
              authorData={post.author}
              handleEdit={handleEdit}
            />
          );
        })
      }
    </div>
  )
}
export default CollabPost;