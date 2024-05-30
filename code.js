let newsAPI = "https://newsapi.org/v2/top-headlines?country=in&apiKey=9cf8cac949e946f4ae1f937f91e8e3f1";
let dummyImage = "angularimg.png";

let app = document.querySelector(".app");
let screen = {
    main:app.querySelector(".main-screen"),
    news:app.querySelector("news.screen")
};

let catagories = ["General" , "Business" , "Technology" , "Entertainment" , "Health" , "Science" , "Sports"];
for(let i=0;i<catagories.length;i++){
    let div = document.createElement("div");
    div.innerText = catagories[i];
    div.addEventListener("click",function(){
        screen.main.querySelector(".catagories .active").classList.remove("active");
        div.classList.add("active");
        fetchCatagoryNews(catagories[i]);
    });

    if(i==0){
        div.classList.add("active");
        fetchCatagoryNews(catagories[i]);
    }
    screen.main.querySelector(".catagories").appendChild(div);
}

    async function fetchCatagoryNews(catagory){
        screen.main.querySelector(".news-list").innerHTML = "" ;
        try{
           let res = await fetch(`${newsAPI}&catagory=${catagory.toLowerCase()}`);
            let data = await res.json();
            console.log(data);
            let news = data.articles;
            console.log(news)

            for(let i=0; i<news.length;i++){
                if (!news[i].urlToImage) {
                    continue;
                }
                let div = document.createElement("div");
                div.classList.add("item");

                div.addEventListener("click" , function(){
                    showFullNews(news[i]);
                });
                div.innerHTML = `
                <div class = "thumbnail">
                <img src = "${news[i].urlToImage || dummyImage}">
                </div>

                <div class = "details">
                <h2>${news[i].title}</h2>
                <p>${news[i].description}</p>
                </div>
                `;
                screen.main.querySelector(".news-list").appendChild(div);
            } 
        } catch(msg){}
    }

    function showFullNews(news){
        screen.main.classList.add("hidden");
        screen.news.classList.remove("hidden");


        screen.news.querySelector(".header .title").innerText = news.title;
        screen.news.querySelector(".header .back-btn").addEventListener("click",function(){
            screen.news.classList.add("hidden");
            screen.main.classList.remove("hidden");
    });

    screen.news.querySelector("#news-frame").src = news.url;
    }