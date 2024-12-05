import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req) {
    try {
        const { userInput, weights } = await req.json();

        const pythonExecutable = '/opt/miniconda3/envs/book-recommender-env/bin/python'; // TODO: make path dynamic 
        const pythonScriptPath = path.join(process.cwd(), 'src', 'scripts', 'recommend.py');

        const pythonProcess = spawn(pythonExecutable, [pythonScriptPath, userInput, ...weights]);

        let output = '';
        
        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error('Python stderr:', data.toString());
        });

        return new Promise((resolve) => {
            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    try {
                        console.log('Python script output:', output); 
                        resolve(NextResponse.json({ recommendations: JSON.parse(output) }));
                    } catch (parseError) {
                        console.error('Error parsing Python output:', parseError);
                        resolve(NextResponse.json({ message: 'Error parsing output' }, { status: 500 }));
                    }
                } else {
                    console.error('Python script exited with code:', code);
                    resolve(NextResponse.json({ message: 'Error running Python script' }, { status: 500 }));
                }
            });
        });
    } catch (error) {
        console.error('Error in API:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
