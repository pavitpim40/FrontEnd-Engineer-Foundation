let head = document.getElementById('head');

console.log(head);

// const myHead = React.createElement('h1', null, 'HI');
const myHead = <h1>Hi ${5 + 2}</h1>;

console.log(myHead);
