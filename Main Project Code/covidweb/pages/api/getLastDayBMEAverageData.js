// https://nextjs.org/docs/api-routes/introduction
// This API route gets the data entered into the RoomAverage database over the last 24 Hours
export default async function handler(req, res) {
    await fetch('http://localhost:8000/getbmeDayAverageData', {
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
