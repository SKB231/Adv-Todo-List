/**
 * This represents the fetchAPI returing a promise. The promise executes in a seperate server and the resolve or catch function is executed asynchronously.
 */

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => response.json())
  .then((json) => console.log(json));

/**
 * Promise.resolve() returns a promise that is resolved and will execute the function in "then" asynchronously.
 */
Promise.resolve().then(()=>{
    console.log("Async code");
})


/**
 * This function returns a resolved promise. The resolved function will take the fruits[index] as the variable.
 */
let getFruit = (name) => {
    const fruits = {
        "tomato":"🍅",
        "peach": "🍏",
        "cherry": "🍒"
    };

    return Promise.resolve(fruits[name]);
}

fruits = ["tomato", "peach"];

Promise.all(fruits.map((v) => getFruit(v))).then((values) => console.log(values));

makeSmoothie = async() =>
{
    const a =  fetch('https://jsonplaceholder.typicode.com/posts/1');
    const b =  fetch('https://jsonplaceholder.typicode.com/posts/1');

    let ret = await Promise.all([a,b]);
    
    console.log(ret);

};


makeSmoothie();

