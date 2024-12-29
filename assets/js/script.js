const list = document.getElementById("facilityList");
const listItem = document.getElementById("listItem").querySelector("li");

const request = new XMLHttpRequest();
request.open('GET', 'assets/data/parade_show.json', true);
request.send();

request.onreadystatechange = function() {
  if (request.readyState == 4 && request.status == 200) {
    const data = JSON.parse(request.responseText);
    data.forEach((element) => {
      const item = listItem.cloneNode(true);

      const name = element.name
      const img = element.image;
      const category = element.category

      item.querySelector("img").src = img;
      item.querySelector(".list-item-title").textContent = name;
      item.setAttribute("data-category", category);

      list.appendChild(item);
    })
  }
}

const btnOpenFilter = document.getElementById("btn-open-filter");
const filter = document.getElementById("filter");
btnOpenFilter.addEventListener("click", () => {
  filter.classList.add("is-open");
})

const btnFilter = document.getElementById("btn-filter");
btnFilter.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll("input[name='filter']:checked");
  let filterList = new Array();
  checkboxes.forEach((checkbox) => {
    filterList.push(checkbox.id);
  });

  // AND検索
  const items = list.querySelectorAll("li.list-item");
  items.forEach((item) => {
    item.style.display = "block";
    const category = String(item.getAttribute("data-category")).split(",");
    
    filterList.forEach((tag) => {
      if (!category.includes(tag)) {
        item.style.display = "none";
        return
      }
    })
  })

  filter.classList.remove("is-open");
})