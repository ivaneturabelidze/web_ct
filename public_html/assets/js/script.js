'use strict'

if(window.location.href.includes('lang/')){
    let lang = window.location.href.split('/')[4]
    if(lang){
        document.documentElement.classList.add(lang)
    }
}

const swiper = new Swiper('.tour-slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 'auto',
    speed: 1500,
    autoplay: {
        delay: 2000, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },

    // Navigation arrows
    navigation: {
        nextEl: '.tour-slide-next',
        prevEl: '.tour-slide-prev',
    },
})

    ; (function () {
        // Change Map Images on hover/click
        function mapImages() {
            if (!document.querySelector('.tour-maps')) {
                return
            }

            const mapImageReferences = document.querySelectorAll('[data-reference]')
            const mapImages = [...document.querySelectorAll('[data-image]')]

            mapImageReferences.forEach((reference) => {
                reference.addEventListener('click', () => {
                    mapImages.forEach((image) => {
                        image.classList.remove('active')
                    })

                    displayTextOnMap(reference, mapImages)
                })

                reference.addEventListener('mouseenter', () => {
                    mapImages.forEach((image) => {
                        image.classList.remove('active')
                    })

                    displayTextOnMap(reference, mapImages)
                })
            })

            // Remove day plan text and revert back to first image
            // if the user has left the agenda container
            const mapAgenda = document.querySelector('.tour-agenda')

            // 24.10.2023 newly added function on click
            /*
             mapImageReferences.forEach((reference,i) =>{
                 reference.addEventListener('click', function(){
                     console.log('clicked')
                     console.log(mapImages[i])
                     mapImages.forEach((map,j) =>{
                         if(i !== j){
                             map.classList.remove('superactivedMap')
                         }
                       
                     })
                     mapImages[i].classList.toggle('superactivedMap')
                     displayTextOnMap(reference, mapImages)
                 })
             }) */




            mapAgenda.addEventListener('mouseleave', () => {
                // Reset image to the first image
                mapImages.forEach((image) => {
                    image.classList.remove('active')
                })
                const image = [...document.querySelectorAll('[data-image]')][0]
                image.classList.add('active')

                removeDayPlanFromMap()
            })
        }

        mapImages()

        function displayTextOnMap(ref, images) {
            const dayNumber = ref.querySelector('.tour-day').textContent
            const dayPlan = ref.querySelector('p > strong').textContent
            const textOnMap = `${dayNumber} ${dayPlan}`
            const imageRef = ref.dataset.reference
            const image = images.find((image) => {
                return image.dataset.image === imageRef
            })

            image.appendChild(displayDayAgendaOnMap(textOnMap))
            image.classList.add('active')
        }

        function displayDayAgendaOnMap(text) {
            removeDayPlanFromMap()

            // Create day plan text
            const el = document.createElement('div')
            el.classList.add('day-plan')
            el.innerHTML = text
            return el
        }

        // Remove existing day plan from map
        function removeDayPlanFromMap() {
            const existingDayPlan = document.querySelector('.day-plan')
            if (existingDayPlan) {
                existingDayPlan.remove()
            }
        }

        // Open/Close Tour Details

        function tourDetails() {
            if (!document.querySelector('.tour-card')) {
                return
            }

            // First, get the body element without the specific class
            const bodyWithoutClass = document.querySelector('body:not(.withoutCardFunction)');

            // Then, find .tour-card elements within that body element
            const tourCards = bodyWithoutClass.querySelectorAll('.tour-card');




            tourCards.forEach((card) => {

                card.addEventListener('click', (e) => {
                    //    console.log(e.target.tagName)
                    //   console.log(e.target.classList)


                    /*  if (!e.target.classList.contains('tour-card-action') && !e.target.tagName == 'H2' && !e.target.classList.contains('d-flex')) {
                          return
                      } */
                    if (!e.target.classList.contains('tour-card-action') && !e.target.parentElement.classList.contains('tour-card__description--services')) {
                        return
                    }

                    const tourDetails = card.querySelector('.tour-card__details')
                    const tourDetailsHeight = tourDetails.scrollHeight
                    card.classList.toggle('superactive')
                    card.classList.remove('active')

                    if (card.classList.contains('superactive')) {
                        tourDetails.style.height = tourDetailsHeight + 'px'
                    } else {
                        tourDetails.style.height = 0
                    }
                })
                /*
                const cardImage = card.querySelector('.tour-card__image--hoverable')
    
                if (!cardImage) return
    
                cardImage.addEventListener('mouseenter', (e) => {
                    const tourDetails = card.querySelector('.tour-card__details')
                    const tourDetailsHeight = tourDetails.scrollHeight
                    card.classList.add('active')
    
                    if (card.classList.contains('active')) {
                        tourDetails.style.height = tourDetailsHeight + 'px'
                    } else {
                        tourDetails.style.height = 0
                    }
                })
    
                cardImage.addEventListener('mouseleave', (e) => {
                    const tourDetails = card.querySelector('.tour-card__details')
                    const tourDetailsHeight = tourDetails.scrollHeight
                    card.classList.remove('active')
    
                    if (card.classList.contains('active')) {
                        tourDetails.style.height = tourDetailsHeight + 'px'
                    } else {
                        tourDetails.style.height = 0
                    }
                })  */

                //doing same as above code, but for .tour-card__image--hoverable and .tour-card__details at the same time
                const cardImages = card.querySelectorAll('.tour-card__image--hoverable, .tour-card__details');

                cardImages.forEach((element) => {
                    element.addEventListener('mouseenter', (e) => {
                        const card = e.currentTarget.closest('.tour-card');
                        if (!card) return;

                        const tourDetails = card.querySelector('.tour-card__details');
                        const tourDetailsHeight = tourDetails.scrollHeight;
                        card.classList.add('active');

                        if (card.classList.contains('active') || card.classList.contains('superactive')) {
                            tourDetails.style.height = tourDetailsHeight + 'px';
                        } else {
                            tourDetails.style.height = 0;
                        }
                    });



                    /*
                        element.addEventListener('mouseleave', (e) => {
                            console.log(element.parentNode.parentNode.classList)
                            
                            const card = e.currentTarget.closest('.tour-card');
                            if (!card) return;
                    
                            const tourDetails = card.querySelector('.tour-card__details');
                            const tourDetailsHeight = tourDetails.scrollHeight;
                            card.classList.remove('active');
                    
                            if (card.classList.contains('active')) {
                                tourDetails.style.height = tourDetailsHeight + 'px';
                            } else {
                                tourDetails.style.height = 0;
                            }
                        }); */
                    element.addEventListener('mouseleave', (e) => {
                        const card = e.currentTarget.closest('.tour-card');
                        if (!card) return;

                        // Check if element.parentNode.parentNode contains the class "superactive"
                        if (!element.parentNode.parentNode.classList.contains('superactive')) {
                            //console.log(element.parentNode.parentNode.classList);

                            const tourDetails = card.querySelector('.tour-card__details');
                            const tourDetailsHeight = tourDetails.scrollHeight;
                            card.classList.remove('active');

                            if (card.classList.contains('active') || card.classList.contains('superactive')) {
                                tourDetails.style.height = tourDetailsHeight + 'px';
                            } else {
                                tourDetails.style.height = 0;
                            }
                        }
                    });


                });












            })
        }

        tourDetails()






        // Change images on scroll
        function changeImagesOnScroll() {
            if (!document.querySelector('.scrollable-image')) return

            const scrollElement = document.querySelector('.scrollable-image > img')
            const imageSources = Array.from(
                document.querySelectorAll('.image-sources img')
            ).map((image) => image.src)

            const heightOfScrollElement =
                document.querySelector('.scroll-component').scrollHeight

            const numberOfImagesToShow = imageSources.length // რამდენჯერ გვინდა სურათის შეცვლა
            const imageChangeSpeed = heightOfScrollElement / numberOfImagesToShow

            // console.log(imageChangeSpeed)

            window.addEventListener('scroll', () => {
                // console.log(window.scrollY)
                // for (let i = 1; i < numberOfImagesToShow; i++) {
                //     console.log(i)
                //     console.log(i * imageChangeSpeed)
                // }
            })
        }

        changeImagesOnScroll()
    })()



var swiper2 = new Swiper('.swiper-container2', {

    slidesPerView: 1,
    
    autoplay: {
        delay: 2500, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },
    effect: 'fade',
    loop: true,
    breakpoints: {
        // Breakpoint for mobile devices
        100: {
          speed: 700
        },
        992: {
            speed: 2000
        }
      }

});

var swiper3 = new Swiper('.swiper-container3', {

    slidesPerView: 1,
    speed: 2000,
    autoplay: {
        delay: 3000, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },
    effect: 'fade',

    allowTouchMove: false, // Disable touch events

});


var swiper4 = new Swiper('.swiper-container4', {

    slidesPerView: 1,
    speed: 1000,
    autoplay: {
        delay: 2000, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },
    effect: 'fade',

    allowTouchMove: false, // Disable touch events

});

var swiper5 = new Swiper('.swiper-container5', {

    slidesPerView: 1,
    speed: 1000,
    autoplay: {
        delay: 2000, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },
    effect: 'fade',

    allowTouchMove: false, // Disable touch events

});
var swiper55 = new Swiper('.swiper-container55', {

    slidesPerView: 1,
    speed: 1000,
    autoplay: {
        delay: 2000, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },
    effect: 'fade',
    loop: true,


});

var swiper6 = new Swiper('.swiper-container6', {

    slidesPerView: 1,
    speed: 2000,
    autoplay: {
        delay: 2500, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },
    effect: 'fade',
    loop: true,

});
var swiper7 = new Swiper('.home-slider', {

    slidesPerView: 1,
    speed: 2000,
    autoplay: {
        delay: 2000, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },
    effect: 'fade',
    loop: true,

});

var swiperNews = new Swiper('.swiper-containerNews', {
    direction: 'vertical', // Set the direction to vertical
    spaceBetween: 50,
    slidesPerView: 1,
    speed: 2000,
    navigation: {
        nextEl: '.news-slide-next',
        prevEl: '.news-slide-prev',
    },
    autoplay: {
        delay: 4000, // Time between slide transitions (in milliseconds)
        pauseOnMouseEnter: true,
        blabla: true,
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay

    },
    // effect: 'fade',
    //  loop: true,
});

var swiper6 = new Swiper('.mobile-tour-slider', {

    slidesPerView: 1,
    speed: 2000,
    autoplay: {
        delay: 2500, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },
    // effect: 'fade',
    loop: true,

});
var swiper9 = new Swiper('.ski-resort-slider', {

    slidesPerView: 1,
    speed: 2000,
    autoplay: {
        delay: 1500, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },
    // effect: 'fade',
    loop: true,
    on:{
        init:  function(){
            this.autoplay.stop();
        }
    }

});



// see more button and hovering, same time on cards
/*
document.addEventListener('DOMContentLoaded', function () {
    // Get all the buttons with class 'tour-card-action'
    let buttons = document.querySelectorAll('.tour-card-action');

    // Add a click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Find the grandparent element
            let grandparent = this.parentElement.parentElement.parentElement;

            // Toggle the 'activated' class on the grandparent element
            grandparent.classList.toggle('activated');
        });
    });
}); */
function scrollToElement2(elName) {

    const targetElement = document.getElementById(elName);
    // console.log(targetElement)
    const targetOffset = targetElement.offsetTop;
    const main = document.querySelector('main')




    // Scroll to the adjusted position
    main.scrollTo({
        top: targetOffset - 500,
        behavior: 'smooth' // You can change this to 'auto' if you prefer an instant scroll
    });
}
if (window.location.href.includes('tour-inner/')) {
    window.addEventListener('scroll', function () {
        const map = document.querySelector('.tour-maps')
        const rightColumn = document.querySelectorAll('.tour-columns > div')[1]
        const tourColumns = document.querySelector('.tour-agenda')
        const tourDescription = document.querySelector('.tour-description')
        //  console.log(window.pageYOffset)
        //console.log(map.offsetTop)


        // console.log(rightColumn)
        // console.log(map.offsetTop)
        if (window.pageYOffset < map.offsetTop + 160) {
            map.style.position = 'unset';
            map.style.top = '70px';
            map.style.width = '655px';
            map.style.height = '360px';
            map.style.zIndex = '5';
            rightColumn.style.paddingTop = '0'
        }
        if (window.pageYOffset > map.offsetTop - 70) {
            map.style.position = 'fixed';
            map.style.top = '70px';
            map.style.width = '655px';
            map.style.height = '360px';
            map.style.zIndex = '5';
            rightColumn.style.paddingTop = '360px'
        }
        if (window.pageYOffset > tourColumns.clientHeight + tourDescription.clientHeight - 205) {

            map.style.position = 'absolute';
            map.style.top = `${tourColumns.clientHeight + tourDescription.clientHeight - 170 + 35}px `;

        }



    })
}


/*const submit = document.querySelector('.submitter button')
const popup = document.querySelector('.textarea-popup div')
const textarea = document.querySelector('.textarea-popup textarea')
if (submit) {
    submit.addEventListener('click', function () {

        popup.classList.toggle('d-none')
        if (textarea) {
            textarea.disabled = 'true'
        }

    })
}*/
/*
let featureYoutubeButtons = document.querySelectorAll('.feature__right .youtuber__button');


featureYoutubeButtons.forEach((butt) => {
    let hiddenElements = butt.offsetParent.querySelectorAll('.no-visibility');
    butt.addEventListener('click', function () {

        if (hiddenElements) {
            hiddenElements.forEach((el) => {
                el.classList.toggle('no-visibility')
            })
        }

    })


}) */

let logos = document.querySelectorAll('.site-logo a');
logos.forEach((log) => {
    log.attributes[0].value = 'http://www.caucasustravel.com/home.html'
})



// let resortImgButtons = document.querySelectorAll('.see-resort:not(.slider)');
// let resortImages = document.querySelectorAll('.ski-resort-container > img');
// //toggling ski resort images on top of map on click
// resortImgButtons.forEach((button, i) => {
//     button.addEventListener('click', function () {
//         resortImages.forEach((img, j) => {
//             if (i !== j) {
//                 img.classList.add('d-none')
//             } else {
//                 img.classList.toggle('d-none')
//             }

//         })

//     })
// })
// // removing ski resort images on top of map on mouseleave

// resortImgButtons.forEach((button, i) => {
//     button.addEventListener('mouseleave', function () {
//         resortImages.forEach((img, j) => {
//             if (i !== j) {
//                 img.classList.add('d-none')
//             } else {
                
//                 img.classList.add('d-none')
//             }

//         })

//     })
// })

let resortimageSliderButtons = document.querySelectorAll('.see-resort.slider');
let resortImageSliders = document.querySelectorAll('.ski-resort-slider');
if (resortimageSliderButtons.length && resortImageSliders.length) {
    resortimageSliderButtons.forEach((resortimageSliderButton, i) => {
        resortimageSliderButton.addEventListener('click', function () {
            resortImageSliders.forEach((resortImageSlider, k) => {
                if (i == k) {
                    resortImageSlider.classList.toggle('d-none')
                    if (!resortImageSlider.classList.contains('d-none')) {
                        // resortImageSlider.autoplay.start();
                        
                       
                        console.log('started')
                        swiper9[k].autoplay.start();
                       
                        
                    } else{
                        swiper9[k].autoplay.stop();
                        console.log('stopped')
                       
                    }
                    
                }

            })

        })
    })
    resortimageSliderButtons.forEach((resortimageSliderButton, i) => {
        resortimageSliderButton.addEventListener('mouseleave', function () {
            resortImageSliders.forEach((resortImageSlider) => {
                resortImageSlider.classList.add('d-none')
            })
        })


    })

}







// Your existing code for handling the YouTube iframe
let buttons = document.querySelectorAll('.youtuber__button');
buttons.forEach((button) => {
    button.addEventListener('click', function () {
        let cont = button.parentElement.parentElement.parentElement.parentElement;
        let video = cont.querySelector('video');
        let opaciter = cont.querySelector('.feature-topper')
        let text = cont.querySelector('.feature-topper--text ')
        /*
        let src = iframe.getAttribute('src');
        if (src.includes('autoplay')) {
            let newSRC = src.split('?')[0];
            console.log('autoplay removed, ', newSRC);
            iframe.setAttribute('src', newSRC);
        } else {
            let newSRC = `${src}?&autoplay=1`;
            iframe.setAttribute('src', newSRC);
        }
        iframe.classList.toggle('d-none'); */
        if (video) {
            if (video.readyState >= 2) {
                video.classList.toggle('d-none')
                opaciter.classList.toggle('no-visibility')
                text.classList.toggle('no-visibility')
                if (video.classList.contains('d-none')) {
                    video.pause();
                } else {
                    video.play();
                }

            }
        }

    });
});

// New code to handle the 'ul li' elements
let list = document.querySelectorAll('.feature-topper--text ul li');
list.forEach((li) => {

    li.addEventListener('click', function () {
        list.forEach((lis) => {
            lis.classList.remove('clicked')
        })
        let seconds = li.getAttribute('data-target');
        li.classList.add('clicked')
        /*
        // Find the iframe associated with this li
        let iframe = li.parentElement.parentElement.parentElement.querySelector('iframe');

        // Set the video to the specified time
        if (seconds) {
            if (iframe) {

                let src = iframe.getAttribute('src');

                if (src.includes('autoplay')) {
                    let newSRC = `${src.split('?')[0]}?&autoplay=1&start=${seconds}`;
                    console.log('autoplay removed, ', newSRC);
                    iframe.setAttribute('src', newSRC);
                } else {
                    let newSRC = `${src}?&autoplay=1&start=${seconds}`;
                    iframe.setAttribute('src', newSRC);
                }
                iframe.classList.remove('d-none');
            }
        } */
        let video = li.parentElement.parentElement.parentElement.querySelector('video');
        if (seconds) {

            if (video) {
                console.log('inside')
                video.classList.remove('d-none')
                if (video.readyState >= 2) {
                    video.currentTime = seconds;
                    video.play();

                }

            }
        }
    });
});
let videoImages = document.querySelectorAll('.feature .w-shadow img');

if (videoImages.length) {
    videoImages.forEach((img) => {
        img.addEventListener('click', function () {
            console.log('clicked')
            let cont = img.parentElement.parentElement.parentElement;
            let video = cont.querySelector('video');
            let opaciter = cont.querySelector('.feature-topper')
            let text = cont.querySelector('.feature-topper--text ')
            if (video) {
                if (video.readyState >= 2) {
                    video.classList.toggle('d-none')
                    opaciter.classList.toggle('no-visibility')
                    text.classList.toggle('no-visibility')
                    if (video.classList.contains('d-none')) {
                        video.pause();
                    } else {
                        video.play();
                    }

                }
            }
        })

    })
}

let closeBtns = document.querySelectorAll('.close');
if (closeBtns.length) {
    closeBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            let cont = btn.parentElement.parentElement;
            let video = cont.querySelector('video');
            let opaciter = cont.querySelector('.feature-topper')
            let text = cont.querySelector('.feature-topper--text ')

            video.classList.add('d-none')
            opaciter.classList.add('no-visibility')
            text.classList.add('no-visibility')
            video.pause();
        })
    })
}


if (window.innerWidth < 992) {
    let burgerbtn = document.querySelector('.burger-button')
    let nav = document.querySelector('.site-navigation')
    let navHeight = document.querySelector('.site-menu').clientHeight
    let innerMenus = document.querySelectorAll('header .site-menu .menu-item')
    let entireHeight = 0;
    if (burgerbtn) {
        burgerbtn.addEventListener('click', function () {
            nav.classList.toggle('dropped')
            if (nav.classList.contains('dropped')) {

                nav.style.height = `${navHeight}px`;
                entireHeight = navHeight;
            } else {
                nav.style.height = `0`;
                entireHeight = 0;
            }
            innerMenus.forEach((menu) => {
                if (menu.innerHTML.includes('dropdown__content')) {
                    menu.classList.add('withDropdown')
                }
                menu.addEventListener('click', function () {
                    menu.classList.toggle('inner--dropped')
                    let dropdown = menu.querySelector('.dropdown__content');
                    let dropdownUL = dropdown.querySelector('ul');

                    // Check if the dropdown is currently visible
                    let computedStyles = window.getComputedStyle(dropdown);
                    let isDropdownVisible = computedStyles.maxHeight !== '0px';

                    // Toggle the visibility of the dropdown
                    if (isDropdownVisible) {
                        dropdown.style.maxHeight = '0px';
                        nav.style.height = `${navHeight}px`; // Assuming navHeight is the original height
                    } else {
                        dropdown.style.maxHeight = `${dropdownUL.clientHeight}px`;
                        nav.style.height = `${navHeight + dropdownUL.clientHeight}px`;
                    }
                });
            });
        })
    }

}








let newsBoardLink = document.querySelectorAll('.bottom__container a');

newsBoardLink.forEach((link) => {
    if (link.getAttribute('href').includes('home.html')) {
        let newLink = link.getAttribute('href').replace('home.html', 'home.html#newsBoard')
        link.setAttribute('href', newLink)
    }
})


let TB = document.querySelector('.tour-builder img');
if (TB) {
    TB.addEventListener('click', function () {
        window.open('http://www.tourbuilder.net/')

    })
}





if (window.innerWidth < 992 && window.location.href.includes('tour-inner/')) {
    let stickyContTopOffset = document.querySelector('.mobile-tour-sticky').offsetTop;
    let mobilestickyContt = document.querySelector('.mobile-tour-sticky');
    mobilestickyContt.style.height = `${mobilestickyContt.clientHeight}px`
    mobilestickyContt.style.overflow = `hidden`

    window.addEventListener('scroll', function () {
        let mobilestickyCont = document.querySelector('.mobile-tour-sticky');
        let mobilestickyContImages = document.querySelectorAll('.mobile-tour-sticky img');
        let agendas = document.querySelectorAll('.tour-agenda li');

        let tourAgenda = document.querySelector('.tour-agenda');

        // Function to check if an element is in the viewport
        // function isInViewport(element) {
        //     var rect = element.getBoundingClientRect();
        //     return (
        //         rect.top >= 0 &&
        //         rect.left >= 0 &&
        //         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        //         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        //     );
        // }

        if (mobilestickyCont) {
            // let closestAgendaIndex = 0;
            // let minDistance = Infinity;

            // agendas.forEach((agenda, index) => {
            //     let distance = Math.abs(window.innerHeight / 2 - agenda.getBoundingClientRect().top);
            //     if (distance < minDistance && isInViewport(agenda)) {
            //         minDistance = distance;
            //         closestAgendaIndex = index;
            //     }
            // });

            // mobilestickyContImages.forEach((contImage, index) => {
            //     if (index === closestAgendaIndex) {
            //         contImage.classList.add('d-block');
            //         contImage.classList.remove('d-none');
            //     } else {
            //         contImage.classList.remove('d-block');
            //         contImage.classList.add('d-none');
            //     }
            // });
            if (window.scrollY + mobilestickyCont.clientHeight > tourAgenda.offsetTop) {

                let isLast = agendas.length - 1;
                // console.log(`isLast ${isLast}`)
                agendas.forEach((agenda, i) => {


                    if (window.scrollY + mobilestickyCont.clientHeight + 70 > agenda.offsetTop + agenda.clientHeight - 25) {

                        if (mobilestickyContImages[i + 1]) {
                            mobilestickyContImages[i + 1].classList.add('d-block')
                            mobilestickyContImages[i + 1].classList.remove('d-none')
                        }


                        mobilestickyContImages.forEach((img, j) => {
                            if (i + 1 != j && i != isLast) {
                                //  console.log(i)
                                img.classList.remove('d-block')
                                img.classList.add('d-none')
                            }
                        })
                    } else {
                        if (mobilestickyContImages[i + 1]) {
                            // console.log(`i + 1 ${i + 1}`)
                            if (i + 1 != isLast) {
                                // console.log(i + 1)
                                // console.log('inside')
                                mobilestickyContImages[i + 1].classList.remove('d-block')
                                mobilestickyContImages[i + 1].classList.add('d-none')
                            }

                        }

                    }


                })
            }






            if (window.scrollY + 70 > stickyContTopOffset) {
                mobilestickyCont.previousElementSibling.style.marginBottom = `${15 + mobilestickyCont.clientHeight}px`
                mobilestickyCont.style.position = 'fixed';
                mobilestickyCont.style.top = `70px`
                mobilestickyCont.style.width = `calc(100% - 40px)`
            } else {
                mobilestickyCont.style.position = 'unset';
                mobilestickyCont.previousElementSibling.style.marginBottom = `15px`
                mobilestickyCont.style.width = `100%`
            }

            if (window.scrollY + mobilestickyCont.clientHeight + 70 > tourAgenda.offsetTop + tourAgenda.clientHeight) {
                mobilestickyCont.style.position = 'absolute';
                mobilestickyCont.style.top = `${tourAgenda.offsetTop + tourAgenda.clientHeight - mobilestickyCont.clientHeight}px`
            }
        }
    });
}


let mobilePageHeadingCountry = document.querySelectorAll('.mobile-page-heading-country');
mobilePageHeadingCountry.forEach((heading) => {
    if (heading.innerHTML.includes('MinionProRegular')) {
        heading.parentElement.classList.add('big--header')
    }

})


function clampRequestMonthCharacters (){
    if(window.innerWidth < 992){
        if(!document.querySelectorAll('.months .month')){ return}
        let months = document.querySelectorAll('.months .month')
        months.forEach((month) =>{
            month.textContent = month.textContent[0]
        })
    }
  
}

clampRequestMonthCharacters()



function loadGoogleTranslate() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);
}

function googleTranslateElementInit() {
    var element = document.querySelector('.site-header-wrapper');
    if (element) {
        new google.translate.TranslateElement({
            pageLanguage: 'en', 
            includedLanguages: 'en,de,zh-CN,it,pt,es,ja'
          
        }, element);
    } else {
        console.error('Translate element not found.');
    }
}

// You can call this function on page load or based on some other action
loadGoogleTranslate();


