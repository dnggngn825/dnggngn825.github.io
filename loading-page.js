{
    let loader = document.querySelector(".loader-wrapper");
    let main = document.querySelector(".main-content");
    
    window.addEventListener('load', function () {
        // loader.classList.toggle('fade');
        loader.style.display = 'none';
        main.style.display = 'block';
    });
}