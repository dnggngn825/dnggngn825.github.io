
{
    function projectsClick() {
        $("#projects-drop-down").toggleClass("noDisplay")
    }
}

{
    window.addEventListener("scroll", () => {
        const dropDown = document.querySelector('#projects-drop-down')
        if (!dropDown.classList.contains('noDisplay'))
        {
            $("#projects-drop-down").toggleClass("noDisplay")
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