import React, { useEffect, useState } from 'react';

const FibPage = () => {
    const [seenIndexes, setSeenIndexes] = useState([])
    const [values, setValues] = useState({})
    const [index, setIndex] = useState('')

    async function fetchValues() {
        const response = await fetch('/api/values/current')
        const result = await response.json()
        setValues(result)
    }

    async function fetchIndexes() {
        const response = await fetch('/api/values/all')
        const result = await response.json()
        setSeenIndexes(result)
    }

    async function handleSubmit(event) {
        console.log('hej')
        event.preventDefault()

        await fetch('/api/values', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                index,
            }),
        })

        setIndex('')
    }

    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input  
                    value={index}
                    onChange={e => setIndex(e.target.value)}
                />
                <button>Submit</button>
            </form>

            <h3>Indexes I have seen:</h3>
            {seenIndexes.map(({ number }) => number).join(', ')}

            <h3>Calculated values:</h3>
            {Object.entries(values).map(([key, value]) => (
                <div key={key}>For index {key} i calculated {value}</div>
            ))}
        </div>
    )
}

export default FibPage;