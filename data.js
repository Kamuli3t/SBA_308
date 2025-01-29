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
  // the learner’s total, weighted average, in which assignments
  // with more points_possible should be counted for more
  // e.g. a learner with 50/100 on one assignment and 190/200 on another
  // would have a weighted average score of 240/300 = 80%.
  ave: number,
  // if an assignment is not yet due, it should not be included in either
  // the average or the keyed dictionary of scores
  [assignment_id]: number,
};
