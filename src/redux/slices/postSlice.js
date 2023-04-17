import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit"; 
import axios from "../../axios";

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
    comments: {
        items: [],
        status: 'loading'
    }
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async () => {
    const {data} = await axios.get('/posts')
    return data;
})

export const fetchPostsByPopularity = createAsyncThunk('posts/fetchPostsByPopularity',async (params) => {
    const {data} = await axios.get(`/posts/sort/${params}`)
    return data;
})

export const fetchTags = createAsyncThunk('posts/fetchTags',async () => {
    const {data} = await axios.get('/tags')
    return data;
})


export const fetchDeletePost = createAsyncThunk('posts/fetchDeletePost',async (id) => {
    axios.delete(`/posts/${id}`)
})

export const fetchGetCommentsByPost = createAsyncThunk('posts/fetchGetCommentsByPost', async (id) => {
    const {data} = await axios.get(`/posts/comments/${id}`);
    return data
})

export const fetchGetComments = createAsyncThunk('posts/fetchGetComments', async () => {
    const {data} = await axios.get('/comments');
    return data;
})

export const fetchCreateComment = createAsyncThunk('posts/fetchCreateComment', async (params) => {
    const {data} = await axios.post(`/comments/${params.id}`,params);
    return data;
})


export const fetchPostByTags = createAsyncThunk('posts/fetchPostsByTags',async (id) => {
    const {data} = await axios.get(`/tags/${id}`)
    return data;
})


const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
    },
    extraReducers: {


        // Получение всех постов

        [fetchPosts.fulfilled]: (state,action) => {
            state.posts.status =  'loaded';
            state.posts.items = action.payload
        },
        [fetchPosts.pending]: (state,action) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.rejected]: (state,action) => {
            state.posts.status = "error";
            state.posts.items = []
        },

        /// Получение постов по популярности

        [fetchPostsByPopularity.fulfilled]: (state,action) => {
            state.posts.status =  'loaded';
            state.posts.items = action.payload
        },
        [fetchPostsByPopularity.pending]: (state,action) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPostsByPopularity.rejected]: (state,action) => {
            state.posts.status = "error";
            state.posts.items = []
        },


        // Получение всех тегов

        [fetchTags.fulfilled]: (state,action) => {
            state.tags.status =  'loaded';
            state.tags.items = action.payload
        },
        [fetchTags.pending]: (state,action) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchTags.rejected]: (state,action) => {
            state.tags.status = "error";
            state.tags.items = []
        },

        // Получение публикаций по тегам

        [fetchPostByTags.fulfilled]: (state,action) => {
            state.posts.status =  'loaded';
            state.posts.items = action.payload
        },
        [fetchPostByTags.pending]: (state,action) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPostByTags.rejected]: (state,action) => {
            state.posts.status = "error";
            state.posts.items = []
        },

        // Удаление поста

        [fetchDeletePost.fulfilled]: (state,action) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id != action.meta.arg)
        },

        // Получение комментариев у конкретного поста

        [fetchGetCommentsByPost.fulfilled]: (state,action) => {
            state.comments.status =  'loaded';
            state.comments.items = action.payload
        },
        [fetchGetCommentsByPost.pending]: (state,action) => {
            state.comments.items = []
            state.comments.status = 'loading'
        },
        [fetchGetCommentsByPost.rejected]: (state,action) => {
            state.comments.status = "error";
            state.comments.items = []
        },

        // Получение всех комментариев

        [fetchGetComments.fulfilled]: (state,action) => {
            state.comments.status =  'loaded';
            state.comments.items = action.payload
        },
        [fetchGetComments.pending]: (state,action) => {
            state.comments.items = []
            state.comments.status = 'loading'
        },
        [fetchGetComments.rejected]: (state,action) => {
            state.comments.status = "error";
            state.comments.items = []
        },

        //Создание комментария

        [fetchCreateComment.fulfilled]: (state,action) => {
            state.comments.status =  'loaded';
            state.comments.items.push(action.payload)
        },

        [fetchCreateComment.rejected]: (state,action) => {
            state.comments.status = "error";
            state.comments.items = []
        },


    }
})

export const {addComment} = postsSlice.actions

export const postsReducer = postsSlice.reducer