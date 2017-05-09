import { GET_NEWS, GET_NEWS_SUCCESS, GET_NEWS_FAILURE } from './constants';

export function getNews(){
  return{
    type: GET_NEWS
  }
}

export function getNewsSuccess(articles){
  return {
    type: GET_NEWS_SUCCESS,
    articles
  };
}

export function getNewsFailure(){
  return{
    type: GET_NEWS_FAILURE,
  }
}
