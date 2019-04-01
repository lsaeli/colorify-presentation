
/******************************************************************************/

function writePost(archive, postSubmission){
  var archive = archive;

  // when someone clicks submit:
  postSubmission.addEventListener("submit",function(e) {
    e.preventDefault(); // avoid default behavior
    var formRecieved = e.target,
        formTitle = formRecieved.elements["Title"].value.toString(),
        formContents = formRecieved.elements["Content"].value.toString(),
        formColors = formRecieved.elements["Colors"].value.toString(),
        timestamp = new Date().getTime();

    // set up object to submit to post:
    var postContent = {
      "title" : formTitle,
      "timestamp" : timestamp,
      "content" : formContents,
      "colors" : formColors
    }

    // use archive (the DatArchive) to write a file
    async function postFile(archive, postContent){
      await archive.writeFile('/posts/post-' + postContent.timestamp + '.json', JSON.stringify(postContent));
    }

    postFile(archive, postContent)
    .then(function(event){
      console.log("post is posted!")
    })
    .catch(function(error){
      console.log("error\n", error)
    })
  });
}