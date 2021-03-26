async function deletePost(event) {
  event.preventDefault();
  let id = window.location.toString().split("/");
  if (id[id.length - 1] === "") {
    id = id[id.length - 2];
  } else {
    id = id[id.length - 1];
  }

  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
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

document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deletePost);
