// chrome.runtime.sendMessage({ message: "start" }, (res) => {
//   console.log(res.cookies)
//   res.cookies.forEach((item, index) => {
//     console.log(item)
//   });
// });

// setInterval(()=>{
//   chrome.storage.sync.get(['isGet'], item =>{
//     console.log(item)
//   })
// }, 2000)

// console.log(await res)
// if(res.status)
// await chrome.storage.sync.get(["domain"], (items) =>{
//   console.log(items)
// })
// else
//   console.log('fail')

// const body = { cookies: res };
// const option = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(body)
// };
// fetch("https://scraping-8v2x.onrender.com/api/gmail", option)
// fetch("http://localhost:4000/api/gmail", option)
//   .then((res) => {
//     if (res.ok) {
//       console.log("success");
//     }
//   })
//   .catch((err) => {
//     console.log("error");
//   });
// console.log(res.cookies);