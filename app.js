function attachEvents() {
  document.querySelector("#refresh").addEventListener("click", displayComment);
  document.querySelector("#submit").addEventListener("click", addComment);
  let url = "http://localhost:3030/jsonstore/messenger";


  function addComment() {
    let authorName = document.querySelector('[name = "author"]');
    let content = document.querySelector('[name = "content"]');
    if (!authorName.value || !content.value) {
      return;
    }
    fetch(url, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        author: authorName.value.trim(),
        content: content.value.trim(),
      }),
    })
      .then((res) => {
        if (res.ok == false) {
          throw new Error("Error creating new record");
        }
        return res.json();
      })
      .catch((err) => alert("Error"));

    author.name = "";
    author.content = "";
    displayComment();
  }

  function displayComment() {
    fetch(url)
      .then((res) => {
        if (res.ok == false) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        let textArea = document.querySelector("#messages");
        let comments = [];
        Object.values(data).forEach((u) =>
          comments.push(`${u.author}: ${u.content}`)
        );
        textArea.value = comments.join("\n");
      })
      .catch((err) => alert(err.message));
  }
}

attachEvents();
