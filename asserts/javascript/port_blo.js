// Port_Blo PAges
$("document").ready(() => {
  const pageObjects = { json: undefined };


  const loadDatabase = async function () {

    // LOAD DATABASE
    // const dataBase = fetch("http://127.0.0.1:35431/data.json");
    dataBase = fetch("https://raw.githubusercontent.com/silencecoder-page/lonelyCoderserver/main/data.json");
    
    // CATCH ERRO
    await dataBase.catch((e) => {
      if (String(e.message) === "Failed to fetch") 
      {fetchErro();console.log("YOU ARE OFFLINE")}
    })

    // PROCEED FROCESS
    await dataBase.then(function (responds) {
      if (responds.ok) {
        const content = responds.text();
        content.then((dataBaseText) => {
          pageObjects.json = JSON.parse(dataBaseText);
          objectReady();
        });
        content.catch((dataBaseTextErro) => {
          // DATABASE TEXTEROO HERE
          fetchErro()
        });
      } else {
        // Erro Codes Here
        fetchErro()
      }
    });
  };

  const objectReady = function () {
    // console.log(pageObjects.json, "object eady");
    createSlidesContents();
    console.log(pageObjects.json.blo_slides.length);
  };

  // SlideMaintemplate
  slideMainTemplate = function () {
    let template = `<!-- SLides -->
        <div class="sliderContaier">
            <div id="slide_main_container" class="sliderWrapper">   
            </div>
            <!-- slide Controls -->
            <div class="controlsContainer">
                <div class="slideButtons">
                    <img id="slideLeft" class="slideBTN" src="main-icons/icons8-scroll-up-50.png" alt="" srcset="">
                    <img id="slideRight" class="slideBTN" src="main-icons/icons8-scroll-down-50.png" alt="" srcset="">
                </div>
            </div>
        </div>
        <!-- End Of Slides -->`;
    return template;
  };

  // No Contents Template
  slideNoContentsTemplate = function () {
    let template = `<!-- Contents Unavailabel Template -->
    <div class="slide_contents_unavailable">
        <span class="no-slide-contents">
            contents are unavailable yet
        </span>
    </div>`;
    return template;
  };

  // ADDING PAGE CONTENTS
  const createSlide = function (url, desc, priData) {
    const template = `
    <img class="slideItem" src="${url}" alt="${desc}" srcset="" pri-data="${priData}">`;
    $("#slide_main_container").append(template);
  };

  // ADD CONTETNS
  const createSlidesContents = function () {
    const addSlides = function (objectsList) {
      for (slideobj of objectsList) {
        const url = slideobj.url;
        const desc = slideobj.desc
        const priData = slideobj.pri_data;
        createSlide(url,desc, priData);
      }
    };
    const databaseobject = pageObjects.json;
    if ($("title").text().toLowerCase().includes("portfolio")) {
      if (databaseobject.foli_slides.length > 1) {
        $("#portfolio").append(slideMainTemplate());
        addSlides(databaseobject.foli_slides);
        createEvents();
      } else {
        $("#portfolio").append(slideNoContentsTemplate());
      }
    } else if ($("title").text().toLowerCase().includes("blog")) {
      if (databaseobject.blo_slides.length > 1) {
        $("#blog").append(slideMainTemplate());
        addSlides(databaseobject.blo_slides);
        createEvents();
      } else {
        $("#blog").append(slideNoContentsTemplate());
      }
    }
  };

  // ADD EVENTS
  const createEvents = function () {
    // PAGE INTERACTION
    const slideLeft = document.getElementById("slideLeft");
    const slideRight = document.getElementById("slideRight");
    const sliderWrapper = document.querySelector(".sliderWrapper");
    const slideItems = document.querySelectorAll(".slideItem");

    slideLeft.addEventListener("click", scrollTop);
    slideRight.addEventListener("click", scrollTop);
    function scrollTop(e) {
      const totalMargin = slideItems.length / 3;
      const slideObjectHeigh = slideItems[0].clientHeight + totalMargin;
      if (this === slideLeft) {
        sliderWrapper.scrollTop -= slideObjectHeigh * 2;
      } else {
        sliderWrapper.scrollTop += slideObjectHeigh * 2;
      }
    }
    slideItems.forEach((elentent) => {
      elentent.addEventListener("click", photoViewer);
    });

    function photoViewer() {
      // GET CLICKED IMAGE SOURCE
      const src = this.src;
      const priData = this.getAttribute("pri-data");
      const desc = this.getAttribute("alt");
      createTemplate(src,desc, priData);
    }

    function AppendToSreen(windowContanoer) {
      document.querySelector("body").appendChild(windowContanoer);
    }

    function createTemplate(src,desc,priData) {
      const windowContanoer = document.createElement("div");
      const selectedItem = document.createElement("img");
      const imgviewerClose = document.createElement("img");
      const orderButton = document.createElement("div");
      const priceBox = document.createElement("div");
      const orederButtonTag = document.createElement("span");
      const priceTage = document.createElement("span");
      // Appending Classes
      windowContanoer.classList.add("photoWindow");
      selectedItem.classList.add("selectedItem");
      imgviewerClose.classList.add("imgviewerClose");
      orderButton.classList.add("floatButtonBox");
      priceBox.classList.add("floatPriceBox");
      orederButtonTag.classList.add("floatButtonTag");
      priceTage.classList.add("floatPriceTag");
      orderButton.id = "orderButton";
      orederButtonTag.innerText = "order now";
      priceTage.innerText = priData + "$";
      selectedItem.alt = desc
      // Setting Source
      selectedItem.src = src;
      imgviewerClose.src = "main-icons/close_FILL0_wght400_GRAD0_opsz48.svg";
      // Setting EventLister
      imgviewerClose.addEventListener("click", windowContanoerRemover);
      orderButton.addEventListener("click", itemMainPage);
      // Appending Children
      orderButton.appendChild(orederButtonTag);
      priceBox.appendChild(priceTage);
      windowContanoer.appendChild(selectedItem);
      windowContanoer.appendChild(imgviewerClose);
      windowContanoer.appendChild(orderButton);
      windowContanoer.appendChild(priceBox);
      // Adiing To Screen
      AppendToSreen(windowContanoer);
    }

    function windowContanoerRemover() {
      document
        .querySelector("body")
        .removeChild(document.querySelector(".photoWindow"));
    }

    function itemMainPage(e) {
      const parentNode = this.parentNode;
      const source = parentNode.querySelector(".selectedItem").src;
      const desc = parentNode.querySelector(".selectedItem").alt;
      const pri_data = parentNode.querySelector(".floatPriceTag").innerText;
      console.log(desc)
      localStorage.setItem("SRC", source);
      localStorage.setItem("PRICE", pri_data);
      localStorage.setItem("DESC", desc);
      window.location.href = "pages//portfolio-email.html";
    }
  };


  // Handel Request Erro
  const fetchErro = function(){
    console.log('there was an erro')
    $("#blog").append(slideNoContentsTemplate());
    $("#portfolio").append(slideNoContentsTemplate());
    return false
  }

  // IF DATABASE CONNECTS THROUGH, LOAD DATABASE
  loadDatabase();
});
