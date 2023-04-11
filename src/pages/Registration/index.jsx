import React, { useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../../redux/slices/authSlice";

export const Registration = () => {
  const inputFileRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // const {register,handleSubmit,setError,formState:{errors,isValid}} = useForm({
  //   defaultValues: {
  //     fullName: '',
  //     email: '',
  //     password: '',
  //     avatarUrl: '',
  //   },
  //   mode: 'all '
  // })
  const dispatch = useDispatch();

  const onSubmit = async () => {
    const values = {
      avatarUrl,
      fullName,
      email,
      password,
    };
    try {
      const data = await dispatch(fetchRegister(values))
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload/avatarUrl", formData);
      setAvatarUrl(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(avatarUrl);

  return (
    <Paper elevation={1} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        {avatarUrl ? <img
          onClick={() => inputFileRef.current.click()}
          src={`http://localhost:4444${avatarUrl}`}
          style={{
            width: 100,
            height: 100,
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        /> : <Avatar onClick={() => inputFileRef.current.click()} />}
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
      </div>
  
        <TextField
          className={styles.field}
          label="Ваше имя"
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
        />
        <TextField
          type="email"
          className={styles.field}
          label="E-Mail"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button onClick={onSubmit} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
    </Paper>
  );
};
