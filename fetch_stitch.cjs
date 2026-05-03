const fs = require('fs');
const https = require('https');

const files = {
  'welcome.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2JkNzM1YWJjZjFhMDRmN2M5MjA5MTNhNGE2YWI3NzBmEgsSBxDVrdaOiwkYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjYwMjUyMjYwMTk4MzU0&filename=&opi=89354086',
  'map.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Q2MjU4OWMzZWM2YzQ4MTQ4ZmUzODBmNTFjYzEzNzNlEgsSBxDVrdaOiwkYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjYwMjUyMjYwMTk4MzU0&filename=&opi=89354086',
  'booth.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAxMGRkYTY0MGNlMTRlZTViMWQwMjMyZWIwN2VkYzQ0EgsSBxDVrdaOiwkYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjYwMjUyMjYwMTk4MzU0&filename=&opi=89354086',
  'congrats.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQ2M2U5Y2Y5YzdiYzRmYWZhY2FhNDVmZjhjYzIwNDhlEgsSBxDVrdaOiwkYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjYwMjUyMjYwMTk4MzU0&filename=&opi=89354086'
};

Object.keys(files).forEach(name => {
  https.get(files[name], (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => fs.writeFileSync(name, data));
  });
});
