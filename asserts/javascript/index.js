// Main PAge
$("document").ready(() => {
  const pageObjects = { json: undefined };
  // APPEND COLUMNS
  const loadDatabase = async function () {

    // LOAD DATA BASE
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
          console.log(dataBaseTextErro);
          fetchErro()
        });
      } else {
        // Erro Codes Here
        fetchErro()
      }
    });
  };
 
  const objectReady = function () {
    recentsFun();
    fieldFun();
    setScrollRevael()
  };

  // --------------------------------------------------------------------
  //   ADDING PAGE CONTENTS       ADDING RECENTS                        |
  // --------------------------------------------------------------------
  const recentsFun = function () {
    const dataobject = pageObjects.json;
    // Column Template
    const columnTemplate = function (url, desc, priData,forPage) {
      const template = ` <div class="column transBG">
      <div class="colunm_img">
        <img src="${url}" alt="" srcset="" pri-data="${priData}" for="${forPage}"/>
      </div>
      <div class="column_info">
        <p>
          ${desc}
        </p>
      </div>
    </div>
      `;
      return template;
    };

    const columnErrorTemplate = function () {
      const template = `<div class="column transBG">
      <div class="column_info">
        <p>
          contents unavailable
        </p>
      </div>
    </div>
      `;
      return template;
    };

    const addColuns = function (data, columnMainID, forPage) {
      for (let column = 0; column < 3; column++) {
        try {
          const columnData = {
            url: data[column].url,
            desc: data[column].desc,
            priData: data[column].pri_data,
          };
          // ADDColumn
          $(`#${columnMainID}`).append(columnTemplate(columnData.url, columnData.desc, columnData.priData, forPage));
        } catch {
          // ERRO TEMPLATE
          $(`#${columnMainID}`).append(columnErrorTemplate());
        }
      }
    };
    const getFeilds = function () {
      addColuns(dataobject.foli_slides, "recent_portfolio_main_container", 'portfolio');
      addColuns(dataobject.blo_slides, "recent_blog_main_container", 'blog');
      // ADD EVENT LISTENER
      columnEvents()
    };
    getFeilds();
  };

  // --------------------------------------------------------------------
  // ADDING COLUMN EVENTS                                               |
  // --------------------------------------------------------------------
  const columnEvents = function(){
    $('.colunm_img').click(function(e){
      const path = e.target.getAttribute('for')
      if (path.includes('portfolio')) {
        window.location.href = "pages/portfolio-main.html"
      } else if (path.includes('blog')) {
        window.location.href = "pages/blog-main.html"
      }
    })
  }
  // --------------------------------------------------------------------
  // ADDING FIELDS                                                       |
  // --------------------------------------------------------------------
  const fieldFun = function () {
    const fields = pageObjects.json.fields;
    const appendFiled = function(fields) {
      const feildTemplate = `<div class="field_item center">
      <span class="field_item_text">${fields}</span>
      </div>`;
      $("#field_main_container").append(feildTemplate);
    };
    const appendErroFiled = function () {
      const feildErroTemplate = `<div class="field_item center">
      <span class="field_item_text">no contents</span>
      </div>`;
      $("#field_main_container").append(feildErroTemplate);
    };
    // Append
    try {
      for (fieldsItem of fields) {
        appendFiled(fieldsItem);
      }
      addTableAdination();
    } catch {
      appendErroFiled();
    }
  };

  // Feild Items Animation
  const tabAnimationObject = {
    direction: "LEFT",
    duration: 500,
    eventId: undefined,
  };

  const animateFilter = function () {
    const $scrollContainer = $(".field_container");
    const scrollItems = $scrollContainer.children();
    const getDirection = function (e) {
      const currentScroll = $scrollContainer[0].scrollLeft;
      const maxScroll = $scrollContainer[0].scrollLeftMax;
      if (currentScroll === maxScroll) {
        tabAnimationObject.direction = "RIGHT";
      } else if (currentScroll === 0) {
        tabAnimationObject.direction = "LEFT";
      } else {
        return false;
      }
    };
    const scrollItem = function () {
      const scrollLenght = scrollItems[0].scrollWidth / scrollItems.length;
      if (tabAnimationObject.direction === "LEFT") {
        $scrollContainer[0].scrollLeft += scrollLenght;
      } else {
        $scrollContainer[0].scrollLeft -= scrollLenght;
      }
    };
    getDirection();
    scrollItem();
  };

  const addTableAdination = function () {
    let duration = tabAnimationObject.duration;
    tabAnimationObject.eventId = setInterval(animateFilter, duration);
    $(".field_item").mouseover(function () {
      clearInterval(tabAnimationObject.eventId);
    });
    $(".field_item").mouseleave(function () {
      tabAnimationObject.eventId = setInterval(animateFilter, duration);
    });
  };

  // HANDELING REQUEST ERRRO
  const fetchErro = function () {
    const columnErrorTemplate = function () {
      const template = `<div class="column transBG">
      <div class="column_info">
        <p>
          contents unavailable
        </p>
      </div>
    </div>
      `;
      $("#recent_portfolio_main_container").append(template);
      $("#recent_blog_main_container").append(template);
    };

    const filedErro = function () {
      const feildErroTemplate = `<div class="field_item center">
      <span class="field_item_text">no contents</span>
      </div>`;
      $("#field_main_container").append(feildErroTemplate);
    };

    for (error = 0; error < 3; error++) {
      columnErrorTemplate();
      filedErro();
    }
  };


  const setScrollRevael = function(){
     // scroll Revela
     ScrollReveal().reveal("nav", {
      mobile: true,
      delay: 500,
      duration: 1000,
      easing: "ease-out",
      interval: 1000,
      scale: 1.2,
    });

     ScrollReveal().reveal("#hero", {
      mobile: true,
      delay: 500,
      duration: 1000,
      easing: "ease-out",
      interval: 1000,
      scale: 1.2,
    });

    ScrollReveal().reveal(".column ", {
      mobile: true,
      delay: 500,
      duration: 1000,
      easing: "ease-out",
      interval: 1000,
      scale: 1.2,
    });

    ScrollReveal().reveal(".field_container", {
      mobile: true,
      delay: 500,
      duration: 1000,
      easing: "ease-out",
      interval: 1000,
      scale: 1.2,
    });

    ScrollReveal().reveal(".about_section", {
      mobile: true,
      delay: 500,
      duration: 1000,
      easing: "ease-out",
      interval: 1000,
      scale: 1.2,
    });

    ScrollReveal().reveal(".contact_section", {
      mobile: true,
      delay: 500,
      duration: 1000,
      easing: "ease-out",
      interval: 1000,
      scale: 1.2,
    });
    
  }

  // IF DATABASE CONNECTS THROUGH, LOAD DATABASE
  loadDatabase();
});