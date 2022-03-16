// https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    fetch('http://localhost:3003/getbmeData', {
        method: 'POST'
    })
    .then((res) => res.json())
    .then((data) => {
        res.json(data);
    })

}

