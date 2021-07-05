
{
    function projectsClick() {
        // $("#projects-drop-down").toggleClass("noDisplay")
        $("#projects-drop-down").toggleClass("slidedown slideup");

    }
}

{
    function Mouseover() {
        // $("#projects-drop-down").toggleClass("noDisplay")
        const dropDown = document.querySelector('#projects-drop-down')
        if (!dropDown.classList.contains("slidedown"))
        {
            $("#projects-drop-down").addClass("slidedown");
            $("#projects-drop-down").removeClass("slideup");
        }
    }
}

{
    // function Mouseout() {
    //     // $("#projects-drop-down").toggleClass("noDisplay")
    //     const dropDown = document.querySelector('#projects-drop-down')
    //     if (dropDown.classList.contains("slidedown"))
    //     {
    //         $("#projects-drop-down").removeClass("slidedown");
    //         $("#projects-drop-down").addClass("slideup");
    //     }
    // }
}

{
    window.addEventListener("scroll", () => {
        const dropDown = document.querySelector('#projects-drop-down')
        if (!dropDown.classList.contains('slideup'))
        {
            $("#projects-drop-down").toggleClass("slidedown slideup")
        }
    })
}

// edit style for img
{
    const imageBlock = document.getElementsByTagName('img')
    for (let i= 0; i< imageBlock.length;i++)
    {
        imageBlock[i].classList.add("img-fluid", "shadow-sm", "img-thumbnail", "rounded-3")
    }
}

// {
//     // const navbar = document.getElementsByTagName('nav')
//     if (window.pageYOffset == 0){
//         document.getElementsByTagName('nav')[0].style.backgroundColor = "white !important"
//     }
// }


// load on scroll
{
    const callback = function(entries) {
        entries.forEach(entry => {
          entry.target.classList.toggle("is-visible");
        });
    };
      
    const observer = new IntersectionObserver(callback);
    
    const targets = document.querySelectorAll(".show-on-scroll");
    targets.forEach(function(target) {
        observer.observe(target);
    });
}