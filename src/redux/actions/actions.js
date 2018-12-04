import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/api/" : "https://localhost:5000/api/"

export function loadArticles () {
  return (dispatch) => {
    axios.get(`${url}articles`)
    .then((res)=>{
      let articles = res.data
      dispatch({type:'LOAD_ARTICLES', articles})
    }).catch((err)=>{
      console.log(err)
    })
  }
}

export function getUser (_id) {
  return axios.get(`${url}user/${_id}`.then((res)=>{
    return res.data
  })).catch((err)=>{
    console.log(err)
  })
}

export function getUserProfile (_id) {
  return (dispatch) => {
    axios.get(`${url}user/profile/${_id}`).then((res)=>{
      let profile = res.data
      dispatch({type: 'SET_PROFILE', profile})
    }).catch((err)=>{
      console.log(err);
    })
  }
}

export function getArticle (article_id) {
  return (dispatch) => {
    axios.get(`${url}article/${article_id}`)
    .then((res)=>{
      let article = res.data
      dispatch({type: 'VIEW_ARTICLE', article})
    }).catch((err)=>{
      console.log(err);
    })
  }
}

export function comment(){
  return (dispatch) => {

  }
}

export function like(id, user_id){
  return (dispatch) => {
    axios.post(`${url}user/follow`, {id, user_id}).then((res)=>{
      dispatch({type:'LIKE_ARTICLE'})
    }).catch((err)=>{
      console.log(err)
    })
  }
}

export function follow (id, user_id){
  return (dispatch) => {
    axios.post(`${url}user/follow`, {id, user_id}).then((res)=>{
      dispatch({type:'FOLLOW_USER', user_id})
    }).catch((err)=>{
      console.log(err);
    })
  }
}

export function signInUser(user_data){
  var headers = {
            'Content-Type': 'application/json',
            'Authorization': `token ${user_data.token}`
        }
  return (dispatch)=>{
    axios.post(`${url}user`, user_data, {headers: headers}).then((res)=>{
      let user = res.data
      localStorage.setItem('AUTH', JSON.stringify(user))
      dispatch({type: 'SET_USER', user})
    }).catch((err)=>{
      console.log(err)
    })
  }
}

export function toggleClose(){
  return (dispatch) =>{
    dispatch({type: 'TOGGLE_MODAL', modal: false})
  }
}

export function toggleOpen(){
  return (dispatch) =>{
    dispatch({type: 'TOGGLEOPEN', modal: true})
  }
}
