(() => {
  "use strict";
  const root = document.querySelector(".ct-experiences");
  if (!root) return;
  const data = [
    {
      title: "Fabulous Cuisine",
      description:
        "Explore the rich flavors of traditional Caucasian dishes. Indulge your taste buds with regional specialties prepared with care by renowned chefs or kitchen household wonders.",
      image: "assets/images/experienceNotZoomerImages/Supra_732910303 WWW.png",
      detailImage: "assets/images/Supra_732910303 WWW-zoomed.png",
    },
    {
      title: "Folk- Shows and Performances",
      description:
        "Don’t miss the region’s breathtaking dance performances and folk shows, which portray the art, culture, and customs of the many nations of the Caucasus.",
      image: "assets/images/experienceNotZoomerImages/Dancer & Kazbegi.png",
      detailImage: "assets/images/cardimages/Folk- Shows and Performances.png",
    },
    {
      title: "Unforgettable Pictures and Glimpses",
      description:
        "Begin your day with a breathtaking sunrise in the stunning Caucasus Mountains. Unwind and soak up the positive energy before a day full of exciting adventures capturing the unforgettable scenery.",
      image: "assets/images/cardimages/Unforgettable Pictures and Glimpses.png",
      detailImage:
        "assets/images/experienceNotZoomerImages/Ushba in Sun_461393113  WWW.png",
    },
    {
      title: "Studios of Well-known Artists",
      description:
        "Gain exclusive access to the studios of renowned actors, painters, sculptors, dancers, artists, and photographers. Explore the creative behind-the-scenes world and take part in the cultural conversation.",
      image: "assets/images/cardimages/Studios of Well-known Artists.png",
      detailImage: "assets/images/experienceNotZoomerImages/Palitra W.png",
    },
    {
      title: "Georgia - The Land of Wine and Vine",
      description:
        "Georgia, with its rich 8000-year history of wine production, is an excellent destination for wine enthusiasts, where there is nearly 500 distinct grape varieties still cultivated today. Explore and indulge all you can.",
      image: "assets/images/cardimages/Georgia - The Land of Wine and Vine.png",
      detailImage:
        "assets/images/experienceNotZoomerImages/WIinetasting WWW.png",
    },
    {
      title: "Armenian Brandy Tasting",
      description:
        "Ararat Valley grape varieties, spring water, and time-honored distilling techniques combine to give Armenian brandy its distinctive flavor and golden hue. Join in on a brandy tasting at one of the most famous factories in Armenia.",
      image: "assets/images/experienceNotZoomerImages/Brandy Glass WW.png",
      detailImage:
        "assets/images/experienceNotZoomerImages/Brandy Glass WW.png",
    },
    {
      title: "Formula 1 - Baku Circuit",
      description:
        "During the exciting days of the Formula 1 Azerbaijan Grand Prix Race, the streets of Baku are overflowing with celebrating spectators. The rush of excitement will be certain to leave a lasting impression on your memory forever.",
      image: "assets/images/cardimages/Formula 1 - Baku Circuit.png",
      detailImage:
        "assets/images/experienceNotZoomerImages/Baku Formula 1 WWW.png",
    },
    {
      title: "Meet Extraordinary people",
      description:
        "Engage with influential people from the worlds of art, science, technology, sports, and politics at lectures and other events specially organized for you.",
      image: "assets/images/cardimages/Meet Extraordinary people.png",
      detailImage:
        "assets/images/experienceZoomerImages/Extraordinary People WW-1.png",
    },
    {
      title: "Fortunes to be had at the Flea Market",
      description:
        "At the local flea market known as Dry Bridge, there gathers hundreds of sellers of trinkets, used treasures, and kitschy souvenirs. Find some real gems here haggling with the sellers for the goods spread on their blankets.",
      image:
        "assets/images/cardimages/Fortunes to be had at the Flea Market .png",
      detailImage: "assets/images/experienceZoomerImages/Flee Market_-1.png",
    },
    {
      title: "Qvevri Wine",
      description:
        "Delve into the rich history of Georgian winemaking by tasting the flavors of wines that have been perfected over 8000 years. Discover the unique qvevri wine of Georgia, listed as an Intangible Cultural Heritage by UNESCO.",
      image: "assets/images/cardimages/Qvevri Wine.png",
      detailImage: "assets/images/experienceZoomerImages/Qvevri_-1.png",
    },
    {
      title: "Heli-skiing Experience",
      description:
        "Embark on an unforgettable and unique adventure in the amazing Caucasus Mountains, where our team of internationally certified mountain guides await to take you safely through the perfect snow of off-piste skiing.",
      image: "assets/images/cardimages/Heli-skiing Experience.png",
      detailImage: "assets/images/experienceZoomerImages/Heli Ski -1.png",
    },
    {
      title: "Cooking: A lesson in hospitality",
      description:
        "Our traditional food masterclasses are the pinnacle of culinary education and are sure to satisfy any foodie's cravings. The holy traditions of Georgian food and hospitality are revealed via this immersive cultural experience",
      image: "assets/images/cardimages/Cooking A lesson in hospitality.png",
      detailImage:
        "assets/images/experienceZoomerImages/Khinkali Master Class W-1.png",
    },
    {
      title: "Mud Volcanoes",
      description:
        "A flat of mud volcanoes stretches across the horizon like an alien world. Messy, bubbling and explosive, these small volcanoes cones are impressive and beautiful. Azerbaijan is a home to nearly a third of the world’s mud volcanoes.",
      image: "assets/images/cardimages/Mud Volcanoes.png",
      detailImage: "assets/images/experienceZoomerImages/Volcano W-1.png",
    },
    {
      title: "Bird´s-Eye Views",
      description:
        "Take to the skies in a hot air balloon and discover breathtaking aerial views of the valley below, adorned by the snow-capped peaks of the majestic Caucasus Mountains",
      image: "assets/images/cardimages/Birds eye wievs.png",
      detailImage: "assets/images/experienceZoomerImages/Balooning -1.png",
    },
    {
      title: "Black Caviar on board a Yacht",
      description:
        "Enjoy the fresh Caspian Sturgeon Black Caviar and Sparkling Wine while lounging on the deck of a private yacht and taking in the lovely views of Baku Bay.",
      image: "assets/images/cardimages/Black Caviar on board a Yacht.png",
      detailImage: "assets/images/experienceZoomerImages/Baku Yacht W-1.png",
    },
    {
      title: "Carpet Weaving Masterclass",
      description:
        "She is not making a flying carpet, but rather a beautiful icon of Azerbaijan, a country steeped in history and culture where carpet weaving has been practiced for centuries.",
      image: "assets/images/cardimages/Carpet Weaving Masterclass.png",
      detailImage: "assets/images/experienceZoomerImages/Carpet Master W-1.png",
    },
    {
      title: "Inspiration in Ancient Spiritual Places",
      description:
        "Monasteries carved into the depths of caves, ancient temples hanging on cliffsides… the Caucasus overflows with spiritual gems from ages past, that sweep the senses in detail both visual and beyond.",
      image:
        "assets/images/cardimages/Inspiration in Ancient Spiritual Places.png",
      detailImage: "assets/images/experienceZoomerImages/Geghard_-1.png",
    },
    {
      title: "Wine Spa",
      description:
        "Take pleasure in a wine spa, experience peace and pleasure, and heal your body and mind with luxurious rituals, massages, and cosmetic services.",
      image: "assets/images/cardimages/Wine Spa.png",
      detailImage:
        "assets/images/experienceZoomerImages/Spa Vinotherapy W-1.png",
    },
    {
      title: "Open Air Events",
      description:
        "Experience exceptional events and luxurious amenities in the most unexpected of places: off-the-beaten-path locations dotted with historical ruins, ancient cave towns, majestic mountains, arid deserts and more.",
      image: "assets/images/cardimages/Open Air Events.png",
      detailImage: "assets/images/experienceZoomerImages/Supra Truso -1.png",
    },
    {
      title: "Tbilisi Sulfur Bathhouses",
      description:
        "Honored visitors to the capital city have long been invited to the old dome-topped sulfur bathhouses. Soak for an evening in a beautifully tiled haven and enjoy a qisa, or exfoliation scrub, and a massage.",
      image: "assets/images/experienceZoomerImages/Abanotubani W.png",
      detailImage: "assets/images/cardimages/Tbilisi Sulfur Bathhouses.png",
    },
    {
      title: "Exciting Helicopter trips",
      description:
        "Careen across mountain slopes with expert pilots and guides and discover the mountains from the perspective of the birds. Land in untouched and lost worlds of beautiful hidden valleys inaccessible by car or foot within your timeframe.",
      image: "assets/images/cardimages/Exciting Helicopter trips.png",
      detailImage: "assets/images/experienceZoomerImages/Heli Tour -1.png",
    },
    {
      title: "Cultural Events",
      description:
        "Participate in cultural events held in historical buildings, house museums, artist studios, galleries, and other noteworthy locations. Classical music, polyphonic singing, and more are often featured at these exclusive meetings.",
      image: "assets/images/cardimages/Cultural Events.png",
      detailImage:
        "assets/images/experienceZoomerImages/Akhvlediani Museum Event W-1.png",
    },
    {
      title: "Chacha Distilling",
      description:
        "Participate in distilling chacha, a grape brandy with genuine Georgian roots. It’s made from grape pomace and often used as a “medicine”. Take care not to have too much, you might not remember how much fun you had!",
      image: "assets/images/cardimages/Chacha Distilling.png",
      detailImage:
        "assets/images/experienceZoomerImages/Chacha Distilling WW-1.png",
    },
    {
      title: "Cloisonne Enamel Masterclass",
      description:
        "Learn about the history of the Georgian Cloisonné technique of enameling. Using this age-old method, you can design and create your own original work of art - undoubtedly the ideal memento to bring back from a trip.",
      image: "assets/images/cardimages/Cloisonne Enamel Masterclass.png",
      detailImage:
        "assets/images/experienceZoomerImages/Cloison Enamel Master WWW-1.png",
    },
    {
      title: "Be Tamada, chief of the table",
      description:
        "Lead the Georgian feast as a Tamada, the toastmaster (as on picture of famous Pirosmani). Learn the ancient toasting rituals, poetry, and conduct of a proper supra, or feast. For the most special toasts, drink wine from a sheep’s horn!",
      image: "assets/images/cardimages/Be Tamada, chief of the table.png",
      detailImage:
        "assets/images/experienceZoomerImages/Pirosmani Tamada -1.png",
    },
    {
      title: "Mountain villages of Caucasus",
      description:
        "Visit remote mountain villages where you can feel the time stand still and be one with the simplicity of older times. The people are still genuine and true, and meet you with an honest hospitality and friendliness.",
      image: "assets/images/cardimages/Mountain villages of Caucasus.png",
      detailImage:
        "assets/images/experienceZoomerImages/Little Girl In Village WW-1.png",
    },
    {
      title: "Descent the Caucasus Peaks",
      description:
        "The Caucasus Mountains are some of the most scenic and breathtaking in the world. Expert guides will take you down some of the best off-piste runs to give you a truly unforgettable mountain adventure experience.",
      image: "assets/images/cardimages/Descent the Caucasus Peaks.png",
      detailImage: "assets/images/experienceZoomerImages/Skiers -1.png",
    },
    {
      title: "Meet Local People",
      description:
        "Get warmed up by the authentic hospitality of the locals wherever you go and enjoy the different cultural aspects that vary from region to region. Take part in surprisingly stimulating conversation on a wide range of topics.",
      image: "assets/images/cardimages/Meet Local People.png",
      detailImage:
        "assets/images/experienceZoomerImages/Man with Bulls WW-1.png",
    },
    {
      title: "Wine Casino",
      description:
        "A fun and engaging activity for those who appreciate wine and enjoy challenging their intellect. Discover the rich tradition of Georgian winemaking and put your knowledge to the test in the field of wine. There are no losers here!",
      image: "assets/images/cardimages/Wine Casino.png",
      detailImage: "assets/images/experienceZoomerImages/Wine Casino -1.png",
    },
    {
      title: "Azerbaijani Mugham",
      description:
        "Be immersed in the enchanting world of the East during your visit to Azerbaijan. Savor authentic local cuisine while losing yourself in the soulful melodies of mugham music: You’ll feel like you’ve stepped into a page from a fairy tale.",
      image: "assets/images/cardimages/Azerbaijani Mugham.png",
      detailImage: "assets/images/experienceZoomerImages/Mugham -1.png",
    },
    {
      title: "Enjoy the Views",
      description:
        "Take in the views at the lobby of the luxurious Rooms Hotel situated at the foot of Mt. Kazbegi, where you can sip on fine wine and dine on elegant Georgian cuisine, then pamper yourself in the spa after your hiking expedition.",
      image: "assets/images/cardimages/Enjoy the Views.png",
      detailImage: "assets/images/experienceZoomerImages/Rooms Kazbegi -1.png",
    },
    {
      title: "Stay as a Guest with a Family",
      description:
        "Enjoy genuine local hospitality, where a supra with a local family may unintentionally morph into a polyphonic performance led by the tamada, or toastmaster, and featuring your host and all the other guests.",
      image: "assets/images/cardimages/Stay as a Guest with a Family .png",
      detailImage: "assets/images/experienceZoomerImages/Tusheti Party W-1.png",
    },
    {
      title: "Visit a treasury of carpets",
      description:
        "Azerbaijan is famous for its special carpet weaves. Learn about the patterns and methods of these beautiful masterpiece productions and order your own to ship back home.",
      image: "assets/images/cardimages/Visit treasury of carpets.png",
      detailImage:
        "assets/images/experienceZoomerImages/In Carpet Shop WW-1.png",
    },
    {
      title: "Village Leisure",
      description:
        "Go on exciting journey from a charming farm to a picturesque fruit garden, lush vineyard, fragrant citrus orchard, verdant tea plantation, and rustic tobacco fields. Immerse yourself in the local culture by meeting the friendly locals.",
      image: "assets/images/cardimages/Village Leisure.png",
      detailImage: "assets/images/experienceZoomerImages/Agro Vinery_-1.png",
    },
    {
      title: "Remote Mountain Visits",
      description:
        "Sit down for a sip of chacha with a shepherd in remote community high in the Caucasus Mountains, where it’s inaccessible for almost half a year. Participate in the indigenous life and customs.",
      image: "assets/images/cardimages/Remote Mountain Visits.png",
      detailImage:
        "assets/images/experienceZoomerImages/Drinking with Shepherd WW-1.png",
    },
    {
      title: "Fine dining in a vineyard",
      description:
        "Experience the Georgian feast in its natural setting: the vineyard. With mountain peaks inspiring the poetry of the moment, feel the true heartbeat of the country as you imbibe on household wine and eat the freshest of meals",
      image: "assets/images/cardimages/Fine table in a vineyard.png",
      detailImage:
        "assets/images/experienceZoomerImages/Supra in Vineyard -1.png",
    },
    {
      title: "Hike the slopes of Mt. Kazbegi",
      description:
        "After exploring the stunning 14th-century Sameba Church, continue your adventure with a hike along the slopes of the magnificent 5054-meter-high mountain. Remember to pack your hiking shoes for your upcoming trip!",
      image: "assets/images/cardimages/Hike the slopes of Mt Kazbegi.png",
      detailImage: "assets/images/experienceZoomerImages/Hiking Kazbegi -1.png",
    },
    {
      title: "Buy Colorful Works by Local Artists",
      description:
        "Beautiful artworks line the footpaths of the Dry Bridge market, often sold by the master painters themselves. Engage in conversation about the pieces and choose your favorites to ship back home and adorn your walls.",
      image: "assets/images/cardimages/Buy Colorful Works by Local Artists.png",
      detailImage:
        "assets/images/experienceZoomerImages/Buy pictures WWW-1.png",
    },
    {
      title: "Breathtaking national ballet",
      description:
        "Renown for its rich and long tradition Georgian dance groups of Sikhishvili is not to be missed. Exciting, passionate, frenetic, theatrical, and graceful, their folk dancing performance perfectly captures the spirit of the Georgian people.",
      image: "assets/images/cardimages/Breathtaking national ballet.png",
      detailImage: "assets/images/experienceZoomerImages/Dancers -1.png",
    },
    {
      title: "Winter in medieval Ushguli",
      description:
        "The beautiful towers of Ushguli await to keep you warm through the snow-covered months of winter. Stay in the highest continuously occupied settlement of Europe and experience winter treks through high powder.",
      image: "assets/images/cardimages/Winter in medieval Ushguli.png",
      detailImage: "assets/images/experienceZoomerImages/Ushguli Winter_-1.png",
    },
    {
      title: "Watching Masters at Work",
      description:
        "Skill tradespeople live throughout the Caucasus, whether at the tasks of basketweaving, pottery, winemaking, or more, these are hardworking people who are happy to spend a few moments and share some quality life-hacks.",
      image: "assets/images/cardimages/Watching Masters at Work.png",
      detailImage: "assets/images/experienceZoomerImages/Basket Master -1.png",
    },
    {
      title: "Rtveli- Harvest Event",
      description:
        "Help gather grapes during rtveli, the harvest season in Georgia. The vineyards and wineries come to life for the new harvest and are capped with a delightful Georgian supra, or feast, often held amidst picturesque vineyards.",
      image: "assets/images/cardimages/Rtveli  Harvest Event.png",
      detailImage: "assets/images/experienceZoomerImages/Rtveli -1.png",
    },
    {
      title: "Enjoy coffee in boutique cafes",
      description:
        "Georgian cities has always been known for its artsy cafes full of hip youths and literary minds. Drink from cafes that feel like old-style living rooms, with revived antique furniture and inspiring décor.",
      image: "assets/images/cardimages/Enjoy coffee in boutique cafes.png",
      detailImage: "assets/images/experienceZoomerImages/Batumi C&R -1.png",
    },
    {
      title: "Khinkali Making",
      description:
        "Traditional food of people from the mountainous regions of Georgia. Perfect khinkali, boiled dumpling filled with ground meat in dough, should have at least eighteen wrinkles and must be eaten by hand. Don’t spill the juices!",
      image: "assets/images/cardimages/Khinkali Making.png",
      detailImage:
        "assets/images/experienceZoomerImages/Khinkali Making -1.png",
    },
    {
      title: "Visit Great Museums …",
      description:
        "Gaze upon works by seminal Georgian avantgarde artists that rocked the Soviet Union, discover the Georgian naïve painter Pirosmani, learn about the history of Georgia and see Gold of Colchis and other ancient civilisation artefacts.",
      image: "assets/images/cardimages/Visit Great Museum.png",
      detailImage:
        "assets/images/experienceZoomerImages/Art Galery Pirosmani_-1.png",
    },
    {
      title: "Make your own wine",
      description:
        "Participate in the real Georgian reality of winemaking. Help gather the grapes for the harvest and begin the process of making Georgian wine yourself. Learn about the local methods and even manufacture your own bottle of vino.",
      image: "assets/images/cardimages/Make your own wine.png",
      detailImage: "assets/images/experienceZoomerImages/Rtveli -2.png",
    },
    {
      title: "National festivals and holidays",
      description:
        "Experience national holidays and festivals when the streets overflow with celebrants. Georgians can never contain themselves when celebrating and often break out in impromptu song and dance.",
      image: "assets/images/cardimages/National festivals and holidays .png",
      detailImage: "assets/images/experienceZoomerImages/Dancer Girls_-1.png",
    },
    {
      title: "Life in Colors and Ornaments",
      description:
        "Visit craft studios and become immersed in a fantastic world of local textiles. See how ancient technics and ornamentation are transformed into something incredibly fresh and contemporary.",
      image: "assets/images/cardimages/Life in Colors and Ornaments.png",
      detailImage: "assets/images/experienceZoomerImages/Textile W-1.png",
    },
    {
      title: "Listen to talented jazz musicians",
      description:
        "The Caucasus is a well of jazz music and improvisation, creating whole new spins on the genre. The jazz clubs of Baku and Tbilisi take on these stylings with amazingly talented musicians – real diamonds in the rough!",
      image: "assets/images/cardimages/Listen to talented jazz musicians .png",
      detailImage:
        "assets/images/experienceZoomerImages/Musicians Khondzi WW-1.png",
    },
    {
      title: "After exciting days enjoy the nightlife",
      description:
        "The main artery of Tbilisi’s old town, Chardeni, is named after a medieval French explorer. Follow his footsteps along a street of bars and clubs that spill out onto the narrow alleyways of the district.",
      image:
        "assets/images/cardimages/After exciting days enjoy the nightlife.png",
      detailImage:
        "assets/images/experienceZoomerImages/Meidan Nightlife_-1.png",
    },
    {
      title: "Take a boat in a beautiful canyon",
      description:
        "A ride on the pristine clear waters of the lush Martvili canyon is a breathtaking experience that must be had at least once in life. The raft is guided by a local, taking you slowly and safely on this relaxing and heavenly float.",
      image: "assets/images/experienceZoomerImages/Martvili 3 WWW.png",
      detailImage: "assets/images/experienceZoomerImages/Martvili -1.png",
    },
    {
      title: "Souvenirs made with love and passion",
      description:
        "Spinning yarn and weaving socks is a renown art in Georgia. Regularly done by passionate grandmothers for their babes, they’re also widely available in the souvenir markets to keep your toes warm on winter nights.",
      image:
        "assets/images/cardimages/Souvenirs made with love and passion.png",
      detailImage:
        "assets/images/experienceZoomerImages/Woven Suvenir  Shop_-1.png",
    },
    {
      title: "Make shots of amazing moments",
      description:
        "Everywhere in the Caucasus is a beautiful sight and a thrilling experience. It’s a photographer’s dreamland. Pack your best camera, extra SD cards, and film and prepare for a time when you can never put them down.",
      image: "assets/images/cardimages/Make shots of amazing moments.png",
      detailImage: "assets/images/experienceZoomerImages/Camera Woman_-1.png",
    },
    {
      title: "Fests, Colors, Food",
      description:
        "Festival times bring merry times throughout Georgia, from Spring wine festivals to town and village festivities jumping from one location through the next. Have fine cookies or some mtsvadi BBQ, drink some wine, and make merry!",
      image: "assets/images/cardimages/Fests, Colors, Food.png",
      detailImage:
        "assets/images/experienceZoomerImages/Girls saling Cookies_-1.png",
    },
    {
      title: "Don’t miss Opera & Ballet Stars",
      description:
        "Many Georgian names can be found among famous performers of European and World Opera, Ballet, Classical Music. (Balanchini, Ananiashvili, Burchuladze, etc.) Watch from where they began and discover the next big star!",
      image: "assets/images/cardimages/Don’t miss Opera & Ballet Stars.png",
      detailImage:
        "assets/images/experienceZoomerImages/Tbilisi Opera Stage -1.png",
    },
    {
      title: "Cool Water and adrenaline",
      description:
        "Pristine white-water rapids carve through the myriad of scenic mountain canyons of the Caucasus. Indulge in a relaxing evening of wine and barbeque on the picturesque banks of a lively river after a thrilling day of aquatic adventure.",
      image: "assets/images/cardimages/Cool Water and adrenaline.png",
      detailImage: "assets/images/experienceZoomerImages/Rafting -1.png",
    },
    {
      title: "Be with yourself",
      description:
        "Revive yourself in the beauty of the Caucasus. Soak in the sun, breathe the fresh air, and completely reinvigorate your sense of being in this perfect destination of rediscovery.",
      image: "assets/images/cardimages/Be with yourself.png",
      detailImage: "assets/images/experienceZoomerImages/Lopota Yoga WW-1.png",
    },
    {
      title: "Exploration is endless",
      description:
        "Take a deep breath when observing the views of the Caucasus Mountains, the home of the titans of old. Discover these fierce peaks, take in the majestic views, and treasure forever your lifelong impressions and unique experiences.",
      image: "assets/images/cardimages/Exploration is endless.png",
      detailImage:
        "assets/images/experienceZoomerImages/Hiking Ushba JP WW -1.png",
    },
  ];
  const $ = (s) => root.querySelector(s),
    strip = $(".ct-strip"),
    cards = [...root.querySelectorAll(".ct-card")],
    entries = [...root.querySelectorAll(".ct-entry")],
    reads = [...root.querySelectorAll(".ct-read")],
    details = $(".ct-details"),
    prev = $(".ct-prev"),
    next = $(".ct-next"),
    expand = $(".ct-expand");
  let active = 0,
    expanded = false,
    lastRead = null,
    pending = null,
    timer;
  const mq = matchMedia("(min-width:1100px)");
  const motion = () =>
    matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  const offset = (i) =>
    cards[i].getBoundingClientRect().left -
    strip.getBoundingClientRect().left +
    strip.scrollLeft;
  function update() {
    $(".ct-current").textContent = String(active + 1).padStart(2, "0");
    prev.disabled = active === 0;
    next.disabled = active === cards.length - 1;
    entries.forEach((b, i) => {
      if (i === active) b.setAttribute("aria-current", "true");
      else b.removeAttribute("aria-current");
    });
  }
  function close(restore = false) {
    details.hidden = true;
    reads.forEach((b) => b.setAttribute("aria-expanded", "false"));
    if (restore && lastRead) lastRead.focus({ preventScroll: true });
  }
  function go(i, fromIndex = false) {
    active = Math.max(0, Math.min(cards.length - 1, i));
    pending = active;
    close();
    strip.scrollTo({ left: offset(active), behavior: motion() });
    update();
    if (fromIndex) {
      reads[active].focus({ preventScroll: true });
      strip.scrollIntoView({ behavior: motion(), block: "nearest" });
    }
  }
  function directory() {
    const limit = expanded ? entries.length : mq.matches ? 12 : 8;
    entries.forEach((b, i) => (b.hidden = i >= limit));
    expand.textContent = expanded
      ? "Show fewer experiences ↑"
      : "Show all " + entries.length + " experiences ↓";
    expand.setAttribute("aria-expanded", String(expanded));
  }
  entries.forEach((b, i) => b.addEventListener("click", () => go(i, true)));
  reads.forEach((b, i) =>
    b.addEventListener("click", () => {
      lastRead = b;
      reads.forEach((b) => b.setAttribute("aria-expanded", "false"));
      b.setAttribute("aria-expanded", "true");
      $("#ct-detail-title").textContent = data[i].title;
      $(".ct-detail-description").textContent = data[i].description;
      const image = $(".ct-detail-image");
      image.src = data[i].detailImage;
      image.alt = data[i].title;
      image.onerror = () => {
        image.onerror = null;
        image.src = data[i].image;
      };
      details.hidden = false;
      details.focus({ preventScroll: true });
      details.scrollIntoView({ behavior: motion(), block: "nearest" });
    }),
  );
  prev.addEventListener("click", () => go(active - 1));
  next.addEventListener("click", () => go(active + 1));
  expand.addEventListener("click", () => {
    expanded = !expanded;
    directory();
  });
  $(".ct-close").addEventListener("click", () => close(true));
  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !details.hidden) {
      e.preventDefault();
      close(true);
    }
    if (
      e.target === strip &&
      (e.key === "ArrowRight" || e.key === "ArrowLeft")
    ) {
      e.preventDefault();
      go(active + (e.key === "ArrowRight" ? 1 : -1));
    }
  });
  strip.addEventListener(
    "scroll",
    () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (pending !== null) {
          active = pending;
          pending = null;
        } else {
          let nearest = 0,
            distance = Infinity;
          cards.forEach((c, i) => {
            const d = Math.abs(offset(i) - strip.scrollLeft);
            if (d < distance) {
              distance = d;
              nearest = i;
            }
          });
          active = nearest;
        }
        update();
      }, 160);
    },
    { passive: true },
  );
  for (const e of ["pointerdown", "touchstart", "wheel"])
    strip.addEventListener(
      e,
      () => {
        pending = null;
      },
      { passive: true },
    );
  mq.addEventListener("change", directory);
  window.addEventListener("resize", () => {
    pending = active;
    strip.scrollTo({ left: offset(active), behavior: "auto" });
  });
  directory();
  update();
})();
