// play button
let time=document.getElementById("time");
let playButton=document.getElementById("playB");
let ProgressBar=document.getElementById("pro")
let song=new Audio("song/1.mp3");
let gif=document.getElementById("gif");
let songList=document.getElementsByClassName("song");
let titleName=document.getElementById("TitleOfSong");
let image=document.getElementsByClassName("img");
let listOfSong=[
    {name:'"What Was I Made For?" by Billie Eilish',path:"song/1.mp3",coverPath:"cover/1.jpg"},
    {name:'"Not Strong Enough" by Boygenius',path:"song/2.mp3",coverPath:"cover/2.jpg"},
    {name:'"Dance the Night" by Dua Lipa',path:"song/3.mp3",coverPath:"cover/3.jpg"},
    {name:'"Lacy" by Olivia Rodrigo',path:"song/4.mp3",coverPath:"cover/4.jpg"},
    {name:'"FTCU" by Nicki Minaj',path:"song/5.mp3",coverPath:"cover/5.jpg"},
    {name:'"On My Mama" by Victoria Monet',path:"song/6.mp3",coverPath:"cover/6.jpg"},
    {name:'"Like a Rolling Stone" by Bob Dylan',path:"song/7.mp3",coverPath:"cover/7.jpg"},
    {name:`"(I Can't Get No) Satisfaction" by The Rolling Stones`,path:"song/8.mp3",coverPath:"cover/8.jpg"},
    {name:`"Imagine" by John Lennon`,path:"song/9.mp3",coverPath:"cover/9.jpg"},
    {name:`"What's Going On" by Marvin Gaye`,path:"song/10.mp3",coverPath:"cover/10.jpg"}
];
titleName.innerHTML=listOfSong[0].name;
let songArr=[];
Array.from(songList).forEach((element,i)=>{
    element.addEventListener("click",(e)=>{
        let key=e.target.getAttribute("id")
        song.pause();
        ProgressBar.value=0;
        song.duration=0;
        song.currentTime=0;
        try {
            song.src=(listOfSong[key].path);
            song.play();
            playButton.classList.remove("fa-play");
            playButton.classList.add("fa-pause");
            console.log(e.target);
            try{
                titleName.innerHTML=`${e.target.getElementsByClassName("name")[0].textContent}`;
            }catch (error){
                console.log("Name error!");
            }
        } catch (error) {
            e.target.style.background="red";
            setInterval(() => {
                e.target.style.background="black";
            }, 1000);
            // alert("Advance Feature! Please Click on Black place of a song! hahaha");
        }
    });
});
playButton.addEventListener('click',()=>{
    if(song.paused || song.currentTime<=0){
        song.play();
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");
        gif.style.opacity=1;
    }else{
        song.pause();
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
        gif.style.opacity=0;
    }
});
function MMSS(duration1) {
    // Hours, minutes and seconds
    const hrs = ~~(duration1 / 3600);
    const mins = ~~((duration1 % 3600) / 60);
    const secs = ~~duration1 % 60;
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
    
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    if(mins>10){
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    }else{
        ret += "0" + mins + ":" + (secs < 10 ? "0" : "");
    }
    ret += "" + secs;
    
    return ret;
  }
ProgressBar.addEventListener("change",()=>{
    song.currentTime=(ProgressBar.value*song.duration/100);
});
song.addEventListener("timeupdate",()=>{    
    ProgressBar.value=parseInt(song.currentTime/song.duration*100);
    time.innerHTML=`${MMSS(song.currentTime)}-${MMSS(song.duration)}`;
});
for(let key in listOfSong){
    songList[key].getElementsByClassName("name")[0].innerHTML=(listOfSong[key].name);
    let dur=songList[key].getElementsByClassName("dur")[0].children[0];
    songArr[key]=new Audio(listOfSong[key].path);
    dur.innerHTML=songArr[key].duration;
    image[key].firstChild.src=`cover/${parseInt(key)+1}.jpg`;
}
let vol=document.getElementById("vol1");
let volNumber=document.getElementById("volNum");
vol.addEventListener("change",()=>{
    song.volume=(vol.value)/100;
    volNumber.innerHTML=vol.value+"%";
});
// add new song
let playArea=document.getElementsByClassName("playArea")[0];
let form=document.getElementById("form");
let btn=document.getElementById("new");
let cross=document.getElementById("cross");
let subForm=document.getElementsByTagName("form")[0];
cross.addEventListener("click",()=>{
    form.style.display="none";
    playArea.style.display="flex";
})
btn.addEventListener("click",()=>{
    console.log("new song");
    form.style.display="block";
    playArea.style.display="none";
});