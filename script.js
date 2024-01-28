const hamburgerBtn = document.getElementById('hamburger-btn');
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('cross');

    // Toggle the transformation of bars
    document.getElementById('bar1').style.transform = hamburgerBtn.classList.contains('cross') ? 'rotate(45deg) translate(-5px, 6px)' : 'none';
    document.getElementById('bar2').style.opacity = hamburgerBtn.classList.contains('cross') ? '0' : '1';
    document.getElementById('bar3').style.transform = hamburgerBtn.classList.contains('cross') ? 'rotate(-45deg) translate(-5px, -6px)' : 'none';

    // nav-links-container
    const navLinkContainer = document.querySelector('.nav-links-container');

    // Use getComputedStyle to get the computed style
    let currentLeft = getComputedStyle(navLinkContainer).left;
    // console.log(currentLeft);
    if (currentLeft === '-1000px') {
        navLinkContainer.style.left = '0';
    } else {
        navLinkContainer.style.left = '-1000px';
    }
});

// CV Btn
const getCV = document.getElementById('getCV');
getCV.addEventListener('click', () => {
    let link = document.createElement("a");
    link.setAttribute("href", "assets/MyCV.pdf");
    link.setAttribute("download", "MyCV");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})

// #home
const heroHeading = document.getElementById('hero-heading');
const heroClickMe = document.getElementById('click-me');
const viewIntroduction = document.getElementById('intro');
// cards
// const cardsList = document.querySelectorAll('.cards');

window.addEventListener('load', () => {
    heroHeading.style.opacity = 1;
    heroHeading.style.transform = "translateX(0)";
    heroClickMe.style.opacity = 1;
    heroClickMe.style.transform = "translateX(0)";
    // cardsList.forEach((cardElement) => {
    //     cardElement.style.opacity = 1;
    //     cardElement.style.transform = "translateY(0px)";
    // });
});

heroClickMe.addEventListener('click', () => {
    heroHeading.style.display = "none";
    heroClickMe.style.display = "none";
    viewIntroduction.style.display = "block";
    resetEffectsX(heroHeading, heroClickMe);
    setTimeout(() => {
        viewIntroduction.style.opacity = 1;
        viewIntroduction.style.transform = "translateY(0)";
    }, 50);
});

// back and learnMore btn
const backBtn = document.getElementById('back-btn');
backBtn.addEventListener('click', () => {
    heroHeading.style.display = "block";
    heroClickMe.style.display = "block";
    viewIntroduction.style.display = "none";
    // resetEffects(viewIntroduction);
    resetEffectY(viewIntroduction);
    setTimeout(() => {
        heroHeading.style.opacity = 1;
        heroHeading.style.transform = "translateX(0)";
        heroClickMe.style.opacity = 1;
        heroClickMe.style.transform = "translateX(0)";
    }, 50);
});

function resetEffectsX(obj1, obj2) {
    obj1.style.opacity = 0;
    obj1.style.transform = "translateX(-50px)";
    obj2.style.opacity = 0;
    obj2.style.transform = "translateX(50px)";
}
function resetEffectY(obj) {
    obj.style.opacity = 0;
    obj.style.transform = "translateY(30px)";
}
// learnMoreBtn
const learnMoreBtn = document.getElementById('learn-more-btn');
learnMoreBtn.addEventListener('click', () => {
    // this will navigate to skills
    document.getElementById('skills').scrollIntoView();
});

// cards
document.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    let cardsList = document.querySelectorAll(".cards");
    let delay = 400; // Delay in milliseconds

    if (scrollPosition > 60) {
        cardsList.forEach((cardElement, index) => {
            // Calculating the delay for each element
            let elementDelay = index * delay; //0*400, 1*400, 2*400
            // console.log(index);
            // console.log(elementDelay);
            setTimeout(() => {
                cardElement.style.opacity = 1;
                cardElement.style.transform = "translateY(0px)";
            }, elementDelay);
        });
    } else {
        cardsList.forEach((cardElement) => {
            cardElement.style.opacity = 0;
            cardElement.style.transform = "translateY(-50px)";
        });
    }
});

// form
const sendMsgBtn = document.getElementById('send-message');
const userEmailInput = document.getElementById('userEmail');
const userMsgInput = document.getElementById('message');

sendMsgBtn.addEventListener('click', (event) => {
    console.log('Button clicked');
    // trim will remove whitespace if any at the start or end
    const emailValue = userEmailInput.value.trim();
    const msg = userMsgInput.value.trim();

    if (emailValue != "" && msg != "") {
        event.preventDefault(); // to prevent page reloading

        sendMail();
        const sendMsgModal = document.getElementById('sent-modal');
        sendMsgModal.style.display = "block";
        const contact = document.querySelector('.contact-form');
        contact.classList.add('blur');

        setTimeout(() => {
            sendMsgModal.style.display = "none"
            contact.classList.remove('blur');
            document.getElementById('reset-message').click();
        }, 2000);
    }
    else {
        alert('Please Fill out the required fields');
    }
});

function sendMail() {
    let params = {
        from_name: document.getElementById('userName').value,
        email_id: document.getElementById('userEmail').value,
        message: document.getElementById('message').value,
    };

    const serviceID = "service_ioc6f6h";
    const templateID = "template_tshgt9c";

    emailjs.send(serviceID,templateID,params).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })
}
