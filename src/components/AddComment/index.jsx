import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import axios from '..//..//axios'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addComment, fetchCreateComment } from "../../redux/slices/postSlice";

export const Index = () => {

const {id} = useParams()  
const dispatch = useDispatch()
const userData = useSelector((state) => state.auth.data)

  const [text,setText] = React.useState('')
  const navigate = useNavigate()

  const onSubmit = () => {
    try {
      const comment = {
        text,
        id,
        fullName: userData.fullName,
        avatarUrl: userData.avatarUrl
      }
      dispatch(fetchCreateComment(comment))
      
    } catch (error) {
      console.log(error);
    }

  }
  console.log("userdata",userData);

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
           src={userData?.avatarUrl && `${process.env.REACT_APP_API_URL}${userData.avatarUrl}`}
        />
        <div className={styles.form}>
          <TextField
          onChange={e => setText(e.target.value)}
          value={text}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
