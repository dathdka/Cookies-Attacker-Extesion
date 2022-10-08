chrome.runtime.sendMessage({ message: "start" }, (res) => {
  if (res.status) console.log(res.cookies);
  else console.log("fail");
});
