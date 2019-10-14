
const fs = require('fs');

// function
let parseIt = function (filename) {
    // read json file synchronously
    const fi = fs.readFileSync(filename, 'utf-8');
    const data = JSON.parse(fi);
    // return statement
    return data;
};


// define varaiable
const labels = parseIt('labels.json')
const allornothing = parseIt('allornothing.json')

// solution 1
function bestConversationPath(){
  const arrayOfPaths = new Array();
  // set arrayID as an array
  const arrayID = [];
  // for loop
  for (const [key, value] of Object.entries(labels)) {
      // define varaiable
      const tag = value.tag;
      const id = value.id;
      // if statement
      if(isStartRoute(tag)) {
        findNextRouteId(id, arrayID, arrayOfPaths);
      }
  }
  // return statement
  return arrayOfPaths;
}

function findNextRouteId(id, arrayID, arrayOfPaths) {
  // create a new map lookup
  const mapLookUp = new Map(Object.entries(labels))

  // end route
  if(isEndRoute(id, mapLookUp)){
    const lastNode = mapLookUp.get(id);
    // get last node
    arrayID.push(lastNode.id);
    arrayOfPaths.push(arrayID)
    // return statement
    return;
  }
  // add id
  arrayID.push(id);
  const nextNode = mapLookUp.get(id);
  // remove duplicates
  const nextRouteId = removeDuplicates(nextNode.routes.split('|'));
  // find next routes
  nextRouteId.forEach(function(item, index) {
      findNextRouteId(nextRouteId[index], arrayID.slice(0), arrayOfPaths);
  });
  // return statement
  return nextNode.id;
}
  // begin routing
function isStartRoute(tag) {
  if(tag === 'labels-start') return true;
  return false;
}
  // end routing
function isEndRoute(id, mapLookUp) {
  const endNode = mapLookUp.get(id);
  if(endNode.tag === 'bye') return true;
  return false;
}

  // remove duplicates
function removeDuplicates(array){
  return array.filter((value, index) => array.indexOf(value) === index);
}

  // solution 2
function displayEndpoint(labels, id) {
  // define variables
 const conversation = bestConversationPath();
 const endpoints = findEndpoints();
  // boolean set false
 let hasPastEndpoint = false;
  // get index of id & item
 conversation.forEach(function(conversationItem, index) {
    endpoints.forEach(function(item, index) {
        // define variables
        const indexOfID = conversationItem.indexOf(id);
        const indexOfEndpoint = conversationItem.indexOf(item);
        // if true
        if(conversationItem.includes(id) && conversationItem.includes(item) && indexOfID >= indexOfEndpoint){
          hasPastEndpoint = true;
        }
    });
 });
 // print
  console.log("User has reached or past endpoints: ", hasPastEndpoint);
}

 // find endpoint
function findEndpoints() {
  // define varaiable
  const endpoints = []
  // assign key value pair to entries in lesson json
  for (const [key, value] of Object.entries(labels)) {
      // define varaiable
      const stage = value.stage;
      // if endpoint add it to array
      if(stage === 'endpoint') {
        endpoints.push(value.id);
      }
  }
  // return statement
  return endpoints;
}



// print and  call function & testing lables.json
console.log(bestConversationPath());

// call function
// test function if true
displayEndpoint(labels, 'JML');

// test function if false
displayEndpoint(labels, 'LUU');
