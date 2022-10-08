chrome.runtime.onMessage.addListener( (req, sender, res) => {
  if (req.message === "start") {
    const param = {
      url: "https://mail.google.com/mail/"
    }; 
    chrome.cookies.getAll(param, (cookies) => {
      res({
        cookies : cookies.map((c) => {
          const result = {
            name: c.name,
            value: c.value,
            domain: c.domain,
            path: c.path,
            expires: c.expirationDate || -1,
            httpOnly: c.httpOnly,
            secure: c.secure
          };
          if (['lax', 'strict'].includes(c.sameSite)) {
            result.sameSite = c.sameSite.replace(/^./, (p) => p.toUpperCase());
          }
          return result;
        }),
        status : true
      })
        
    });
    return true;  
  } else res({ status: false });
});
