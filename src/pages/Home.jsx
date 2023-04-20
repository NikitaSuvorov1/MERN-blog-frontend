import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { useDispatch,useSelector } from 'react-redux';
import { fetchGetComments, fetchPosts, fetchPostsByPopularity, fetchTags } from '../redux/slices/postSlice';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { Skeleton } from '@mui/material';
import { PostSkeleton } from '../components/Post/Skeleton';

export const Home = () => {

const dispatch = useDispatch()
const {posts,tags,comments} = useSelector((state) => state.posts)
const userData = useSelector((state) => state.auth.data)
const [sortType,setSortType] = useState('newest')


  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
    dispatch(fetchGetComments())
    
  },[])


  const onChangeSortPopularity = () => {
    setSortType('popularity')
    dispatch(fetchPostsByPopularity(sortType))
  }

  const onChangeSortNewest = () => {
    setSortType('newest')
    dispatch(fetchPostsByPopularity(sortType))
  }

  const uniqueTags = [...new Set(tags.items)]

  console.log(posts.items)

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={sortType === "popularity" ? 1 : 0} aria-label="basic tabs example">
        <Tab onClick={onChangeSortNewest} label="Новые" />
        <Tab onClick={onChangeSortPopularity} label="Популярные" />
      </Tabs>
      <Grid spacing={4} className='home'>
        <Grid className='posts' xs={8} item>
          {posts.status === "loading" ? <PostSkeleton /> : posts.items.map((obj) => (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.commentCount}
              tags={obj.tags}
              isEditable={obj.user._id === userData?._id}
            />
          ))}
        </Grid>
        <Grid className='tagsComments' xs={4} item>
          <TagsBlock items={uniqueTags.filter((tag) => tag != '').map((tag) => tag)} isLoading={tags.status === "loading" ? true : false} />
          <CommentsBlock
            items={comments.items}
            isLoading={comments.status === "loading" ? true : false}
          />
        </Grid>
      
      </Grid>
    </>
  );
};
