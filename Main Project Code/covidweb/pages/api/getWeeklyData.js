// https://nextjs.org/docs/api-routes/introduction
// This API route gets the data entered into the RoomAverage database ovet the last week
export default async function handler(req, res) {
    await fetch('http://localhost:8000/getWeeklyData', {
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