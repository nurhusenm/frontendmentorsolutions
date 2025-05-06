const commentSection = document.querySelector(".comment-section");

async function fetchComments() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    const { comments, currentUser } = data;

    console.log(comments);
    render(comments);

    return data;
  } catch (error) {
    console.log(error);
  }
}

function createCommentsHtml(comment) {
  return `
      <div class="comments-container"> 
            <div class="comments">
                <div class="score">
                    <span>+</sapn>
                    <span>${comment.score}</span>
                    <span>-</sapn>
                </div>
                  <div>
                      <div>
                          <img src="${comment.user.image.png}" />
                          <h3>${comment.user.username}</h3>
                          <p>${comment.createdAt}</p>
                          <button> &times; Reply</button>
                      </div>
                     <div>${comment.content}</div>
                </div>
                     
             </div>
            
         
          <div>
          ${comment.replies
            .map((reply) => {
              return `<div>
           <div>
                    <span>+</sapn>
                    <span>${reply.score}</span>
                    <span>-</sapn>
            </div>
                <div>
                <img src="${reply.user.image.png}" />
                <h3>${reply.user.username}</h3>
                <p>${reply.createdAt}</p>
                <button> &times; Reply</button>
            </div>
                <div>${reply.content}</div>
           </div>

            </div>
           `;
            })
            .join("")}
        

          
    `;
}

function render(comments) {
  let allLists = "";
  comments.map((comment) => {
    allLists += createCommentsHtml(comment);
  });
  commentSection.innerHTML = allLists;
}

fetchComments();
