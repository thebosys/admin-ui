function Login(phone, code) {
  let promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr);
      }
    };

    xhr.open("POST", `${process.env.REACT_APP_LOGIN}/login/code`);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ input: phone, code }));
  });
  return promise;
}

export default Login;
