import React,{useEffect, useState,useContext} from 'react';
import './ProjectRecommendation.css'
import Axios from 'axios';
import { UserContext, UserTypeContext } from './../Helper/Context';
import { BsCaretRightFill } from "react-icons/bs";
import {Row, Col, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function ProjectRecommendation() {

  const {userId, setUserId} = useContext(UserContext);
  const {type, isUserType} = useContext(UserTypeContext);

  const history = useHistory();


  //project to be compared with user preference (take project_information)
  const [projectList, setProjectList] = useState([]);

  const [recList, setRecList] = useState([]);

  const [preferences, setPreference] = useState(false);

  //user preference to be compared with project list
  const [preferenceList, setPreferenceList] = useState({});

  //to store array containing scores of each project
  var similarityList = [];

  //to store preference word count map
  var simi;

  //to store project word count map
  var simil;

  const noRecommendation = <span className="text-start">No project recommendation!</span>


  useEffect(()=>{
    if(type === 'Lecturer'){

      Axios.get(`http://localhost:3001/lectprofile/${userId}`,{
          id: userId,
      })
      .then((res) => {
  
          if(res.data.preferences === null){
              setPreference(false);
          }
          else{
              setPreference(true);
              setPreferenceList(res.data);

          }
      })
    }
  else if(type==='Representative'){
    Axios.get(`http://localhost:3001/repprofile/${userId}`,{
          id: userId,
      })
      .then((res) => {
  
          if(res.data.preferences === null){
              setPreference(false);
          }
          else{
              setPreference(true);
              setPreferenceList(res.data);
          }
      })
  }
  },[preferenceList]);

  useEffect(()=>{
    if(type === 'Lecturer'){
      Axios.get('http://localhost:3001/recprojectl').then((response) => {
        // if(response.data.length > 0){
            setProjectList(response.data);

        // }
    });
    }
    else if(type === 'Representative'){
      Axios.get('http://localhost:3001/recprojectr').then((response) => {
            setProjectList(response.data);
    });
    }
  },[projectList])

  useEffect(()=>{

    // if(preferences === true){
      checkSimilarity(preferenceList, projectList);
    // } 
},[preferenceList,projectList]);


const showProject = (event, projectId) => {

  if(type === 'Lecturer'){
    history.push(`/lecturer/${userId}/viewproject/${projectId}`)
  }
  else if(type==='Representative'){
    history.push(`/representative/${userId}/viewproject/${projectId}`)
  }
}

function sortArray(projectList){

  if(projectList){
    projectList.sort((a,b) => b.score - a.score);

    return projectList;

  }
}

    //map words in text to their frequency count
    function wordCountMap(str) {
      if(str){
        let words = str.split(" ");
        let wordCount = {};
        words.forEach((w) => {
          wordCount[w] = (wordCount[w] || 0) + 1;
        });
        return wordCount;
      }
    }

    //make dictionary of all words present in both texts
    function addWordsToDictionary(wordCountmap, dict) {

      if(wordCountmap){
        for (let key in wordCountmap) {
          dict[key] = true;
        }
      }
    }

    //convert the word count map to vector,
    //as we need to use the vectors to count the dot product

    function wordMapToVector(map, dict) {
    let wordCountVector = [];


    if(map){
      if(dict){
      for (let term in dict) {
        wordCountVector.push(map[term] || 0);
      }
      return wordCountVector;
    }
  }
    
    }

    //cosine similarity = dot product of two vectors/product of magnitude

    //calculate dot product
    function dotProduct(vecA, vecB) {
    let product = 0;

    if(vecA && vecB){
      for (let i = 0; i < vecA.length; i++) {
        product += vecA[i] * vecB[i];
      }
      return product;
    }
    
    }

    //calculate product of magnitude
    function magnitude(vec) {
    let sum = 0;

    if(vec){
      for (let i = 0; i < vec.length; i++) {
        sum += vec[i] * vec[i];
      }
      return Math.sqrt(sum);
    }
    
    }

    //calculate cosine similarity using dot product and magnitude above
    function cosineSimilarity(vecA, vecB) {

      // console.log(vecB);
      if(vecA && vecB){

        var totVector = 0;

        totVector = dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));

        if(totVector === undefined || totVector === null){
          totVector = 0;
        }
        

        return totVector;
      }
    }

    //calculate similarity in percent
    function getSimilarityScore(val) {
      if(val !== 0){

        var percent = Math.round(val * 100);

      }
      else{
        var percent = 0;
      }

      return percent;
    }

    function checkSimilarity(preferenceList, projectList) {

    var prefer = preferenceList;
    

    if(prefer.preferences){
      
      const text11 = prefer.preferences.toLowerCase().replace(/,/, " ");


      if(projectList){

        for (let j = 0; j < projectList.length; j++) {

          var text22 = projectList[j].project_information.toLowerCase();

          simi = wordCountMap(text11);
          simil = wordCountMap(text22);

          let dict = {};

          addWordsToDictionary(simi, dict);
          addWordsToDictionary(simil, dict);

          const vectorA = wordMapToVector(simi, dict);
          const vectorB = wordMapToVector(simil, dict);

          var cosSim = cosineSimilarity(vectorA, vectorB);

          var percentage = getSimilarityScore(cosSim);

          similarityList.push(percentage);

      }

      projectList = projectList.map((obj, i) => {
          return {...obj, score: similarityList[i]};
      })

      projectList = sortArray(projectList);

      const proj = projectList.filter(
        (project) => project.score > 50
      )

      setRecList(proj);
      
    }}

    return recList;

    }

    

  return (
    <div className="recommend">
      <div className="recList">
        <div className="col-3 recommendTitle">
          You might like these projects....
        </div>
        {preferences ?
        <div>
        {recList.length > 0 ?
          recList.map((val, key) => {
              return(
                <div key ={key}>
                  <span><BsCaretRightFill/><Button variant="link" className="text-start"
                                    onClick={(event) => {
                                        showProject(event, val.project_id);
                        }}>{val.project_title}</Button></span>
                </div>
              )
            
            
          })
          : <span className="text-start">No project recommendation!</span>
        }
        </div>
        :  
        <span className="col-4">You have not set any preferences yet!</span>
        }
      </div>
    </div>
  )
}

export default ProjectRecommendation