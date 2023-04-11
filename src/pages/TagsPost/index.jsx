import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchGetCommentsByPost, fetchPostByTags } from "../../redux/slices/postSlice"
import { Post } from "../../components"
import { Grid } from "@mui/material"

import axios from '..//../axios'

export const TagsPosts = () => {

    const {tagName} = useParams()
    const dispatch = useDispatch()
    const [postData,setPostData] = useState({})
    const {posts,status} = useSelector(state => state.posts)

    React.useEffect( () => {
        dispatch(fetchPostByTags(tagName));
    },[])

    console.log(posts.items)

    return (
        <>
        <Grid xs={8} item>
          {posts.items.map((obj) => (
            <Post
              key={obj._id}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.commentsCount  }
              tags={obj.tags}
              isEditable={obj.user._id === posts.user?._id}
            />
          ))}
        </Grid>
        </>
    )
}