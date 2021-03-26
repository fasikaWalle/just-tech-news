async function savePost(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="post-title"]').value.trim();

  let post_id = window.location.toString().split("/");

  console.log(post_id);
  if (post_id[post_id.length - 1] === "") {
    post_id = post_id[post_id.length - 2];
    console.log(post_id);
  } else {
    post_id = post_id[post_id.length - 1];
  }

  const response = await fetch(`/api/posts/${post_id}`, {
    method: "put",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    window.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".edit-post-form").addEventListener("submit", savePost);
