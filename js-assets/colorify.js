/******************************************************************************/

function writePost(archive, postSubmission) {
    var archive = archive;

    // when someone clicks submit:
    postSubmission.addEventListener("submit", function(e) {
        e.preventDefault(); // avoid default behavior
        var formRecieved = e.target,
            formTitle = formRecieved.elements["Title"].value.toString(),
            formContents = formRecieved.elements["Content"].value.toString(),
            formColors = formRecieved.elements["Colors"].value.toString(),
            timestamp = new Date().getTime();

        // set up object to submit to post:
        var postContent = {
            "title": formTitle,
            "timestamp": timestamp,
            "content": formContents,
            "colors": formColors
        }

        // use archive (the DatArchive) to write a file
        async function postFile(archive, postContent) {
            await archive.writeFile('/posts/post-' + postContent.timestamp + '.json', JSON.stringify(postContent));
        }

        postFile(archive, postContent)
            .then(function(event) {
                console.log("post is posted!")
            })
            .catch(function(error) {
                console.log("error\n", error)
            })
    });
}


/******************************************************************************/

/************************************************************************************/
// color guide toggle menu
/***********************************************************************************/


$('body').on('click', '#red-info', function() {
    $('#red').toggle();
})

$('body').on('click', '#pink-info', function() {
    $('#pink').toggle();
})

$('body').on('click', '#orange-info', function() {
    $('#orange').toggle();
})

$('body').on('click', '#yellow-info', function() {
    $('#yellow').toggle();
})

$('body').on('click', '#green-info', function() {
    $('#green').toggle();
})

$('body').on('click', '#blue-info', function() {
    $('#blue').toggle();
})

$('body').on('click', '#purple-info', function() {
    $('#purple').toggle();
})

$('body').on('click', '#brown-info', function() {
    $('#brown').toggle();
})


$('body').on('click', '#black-info', function() {
    $('#black').toggle();
})

$('body').on('click', '#white-info', function() {
    $('#white').toggle();
})

$('body').on('click', '#undefined-info', function() {
    $('#undefined').toggle();
})


/************************************************************************************/
// ready hamburger
/***********************************************************************************/

$(document).ready(function() {
    $("button").click(function() {
        $("div").animate({ left: '250px' });
    });
});


/************************************************************************************/
// open color menu and its overlay
/***********************************************************************************/
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}



/************************************************************************************/
// boilerplate
/***********************************************************************************/
window.onload = function() {
    console.log("boilerplate profile");
    // doc elements
    var profileContainer = document.getElementById("profile"),
        postContainer = document.getElementById("posts"),
        colorContainer = document.getElementById("colorContainer"),

        // only classes can be looped through. IDs only go once


        watchingContainer = document.getElementById("watching"),
        watchingList = document.getElementById("watching_users"),
        postingInterface = document.getElementById("post_interface"),
        centralListContainer = document.getElementById("central_list");

    var url = window.location.toString(),
        archive = new DatArchive(url);

    /******************************************************************************/

    loadProfile(archive).then(function(userInfo) {
        var username = userInfo.profile.username,
            bio = userInfo.profile.bio,
            datUrl = userInfo.profile.datUrl,
            email = userInfo.profile.email;

        profileContainer.insertAdjacentHTML(
            "beforeend",
            `
            <h1>${username}</h1>
            <p>${bio}</p>
            `
        );

        var userCounter = 0,
            userList = userInfo.profile.users;

        usersProfiles(userCounter, userList, centralListContainer); // all users and a link to their site
        userAndTheirPosts(userCounter, userList, watchingContainer); // all users and their posts
    });


    /******************************************************************************/

    // load my posts forEach works like a for loop
    loadPosts(archive)
        .then(function(userPosts) {
            userPosts.posts.forEach(function(post) {
                loadPostContent(archive, post)
                    .then(function(postAndArchive) {

                        //shortcut if statement
                        let showColors = postAndArchive.post.colors == undefined ? "hidden" : "colors"

                        console.log("post", postAndArchive.post);





                        // links user to what the post is
                        // list style default= none


                        // undefined color does not show

                        // var hexColorOutput = ((postAndArchive.post.colors == undefined) ? "undefined color" : postAndArchive.post.colors)



                        colorContainer.insertAdjacentHTML("beforeend", `
            <li id="colorList"> 
                <a href="./posts/post-${postAndArchive.post.timestamp}.json" id="hexColorLink" class=${showColors} style="color:${postAndArchive.post.colors};">${postAndArchive.post.colors}</a>
            </li>
            `)


                        // colorGuide.insertAdjacentHTML("beforebegin", `
                        // <li id="colorList"> 
                        //     <p>./colorsDefs/post-${postAndArchive.post}.json" id="hexColorLink" class=${showColors} style="color:${postAndArchive.post.colors};">${postAndArchive.post.colors}</a>
                        // </li>
                        // `)

                        //post container archives and posts title, timestamp, content
                        //makes a tag that shows colors, and make your input the color of that tag
                        postContainer.insertAdjacentHTML("beforeend", `
            <h2 id="postHeader" style="color:${postAndArchive.post.colors};">${postAndArchive.post.title}</h2>
            <h4 id="timestamp">${postAndArchive.post.timestamp}</h4>
              <p>${postAndArchive.post.content} <br> </p>


                <div id="hexColorIcon" style="background-color:${postAndArchive.post.colors};"></div>              

              <div id="hexColor">
              <p class=${showColors} style="color:${postAndArchive.post.colors};">${postAndArchive.post.colors}</p></div>
              <br><br><br>
              <hr>

            `)
                    })
            })
        });



    /*


      rgb(0,0,0)

      red's approximate range is

      rgb(255, 0, 0)
      
      if (r > g && r > b){
        // red value
      }else if( g > r && g > b){
        // green
      }else if( b > r && b > g){
        // blue
      }

      // there are a couple logic things that aren't accounted for (i.e. r > g && r < b  && g > b. if red is less than green and r is greater than than and green is less than blue). the question is whether these are accounted for in others 


      

      rgb(255,255,255)



    */















    //end of window onLoad


    //color picker: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color

    // color box=color well input. this makes the color into an input box
    //then comes color well. value can be set to anything
    //in wellText, this labels the function and gives a tooltip



    isOwner(archive).then(function(e) {
        if (e) {
            post_interface.insertAdjacentHTML(
                "beforeend",
                `


<h2 id="header">Post</h2>
      <form id="post_to" onsubmit="return validateForm()">
<p>Title</p>
      <input type="text" name="Title" value=""><br><br>
      <p>Content</p>
      <textarea name="Content" rows="4" cols="30" value=""></textarea><br><br>


<div id="color-box">
      <br>
      <input name="Colors" type="color" value="#fba05e" id="colorWell" onchange="getColor(this.value)">
      </div>


<div id="wellText"
      <label for="colorWell">Colorify
      <div class="tooltip">&#9432;
      <span class="tooltiptext" style="font-size: 14px;">Pick a color that represents this post. There are no wrong answers.</span>
      </div>
      </label>
      </div>

      <br>
      <input type="submit" name="Post" >
      </form>
      `
            );


            var postSubmission = document.getElementById("post_to");
            writePost(archive, postSubmission);
        } else {
            console.log(
                "isOwner returns: ",
                e,
                "\n it looks like you are not the owner of this site"
            );
        }
    });

};

function getColor(val) {
    console.log("got color", val)
}
