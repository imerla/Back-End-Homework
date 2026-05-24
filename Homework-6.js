//Problem 1
function block() {
    return new Promise((resolve) => {
        setTimeout(() => {
            for (let i = 1; i < 10000000000; i++) {}
            resolve();
        }, 0);
    });
}

console.log("one");
block().then(() => {
    console.log("two");
});

//Problem 2
const promiseResolve = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Promise resolved!");
    }, 1000);
});

const promiseReject = new Promise((_, reject) => {
    setTimeout(() => {
        reject("Promise rejected!");
    }, 1000);
});

//then/catch
promiseResolve
    .then((result) => console.log("Resolved:", result))
    .catch((error) => console.log("Error:", error));

promiseReject
    .then((result) => console.log("Resolved:", result))
    .catch((error) => console.log("Error:", error));

//Promise.allSettled
Promise.allSettled([promiseResolve, promiseReject])
    .then((results) => {
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`Promise ${index + 1} fulfilled:`, result.value);
            } else {
                console.log(`Promise ${index + 1} rejected:`, result.reason);
            }
        });
    });

//Problem 3
const promise1 = new Promise((resolve) => {
    setTimeout(() => resolve("Promise 1 resolved"), 2000);
});

const promise2 = new Promise((_, reject) => {
    setTimeout(() => reject("Promise 2 rejected"), 1000);
});

const promise3 = new Promise((resolve) => {
    setTimeout(() => resolve("Promise 3 resolved"), 1500);
});

const promise4 = new Promise((_, reject) => {
    setTimeout(() => reject("Promise 4 rejected"), 3000);
});

Promise.any([promise1, promise2, promise3, promise4])
    .then((result) => console.log("First resolved:", result))
    .catch((error) => console.log("All promises rejected:", error));

//Problem 4
const p1 = new Promise((resolve) => setTimeout(() => resolve("Success 1"), 500));
const p2 = new Promise((_, reject) => setTimeout(() => reject("Error 2"), 800));
const p3 = new Promise((resolve) => setTimeout(() => resolve("Success 3"), 300));
const p4 = new Promise((_, reject) => setTimeout(() => reject("Error 4"), 600));

Promise.allSettled([p1, p2, p3, p4])
    .then((results) => {
        const counts = results.reduce((acc, result) => {
            if (result.status === "fulfilled") {
                acc.successful++;
            } else {
                acc.failed++;
            }
            return acc;
        }, { successful: 0, failed: 0 });

        console.log("Successful:", counts.successful);
        console.log("Failed:", counts.failed);
    });

//Problem 5
const prom1 = new Promise((resolve) => setTimeout(() => resolve("Success 1"), 400));
const prom2 = new Promise((_, reject) => setTimeout(() => reject("Error 2"), 600));
const prom3 = new Promise((resolve) => setTimeout(() => resolve("Success 3"), 300));
const prom4 = new Promise((_, reject) => setTimeout(() => reject("Error 4"), 500));
const prom5 = new Promise((resolve) => setTimeout(() => resolve("Success 5"), 700));

Promise.allSettled([prom1, prom2, prom3, prom4, prom5])
    .then((results) => {
        const failedPromises = results.filter((result) => result.status === "rejected");
        console.log("Failed promises:", failedPromises.map((p) => p.reason));
    });

//Problem 6
const api1 = "https://jsonplaceholder.typicode.com/users";
const api2 = "https://jsonplaceholder.typicode.com/posts";

Promise.all([
    fetch(api1).then((res) => res.json()),
    fetch(api2).then((res) => res.json())
])
    .then(([users, posts]) => {
        console.log("Users count:", users.length);
        console.log("Posts count:", posts.length);
    })
    .catch((error) => console.error("Error:", error));