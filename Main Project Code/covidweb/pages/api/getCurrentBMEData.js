// https://nextjs.org/docs/api-routes/introduction
// This API route gets the current data just entered into the Room database
export default async function handler(req, res) {
    await fetch('http://localhost:8000/getCurrentBMEData', {
        method: 'POST'
    })
    .then((res) => res.json())
    .then((data) => {
        res.json(data)
    })
}

export const config = {
    api: {
      responseLimit: false,
    },
}
  


