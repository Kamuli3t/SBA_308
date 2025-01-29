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
  let totalScore = 0;
  let fullScore = 0;

  // for edge case we should make sure first that the given assignmentGroup aligns to the course:
  // therefore, we can compare the course id's, then follow conditionally
  try {
    if (courseInfo["id"] !== assignmentGroup["course_id"]) {
      throw new Error("The Assignment Group is For a Different Course...");
    } else {
      const today = new Date().toISOString().split("T")[0];

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

        // Find if the learner already exists in the result array
        let learner = result.find((learner) => learner.id === el.learner_id);

        if (learner) {
          // Store normalized score for the assignment, applying penalty if late
          learner[el.assignment_id] = calculateScore(
            el.submission,
            appointedAssignment
          );
        } else {
          // If learner is not in the result, create a new entry
          learner = {
            id: el.learner_id,
            [el.assignment_id]: calculateScore(
              el.submission,
              appointedAssignment
            ),
          };
          result.push(learner);
        }

        // // Compute average score dynamically
        // let scores = Object.keys(learner)
        //   // Filter numeric assignment keys
        //   .filter((key) => !isNaN(key))
        //   // Extract scores
        //   .map((key) => learner[key]);

        // // Calculate the average score for past-due assignments
        // learner.ave =
        //   scores.length > 0
        //     ? scores.reduce((acc, val) => acc + val, 0) / scores.length
        //     : 0;

        totalScore += el.submission.score;
        fullScore += appointedAssignment.points_possible;
        learner.ave = totalScore / fullScore;
      });

      return result;
    }
  } catch (error) {
    console.error("Invalid input: ", error.message);
  }
}

// date formatting function
function dateFormatted(date = new Date()) {
  try {
    if (typeof date === "string") {
      return new Date(date).toISOString().split("T")[0];
    } else {
      throw new Error("Invalid Date type or format");
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

//
function calculateScore(submission, appointedAssignment) {
  const isLate =
    dateFormatted(submission.submitted_at) >
    dateFormatted(appointedAssignment.due_at);

  const rawScore = isLate ? submission.score - 10 : submission.score;

  //ensure the score is not negative
  return Math.max(0, rawScore / appointedAssignment.points_possible);
}

console.log(getLearnerData(courseInfo, assignmentGroup, learnerSubmissions));
