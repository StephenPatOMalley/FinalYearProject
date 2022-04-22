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