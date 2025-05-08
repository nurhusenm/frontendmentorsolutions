const commentSection = document.querySelector(".comment-section");
const replySection = document.querySelector(".reply-section");

async function fetchComments() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    const { comments, currentUser } = data;

    console.log(comments);
    renderComments(comments); // Render main comments

    // Extract all replies into a single array (if needed)
    const allReplies = comments.reduce((acc, comment) => {
      if (comment.replies && comment.replies.length > 0) {
        acc.push(...comment.replies);
      }
      return acc;
    }, []);

    console.log(allReplies);
    renderReplies(allReplies); // Render all replies
    return data;
  } catch (error) {
    console.log(error);
  }
}

function createCommentHtml(comment) {
  return `
        <div class="comments-container">
            <div class="comments">
                <div class="score">
                    <span class="plus"> + </span>
                    <span class="score-number">${comment.score}</span>
                    <span class="minus">-</span>
                </div>
                <div>
                    <div class="header">
                        <div class="header-left">
                            <img src="${comment.user.image.png}" />
                            <h4>${comment.user.username}</h4>
                            <p>${comment.createdAt}</p>
                        </div>
                        <button> &#8618; Reply</button>
                    </div>
                    <div class="comment-text">${comment.content}</div>
                </div>
            </div>
        </div>
    `;
}

function createReplyHtml(reply) {
  return `
        <div class="replies-container">
            <div class="comments replies">
                <div class="score">
                    <span class="plus">+</span>
                    <span class="score-number">${reply.score}</span>
                    <span class="minus">-</span>
                </div>
                <div>
                    <div class="header">
                        <div class="header-left">
                            <img src="${reply.user.image.png}" />
                            <h3>${reply.user.username}</h3>
                            <p>${reply.createdAt}</p>
                        </div>
                        <button> &#8618; Reply</button>
                    </div>
                    <div class="comment-text">  ${reply.content} </div>
                </div>
            </div>
        </div>
    `;
}

function renderComments(comments) {
  const commentsHtml = comments.map(createCommentHtml).join("");
  commentSection.innerHTML = commentsHtml;
}

function renderReplies(replies) {
  const repliesHtml = replies.map(createReplyHtml).join("");
  replySection.innerHTML = repliesHtml;
}

fetchComments();
