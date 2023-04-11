import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useDispatch,useSelector } from "react-redux";
import { fetchAuth, selectAuth } from "../../redux/slices/authSlice";

import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectAuth)
  const navigate = useNavigate()

  const {register,handleSubmit,setError,formState:{errors,isValid}} = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'all '
  })

  if (isAuth) {
    navigate('/')
  }

  const onSubmit =async (values) => {
    const data = await dispatch(fetchAuth(values));
    if ('token' in data.payload) {
      window.localStorage.setItem('token',data.payload.token)
    } else {
      alert("Не удалось авторизоваться")
    }
  }

  return (
    <Paper  elevation={1} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
      type="email"
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email',{required: "Укажите почту"})}
        fullWidth
      />
      <TextField
      type="password"
      {...register('password',{required: "Укажите пароль"})}
      error={Boolean(errors.password?.message)}
      helperText={errors.password?.message} className={styles.field} label="Пароль" fullWidth />
      <Button type="submit" size="large" variant="contained" fullWidth>
        Войти
      </Button>
      </form>
    </Paper>
  );
};
