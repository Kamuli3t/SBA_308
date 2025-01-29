# **Learner Performance Evaluator**

This project processes learner submissions for a JavaScript course, normalizing scores, applying late penalties, and computing average performance.

## **Technologies Used**

- **JavaScript (ES6+)** - Core logic and data processing.
- **Node.js** (optional) - To run the script locally.
- **HTML** - for Browser functionality

---

## **What's Used For?**

- **Evaluating learner submissions** in an assignment group.
- **Filtering out assignments** that are not past due.
- **Normalizing scores** based on total possible points.
- **Applying penalties** (-10 points) for late submissions.
- **Computing average scores** for each learner.

---

## **Functions Descriptions**

### 🔹 `getLearnerData(courseInfo, assignmentGroup, learnerSubmissions)`

- **Purpose:** Main function to process learner submissions.
- **Actions:**
  - Checks if the provided **assignment group belongs to the course**.
  - Filters out **future assignments**.
  - Maps learner submissions and **applies late penalties**.
  - Calculates **normalized scores** and computes **average performance**.

### 🔹 `calculateScore(submission, appointedAssignment)`

- **Purpose:** Computes the learner's **final score per assignment**.
- **Logic:**
  - Checks if the submission was **late**.
  - Deducts **10 points** for late submissions.
  - Normalizes the score by dividing it by `points_possible`.
  - Ensures the **score does not go below zero**.

### 🔹 `dateFormatted(date)`

- **Purpose:** Formats date strings into `YYYY-MM-DD`.
- **Logic:**
  - Converts valid date strings using `toISOString().split("T")[0]`.
  - Handles **invalid dates** and returns `null` if incorrect.
