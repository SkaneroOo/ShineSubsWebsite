function hamburger(x) {
    x.classList.toggle("change")
    let nav = document.getElementById("navbar_items")
    if (nav != null) {
        nav.id = "navbar_items2"
    } else {
        nav = document.getElementById("navbar_items2")
        nav.id = "navbar_items"
    }
    nav.classList.toggle("change")
}