var commentModal = document.getElementById("editCommentModal");
commentModal.addEventListener("show.bs.modal", function (event) {
  const button = event.relatedTarget;
  const commentId = button.getAttribute("data-bs-commentid");
  const commentContent = button.getAttribute("data-bs-commentcontent");
  const postForm = commentModal.querySelector(".comment-post-form");
  var modalContent = commentModal.querySelector(".comment-content");

  modalContent.textContent = commentContent;

  postForm.setAttribute("action", `/comentario/editar/${commentId}`);
});
