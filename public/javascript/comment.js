async function addComment(event) {
  event.preventDefault();
  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  let post_id = window.location.toString().split("/");

  console.log(post_id, comment_text);
  if (post_id[post_id.length - 1] === "") {
    post_id = post_id[post_id.length - 2];
    console.log(post_id);
  } else {
    post_id = post_id[post_id.length - 1];
  }
  console.log(comment_text, post_id);
  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        comment_text,
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("sucess");
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector(".comment-form").addEventListener("submit", addComment);
