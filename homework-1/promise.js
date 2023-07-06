class MyPromise {
  constructor(handler) {
    this.state = "pending";
    this.result = null;
    this.onFulfilledFn = [];
    this.onRejectedFn = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.result = value;
        this.onFulfilledFn.forEach(callback => {
          queueMicrotask(() => callback(value));
        });
      }
    }
  
    const reject = (error) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.result = error;
        this.onRejectedFn.forEach(callback => {
          queueMicrotask(() => callback(error));
        });
      }
    }

    try {
      handler(resolve, reject)
      
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === "pending") {
        if (onFulfilled) {
          this.onFulfilledFn.push(() => {
            try {  
              const newResult = queueMicrotask(() => onFulfilled(this.result));
              if (newResult instanceof MyPromise) {
                newResult.then(resolve, reject);
              } else {
                resolve(newResult);
              }
            } catch (error) {
              reject(error);
            }
          });
        }
        
        if (onRejected) {
          this.onRejectedFn.push(() => {
            try {
              const newResult = queueMicrotask(() => onRejected(this.result));
              if (newResult instanceof MyPromise) {
                newResult.then(resolve, reject);
              } else {
                reject(newResult);
              }
            } catch (error) {
              reject(error);
            }
          });
        }
  
        return;
      }
  
      if (onFulfilled && this.state === "fulfilled") {
        try {
          const newResult = queueMicrotask(() => onFulfilled(this.result));
          if (newResult instanceof MyPromise) {
            newResult.then(resolve, reject);
          } else {
            resolve(newResult);
          }
        } catch (error) {
          reject(error);
        }
        return;
      }

      if (!onFulfilled && this.state === "fulfilled") {
        resolve(this.result);
        return;
      }
      
      if (onRejected && this.state === "rejected") {
        try {
          const newResult = queueMicrotask(() => onRejected(this.result));
          if (newResult instanceof MyPromise) {
            newResult.then(resolve, reject);
          } else {
            reject(newResult);
          }
        } catch (error) {
          reject(error);
        }
        return;
      }

      if (!onRejected && this.state === "rejected") {
        reject(this.result)
        return;
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  } 
}


const promise = new MyPromise((resolve, reject) => {
  resolve('done!')
});

// MyPromise fixed! code below works
promise.catch(err => {
  console.log(err);
}).then(res => {
  console.log(res);
})
