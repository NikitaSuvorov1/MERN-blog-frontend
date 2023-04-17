import React, { useRef, useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from '../../axios'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AddPost = () => {
  const [text, setText] = React.useState('');
  const [title,setTitle] = React.useState('');
  const [tags,setTags] = React.useState('')
  const [imageUrl,setImageUrl] = useState('')
  const inputFileRef = useRef(null)
  const [isEditable,setIsEditable] = useState(false)

  const {id} = useParams()

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append("img",file)
      console.log(formData)
      const {data} = await axios.post('/upload',formData)
      setImageUrl(data.url)
    } catch (error) {
      console.log(error)
      alert('Ошибка при загрузке фотографии')
    }
  };
 

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const navigate = useNavigate()

  const onSubmit =  async () => {
    try {
      const fields = {
        title,
        text,
        tags: tags.split(','),
        imageUrl
      }
      console.log(fields)
          const {data} = isEditable ? await axios.patch(`/posts/${id}`,fields) :
          await axios.post('/posts',fields)
          const _id = isEditable ?  id : data._id
          setIsEditable(false)
          navigate(`/posts/${_id}`)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (id) {
      setIsEditable(true)
      axios.get(`/posts/${id}`).then(({data}) => {
        setTitle(data.title)
        setTags(data.tags)
        setImageUrl(data.imageUrl)
        setText(data.text)
      })
    }
  },[])


 

  return (
    <Paper  elevation={1} style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type='file' onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" value={tags}
        onChange={e => setTags(e.target.value)} fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditable ? "Отправить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
