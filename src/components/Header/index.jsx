import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../../redux/slices/authSlice";

export const Header = () => {
  const isAuth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти из аккаунта?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          
          <div className={styles.headerLogo}>
          <Link className={styles.logo} to="/">
            <div>SHIZENOCHKA BLOG</div>
          </Link>
          </div>
        
          
          
          <div className={styles.buttons}>
            <div className={styles.userInfo}>
            {userData && (
              <img
                width={38}
                height={38}
                style={{ borderRadius: "20px", marginRight: '10px' }}
                src={`${process.env.REACT_APP_API_URL}${userData.avatarUrl}`}
          
              />
            )}
            {userData && <p>{userData.fullName}</p>}
            </div>
            <div className={styles.twoButtons} >
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button style={{maxHeight: '40px'}} variant="contained">Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
