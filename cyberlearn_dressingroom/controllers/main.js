$(document).ready(() => {
  let listChosen = new ListChosen()

  const renderHTML = async () => {
    $.getJSON("./../data/Data.json")
      .done((res) => {
        renderNav(res)
      })
      .fail((err) => {
        console.log(err)
      })
  }

  const renderNav = (navArray) => {
    let navContent = ""
    let tabContent = ""
    navArray.navPills.forEach((item, index) => {
      let navActive
      navActive = index === 0 ? "active" : ""

      navContent += `<li class="nav-item">
    <a
      class="nav-link btn-default ${navActive}"
      data-toggle="pill"
      href="#${item.tabName}"
    >
      ${item.showName}
    </a>
  </li>`

      let tabActive
      tabActive = index === 0 ? "active show" : ""
      tabContent += `<div class="tab-pane container fade ${tabActive}" id=${
        item.tabName
      }>
        <div class="row">
        ${renderTabPane(item.tabName, navArray.tabPanes)}
        </div>
        </div>`
    })
    $(".nav-pills").html(navContent)
    $(".tab-content").html(tabContent)
    clickFuntionForButtons()
  }

  const renderTabPane = (tabName, tabPanes) => {
    let a
    switch (tabName) {
      case "tabTopClothes":
        return renderItems(getItemsByType("topclothes", tabPanes))
      case "tabBotClothes":
        return renderItems(getItemsByType("botclothes", tabPanes))
      case "tabShoes":
        return renderItems(getItemsByType("shoes", tabPanes))
      case "tabHandBags":
        return renderItems(getItemsByType("handbags", tabPanes))
      case "tabNecklaces":
        return renderItems(getItemsByType("necklaces", tabPanes))
      case "tabHairStyle":
        return renderItems(getItemsByType("hairstyle", tabPanes))
      default:
        return renderItems(getItemsByType("background", tabPanes))
    }
  }

  const getItemsByType = (type, tabPanes) => {
    let arrItems = tabPanes.filter((item) => {
      if (item.type === type) {
        return item
      }
    })
    return arrItems
  }

  const renderItems = (arrItems) => {
    let tabPaneContent = ""
    arrItems.map((item) => {
      tabPaneContent += `<div class="col-md-3">
        <div class="card text-center">
          <img src="${item.imgSrc_jpg}" />
          <h4>
            <b>${item.name}</b>
          </h4>
          <button class="changeStyle" data-id=${item.id} data-type=${item.type} data-name=${item.name} data-desc=${item.desc} data-img-src-jpg=${item.imgSrc_jpg} data-img-src-png=${item.imgSrc_png}>Thử đồ</button>
        </div>
      </div>
    `
    })
    return tabPaneContent
  }

  const clickFuntionForButtons = () => {
    $(".changeStyle").click(function () {
      let id = $(this).data("id")
      let type = $(this).data("type")
      let name = $(this).data("name")
      let desc = $(this).data("desc")
      let imgsrc_jpg = $(this).data("img-src-jpg")
      let imgsrc_png = $(this).data("img-src-png")

      let chosenItem = new ChoseItem(
        id,
        type,
        name,
        desc,
        imgsrc_jpg,
        imgsrc_png
      )

      if (listChosen.arr.length > 0) {
        for (let i in listChosen.arr) {
          if (listChosen.arr[i].type === chosenItem.type) {
            listChosen.arr.splice(i, 1)
            break
          }
        }
      }

      listChosen.addAddItem(chosenItem)
      renderItemsOnModel(listChosen.arr)
    })
  }

  const renderItemsOnModel = (arrItems) => {
    for (let item of arrItems) {
      switch (item.type) {
        case "topclothes":
          renderBikiniTop(item.imgsrc_png)
          break
        case "botclothes":
          renderBikiniBottom(item.imgsrc_png)
          break
        case "shoes":
          renderFeet(item.imgsrc_png)
          break
        case "handbags":
          renderHandbags(item.imgsrc_png)
          break
        case "necklaces":
          renderNecklace(item.imgsrc_png)
          break
        case "hairstyle":
          renderHairstyle(item.imgsrc_png)
          break
        default:
          renderBackground(item.imgsrc_png)
      }
    }
  }

  function renderBikiniTop(img) {
    $(".bikinitop").css({
      width: "500px",
      height: "500px",
      background: `url(${img})`,
      position: "absolute",
      top: "-9%",
      left: "-5%",
      zIndex: "3",
      transform: "scale(0.5)",
    })
  }

  function renderBikiniBottom(img) {
    $(".bikinibottom").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      top: "-30%",
      left: "-5%",
      zIndex: "2",
      transform: "scale(0.5)",
    })
  }

  function renderFeet(img) {
    $(".feet").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-37%",
      right: "-3.5%",
      transform: "scale(0.5)",
      zIndex: "1",
    })
  }

  function renderHandbags(img) {
    $(".handbag").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-40%",
      right: "-3.5%",
      transform: "scale(0.5)",
      zIndex: "4",
    })
  }

  function renderNecklace(img) {
    $(".necklace").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-40%",
      right: "-3.5%",
      transform: "scale(0.5)",
      zIndex: "4",
    })
  }

  function renderHairstyle(img) {
    $(".hairstyle").css({
      width: "1000px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      top: "-75%",
      right: "-57%",
      transform: "scale(0.15)",
      zIndex: "4",
    })
  }

  function renderBackground(img) {
    $(".background").css({
      backgroundImage: `url(${img})`,
    })
  }

  renderHTML()
})
