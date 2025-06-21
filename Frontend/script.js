async function getData() {
  try {
    const response = await fetch("http://localhost:8000/todos/get-todos");
    const data = await response.json();
    console.log(data);
    displayData(data.todos);
  } catch (err) {
    console.log(err);
  }
}
window.onload = () => {
  getData();
};

async function deleteTodo(id) {
  try {
    const response = await fetch(
      `http://localhost:8000/todos/delete-todo/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.text();
    alert(data);
    getData(); // refresh UI
  } catch (err) {
    console.log(err);
  }
}

async function updateTodo(id) {
  try {
    const updatedTodo = {
      status: true,
    };
    const response = await fetch(
      `http://localhost:8000/todos/update-todo/${id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      }
    );

    const data = await response.text();
    alert(data);
    getData(); //refresh UI
  } catch (err) {
    console.log(err);
  }
}

function displayData(arr) {
  let container = document.getElementById("container");
  let todosArray = arr.map((el, i) => {
    let card = `<div class="card" data-id="${el.id}">
            <h2>${el.name}</h2>
            <h3>${el.status ? "Completed" : "Pending"}</h3>
            <div class="btns">
                <button class="update-btn">Update</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>`;
    return card;
  });
  container.innerHTML = todosArray.join(" ");

  //adding listeners for delete and update buttons

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const card = e.target.closest(".card");
      const id = card.dataset.id;
      await deleteTodo(id);
    });
  });

  document.querySelectorAll(".update-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const card = e.target.closest(".card");
      const id = card.dataset.id;
      await updateTodo(id);
    });
  });
}
