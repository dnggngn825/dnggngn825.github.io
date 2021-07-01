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