const courseInfo = { id: 451, name: "Introduction to JavaScript" };
// The provided assignment group.
const assignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};
// The provided learner submission data.
const learnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: { submitted_at: "2023-01-25", score: 47 },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: { submitted_at: "2023-02-12", score: 150 },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: { submitted_at: "2023-01-25", score: 400 },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: { submitted_at: "2023-01-24", score: 39 },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: { submitted_at: "2023-03-07", score: 140 },
  },
];

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  const result = [];

  // for edge case we should make sure first that the given assignmentGroup aligns to the course:
  // therefore, we can compare the course id's, then follow conditionally
  try {
    if (courseInfo["id"] !== assignmentGroup["course_id"]) {
      throw new Error("The Assignment Group is For a Different Course...");
    } else {
      const today = dateFormatted("today");

      // this will filter the assignments past their due by today.
      const assignmentsPastDue = assignmentGroup.assignments.filter((el) => {
        return dateFormatted(el.due_at) < today;
      });

      learnerSubmissions.forEach((el) => {
        // Find the assignment related to the submission
        const appointedAssignment = assignmentsPastDue.find(
          (assignment) => assignment.id === el.assignment_id
        );

        // If the assignment is not past due, ignore it
        if (!appointedAssignment) return;

        const [rawScore, percentage] = calculateScore(
          el.submission,
          appointedAssignment
        );

        // Find if the learner already exists in the result array
        let learner = result.find((learner) => learner.id === el.learner_id);

        if (!learner) {
          // Create new learner entry
          learner = {
            id: el.learner_id,
            totalScore: 0, // Initialize total score for this learner
            fullScore: 0, // Initialize full score for this course
          };
          result.push(learner);
        }

        // Store normalized score for the assignment
        learner[el.assignment_id] = percentage;

        // Update learner-specific total score and full score
        learner.totalScore += rawScore;
        learner.fullScore += appointedAssignment.points_possible;

        // Compute average score dynamically per learner
        learner.ave =
          learner.fullScore > 0 ? learner.totalScore / learner.fullScore : 0;
      });

      return result.map(({ totalScore, fullScore, ...learner }) => learner); // Remove unnecessary properties before returning
    }
  } catch (error) {
    console.error("Invalid input: ", error.message);
  }
}

// date formatting function
function dateFormatted(date) {
  try {
    if (typeof date === "string") {
      if (date === "today") {
        return new Date().toISOString().split("T")[0];
      } else {
        return new Date(date).toISOString().split("T")[0];
      }
    } else {
      throw new Error("Invalid Date type or format");
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Score calculation function
function calculateScore(submission, appointedAssignment) {
  const isLate =
    dateFormatted(submission.submitted_at) >
    dateFormatted(appointedAssignment.due_at);

  const rawScore = isLate ? submission.score - 10 : submission.score;

  // Ensure the score is not negative
  return [
    rawScore,
    Math.max(0, rawScore / appointedAssignment.points_possible),
  ];
}

console.log(getLearnerData(courseInfo, assignmentGroup, learnerSubmissions));
