// write your code here
const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const ramenDetailImg = document.querySelector("#ramen-detail-img");
const ramenName = document.querySelector("#ramen-name");
const ramenRestaurant = document.querySelector("#ramen-restaurant");
const ratingDisplay = document.querySelector("#rating-display");
const commentDisplay = document.querySelector("#comment-display");
const ramenForm = document.querySelector("#new-ramen");
let ramenID;

const getRamen = () => {
    fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(data => renderRamen(data));
}

const renderRamen = data => {
    console.log(data);
    ramenID = data.length;
    data.forEach(ramen => {
        const menuItem = document.createElement("img");
        menuItem.src = ramen.image;
        menuItem.addEventListener("click", e => {
            ramenDetailImg.src = e.target.src;
            ramenName.textContent =ramen.name;
            ramenRestaurant.textContent = ramen.restaurant;
            ratingDisplay.textContent = ramen.rating;
            commentDisplay.textContent = ramen.comment;
        });

        ramenMenu.append(menuItem);
    })
    showFirstItem(data[0]);
}

const handleForm = () => {
    const newRamenObj = {
        "id": ++ramenID,
        "name": document.querySelector("#new-name").value,
        "restaurant": document.querySelector("#new-restaurant").value,
        "image": document.querySelector("#new-image").value,
        "rating": document.querySelector("#new-rating").value,
        "comment": document.querySelector("#new-comment").value
    }
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRamenObj)
    })
    .then(res => res.json())
    .then(data => console.log(data));
}

const showFirstItem = ramen => {
    ramenDetailImg.src = ramen.image;
    ramenName.textContent =ramen.name;
    ramenRestaurant.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating;
    commentDisplay.textContent = ramen.comment;
}

ramenForm.addEventListener("submit", e => {
    e.preventDefault();
    handleForm();
    ramenForm.reset();
})

getRamen();