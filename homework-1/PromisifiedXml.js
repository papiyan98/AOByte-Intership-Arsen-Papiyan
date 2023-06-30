function ajaxRequest(url, config) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(config.type || "GET", url);

    if (Object.entries(config.headers).length) {
      for (let [name, value] of Object.entries(config.headers)) {
        xhr.setRequestHeader(name, value);
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          statusCode: xhr.status,
          message: xhr.statusText
        });
      }
    };

    xhr.onerror = () => {
      reject({
        statusCode: xhr.status,
        message: xhr.statusText
      });
    };

    xhr.send(config.data);
  });
}
