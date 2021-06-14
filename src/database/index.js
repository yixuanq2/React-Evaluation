'use strict';
const _ = require('lodash');
const db = require('./db.js');

// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataAccessMethod());
    }, 500);
  });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
  const dataAccessMethod = () => _.map(db.usersById, (userInfo) => userInfo);
  return mockDBCall(dataAccessMethod);
};
const getHobbies = () => {
  const dataAccessMethod = () => {
    // fill me in :) should return an array of hobbies without duplicate value.
    let hobbySet = new Set();
    Object.values(db.hobbiesOfUserByUsername).forEach((list)=>
        list.forEach((item)=>hobbySet.add(item)));
    return Array.from(hobbySet);
  };
  return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (hobby) => {
  const dataAccessMethod = () => {
    // fill me in :) should return an arry of age count based on hobby.
    let ageMap = new Map();
    let infoMap = new Map();
    _.map(db.usersById, (userInfo) => infoMap.set(userInfo.username, userInfo.age));
    for(let username in db.hobbiesOfUserByUsername){
      if(db.hobbiesOfUserByUsername[username].includes(hobby)){
        const age = infoMap.get(username);
        if(!ageMap.has(age)){
          ageMap.set(age,0);
        }
        ageMap.set(age, ageMap.get(age)+1);
      }
    }
    let array = [];
    for(let [k,v] of ageMap){
      let obj = {};
      obj.age = k;
      obj.count = v;
      array.push(obj);
    }
    return array;
  };
  return mockDBCall(dataAccessMethod);
};

module.exports = {
  getUsers,
  getListOfAgesOfUsersWith,
  getHobbies,
};
