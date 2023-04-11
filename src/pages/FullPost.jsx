import React, { useState } from "react";
import axios from "../axios";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetCommentsByPost } from "../redux/slices/postSlice";

export const FullPost = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.posts.comments);
  const [postData, setPostData] = useState({});

  React.useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setPostData(res.data);
    });
    dispatch(fetchGetCommentsByPost(id));
  }, []);

  console.log(postData);
    

  return (
    <>
      <Post
        id={postData._id}
        title={postData.title}
        imageUrl={postData.imageUrl}
        user={postData.user}
        createdAt={postData.createdAt}
        viewsCount={postData.viewsCount}
        commentsCount={items.length}
        tags={[postData.tags]}
        isFullPost
      >
        <p>{postData.text}</p>
      </Post>
      <CommentsBlock items={items} isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
