function ajaxRequest(url, config = {type: "GET", headers: {}, data: {}}) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    
    xhr.open(config.type, url);

    if (Object.entries(config.headers).length) {
      for (let [name, value] of Object.entries(config.headers)) {
        xhr.setRequestHeader(name, value);
      }
    }

    xhr.send(JSON.stringify(config.data));

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        resolve(xhr.response);
      } else {
        reject(new Error(`${xhr.status}: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error: Try again later.");
    };
  });
}

// working url for GET request
const url = "https://api.github.com/users/papiyan98";
