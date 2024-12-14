import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { userInput, weights } = await req.json();

        if (!userInput || !Array.isArray(weights) || weights.some((w) => typeof w !== 'number')) {
            return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
        }

        const flaskUrl = 'https://802b-173-52-101-213.ngrok-free.app/recommend';
        const flaskResponse = await fetch(flaskUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userInput, weights }),
        });

        if (flaskResponse.ok) {
            const data = await flaskResponse.json();
            return NextResponse.json({ recommendations: data });
        } else {
            const errorMessage = await flaskResponse.text();
            console.error('Flask server error:', errorMessage);
            return NextResponse.json({ message: 'Error from Flask server' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in API:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
