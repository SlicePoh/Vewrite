import React, { useEffect, useState } from "react";
import TextEditor from "./components/TextEditor";
import AddModal from "./components/AddModal";
import { MdOutlineSave } from "react-icons/md";
import { createPost, editPost } from "firebase-config";
import { useToast } from "contexts/ToastContext";
import { useLocation, useNavigate } from "react-router-dom";
import { CollabModal } from "./components/CollabModal";

const NewPost = () => {
  const location = useLocation();
  const { onSuccessToast } = useToast();

  const { selectedPost } = location.state || {};
  const navigate = useNavigate();

  const [content, setContent] = useState(
    selectedPost ? selectedPost.content : ""
  );
  const [modalData, setModalData] = useState({
    title: selectedPost ? selectedPost?.title : "",
    details: selectedPost ? selectedPost?.details : "",
    category: selectedPost ? selectedPost?.category : "",
  });

  const handleContent = (newContent) => {
    setContent(newContent);
  };

  const autoSave = async () => {
    if (content && selectedPost && selectedPost.status === "draft") {
      const updatedPostData = {
        ...selectedPost,
        content,
        title: content.slice(0, 90),
        updatedAt: Date.now(),
      };

      try {
        await editPost(selectedPost.id, updatedPostData);
        onSuccessToast("Auto Save!");
      } catch (error) {
        console.error("Auto Save Error: ", error);
      }
    }
  };

  useEffect(() => {
    const delay = setTimeout(autoSave, 2000);
    return () => clearTimeout(delay);
  }, [content, selectedPost]);

  const handleInputs = (e) => {
    const { value, name } = e.target;
    setModalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createOrUpdatePost = async (action) => {
    const isDraft = action === "draft";
    const postData = {
      content,
      status: action,
      published: !isDraft,
      title: isDraft ? content.slice(0, 50) : modalData.title,
      imageUrl: "https://picsum.photos/300/200?random=1",
      category: isDraft ? action : modalData.category,
      details: isDraft
        ? "draft post define while publishing"
        : modalData.details,
    };

    try {
      if (selectedPost) {
        const updatedPostData = {
          ...selectedPost,
          content,
          title: modalData.title,
          details: modalData.details,
          status: action,
          published: !isDraft,
          updatedAt: Date.now(),
        };

        await editPost(selectedPost.id, updatedPostData);
        onSuccessToast("Post Updated Successfully!");
      } else {
        await createPost(postData);
      }
      if (isDraft) {
        onSuccessToast("Draft Saved Successfully!");
        navigate("/admin/posts", { replace: true });
      } else {
        onSuccessToast("Post Saved Successfully!");
        navigate("/admin/feed", { replace: true });
      }
    } catch (error) {
      console.error("Create/Update Post Error: ", error);
    }
  };

  return (
    <div className="flex w-full flex-col justify-center overflow-hidden">
      <div className=" flex w-full items-center justify-center py-4">
        <div className="flex flex-wrap">
          <AddModal
            modalData={modalData}
            handleInputs={handleInputs}
            handleSave={createOrUpdatePost}
          />
          <button
            onClick={() => createOrUpdatePost("draft")}
            className="mx-1 flex h-7 w-auto items-center justify-between rounded-lg bg-blueSecondary p-1 text-xs font-bold text-[#000] dark:bg-brandLinear dark:text-white sm:h-10 sm:p-3 sm:text-base md:mx-3"
          >
            <MdOutlineSave className="mr-1 sm:mr-2" />
            <div>Save Draft</div>
          </button>
          <CollabModal />
        </div>
      </div>
      <TextEditor
        selectedPost={selectedPost}
        content={content}
        handleContent={handleContent}
      />
    </div>
  );
};

export default NewPost;
