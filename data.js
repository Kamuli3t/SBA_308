//! This is only for my Reference

// A courselnfo object, which looks like this:
const courseInfo = { id: number, name: string };
// An AssignmentGroup object, which looks like this:

const AssignmentGroup = {
  id: number,
  name: string,
  course_id: number,
  group_weight: number,
  assignments: [
    // AssignmentsInfos
    {
      id: number,
      name: string,
      due_at: dateorstring,
      points_possible: number,
    },
    {
      id: number,
      name: string,
      due_at: dateorstring,
      points_possible: number,
    },
  ],
};

//LearnerSubmission

const learnerSub = {
  learner_id: number,
  assignment_id: number,
  submission: {
    submitted_at: dateorstring,
    score: number,
  },
};

const output = {
  id: number, // Id of the learner
  ave: number, //
  [assignment_id]: number,
};
