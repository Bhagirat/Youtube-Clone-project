let toggleButton = document.getElementById("toggleButton");
// console.log(toggleButton);


let hide_items =document.getElementsByClassName("hide_items");

// console.log(hide_items);

toggleButton.addEventListener("click",() =>{
    // console.log("Clicking......");

    for (let val of hide_items){
        // console.log(val);

        val.classList.toggle("hidden_content")
    }

})



// ========== API Integration =============

/*

    ! 1. Google Cloud
        a. search google cloude
        b. click on first link
        c. click on console
        d. click on i agree
        e.click on agree and continue
        f.click on select a project
        g.create aproject
        h.select the ssame project
        i.click on navigation menu
        j.thrn hover on api and services
        k.click in library
        l.scroll down and click oon youtube data ap v3
        m.clcik on ebnable
        n.click on create creadentsils
        o.opt foe publice data
        p.after click on NEXT
        q.copy and paste api key


*/ 


const api_key = "AIzaSyD1zR1D6tPGxNsIxdWwfu-4VSzT6Cgohwo";
const search_http = "https://www.googleapis.com/youtube/v3/search?";
const channel_http = "https://www.googleapis.com/youtube/v3/channels?";

let callYoutubeDataAPI = async query =>{
    // console.log(query);

    let searchParams = new URLSearchParams({
        key : api_key,
        part: "snippet",
        q:query,
        maxResults :5,
        type :"video",
        regionCode:"IN",
    });

    let res = await fetch(search_http + searchParams);
    // console.log(res);
    let data = await res.json();
    // console.log(data);

    data.items.map(item =>{
        // console.log(item);
        getChannelIcon(item);

    });

};

// ? to get channel icon based on channel ID

let getChannelIcon = async video_data => {
    // console.log(video_data);

    let channelParam = new URLSearchParams({
        key: api_key,
        part : "snippet",
        id :  video_data.snippet.channelID,
    });

    let res = await fetch(channel_http + channelParam);
    let data = await res.json();
    console.log(data);
    video_data.channelIconImage=data.items[0].snippet.thumbnails.default.
    // console.log(video_data),
    appendVideosInToContainer (video_data);
};
let main_content = document.getElementById("main_content");
main_content.innerHTML = "";

// To display the video
let appendVideosInToContainer = video_data => {
    console.log(video_data); I
    let {snippet, channelIconImage, id: {videoId}} = video_data;
    // console.log(snippet);
    // console.log(channelIconImage);
    // console.log(videoId);

    main_content.innerHTML += `
    <a href="https://www.youtube.com/watch?v=$(videoId)">
        <main class="video_container">
            <article class="imageBox">
                <img src="snippet.thumbnails.medium.url)" alt="" />
            </article>
            <article class="infoBox">
                    <div>
                        <img src="$(channelIconImage)" alt="" />
                    </div>
                <div>
                    <p>$(snippet.title)</p>
                    <p class="channelName">$(snippet.channelTitle)</p>
                </div>
            </article>
        </main>
    </a>`
    ;
};
let search_button = document.getElementById("search_button");
// console.log(search_button);

search_button.addEventListener("click",()=>{
    let user_input = document.getElementById("user_input").value;
    // console.log(user_input);
    callYoutubeDataAPI(user_input);
});














