import Container from "@mui/material/Container";
import { Route,Routes } from "react-router-dom";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { TagsPosts } from "./pages/TagsPost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { fetchAuthMe, selectAuth } from "./redux/slices/authSlice";

function App() {

  const dispatch = useDispatch()
  const isAuth = useSelector(selectAuth)
  
  useLayoutEffect(() => {
    dispatch(fetchAuthMe())
  },[]);
 

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/posts/create" element={<AddPost />} />
        <Route path="/tags/:tagName" element={<TagsPosts />} />
        <Route path="/posts/:id/edit" element={<AddPost />} /> 
        </Routes>
        
      </Container>
    </>
  );
}

export default App;
