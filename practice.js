// Build a Node.js command-line application that collects student exam scores, assigns letter grades, and checks graduation eligibility.
// Requirements
// 1. Functions:

//  calculateAverage(scores) — uses a for loop to sum an array of exam scores and

// returns the average.
//  getLetterGrade(average) — uses if / else if / else statements to return "A"

// (90-100), "B" (80-89), "C" (70-79), "D" (60-69), or "F" (below 60).
// getHonorStatus(grade) - uses a switch statement on the letter grade to return
// a standing label ("Summa Cum Laude" for "A", "Magna Cum Laude" for "B",
// "Good Standing" for "C", "Academic Warning" for "D", or "Academic Probation"
// by default).
// runEvaluator() — manages CLI input/output and coordinates the helper
// functions.


// 2. Core Flow (for loop + if / else + switch):
// • Ask for the student's name, attendance percentage, and number of subjects. Use a for loop to prompt for each subject's score (0-100) and store it in an array. • Use if / else to check eligibility: the student passes only if attendance is 75% or higher AND the letter grade is not "F".
// • Print a final report showing the average, letter grade, honor standing, and pass/fail status.


import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

function calculateAverage(scores) {
    let total = 0;

    for (let i = 0; i < scores.length; i++) {
        total += scores[i];
    }

    return total / scores.length;
}

function getLetterGrade(average) {
    if (average >= 90) {
        return 'A';
    } else if (average >= 80) {
        return 'B';
    } else if (average >= 70) {
        return 'C';
    } else if (average >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

function getHonorStatus(grade) {
    switch (grade) {
        case 'A':
            return 'Outstanding';
        case 'B':
            return 'Excellent';
        case 'C':
            return 'Very Good';
        case 'D':
            return 'Good';
        default:
            return 'Academic Probation';
    }
}

async function runEvaluator() {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    const studentCountInput = await rl.question('Enter number of students: ');
    const studentCount = Number(studentCountInput);

    if (studentCountInput.trim() === '' || !Number.isInteger(studentCount) || studentCount < 1) {
        console.log('Please enter a positive whole number of students.');
        rl.close();
        return;
    }

    const studentResults = [];

    for (let studentIndex = 0; studentIndex < studentCount; studentIndex++) {
        console.log(`\nStudent ${studentIndex + 1} of ${studentCount}`);
        const name = await rl.question('Enter student name: ');
        const attendanceInput = await rl.question('Enter attendance percentage: ');
        const attendance = Number(attendanceInput);
        const subjectCountInput = await rl.question('Enter number of subjects: ');
        const subjectCount = Number(subjectCountInput);

        if (!name.trim() || attendanceInput.trim() === '' || Number.isNaN(attendance) ||
            attendance < 0 || attendance > 100 || subjectCountInput.trim() === '' ||
            !Number.isInteger(subjectCount) || subjectCount < 1) {
            console.log('Please enter a name, attendance from 0 to 100, and a positive subject count.');
            rl.close();
            return;
        }

        const scores = [];
        for (let subjectIndex = 0; subjectIndex < subjectCount; subjectIndex++) {
            const scoreInput = await rl.question(`Enter score for subject ${subjectIndex + 1}: `);
            const score = Number(scoreInput);
            if (scoreInput.trim() === '' || Number.isNaN(score) || score < 0 || score > 100) {
                console.log('Please enter a score from 0 to 100.');
                rl.close();
                return;
            }
            scores.push(score);
        }

        const average = calculateAverage(scores);
        const grade = getLetterGrade(average);
        const honorStatus = getHonorStatus(grade);
        let result = 'FAIL';

        if (attendance >= 75 && grade !== 'F') {
            result = 'PASS';
        }

        studentResults.push({
            Name: name,
            Attendance: `${attendance}%`,
            Average: average.toFixed(2),
            Grade: grade,
            Honor: honorStatus,
            Status: result
        });

        console.log('\nStudent Report');
        console.log(`Name: ${name}`);
        console.log(`Attendance: ${attendance}%`);
        console.log(`Average: ${average.toFixed(2)}`);
        console.log(`Letter grade: ${grade}`);
        console.log(`Honor standing: ${honorStatus}`);
        console.log(`Pass/fail status: ${result}`);
    }

    console.log('\nAll Student Results');
    console.table(studentResults);
    rl.close();
}

runEvaluator();
