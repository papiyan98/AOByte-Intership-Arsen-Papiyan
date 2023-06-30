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
        this.onFulfilledFn.forEach(fn => fn(value));
      }
    }
  
    const reject = (error) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.result = error;
        this.onRejectedFn.forEach(fn => fn(error));
      }
    }

    try {
      handler(resolve, reject);
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
              const newResult = onFulfilled(this.result);
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
              const newResult = onRejected(this.result);
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
          const newResult = onFulfilled(this.result);
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
  
      if (onRejected && this.state === "rejected") {
        try {
          const newResult = onRejected(this.result);
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
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  } 
}
