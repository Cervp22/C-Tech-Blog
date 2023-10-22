const submitreview = async (event) => {
  event.preventDefault();
  try {
    const reviewContent = document.getElementById("reviewcontent").value.trim();
    const reviewTitle = document
      .getElementById("reviewtitlecontent")
      .value.trim();
    console.log(reviewContent, reviewTitle);

    if (reviewContent && reviewTitle) {
      const response = await fetch("/api/reviews/submitreview", {
        method: "POST",
        body: JSON.stringify({ reviewContent, reviewTitle }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        location.reload();
      } else {
        alert("Something wrong. Check endpoint");
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Check server side", err });
  }
};

const deleteReview = async (reviews_id) => {
  try {
    const response = await fetch(`/api/reviews/${reviews_id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });

    location.reload();
    if (response.ok) {
      location.reload();
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteReviewHandler = (event) => {
  if (event.target.matches(".delete-post")) {
    const reviews_id = event.target.getAttribute("data-review-id");
    console.log(reviews_id);
    deleteReview(reviews_id);
  }
};

document.addEventListener("click", deleteReviewHandler);

document.getElementById("reviewform").addEventListener("submit", submitreview);
