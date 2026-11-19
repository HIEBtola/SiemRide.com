/* ===== SINGLE SOURCE OF TRUTH: the ONLY WhatsApp number used on this site (+855 12 610 269) ===== */
window.SR_WA_NUMBER = '85512610269';

// dropdown toggle for the desktop nav (click for touch/mobile, hover handled by CSS on desktop)
// The parent link itself (Bike Tours / E-Bike Tours / Rental) is a dropdown
// trigger only  it never navigates. Only the sub-items inside the dropdown
// panel are real links.
document.querySelectorAll('.has-dropdown > a').forEach(function(link){
  link.addEventListener('click', function(e){
    e.preventDefault();
    if(window.innerWidth <= 1100){
      var li = link.parentElement;
      document.querySelectorAll('.has-dropdown').forEach(function(other){
        if(other !== li) other.classList.remove('open');
      });
      li.classList.toggle('open');
    }
  });
});
document.querySelectorAll('.has-dropdown').forEach(function(li){
  li.addEventListener('mouseenter', function(){ if(window.innerWidth > 1100) li.classList.add('open'); });
  li.addEventListener('mouseleave', function(){ if(window.innerWidth > 1100) li.classList.remove('open'); });
});

// Plan My Ride filter dropdowns (Destination / Tour Type / Vehicle):
// click the field (or its caret) to open, click an option to select it,
// click elsewhere to close.
var filterDropdowns = document.querySelectorAll('.has-filter-dropdown');

function closeAllFilterDropdowns(except){
  filterDropdowns.forEach(function(item){
    if(item !== except) item.classList.remove('open');
  });
}

filterDropdowns.forEach(function(item){
  item.addEventListener('click', function(e){
    if(e.target.closest('.filter-options-panel')) return;
    e.stopPropagation();
    var isOpen = item.classList.contains('open');
    closeAllFilterDropdowns(item);
    item.classList.toggle('open', !isOpen);
  });
  item.querySelectorAll('.filter-options-panel a').forEach(function(option){
    option.addEventListener('click', function(e){
      var href = option.getAttribute('href');
      var isSamePageAnchor = href && href.charAt(0) === '#';
      var valueText = item.querySelector('.filter-value-text');
      if(valueText){
        valueText.textContent = option.textContent;
        var key = option.getAttribute('data-i18n');
        if(key) valueText.setAttribute('data-i18n', key);
      }
      item.classList.remove('open');
      if(isSamePageAnchor){
        e.preventDefault();
        if(href.length > 1){
          var targetEl = document.querySelector(href);
          if(targetEl) targetEl.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
      // else: let the browser follow the link normally (cross-page navigation)
    });
  });
});

document.addEventListener('click', function(e){
  if(!e.target.closest('.has-filter-dropdown')){
    closeAllFilterDropdowns(null);
  }
});

// Generic corner-dropdown behavior for the language picker and the hamburger menu.
// Both live in a ".dd-wrap"  clicking the trigger button toggles ".open" on that wrapper,
// clicking elsewhere or picking another dropdown closes it.
var ddWraps = document.querySelectorAll('.dd-wrap');

function closeAllDropdowns(except){
  ddWraps.forEach(function(wrap){
    if(wrap !== except) wrap.classList.remove('open');
  });
}

ddWraps.forEach(function(wrap){
  var trigger = wrap.querySelector('button');
  if(!trigger) return;
  trigger.addEventListener('click', function(e){
    e.stopPropagation();
    var isOpen = wrap.classList.contains('open');
    closeAllDropdowns(wrap);
    wrap.classList.toggle('open', !isOpen);
  });
});

// close any open dropdown when clicking outside of it
document.addEventListener('click', function(e){
  if(!e.target.closest('.dd-wrap')){
    closeAllDropdowns(null);
  }
});

// close dropdowns after picking a link inside them (but not language links 
// those are handled separately below so we can swap content first)
document.querySelectorAll('.dd-panel a:not([data-lang])').forEach(function(a){
  a.addEventListener('click', function(){
    closeAllDropdowns(null);
  });
});

// burger side panel: close via the × button or by clicking the dimmed overlay
var panelClose = document.getElementById('panelClose');
var panelOverlay = document.getElementById('panelOverlay');
if(panelClose){
  panelClose.addEventListener('click', function(){ closeAllDropdowns(null); });
}
if(panelOverlay){
  panelOverlay.addEventListener('click', function(){ closeAllDropdowns(null); });
}

// burger side panel: click anywhere on contact card to open its link
document.addEventListener('click', function(e){
  var item = e.target.closest && e.target.closest('.panel-contact-item');
  if(!item) return;
  if(e.target.closest('a')) return;
  var link = item.querySelector('a');
  if(link){
    if(link.target === '_blank'){
      window.open(link.href, '_blank', 'noopener');
    } else {
      link.click();
    }
  }
});

/* =========================================================
   TRANSLATIONS  (lazy-loaded, English-fallback engine)
   - English lives right here (always available, used by t()).
   - Every other language is a small file in JavaScript/lang/<code>.js
     that is fetched the first time it is chosen (and pre-fetched when the
     visitor hovers / focuses the language), then cached by the browser.
   - Elements tagged data-i18n="key" (text), data-i18n-placeholder="key"
     or data-i18n-aria="key" are swapped in one pass. Text that is already
     correct is never touched, so a switch causes the minimum of layout work.
   - The English text written in the HTML is the source of truth for English.
   - A missing key falls back to English, never to a stale language.
   - To add text: tag the element, add the key to the English block below
     AND to each lang/*.js file (a missing translation shows English).
   ========================================================= */
var SR_I18N = window.SR_I18N = window.SR_I18N || {};
SR_I18N.en = {"nav_home":"Home","nav_bikeTours":"Bike Tours","nav_ebikeTours":"E-Bike Tours","nav_rental":"Rental","nav_blog":"Blog","nav_about":"About Us","dd_groupTours":"Moto Tours","dd_privateTours":"Bike Tours","dd_tailorMade":"E-Bike Tours","dd_templesNature":"Temples & Nature","dd_villageLife":"Village Life","dd_sunsetRides":"Sunset Rides","dd_bikeRental":"Bike Rental","dd_ebikeRental":"E-Bike Rental","dd_ebike":"E-Bike","dd_scooterRental":"Scooter Rental","call_label":"Call Us","hero_eyebrow":"Siem Reap, Cambodia","hero_titleMain":"Ride Cambodia's","hero_titleEm":"Backroads","hero_lede":"Guided motorbike and e-bike tours through Angkor's temples, villages and jungle trails. Led by locals.","btn_bookTour":"Book a Tour","btn_whatsappMsg":"Message on WhatsApp","trust_ridersLabel":"Riders guided","trust_routesLabel":"Mapped routes","trust_ratingLabel":"Rider rating","trust_yearsLabel":"On these roads","rides_eyebrow":"Three ways to ride","rides_h2":"Choose your ride","rides_lede":"Whether you want to twist the throttle yourself, glide in on an e-bike, or just grab a set of wheels and explore solo, we've got a way to get you out there.","card_bikeTours_p":"Open-road riding with the handlebars fully in your control.","card_ebikeTours_p":"Effortless riding for first-timers and temple-goers saving their legs.","card_rental_p":"Grab a set of wheels — every machine is kept road-ready.","btn_getQuote":"Get a Quote →","tags_hint":"Tap what interests you","rides_searchPh":"Search bike, e-bike, rental...","sort_recent":"Sort (Recently Added)","sort_popular":"Most Popular","sort_priceAsc":"Price: Low to High","sort_priceDesc":"Price: High to Low","view_list":"List view","view_grid":"Grid view","routes_eyebrow":"Rider favourites","routes_h2":"Our most popular routes","route_badge":"Guide favourite","route1_badge":"Most popular","route2_badge":"Crowd favourite","route3_badge":"Hidden gem","route4_badge":"Top rated","route5_badge":"Guest favourite","route6_badge":"Local secret","routes_lede":"Scouted and ridden by our own guides before it makes the list.","route1_meta":"1 Day · Temples & Nature","route1_title":"Angkor Sunrise Loop","route1_desc":"Beat the tour buses to Angkor Wat and slip in through the back gates.","route2_meta":"Half Day · Village Life","route2_title":"Tonlé Sap Village Run","route2_desc":"Floating villages, fish markets, and palm sugar straight from the tree.","route3_meta":"2 Days · Jungle Trail","route3_title":"Kulen Mountain Trail","route3_desc":"Red dirt, river crossings, and a waterfall camp — our top overnight ride.","route4_meta":"3 Days · Tailor-Made","route4_title":"Countryside Backroads","route4_desc":"Rice paddies, brick kilns, and homestays at whatever pace you ride.","btn_viewRoute":"View Route","btn_viewRoute_plural":"Popular Routes","why_eyebrow":"The fine print, upfront","why_h2":"Why ride with us","why_lede":"Everything you'd want to know before you throw a leg over the seat.","why1_h4":"Helmets & safety briefing","why1_p":"Every ride starts with proper gear and a route briefing, no exceptions, even for a 20-minute rental.","why2_h4":"Machines serviced weekly","why2_p":"Our fleet gets checked between every ride, not just when something breaks.","why3_h4":"Guides who grew up here","why3_p":"Local riders who know which backroad floods, and which family sells the best num pang.","why4_h4":"Routes built around you","why4_p":"Tell us your riding level and how long you've got, we'll shape the day, not the other way round.","reviews_eyebrow":"From the road","reviews_h2":"What riders say","blog_eyebrow":"From the garage","blog_h2":"Notes from the road","blog_lede":"Riding tips, route notes, and the odd story from the guides.","blog1_eyebrow":"Routes","blog1_h3":"5 backroads only locals know","blog2_eyebrow":"Trip Prep","blog2_h3":"What to pack for a day on two wheels","blog3_eyebrow":"Season Notes","blog3_h3":"Rainy season riding: what changes","btn_readPost":"Read the post →","sidebar_categories":"Categories","sidebar_moreFromBlog":"More from the blog","sidebar_search":"Search","sidebar_searchPh":"Looking for something specific?","sidebar_morePhotos":"More photos","blog1_date":"Jan 12, 2026","blog1_by":"By Sovann","blog1_excerpt":"Skip the main road out to Banteay Srei, here are five backroads our guides actually use, from a rice-paddy shortcut to a quiet stretch along the river.","blog2_date":"Jan 5, 2026","blog2_by":"By Dara","blog2_excerpt":"A few things worth stashing in your bag before you head out, sun cover, a spare layer for temple visits, and one thing most first-timers forget.","blog3_date":"Dec 20, 2025","blog3_by":"By Chenda","blog3_excerpt":"Riding from June to October looks a little different, here's what we adjust with routes, gear, and timing so a downpour doesn't ruin the day.","blog_loadMore":"Load more","trust_h2":"Why ride with us?","trust1_label":"Local guides","trust1_p":"Every guide grew up riding these roads","trust2_label":"WhatsApp support","trust2_p":"Message us anytime while you're out riding","trust3_label":"7+ years","trust3_p":"Running rides around Siem Reap","trust4_label":"500+ riders","trust4_p":"Hosted and counting","trust5_label":"Locally owned","trust5_p":"Cambodian-run, from the ground up","about_eyebrow":"Who's behind the handlebars","about_h2":"Built by riders, run out of Siem Reap","about_p1":"Siem Ride started as three friends and two second-hand bikes, showing visiting backpackers the roads we grew up riding. Seven years on, we're still a small, local crew  we just know a lot more backroads now.","about_p2":"Every guide on our team was born and raised around Siem Reap. We don't run scripted tours; we ride the roads we'd take our own friends down.","about_stat_years":"Years riding","about_stat_guides":"Local guides","about_stat_riders":"Riders hosted","cta_h2":"Ready to ride?","cta_p":"Call us with your dates and we'll build the route around you.","footer_desc":"Motorbike and e-bike tours & rentals, based in Siem Reap, Cambodia.","footer_col_rides":"Rides","footer_col_company":"Company","footer_col_contact":"Contact","footer_rights":"All rights reserved.","burger_officeAddress":"Address:","burger_phoneNumber":"Mobile:","burger_emailAddress":"E-Mail:","filter_destination":"Destination","filter_tourType":"Tour Type","filter_vehicle":"Vehicle","filter_opt_angkor":"Angkor Temples","filter_opt_countryside":"Countryside","filter_opt_tonlesap":"Tonlé Sap","filter_opt_moto":"Motorbike","filter_opt_ebike":"E-Bike","filter_opt_scooter":"Scooter","filter_planMyRide":"Plan My Ride →","dd_guidedTour":"Guided Tour","dd_selfDriveRental":"Self-Drive Rental","booking_eyebrow":"Let's plan it","booking_h3":"Tell us about your ride","booking_sub":"Fill this in and send it straight to us on WhatsApp — we'll reply with a route and price within the hour.","booking_name":"Full name","booking_contact":"WhatsApp / phone number","booking_email":"Email","booking_optional":"(optional)","booking_riders":"Number of riders","booking_destination":"Destination","booking_notSure":"Not sure yet","booking_vehicle":"Vehicle","booking_type":"Guided or rental?","booking_duration":"Duration","booking_date":"Travel date(s)","booking_selectDate":"Select date(s)","booking_time":"Preferred time","booking_message":"Anything else we should know?","booking_message_ph":"Riding experience, timing, special requests...","booking_submit":"Send via WhatsApp","booking_emailInstead":"or email us instead","booking_error":"Please add your name and a WhatsApp/phone number so we can reach you.","booking_success_h4":"Opening WhatsApp…","booking_success_p":"If it didn't open automatically, message us directly at +855 12 610 269.","route5_title":"Sunset Ride: Tonlé Sap","route5_desc":"Golden hour over the lake, straight from the back of the bike.","route6_title":"Countryside Ride: Rice Paddies","route6_desc":"Green fields, red dirt roads and village life along the way.","btn_exploreRoute":"Explore this route →","routeLightbox_eyebrow":"Route preview","exp_eyebrow":"Dream your next Siem Reap ride","exp_h2":"Real roads, real Cambodia, ridden by locals","exp_p":"Skip the tour-bus routes. Our guides grew up on these red dirt trails, floating villages and temple back gates.","exp_feat1_h3":"Local-guided backroads","exp_feat1_p":"Routes planned and ridden by guides born and raised around Siem Reap.","exp_feat2_h3":"Ride with confidence","exp_feat2_p":"Well-maintained bikes, proper gear, and a guide who knows the roads.","filterBy_h4":"Filter By","filterBy_rideType":"Ride Type","filterBy_style":"Style","filterBy_duration":"Duration","filter_selfDrive":"Self-Drive","filter_fewHours":"A Few Hours","filter_halfFullDay":"Half / Full Day","filter_perDay":"Per Day","filter_clearFilters":"Clear filters","badge_easyRide":"Easy Ride","badge_bestValue":"Best Value","tag_clear":"Clear","hero_titleEnd":"past the temples.","footer_backToTop":"Back to top","verified":"Verified","summary_greeting":"Hi Siem Ride! I'd like to plan a ride.","summary_dateTo":"to","summary_name":"Name","summary_contact":"Contact","summary_email":"Email","summary_package":"Package","summary_interestedIn":"Interested in","summary_pricing":"Pricing","summary_riders":"Riders","summary_destination":"Destination","summary_vehicle":"Vehicle","summary_type":"Type","summary_duration":"Duration","summary_dates":"Travel date(s)","summary_time":"Preferred time","summary_notes":"Notes","review1_text":"Our guide took us down a dirt trail no tuk-tuk could reach — just rice paddies and water buffalo.","review1_trip":"Countryside Backroads, 3 days","review1_date":"3 weeks ago","review2_text":"First time on a motorbike. The e-bike made it easy, and the Angkor sunrise was worth the alarm.","review2_trip":"Angkor Sunrise Loop, 1 day","review2_date":"1 month ago","review3_text":"Rented a scooter for the week. It ran perfectly, and they knew every road we asked about.","review3_trip":"Scooter Rental, 6 days","review3_date":"5 days ago","review4_text":"Loved the village stops — kids waving, fresh sugarcane juice, a totally different pace.","review4_trip":"Village Life E-Bike, 2 days","review4_date":"2 weeks ago","review5_text":"Our guide rerouted the whole day around the weather without us even asking.","review5_trip":"Private Tour, 4 days","review5_date":"4 days ago","review6_text":"The bike was in great shape, and the team answered every WhatsApp question on the road.","review6_trip":"Bike Rental, 5 days","review6_date":"6 days ago","about_short_eyebrow":"About Us","about_short_h2":"Experience the Soul of Cambodia","about_short_text":"The real Cambodia is on two wheels: quiet village backroads, warm smiles, and the roads locals know best.","about_short_mission_h3":"Our Mission:","about_short_mission_p":"Immersive, eco-conscious journeys that connect visitors with local communities.","about_short_vision_h3":"Our Vision:","about_short_vision_p":"A future where adventure and responsibility go hand in hand.","about_short_giving_label":"Giving Back:","about_short_giving_text":"Every booking helps fund a local rural English school.","about_short_stat_label":"of every profit funds a local rural school","about_short_btn":"Read our full story →","about2_tagline":"Ride Different. Explore Deeper. Give Back.","about2_hero_h1":"The soul of Cambodia is found on two wheels.","about2_hero_p":"SiemRide is a local guide crew running bicycle and motorbike tours off the tour-bus routes, and putting part of every ride back into the community that raised us.","about2_impact_eyebrow":"Giving Back","about2_impact_h2":"Ride with purpose","about2_impact_stat":"of every profit we earn is donated directly to a local rural English school.","about2_impact_lead":"We're more than a tour company, we're part of this community. Every booking helps fund classroom supplies, teacher support, and school activities for kids growing up along the routes we ride.","about2_story_p1":"At SiemRide, we believe the true essence of Cambodia isn't found from the window of a tour bus, or on the crowded paths of the main temples. It's found in the cool morning breeze as you navigate quiet village backroads, and in the warm smiles of the people you meet along the way.","about2_story_p2":"Founded by locals who are deeply passionate about our home, SiemRide was born from a simple idea: exploration should be intimate, authentic, and impactful. We specialise in curated bicycle and motorbike tours that connect travellers with the hidden wonders of Siem Reap.","about2_quote":"We don't ride a script, we ride the roads we'd take our own friends down.","about2_quote_author":"The SiemRide guide team","about2_mission_h3":"Our Mission","about2_mission_p":"To transform the way visitors experience Cambodia by providing immersive, eco-conscious, and adventurous journeys, and to foster genuine connections between our guests and the local communities they ride through.","about2_vision_h3":"Our Vision","about2_vision_p":"A future for tourism where adventure and responsibility go hand-in-hand. By choosing to ride different, our guests help us prove that travel can preserve heritage, respect the environment, and empower the next generation.","about2_cta_h2":"Every Ride Gives Back","about2_cta_p":"Book a tour with us and you're not just seeing Cambodia, you're funding a classroom for the kids along the way.","about2_cta_btn":"Book Your Adventure","about2_back_link":"Back to Home","blog_pill_badge":"From the garage","blog_hero_line1":"Notes from","blog_hero_line2":"the road","blog_hero_lede":"Riding tips, route notes, and the odd story from the guides — written on Wat Bo Road, between rides.","blog_stat_entries":"Log entries — 005","blog_stat_lastupdate":"Last update — Jan 2026","blog_tab_all":"All","blog_tab_routes":"Routes","blog_tab_tripprep":"Trip Prep","blog_tab_seasonnotes":"Season Notes","blog_tab_templeguides":"Temple Guides","blog_tab_localeats":"Local Eats","blog_search_placeholder":"Search the journal...","blog_by":"By","blog_readmore":"Read more","blog_post1_title":"5 backroads only locals know","blog_post1_excerpt":"Skip the main road out to Banteay Srei, here are five backroads our guides actually use, from a rice-paddy shortcut to a quiet stretch along the river.","blog_post2_title":"What to pack for a day on two wheels","blog_post2_excerpt":"A few things worth stashing in your bag before you head out, sun cover, a spare layer for temple visits, and one thing most first-timers forget.","blog_post3_title":"Rainy season riding: what changes","blog_post3_excerpt":"Riding from June to October looks a little different, here's what we adjust with routes, gear, and timing so a downpour doesn't ruin the day.","blog_post4_title":"Beyond Angkor Wat: temples worth the detour","blog_post4_excerpt":"A handful of quieter temples our guides love, easy to reach by bike and almost always free of the crowds you get at the main gate.","blog_post5_title":"Where our guides actually stop to eat","blog_post5_excerpt":"No tourist menus here, just the roadside stalls and family kitchens we pull over at ourselves, from noodle soup at dawn to grilled skewers on the way back.","blog_loadmore":"Load more entries ↓","blog_caughtup":"You're all caught up!","bt_tourCategories":"Tour Categories","bt_allTour":"All Tour","bt_catAngkor":"Angkor Temple Tours","bt_catCountryside":"Countryside Tours","bt_catNightFood":"Night Food Tour","bt_itinerary":"Itinerary","bt_itin_pickupLocation":"Pickup location:","bt_itin_arriveBackAt":"Arrive back at:","bt_itin_krongSiemReap":"Krong Siem Reap","bt_itin_angkorWat_name":"Angkor Wat","bt_itin_angkorWat_desc":"The majestic and astonishing Sunrise at Angkor Wat","bt_itin_rainforest_name":"Rainforest Trails","bt_itin_rainforest_desc":"The stunning rainforest trails","bt_itin_bayon_name":"Bayon","bt_itin_bayon_desc":"Spectacular to climb, see the 54 towers and 216 smiling faces","bt_itin_taNei_name":"Ta Nei","bt_itin_taNei_desc":"Ancient hospital, untouched","bt_itin_taProhm_name":"Ta Prohm","bt_itin_taProhm_desc":"Built as a monastery in 1186 and forgotten for centuries, the structures show the...","bt_itin_hide":"Hide itinerary","bt_itin_show":"Show itinerary","bt_itin_mainStop":"Main stop","bt_details":"Details","bt_cr_customerReviews":"Customer reviews","bt_cr_overallRating":"Overall rating","bt_cr_basedOnReviews":"Based on 428 reviews","bt_cr_aboutTeam":"About the team","bt_cr_teamSnapshot":"A snapshot of who will guide your experience","bt_cr_completedActivities":"Completed activities","bt_cr_yearsOnGYG":"Years on GetYourGuide","bt_lightbox_bookThisTour":"Book this tour","gt_hero_badge":"KINGDOM OF CAMBODIA","gt_hero_h1":"Moto Tours","gt_hero_lede":"Join a small group of fellow riders and one local guide on a set-route motorbike day out — the most social (and most affordable) way to cover real ground around Siem Reap.","gt_listing_h2":"Moto Tours","gt_itin_subtitle":"— Angkor Wat Sunrise","gt_priceNote":"*per person","gt_lightbox_eyebrow":"Moto Tours — Group","gt_moreNote":"The remaining Night Food Tour and one more Countryside Tour option aren't loaded yet — send over their titles, bullet points, prices, and photos and they'll slot right into this same list.","gt_card1_title":"Option 1: Angkor Wat Sunrise & Ancient City Discovery","gt_card1_badge":"Angkor Wat","gt_card1_li1":"The majestic and astonishing Sunrise at Angkor Wat","gt_card1_li2":"The stunning rainforest trails","gt_card1_li3":"Bayon: spectacular to climb, see the 54 towers and 216 smiling faces","gt_card1_li4":"Tanei: ancient hospital, untouched","gt_card1_li5":"Taprom: built as a monastery in 1186 and forgotten for centuries, the structures show the...","gt_card2_title":"Option 2: Angkor Region & Rainforest","gt_card2_badge":"Angkor Thom","gt_card2_li1":"The stunning rainforest trails & the marvelous Angkor archaeological park - Angkor Wat temple","gt_card2_li2":"South gate of Angkor Thom: the most appealing defensive wall of Angkor Thom","gt_card2_li3":"West gate & North gate of Angkor Thom","gt_card2_li4":"Bayon: spectacular to climb, see the 54 towers and 216 smiling...","gt_card3_title":"Option 3: Beng Mealea & Jungle Temple Explorer","gt_card3_badge":"Beng Mealea","gt_card3_li1":"Beng Mealea: a vast jungle temple half-swallowed by roots and vines","gt_card3_li2":"Quiet countryside backroads far from the main temple crowds","gt_card3_li3":"Scramble over collapsed sandstone galleries, Tomb Raider style","gt_card3_li4":"Local village stop for fresh coconut and a rest break","gt_card4_title":"Option 4: Banteay Srei & Rolous Group Heritage Ride","gt_card4_badge":"Banteay Srei","gt_card4_li1":"Banteay Srei: the intricately carved 'Citadel of Women' in pink sandstone","gt_card4_li2":"Rolous Group: the oldest surviving temples of the Angkor era","gt_card4_li3":"Ride through rural rice-farming communities along the way","gt_card4_li4":"Preah Ko and Bakong temple stops with a local guide","gt_card5_title":"Option 5: Ta Prohm & West Baray Sunset","gt_card5_badge":"Ta Prohm","gt_card5_li1":"Ta Prohm: giant fig and silk-cotton trees entwined with ancient stone","gt_card5_li2":"West Baray reservoir at golden hour, a favorite with local families","gt_card5_li3":"Quiet forest trails between temple stops","gt_card5_li4":"Photo stop at Angkor Thom's Elephant Terrace","gt_card6_title":"Option 6: Countryside Villages & Rice Paddy Ride","gt_card6_badge":"Siem Reap Countryside","gt_card6_li1":"Palm-lined dirt roads through working rice paddies","gt_card6_li2":"Stop at a family home to see traditional Khmer sugar-palm harvesting","gt_card6_li3":"Local school and pagoda visit along the route","gt_card6_li4":"Easy, flat riding suited to all fitness levels","gt_card7_title":"Option 7: Tonle Sap Floating Village Discovery","gt_card7_badge":"Tonle Sap Lake","gt_card7_li1":"Ride out to Southeast Asia's largest freshwater lake","gt_card7_li2":"Boat trip through a floating village community","gt_card7_li3":"Meet local fishing families and see stilted houses up close","gt_card7_li4":"Sunset views back over the water on the return leg","pt_hero_badge":"KINGDOM OF CAMBODIA","pt_hero_h1":"Bike Tours","pt_hero_lede":"Your own guide, your own pace, your own group — no strangers, no fixed departure time. Pick the route and the hour, and we'll build the day around you.","pt_listing_h2":"Private Tours","pt_itin_subtitle":"— Angkor Wat Sunrise (Private)","pt_priceNote":"*private, up to 2 guests","pt_lightbox_eyebrow":"Bike Tours — Private","pt_moreNote":"Traveling in a bigger group, or want a different route than what's shown here? Message us and we'll price it out for your group size.","pt_card1_title":"Private Angkor Wat Sunrise & Ancient City Discovery","pt_card1_badge":"Angkor Wat","pt_card1_li1":"The majestic and astonishing Sunrise at Angkor Wat, just your group and your guide","pt_card1_li2":"The stunning rainforest trails, ridden at your own pace","pt_card1_li3":"Bayon: spectacular to climb, see the 54 towers and 216 smiling faces","pt_card1_li4":"Tanei: ancient hospital, untouched","pt_card1_li5":"Taprom: built as a monastery in 1186 — linger as long as you like","pt_card2_title":"Private Angkor Region & Rainforest","pt_card2_badge":"Angkor Thom","pt_card2_li1":"The stunning rainforest trails & the marvelous Angkor archaeological park - Angkor Wat temple","pt_card2_li2":"South gate of Angkor Thom: the most appealing defensive wall of Angkor Thom","pt_card2_li3":"West gate & North gate of Angkor Thom","pt_card2_li4":"Bayon, with a private guide free to adjust the stops as you go","pt_card3_title":"Private Beng Mealea & Jungle Temple Explorer","pt_card3_badge":"Beng Mealea","pt_card3_li1":"Beng Mealea: a vast jungle temple half-swallowed by roots and vines","pt_card3_li2":"Quiet countryside backroads far from the main temple crowds","pt_card3_li3":"Scramble over collapsed sandstone galleries, Tomb Raider style","pt_card3_li4":"Local village stop for fresh coconut, as long a rest as you want","pt_card4_title":"Private Banteay Srei & Rolous Heritage Ride","pt_card4_badge":"Banteay Srei","pt_card4_li1":"Banteay Srei: the intricately carved 'Citadel of Women' in pink sandstone","pt_card4_li2":"Rolous Group: the oldest surviving temples of the Angkor era","pt_card4_li3":"Ride through rural rice-farming communities along the way","pt_card4_li4":"Preah Ko and Bakong temple stops, timed entirely around your group","pt_card5_title":"Private Countryside Villages & Rice Paddy Ride","pt_card5_badge":"Siem Reap Countryside","pt_card5_li1":"Palm-lined dirt roads through working rice paddies","pt_card5_li2":"Stop at a family home to see traditional Khmer sugar-palm harvesting","pt_card5_li3":"Local school and pagoda visit along the route","pt_card5_li4":"Easy, flat riding — pace set entirely by your group","pt_card6_title":"Private Tonle Sap Floating Village Discovery","pt_card6_badge":"Tonle Sap Lake","pt_card6_li1":"Ride out to Southeast Asia's largest freshwater lake","pt_card6_li2":"Private boat trip through a floating village community","pt_card6_li3":"Meet local fishing families and see stilted houses up close","pt_card6_li4":"Sunset views back over the water, no group to keep up with","tm_hero_badge":"KINGDOM OF CAMBODIA","tm_hero_h1":"E-Bike Tours","tm_hero_lede":"No fixed menu — tell us how many days you have, what you want to see, and how hard you want to ride, and we'll design a route around it.","tm_how_eyebrow":"How it works","tm_how_h2":"Building your own route","tm_how1_h4":"1. Tell us what you want","tm_how1_p":"Days available, fitness level, temples vs. countryside vs. food — send it over on WhatsApp or use the form below.","tm_how2_h4":"2. We draft a route","tm_how2_p":"Our guides sketch a day-by-day plan with stops, pacing, and pickup times built around your group.","tm_how3_h4":"3. Fine-tune together","tm_how3_p":"Swap a stop, add a day, change the pace — we go back and forth until the plan fits you exactly.","tm_how4_h4":"4. Confirm & ride","tm_how4_p":"Lock in the date and price over WhatsApp, and your guide meets you on the day — route built just for you.","tm_listing_h2":"Starting Points for Inspiration","tm_priceNote":"*priced to your plan","tm_priceCustom":"Custom","tm_btn_useAsStart":"Use as a starting point","tm_lightbox_eyebrow":"Bike Tours — Tailor-Made","tm_moreNote":"None of these quite it? That's the point of Tailor-Made — describe the trip you actually want below and we'll build from scratch.","tm_card1_title":"Temples, Slowly, Over 2-3 Days","tm_card1_badge":"Angkor + Countryside","tm_card1_li1":"Spread the major Angkor temples across two or three shorter, cooler mornings","tm_card1_li2":"Add a countryside or floating-village day in between to break up the ruins","tm_card1_li3":"Flexible daily start time — early sunrise days, relaxed later starts, or both","tm_card2_title":"Family-Friendly, Easy Pace","tm_card2_badge":"Your pick of stops","tm_card2_li1":"Flat, shaded routes with frequent rest and snack stops","tm_card2_li2":"Mix of one easy temple, a village visit, and free time by the hotel pool","tm_card2_li3":"Works well with kids, grandparents, or mixed fitness levels in one group","tm_card3_title":"Long Days, Further Out","tm_card3_badge":"Off the main track","tm_card3_li1":"For riders who want distance — jungle temples, backroads, full days in the saddle","tm_card3_li2":"Beng Mealea, Koh Ker, or Preah Vihear combined into one trip, your call","tm_card3_li3":"Can be built as a single big day or spread over multiple days with an overnight","tm_viewMore":"View More","tm_viewLess":"View Less","dd_bicycle":"Bicycle","dd_moto":"Moto","dd_tukTuk":"Tuk Tuk","dd_carVan":"Car / Van","rn_in_siem_reap":"in Siem Reap","rn_up_to":"Up to","rn_automatic_moto":"Automatic Moto","rn_thank_you":"Thank You","rn_all_rentals":"All Rentals","rn_bicycles_e_bikes_motos_tuk":"Bicycles, e-bikes, motos, tuk tuks and cars & vans — pick the ride that suits your day and explore Angkor and the countryside your way. Every rental includes free delivery in town.","rn_book_now":"Book Now","rn_bike_models":"Bike Models","rn_starting_day":"Starting / Day","rn_free":"Free","rn_delivery_in_town":"Delivery In Town","rn_our_bike_fleet":"Our Bike Fleet","rn_mountain_bike":"Mountain Bike","rn_ready_to_ride":"Ready To Ride","rn_countryside_trail":"Countryside Trail","rn_riders_on_the_road":"Riders On The Road","rn_spec_sheet":"Spec Sheet","rn_bicycle_pricing_options":"Bicycle Pricing & Options","rn_all_rentals_include_a_keylock":"All rentals include a keylock and helmet, and free delivery in town.","rn_everyday":"Everyday","rn_family_tandem":"Family & Tandem","rn_type_of_bicycle":"Type of Bicycle","rn_brand":"Brand","rn_price_day":"Price / Day","rn_keylock":"Keylock","rn_helmet":"Helmet","rn_tandem_bike":"Tandem Bike","rn_city_bike":"City Bike","rn_3_gears_basket_auto_light":"3 gears, basket & auto light","rn_good_to_know":"Good To Know","rn_why_rent_from_us":"Why Rent From Us","rn_trusted_quality_every_bike_checked":"Trusted quality — every bike checked before it leaves our shop","rn_well_maintained_serviced_after_every":"Well maintained, serviced after every rental","rn_reasonable_transparent_daily_pricing_no":"Reasonable, transparent daily pricing — no hidden fees","rn_voted_best_rental_shop_on":"Voted best rental shop on TripAdvisor, Google & Facebook","rn_free_delivery_in_town_except":"Free delivery in town (except City Bike)","rn_free_mechanic_call_out_if":"Free mechanic call-out if you run into trouble on the road","rn_free_bike_pickup_the_evening":"Free bike pickup the evening before for early sunrise starts","rn_policy":"Policy","rn_rental_policy":"Rental Policy","rn_minimum_1_day_charge_7":"Minimum 1 day charge (7:00am – 7:00pm)","rn_booking_info":"Booking Info","rn_information_needed_for_booking":"Information Needed For Booking","rn_rental_style_you_d_like":"Rental style you'd like","rn_rental_dates":"Rental dates","rn_type_number_of_vehicles":"Type & number of vehicles","rn_rider_height_size_of_bike":"Rider height / size of bike you have at home","rn_hotel_name_room_number":"Hotel name & room number","rn_deposit":"Deposit","rn_passport_driving_license_id_card":"Passport, driving license, ID card, or cash (returned in full when the vehicle is returned)","rn_e_bike_models":"E-Bike Models","rn_e_bike_close_up":"E-Bike Close-Up","rn_group_ready_to_ride":"Group Ready To Ride","rn_countryside_views":"Countryside Views","rn_riding_the_trail":"Riding The Trail","rn_temple_route":"Temple Route","rn_forest_trail":"Forest Trail","rn_e_bike_pricing_options":"E-Bike Pricing & Options","rn_all_rentals_include_a_charger":"All rentals include a charger, keylock and helmet, and free delivery in town.","rn_family":"Family","rn_performance":"Performance","rn_type_of_e_bike":"Type of E-Bike","rn_city_e_bike":"City E-Bike","rn_e_mountain_bike":"E-Mountain Bike","rn_e_bike_with_child_seat":"E-Bike with Child Seat","rn_folding_e_bike":"Folding E-Bike","rn_trusted_quality_every_e_bike":"Trusted quality — every e-bike checked and charged before it leaves our shop","rn_free_delivery_in_town":"Free delivery in town","rn_free_e_bike_pickup_the":"Free e-bike pickup the evening before for early sunrise starts","rn_type_number_of_e_bikes":"Type & number of e-bikes","rn_rider_height_size_of_e":"Rider height / size of e-bike you have at home","rn_moto_models":"Moto Models","rn_moto_at_the_temple":"Moto At The Temple","rn_motos_on_the_road":"Motos On The Road","rn_parked_ready":"Parked & Ready","rn_moto_close_up":"Moto Close-Up","rn_our_moto_fleet":"Our Moto Fleet","rn_moto_pricing_options":"Moto Pricing & Options","rn_all_rentals_include_a_keylock_2":"All rentals include a keylock, helmet, and free delivery in town. Cambodian driving license or International Driving Permit required.","rn_type_of_moto":"Type of Moto","rn_trusted_quality_every_moto_serviced":"Trusted quality — every moto serviced and checked before it leaves our shop","rn_free_moto_pickup_the_evening":"Free moto pickup the evening before for early sunrise starts","rn_valid_driving_license_required_cambodian":"Valid driving license required — Cambodian license or International Driving Permit","rn_type_number_of_motos":"Type & number of motos","rn_valid_driving_license_cambodian_or":"Valid driving license (Cambodian or IDP)","rn_tuk_tuk_options":"Tuk Tuk Options","rn_hotel_pickup":"Hotel Pickup","rn_tuk_tuk_at_the_temple":"Tuk Tuk At The Temple","rn_our_tuk_tuk_fleet":"Our Tuk Tuk Fleet","rn_countryside_road":"Countryside Road","rn_comfortable_seating":"Comfortable Seating","rn_ready_to_go":"Ready To Go","rn_tuk_tuk_at_sunset":"Tuk Tuk At Sunset","rn_tuk_tuk_pricing_options":"Tuk Tuk Pricing & Options","rn_all_tuk_tuk_hires_include":"All tuk tuk hires include a driver, fuel, and free hotel pickup in town.","rn_point_to_point":"Point-to-Point","rn_half_full_day":"Half & Full Day","rn_type_of_service":"Type of Service","rn_capacity":"Capacity","rn_price":"Price","rn_driver":"Driver","rn_fuel":"Fuel","rn_airport_transfer_one_way":"Airport Transfer (one-way)","rn_point_to_point_in_town":"Point-to-Point (in town)","rn_half_day_charter_4_hrs":"Half-Day Charter (4 hrs)","rn_full_day_charter_8_hrs":"Full-Day Charter (8 hrs)","rn_sample_pricing_update_to_your":"*Sample pricing — update to your real rates.","rn_why_ride_with_us":"Why Ride With Us","rn_friendly_local_drivers_who_know":"Friendly local drivers who know the town and the temples","rn_well_maintained_tuk_tuks_checked":"Well maintained tuk tuks, checked before every trip","rn_reasonable_transparent_pricing_no_hidden":"Reasonable, transparent pricing — no hidden fees","rn_free_hotel_pickup_for_half":"Free hotel pickup for half & full-day charters","rn_flexible_stops_ask_your_driver":"Flexible stops — ask your driver to wait while you explore","rn_available_for_early_sunrise_temple":"Available for early sunrise temple starts","rn_minimum_charge_applies_for_point":"Minimum charge applies for point-to-point trips; half & full-day charters cover 4 or 8 hours","rn_service_style_you_d_like":"Service style you'd like","rn_date_pickup_time":"Date & pickup time","rn_number_of_passengers":"Number of passengers","rn_where_you_d_like_to":"Where you'd like to go (or let your driver suggest a route)","rn_no_deposit_required_pay_your":"No deposit required — pay your driver directly at the end of the trip","rn_vehicle_types":"Vehicle Types","rn_starting_from":"Starting From","rn_private_car":"Private Car","rn_comfortable_suv":"Comfortable SUV","rn_group_minivan":"Group Minivan","rn_car_van_pricing_options":"Car / Van Pricing & Options","rn_air_conditioned_cars_and_vans":"Air-conditioned cars and vans with a driver, fuel and free hotel pickup in town — ideal for families, groups and longer trips.","rn_transfers":"Transfers","rn_day_hire":"Day Hire","rn_groups":"Groups","rn_type_of_vehicle":"Type of Vehicle","rn_airport_transfer_car":"Airport Transfer (Car)","rn_sedan_day_hire":"Sedan — Day Hire","rn_suv_day_hire":"SUV — Day Hire","rn_minivan_day_hire":"Minivan — Day Hire","rn_professional_english_speaking_local_drivers":"Professional, English-speaking local drivers","rn_clean_air_conditioned_well_maintained":"Clean, air-conditioned, well-maintained vehicles","rn_free_hotel_pickup_in_town":"Free hotel pickup in town","rn_perfect_for_families_groups_and":"Perfect for families, groups and longer trips beyond Siem Reap","rn_day_hire_covers_up_to":"Day hire covers up to 8 hours; extra hours and trips outside Siem Reap on request","rn_service_style_you_d_like_2":"Service style you'd like (transfer or day hire)","rn_number_of_passengers_luggage":"Number of passengers & luggage","rn_where_you_d_like_to_2":"Where you'd like to go","rn_rental_with_driver":"Rental with Driver","ix_1_day":"1 Day","ix_2_days":"2 Days","ix_3_days":"3 Days","ix_4_days":"4 Days","ix_5_days":"5+ Days","ix_view_statement":"View statement","ix_clear_form":"Clear form","ix_review_your_request":"Review your request","ix_edit_details":"Edit details","rn_double_check_the_details_below":"Double-check the details below, then send it straight to us on WhatsApp.","ix_guided_motorbike_and_e_bike":"Guided motorbike and e-bike tours, led by locals.","ix_send_us_your_plan_on":"Send us your plan on WhatsApp. We reply within the hour.","ix_tap_a_start_day_then":"Tap a start day, then an end day.","ix_check_the_details_then_send":"Check the details, then send via WhatsApp.","ix_change_package":"Change package","ix_not_opening_message_855_14":"Not opening? Message +855 12 610 269.","ix_popular_routes":"Popular routes","ix_scouted_and_ridden_by_our":"Scouted and ridden by our guides.","ix_beat_the_crowds_to_angkor":"Beat the crowds to Angkor Wat.","ix_floating_villages_and_fish_markets":"Floating villages and fish markets.","ix_red_dirt_roads_and_a":"Red dirt roads and a waterfall camp.","ix_rice_paddies_and_brick_kilns":"Rice paddies and brick kilns.","ix_golden_hour_over_the_lake":"Golden hour over the lake.","ix_green_fields_and_village_life":"Green fields and village life.","ix_ride_with_locals":"Ride with locals","ix_real_cambodia_ridden_by_locals":"Real Cambodia, ridden by locals","ix_guides_born_and_raised_in":"Guides born and raised in Siem Reap.","ix_well_kept_bikes_and_proper":"Well-kept bikes and proper gear.","ix_half_full_day":"Half & full-day","ix_open_road_riding_handlebars_in":"Open-road riding, handlebars in your hands.","ix_tap_to_choose":"Tap to choose","ix_person":"/person","ix_3_4_hours":"3–4 Hours","ix_effortless_riding_for_first_timers":"Effortless riding for first-timers.","ix_per_day":"Per day","ix_road_ready_wheels_by_the":"Road-ready wheels, by the day.","ix_day":"/day","ix_no_rides_match_those_filters":"No rides match those filters — try clearing one and searching again.","ix_the_real_cambodia_is_on":"The real Cambodia is on two wheels.","ix_eco_conscious_journeys_that_connect":"Eco-conscious journeys that connect you with local communities.","ix_adventure_with_responsibility":"Adventure with responsibility.","ix_every_booking_supports_a_rural":"Every booking supports a rural English school.","ix_of_profit_funds_a_rural":"of profit funds a rural school","ix_call_us_and_we_ll":"Call us and we'll build your route.","ix_motorbike_e_bike_tours_and":"Motorbike & e-bike tours and rentals in Siem Reap.","nav_tours":"Tour","panel_menu":"Menu","panel_contactInfo":"Contact Info","panel_followUs":"Follow Us","filter_opt_temple":"Temple","filter_opt_cityTour":"City Tour","filter_longTour":"Long Tour","dd_3days":"3+ Days","dd_5days":"5+ Days","dd_7days":"7+ Days","dd_10plusDays":"10+ Days","filter_rental":"Rental","rn_1_day":"1 Day","rn_2_days":"2 Days","rn_3_days":"3 Days","rn_4_days":"4 Days","rn_5_days":"5+ Days","rn_view_statement":"View statement","rn_clear_form":"Clear form","rn_review_your_request":"Review your request","rn_edit_details":"Edit details","rn_2026_siemride":"© 2026 SiemRide.","rt_title_bike":"Bicycle Rental","rt_title_ebike":"E-Bike Rental","rt_title_moto":"Moto Rental","rt_title_tuktuk":"Tuk Tuk Rental","rt_title_carvan":"Car / Van Rental","rt_in_siem_reap":"in Siem Reap","qc_title":"Contact SiemRide","qc_sub":"Send us your question and we will reply as soon as possible.","qc_name":"Your name","qc_email":"Your email (optional)","qc_phone":"Your phone / WhatsApp (optional)","qc_message":"Message","qc_ph":"Tour or rental, date, number of people...","qc_send":"Send","qc_note":"WhatsApp will open with your message ready. Please press Send there.","qc_err":"Please enter your name and message.","qc_ok":"Thank you! Your message was sent.","qc_wa_opened":"WhatsApp opened. Please press Send there.","rn_pricing_soon":"*Pricing coming soon.","rn_chip_delivery":"Free delivery in town","rn_chip_gear":"Helmet & lock included","rn_chip_reply":"Replies within the hour","rn_black_van":"Black Van","rn_white_van":"White Van","rn_our_car_fleet":"Our Car Fleet","rn_van_at_the_temple":"Van At The Temple","rn_our_van_fleet":"Our Van Fleet","tr_badge":"KINGDOM OF CAMBODIA","tr_lede_moto":"Real motorbikes, real backroads. Ride yourself or hop on the back with a local guide.","tr_lede_bike":"Pedal Angkor's temples and quiet countryside with a guide who knows every trail.","tr_lede_ebike":"Cover more ground with less effort — electric-assist bikes and a local guide.","tr_h2_moto":"Siem Reap Motorbike Tours","tr_h2_bike":"Siem Reap Bicycle Tours","tr_h2_ebike":"Siem Reap E-Bike Tours","tr_options":"Tour Options & Highlights","tr_book_moto":"Book a Moto Tour","tr_book_bike":"Book a Bike Tour","tr_book_ebike":"Book an E-Bike Tour","tr_more_moto":"Want something different? Message us on WhatsApp and we'll build a custom moto route around your dates.","tr_more_bike":"Want something different? Message us on WhatsApp and we'll build a custom bike route around your dates.","tr_more_ebike":"Want something different? Message us on WhatsApp and we'll build a custom e-bike route around your dates.","rn_back_to_home":"Back to Home"};
SR_I18N.en["panel_contactUs"]="Contact us";
SR_I18N.en["rn_popular"]="Popular";
SR_I18N.en["rn_per_day"]="/ day";
SR_I18N.en["rn_toyota_prius"]="Toyota Prius";
SR_I18N.en["rn_mercedes_benz"]="Mercedes-Benz";

var LANGS = ["en","km","vi","th","zh","ja","ko"];
var langLetter = { en:"EN", km:"KM", vi:"VI", th:"TH", zh:"ZH", ja:"JA", ko:"KO" };
var langFlagUrl = {
  en:"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1ec-1f1e7.svg",
  km:"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1f0-1f1ed.svg",
  vi:"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1fb-1f1f3.svg",
  th:"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1f9-1f1ed.svg",
  zh:"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1e8-1f1f3.svg",
  ja:"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1ef-1f1f5.svg",
  ko:"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1f0-1f1f7.svg"
};
var STORAGE_KEY = "siemride_lang";

// folder holding lang/*.js, worked out from where this script was loaded
var LANG_BASE = (function(){
  var s = document.currentScript;
  var src = (s && s.src) || '';
  return src ? src.replace(/[^\/]*$/, '') + 'lang/' : 'JavaScript/lang/';
})();

var langLoading = {};
function loadLang(lang, cb){
  if(SR_I18N[lang]){ cb(true); return; }
  if(langLoading[lang]){ langLoading[lang].push(cb); return; }
  langLoading[lang] = [cb];
  var sc = document.createElement('script');
  sc.async = true;
  sc.src = LANG_BASE + lang + '.js';
  function done(ok){
    var q = langLoading[lang]; delete langLoading[lang];
    q.forEach(function(f){ f(ok); });
  }
  sc.onload  = function(){ done(!!SR_I18N[lang]); };
  sc.onerror = function(){ if(sc.parentNode) sc.parentNode.removeChild(sc); done(false); };
  document.head.appendChild(sc);
}

function currentLang(){
  return document.documentElement.getAttribute('lang') || 'en';
}
// t(key): current language -> English -> the key itself
function t(key){
  var d = SR_I18N[currentLang()];
  if(d && d[key] !== undefined) return d[key];
  var e = SR_I18N.en[key];
  return e !== undefined ? e : key;
}

var i18nFirstPass = true;
// Swap every tagged node under root. Writes only when the text really differs.
function renderI18N(lang, root){
  var d = SR_I18N[lang] || {}, en = SR_I18N.en;
  var nodes = (root || document).querySelectorAll('[data-i18n],[data-i18n-placeholder],[data-i18n-aria]');
  for(var i = 0; i < nodes.length; i++){
    var el = nodes[i], k, v;
    k = el.getAttribute('data-i18n');
    if(k){
      if(el.__en === undefined || el.__ek !== k){
        el.__en = (el.__en === undefined && i18nFirstPass) ? el.textContent : (en[k] !== undefined ? en[k] : el.textContent);
        el.__ek = k;
      }
      v = (lang === 'en') ? el.__en : (d[k] !== undefined ? d[k] : el.__en);
      if(el.textContent !== v) el.textContent = v;
    }
    k = el.getAttribute('data-i18n-placeholder');
    if(k){
      if(el.__enP === undefined) el.__enP = i18nFirstPass ? (el.getAttribute('placeholder') || '') : (en[k] !== undefined ? en[k] : '');
      v = (lang === 'en') ? el.__enP : (d[k] !== undefined ? d[k] : el.__enP);
      if(el.getAttribute('placeholder') !== v) el.setAttribute('placeholder', v);
    }
    k = el.getAttribute('data-i18n-aria');
    if(k){
      if(el.__enA === undefined) el.__enA = i18nFirstPass ? (el.getAttribute('aria-label') || '') : (en[k] !== undefined ? en[k] : '');
      v = (lang === 'en') ? el.__enA : (d[k] !== undefined ? d[k] : el.__enA);
      if(el.getAttribute('aria-label') !== v) el.setAttribute('aria-label', v);
    }
  }
  if(!root) i18nFirstPass = false;
}

function updateLangChrome(lang){
  var html = document.documentElement;
  html.setAttribute('lang', lang);
  html.className = html.className.replace(/\blang-[a-z]{2}\b/g, '').replace(/\s+/g, ' ').trim();
  html.classList.add('lang-' + lang);
  var slot = document.getElementById('langFlagSlot');
  if(slot){
    var url = langFlagUrl[lang] || langFlagUrl.en;
    if(slot.getAttribute('src') !== url) slot.src = url;
    slot.alt = langLetter[lang] || lang.toUpperCase();
  }
  var codeSlot = document.getElementById('langCurCode');
  if(codeSlot){
    codeSlot.textContent = (langLetter[lang] || lang.toUpperCase());
  }
  var langBtn = document.getElementById('langBtn');
  if(langBtn) langBtn.setAttribute('title', lang.toUpperCase());
  document.querySelectorAll('#langPanel a').forEach(function(a){
    a.classList.toggle('active-lang', a.getAttribute('data-lang') === lang);
  });
  if(window.SR_UPDATE_NAV) setTimeout(window.SR_UPDATE_NAV, 60);
}

var langRequest = 0;
function applyLanguage(lang, instant){
  if(LANGS.indexOf(lang) < 0) lang = 'en';
  var req = ++langRequest;
  loadLang(lang, function(ok){
    if(req !== langRequest) return;            // a newer click replaced this one
    if(!ok) lang = 'en';                       // file missing/offline: stay readable
    var change = (lang !== currentLang());
    function run(){
      renderI18N(lang);
      updateLangChrome(lang);
      try{ localStorage.setItem(STORAGE_KEY, lang); }catch(e){}
      document.documentElement.classList.remove('i18n-wait');
      // let other modules (reviews, booking summary, calendar...) re-render
      document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
    }
    var calm = false;
    try{ calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
    if(change && !instant && !calm && document.startViewTransition){
      try{ document.startViewTransition(run); }catch(e){ run(); }
    } else {
      run();
    }
  });
}

// small public API for page-specific scripts (e.g. the Rental page)
window.SR = { t: t, lang: currentLang, apply: applyLanguage, refresh: function(root){ renderI18N(currentLang(), root); } };

// wire up language links; pre-fetch a language as soon as the visitor shows interest
document.querySelectorAll('#langPanel a[data-lang]').forEach(function(a){
  var code = a.getAttribute('data-lang');
  var warm = function(){ loadLang(code, function(){}); };
  a.addEventListener('mouseenter', warm);
  a.addEventListener('focus', warm);
  a.addEventListener('touchstart', warm, { passive: true });
  a.addEventListener('click', function(e){
    e.preventDefault();
    closeAllDropdowns(null);               // close first so the menu never lags the swap
    applyLanguage(code);
  });
});

// restore saved language on load (defaults to English)
(function initLanguage(){
  var saved = null;
  try{ saved = localStorage.getItem(STORAGE_KEY); }catch(e){}
  applyLanguage(LANGS.indexOf(saved) >= 0 ? saved : 'en', true);
})();

/* ===== BOOKING / CONTACT MODAL ===== */
(function(){
  var openBtn   = document.getElementById('planMyRideBtn');
  var overlay   = document.getElementById('bookingOverlay');
  var modal     = document.getElementById('bookingModal');
  var closeBtn  = document.getElementById('bookingClose');
  var form      = document.getElementById('bookingForm');
  var errorMsg  = document.getElementById('bookingError');
  var successEl = document.getElementById('bookingSuccess');
  var summaryEl = document.getElementById('bookingSummary');
  var summaryList = document.getElementById('summaryList');
  var viewStatementBtn = document.getElementById('bkViewStatementBtn');
  var confirmSendBtn   = document.getElementById('bkConfirmSendBtn');
  var editDetailsBtn   = document.getElementById('bkEditDetailsBtn');
  var WHATSAPP_NUMBER = window.SR_WA_NUMBER || '85512610269';

  // Holds whatever came from a "Get a Quote" click: which package card it was
  // (Bike Tours / E-Bike Tours / Rental), which tags were ticked, and their
  // price/discount. Reset whenever the modal opens without a prefill.
  var quoteContext = {};

  function numFromPriceText(txt){
    if(!txt) return NaN;
    var m = txt.match(/([0-9]+(\.[0-9]+)?)/);
    return m ? parseFloat(m[1]) : NaN;
  }

  // Turns a duration value like "1 Day" / "3 Days" / "5+ Days" into a plain
  // day count so pricing can scale automatically (e.g. $50/day x 2 days = $100).
  function daysFromDuration(duration){
    if(!duration) return 1;
    var m = String(duration).match(/([0-9]+)/);
    var n = m ? parseInt(m[1], 10) : 1;
    return n > 0 ? n : 1;
  }

  // Turns a riders value like "1" / "4" / "5+" into a plain headcount.
  function countFromRiders(riders){
    if(!riders) return 1;
    var m = String(riders).match(/([0-9]+)/);
    var n = m ? parseInt(m[1], 10) : 1;
    return n > 0 ? n : 1;
  }

  function formatPricingLine(data){
    if(!data.pricing || !data.pricing.length) return '';
    var days = daysFromDuration(data.duration);
    var riders = countFromRiders(data.riders);
    var multiplier = days * riders;
    return data.pricing.map(function(p){
      var nowTotal = p.price * multiplier;
      var line = p.label + ': $' + nowTotal;
      if(multiplier > 1){
        var factors = [];
        if(days > 1) factors.push(days + ' days');
        if(riders > 1) factors.push(riders + ' people');
        line += ' ($' + p.price + '/person/day \u00d7 ' + factors.join(' \u00d7 ') + ')';
      }
      if(p.was !== null && p.was !== undefined && p.was > p.price){
        line += ' (was $' + (p.was * multiplier) + ')';
      }
      return line;
    }).join('; ');
  }

  if(!overlay || !modal || !form) return;

  // Programmatically set a bk-select's value (used to preselect Vehicle/Type
  // when a "Get a Free Quote" button on a specific package card is clicked).
  function setBkSelect(sel, value){
    if(!sel || value === undefined || value === null) return;
    var option = sel.querySelector('.bk-select-panel a[data-value="' + value + '"]');
    if(!option) return;
    sel.setAttribute('data-value', value);
    sel.querySelector('.bk-select-value').textContent = option.textContent;
    sel.querySelectorAll('.bk-select-panel a').forEach(function(a){
      a.classList.toggle('active', a === option);
    });
  }

  function openModal(prefill){
    quoteContext = prefill || {};
    if(prefill){
      if(prefill.vehicle) setBkSelect(document.getElementById('bkVehicle'), prefill.vehicle);
      if(prefill.type) setBkSelect(document.getElementById('bkType'), prefill.type);
    }
    overlay.classList.add('open');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    var firstField = document.getElementById('bkName');
    if(firstField) setTimeout(function(){ firstField.focus(); }, 300);
  }

  function closeModal(){
    overlay.classList.remove('open');
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  var bkSelectDefaults = {};
  modal.querySelectorAll('.bk-select').forEach(function(sel){
    if(sel.id === 'bkDate') return;
    bkSelectDefaults[sel.id] = {
      value: sel.getAttribute('data-value'),
      text: sel.querySelector('.bk-select-value').textContent
    };
  });

  function resetModal(){
    quoteContext = {};
    form.reset();
    form.style.display = '';
    summaryEl.classList.remove('show');
    successEl.classList.remove('show');
    errorMsg.classList.remove('show');
    modal.querySelectorAll('.bk-select').forEach(function(sel){
      if(sel.id === 'bkDate') return;
      var def = bkSelectDefaults[sel.id];
      if(!def) return;
      sel.setAttribute('data-value', def.value);
      sel.querySelector('.bk-select-value').textContent = def.text;
      sel.querySelectorAll('.bk-select-panel a').forEach(function(a){
        a.classList.toggle('active', a.getAttribute('data-value') === def.value);
      });
    });
    if(dateWrap && dateWrap._resetDate) dateWrap._resetDate();
  }

  if(openBtn) openBtn.addEventListener('click', function(){ openModal(); });
  closeBtn.addEventListener('click', function(){ closeModal(); });
  overlay.addEventListener('click', function(){ closeModal(); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && modal.classList.contains('open')){
      closeModal();
    }
  });

  window.openBookingModal = function(prefill){ openModal(prefill); };

  // Called from each "Get a Free Quote" button. Reads any checked tag
  // checkboxes on that package card (Group Tours, Sunset Rides, etc.) and
  // carries them into the quote form's notes field.
  window.handleQuoteClick = function(btn, base){
    var card = btn.closest('.package-card');
    var prefill = base ? Object.assign({}, base) : {};

    // Package name  read straight off the card heading so it always matches
    // whatever language is currently active (Bike Tours / E-Bike Tours / Rental).
    var titleEl = card && card.querySelector('.package-info h3');
    prefill.package = titleEl ? titleEl.textContent.trim() : '';
    prefill.anchor = (card && (card.id || (card.closest('[id]') || {}).id)) || '';

    var picks = [];
    if(card){
      card.querySelectorAll('.package-tags input[type="checkbox"]:checked').forEach(function(cb){
        var price = parseFloat(cb.getAttribute('data-price'));
        var was = parseFloat(cb.getAttribute('data-was'));
        picks.push({
          label: cb.value,
          price: isNaN(price) ? null : price,
          was: isNaN(was) ? null : was
        });
      });
    }

    if(picks.length){
      prefill.interests = picks.map(function(p){ return p.label; });
      prefill.pricing = picks;
    } else if(card){
      // Nothing ticked yet  fall back to the card's current headline price
      // (already reflects the cheapest tier if the card has priced tags).
      var nowVal = numFromPriceText(card.querySelector('.price-now') ? card.querySelector('.price-now').textContent : '');
      var wasVal = numFromPriceText(card.querySelector('.price-was') ? card.querySelector('.price-was').textContent : '');
      if(!isNaN(nowVal)){
        prefill.pricing = [{ label: prefill.package, price: nowVal, was: isNaN(wasVal) ? null : wasVal }];
      }
    }

    openModal(prefill);
  };

  /* custom light-blue dropdowns (riders / destination / vehicle / type) */
  var bkSelects = modal.querySelectorAll('.bk-select');

  function closeAllBkSelects(except){
    bkSelects.forEach(function(sel){
      if(sel !== except) sel.classList.remove('open');
    });
  }

  bkSelects.forEach(function(sel){
    var trigger = sel.querySelector('.bk-select-btn');
    var valueEl = sel.querySelector('.bk-select-value');

    trigger.addEventListener('click', function(e){
      e.stopPropagation();
      var willOpen = !sel.classList.contains('open');
      closeAllBkSelects(null);
      sel.classList.toggle('open', willOpen);
    });

    sel.querySelectorAll('.bk-select-panel a').forEach(function(option){
      option.addEventListener('click', function(e){
        e.preventDefault();
        sel.setAttribute('data-value', option.getAttribute('data-value'));
        valueEl.textContent = option.textContent;
        sel.querySelectorAll('.bk-select-panel a').forEach(function(a){ a.classList.remove('active'); });
        option.classList.add('active');
        sel.classList.remove('open');
      });
    });
  });

  document.addEventListener('click', function(e){
    if(!e.target.closest('.bk-select')) closeAllBkSelects(null);
  });

  /* ===== custom green date picker  supports single or multi-day range ===== */
  var dateWrap = document.getElementById('bkDate');
  if(dateWrap){
    var monthLabel = dateWrap.querySelector('.bk-date-month-label');
    var dateGrid   = dateWrap.querySelector('.bk-date-grid');
    var dateValueEl = dateWrap.querySelector('.bk-select-value');
    var CAL_LOC = { en:'en-US', km:'km-KH', vi:'vi-VN', th:'th-TH', zh:'zh-CN', ja:'ja-JP', ko:'ko-KR' };
    var EN_WEEK = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    function calFmt(opts){
      var l = (CAL_LOC[currentLang()] || 'en-US') + '-u-ca-gregory-nu-latn';
      try{ return new Intl.DateTimeFormat(l, opts); }catch(e){ return new Intl.DateTimeFormat('en-US', opts); }
    }
    function monthName(m, short){ return calFmt({ month: short ? 'short' : 'long' }).format(new Date(2023, m, 15)); }
    function localizeWeekdays(){
      var sp = dateWrap.querySelectorAll('.bk-date-weekdays span');
      var f = currentLang() === 'en' ? null : calFmt({ weekday: (currentLang() === 'th' || currentLang() === 'km') ? 'narrow' : 'short' });
      for(var i = 0; i < sp.length && i < 7; i++){
        sp[i].textContent = f ? f.format(new Date(2023, 0, 1 + i)) : EN_WEEK[i];
      }
    }
    document.addEventListener('langchange', function(){
      localizeWeekdays();
      if(monthLabel) renderCalendar();
      updateDateDisplay();
    });
    var today = new Date(); today.setHours(0,0,0,0);
    var viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
    var rangeStart = '';
    var rangeEnd = '';

    function toISO(y,m,d){
      return y + '-' + String(m+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
    }
    function formatDisplay(y,m,d){
      return d + ' ' + monthName(m, true) + ' ' + y;
    }
    function formatFromISO(iso){
      var p = iso.split('-').map(Number);
      return formatDisplay(p[0], p[1]-1, p[2]);
    }
    function syncDurationFromDates(){
      var durSel = document.getElementById('bkDuration');
      if(!durSel || !rangeStart) return;
      var end = rangeEnd || rangeStart;
      var startD = new Date(rangeStart + 'T00:00:00');
      var endD = new Date(end + 'T00:00:00');
      var dayCount = Math.round((endD - startD) / 86400000) + 1;
      var label = dayCount >= 5 ? '5+ Days' : (dayCount === 1 ? '1 Day' : dayCount + ' Days');
      setBkSelect(durSel, label);
    }
    function updateDateDisplay(){
      if(!rangeStart){
        dateValueEl.textContent = t('booking_selectDate');
      } else if(!rangeEnd || rangeEnd === rangeStart){
        dateValueEl.textContent = formatFromISO(rangeStart);
      } else {
        dateValueEl.textContent = formatFromISO(rangeStart) + ' \u2192 ' + formatFromISO(rangeEnd);
      }
    }

    function renderCalendar(){
      monthLabel.textContent = monthName(viewDate.getMonth()) + ' ' + viewDate.getFullYear();
      dateGrid.innerHTML = '';
      var y = viewDate.getFullYear(), m = viewDate.getMonth();
      var firstWeekday = new Date(y, m, 1).getDay();
      var daysInMonth = new Date(y, m + 1, 0).getDate();
      var daysInPrevMonth = new Date(y, m, 0).getDate();

      var totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

      for(var i = 0; i < totalCells; i++){
        var cell = document.createElement('div');
        cell.className = 'bk-date-cell';
        var cellY = y, cellM = m, cellD;

        if(i < firstWeekday){
          cellD = daysInPrevMonth - firstWeekday + 1 + i;
          cellM = m - 1; cell.classList.add('muted');
          if(cellM < 0){ cellM = 11; cellY = y - 1; }
        } else if(i >= firstWeekday + daysInMonth){
          cellD = i - firstWeekday - daysInMonth + 1;
          cellM = m + 1; cell.classList.add('muted');
          if(cellM > 11){ cellM = 0; cellY = y + 1; }
        } else {
          cellD = i - firstWeekday + 1;
        }

        var cellDate = new Date(cellY, cellM, cellD);
        var iso = toISO(cellY, cellM, cellD);
        cell.textContent = cellD;

        if(cellDate < today) cell.classList.add('disabled');
        if(cellDate.getTime() === today.getTime()) cell.classList.add('today');
        if(iso === rangeStart || iso === rangeEnd) cell.classList.add('selected');
        else if(rangeStart && rangeEnd && iso > rangeStart && iso < rangeEnd) cell.classList.add('in-range');

        (function(iso){
          cell.addEventListener('click', function(){
            if(!rangeStart || (rangeStart && rangeEnd)){
              // start a fresh selection
              rangeStart = iso;
              rangeEnd = '';
            } else if(iso >= rangeStart){
              rangeEnd = iso;
            } else {
              rangeEnd = rangeStart;
              rangeStart = iso;
            }
            dateWrap.setAttribute('data-start', rangeStart);
            dateWrap.setAttribute('data-end', rangeEnd);
            updateDateDisplay();
            syncDurationFromDates();
            renderCalendar();
            if(rangeStart && rangeEnd) dateWrap.classList.remove('open');
          });
        })(iso);

        dateGrid.appendChild(cell);
      }
    }

    dateWrap.querySelectorAll('.bk-date-nav').forEach(function(nav){
      nav.addEventListener('click', function(e){
        e.stopPropagation();
        viewDate.setMonth(viewDate.getMonth() + parseInt(nav.getAttribute('data-dir'), 10));
        renderCalendar();
      });
    });

    renderCalendar();

    dateWrap._resetDate = function(){
      rangeStart = '';
      rangeEnd = '';
      viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
      dateWrap.setAttribute('data-start', '');
      dateWrap.setAttribute('data-end', '');
      updateDateDisplay();
      renderCalendar();
    };
    dateValueEl.setAttribute('data-default', dateValueEl.textContent);
  }

  function collectFormData(){
    return {
      name: document.getElementById('bkName').value.trim(),
      contact: document.getElementById('bkContact').value.trim(),
      email: document.getElementById('bkEmail').value.trim(),
      package: quoteContext.package || '',
      interests: quoteContext.interests || [],
      pricing: quoteContext.pricing || [],
      riders: document.getElementById('bkRiders').getAttribute('data-value'),
      destination: document.getElementById('bkDestination').getAttribute('data-value'),
      vehicle: document.getElementById('bkVehicle').getAttribute('data-value'),
      type: document.getElementById('bkType').getAttribute('data-value'),
      duration: document.getElementById('bkDuration').getAttribute('data-value'),
      dateStart: document.getElementById('bkDate').getAttribute('data-start'),
      dateEnd: document.getElementById('bkDate').getAttribute('data-end'),
      time: document.getElementById('bkTime').getAttribute('data-value'),
      message: document.getElementById('bkMessage').value.trim()
    };
  }

  function formatDateRange(data){
    if(!data.dateStart) return '';
    if(!data.dateEnd || data.dateEnd === data.dateStart) return data.dateStart;
    return data.dateStart + ' ' + t('summary_dateTo') + ' ' + data.dateEnd;
  }

  // Field labels here (and in renderSummary below) are pulled from the i18n
  // dictionary via t() so the WhatsApp message and the on-screen review step
  // are sent/shown in whatever language the visitor currently has selected,
  // instead of always being hardcoded English.
  function buildLines(data){
    var dateRange = formatDateRange(data);
    var lines = [
      t('summary_greeting'),
      t('summary_name') + ': ' + data.name,
      t('summary_contact') + ': ' + data.contact
    ];
    if(data.email) lines.push(t('summary_email') + ': ' + data.email);
    if(data.package) lines.push(t('summary_package') + ': ' + data.package);
    if(data.interests && data.interests.length) lines.push(t('summary_interestedIn') + ': ' + data.interests.join(', '));
    var pricingLine = formatPricingLine(data);
    if(pricingLine) lines.push(t('summary_pricing') + ': ' + pricingLine);
    lines.push(t('summary_riders') + ': ' + data.riders);
    lines.push(t('summary_destination') + ': ' + data.destination);
    lines.push(t('summary_vehicle') + ': ' + data.vehicle);
    lines.push(t('summary_type') + ': ' + data.type);
    lines.push(t('summary_duration') + ': ' + data.duration);
    if(dateRange) lines.push(t('summary_dates') + ': ' + dateRange);
    if(data.time) lines.push(t('summary_time') + ': ' + data.time);
    if(data.message) lines.push(t('summary_notes') + ': ' + data.message);
    return lines;
  }

  function renderSummary(data){
    var dateRange = formatDateRange(data);
    var rows = [
      [t('summary_name'), data.name],
      [t('summary_contact'), data.contact],
      [t('summary_email'), data.email],
      [t('summary_package'), data.package],
      [t('summary_interestedIn'), (data.interests && data.interests.length) ? data.interests.join(', ') : ''],
      [t('summary_pricing'), formatPricingLine(data)],
      [t('summary_riders'), data.riders],
      [t('summary_destination'), data.destination],
      [t('summary_vehicle'), data.vehicle],
      [t('summary_type'), data.type],
      [t('summary_duration'), data.duration],
      [t('summary_dates'), dateRange],
      [t('summary_time'), data.time],
      [t('summary_notes'), data.message]
    ];
    summaryList.innerHTML = '';
    rows.forEach(function(row){
      if(!row[1]) return;
      var dt = document.createElement('dt');
      dt.textContent = row[0];
      var dd = document.createElement('dd');
      dd.textContent = row[1];
      summaryList.appendChild(dt);
      summaryList.appendChild(dd);
    });
  }

  function sendToWhatsApp(data){
    var text = encodeURIComponent(buildLines(data).join('\n'));
    var waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;

    form.style.display = 'none';
    summaryEl.classList.remove('show');
    successEl.classList.add('show');

    window.open(waUrl, '_blank', 'noopener');

    setTimeout(function(){
      closeModal();
      setTimeout(resetModal, 300);
    }, 1800);
  }

  if(viewStatementBtn){
    viewStatementBtn.addEventListener('click', function(){
      var data = collectFormData();
      if(!data.name || !data.contact){
        errorMsg.classList.add('show');
        return;
      }
      errorMsg.classList.remove('show');
      renderSummary(data);
      form.style.display = 'none';
      summaryEl.classList.add('show');
    });
  }

  var clearFormBtn = document.getElementById('bkClearFormBtn');
  if(clearFormBtn){
    clearFormBtn.addEventListener('click', function(){
      resetModal();
    });
  }

  if(editDetailsBtn){
    editDetailsBtn.addEventListener('click', function(){
      summaryEl.classList.remove('show');
      form.style.display = '';
    });
  }

  var backToPackageBtn = document.getElementById('bkBackToPackageBtn');
  if(backToPackageBtn){
    // Map the package name we captured at "Get a Quote" time back to that
    // card's anchor, so the person lands right where they started.
    var PACKAGE_ANCHORS = {
      'Bike Tours': 'bike-tours',
      'E-Bike Tours': 'ebike-tours',
      'Rental': 'rental'
    };
    backToPackageBtn.addEventListener('click', function(){
      var anchorId = quoteContext.anchor || PACKAGE_ANCHORS[quoteContext.package] || 'choose';
      closeModal();
      var target = document.getElementById(anchorId);
      if(target){
        setTimeout(function(){
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 250);
      }
    });
  }

  if(confirmSendBtn){
    confirmSendBtn.addEventListener('click', function(){
      var data = collectFormData();
      if(!data.name || !data.contact){
        summaryEl.classList.remove('show');
        form.style.display = '';
        errorMsg.classList.add('show');
        return;
      }
      sendToWhatsApp(data);
    });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(viewStatementBtn) viewStatementBtn.click();
  });
})();

/* ===== ROUTE PHOTO LIGHTBOX ===== */
(function(){
  var overlay  = document.getElementById('routeLightboxOverlay');
  var box      = document.getElementById('routeLightbox');
  var closeBtn = document.getElementById('routeLightboxClose');
  var prevBtn  = document.getElementById('routeLightboxPrev');
  var nextBtn  = document.getElementById('routeLightboxNext');
  var imgEl    = document.getElementById('routeLightboxImg');
  var placeEl  = document.getElementById('routeLightboxPlace');
  var titleEl  = document.getElementById('routeLightboxTitle');
  var descEl   = document.getElementById('routeLightboxDesc');
  var ctaEl    = document.getElementById('routeLightboxCta');

  if(!overlay || !box) return;

  var items = [];
  var current = 0;

  document.querySelectorAll('.route-thumb-clickable').forEach(function(thumb){
    var card = thumb.closest('.route-card');
    var img  = thumb.querySelector('img');
    var h3   = card.querySelector('.route-body h3');
    var p    = card.querySelector('.route-body p');
    var link = card.querySelector('.route-link');
    var index = items.length;

    items.push({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      title: h3 ? h3.textContent : '',
      desc: p ? p.textContent : '',
      href: link ? link.getAttribute('href') : '#'
    });

    thumb.addEventListener('click', function(){ openLightbox(index); });
  });

  function render(){
    var item = items[current];
    imgEl.setAttribute('src', item.src);
    imgEl.setAttribute('alt', item.alt);
    placeEl.textContent = item.title;
    titleEl.textContent = item.title;
    descEl.textContent = item.desc;
  }

  function openLightbox(index){
    current = index;
    render();
    overlay.classList.add('open');
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    overlay.classList.remove('open');
    box.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showPrev(){ current = (current - 1 + items.length) % items.length; render(); }
  function showNext(){ current = (current + 1) % items.length; render(); }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  ctaEl.addEventListener('click', function(e){
    e.preventDefault();
    closeLightbox();
    setTimeout(function(){
      if(window.openBookingModal) window.openBookingModal();
    }, 250);
  });

  document.addEventListener('keydown', function(e){
    if(!box.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') showPrev();
    if(e.key === 'ArrowRight') showNext();
  });
})();

/* ===== ROUTE VIDEO LIGHTBOX (full-screen, video only) ===== */
(function(){
  var overlay  = document.getElementById('videoLightboxOverlay');
  var box      = document.getElementById('videoLightbox');
  var closeBtn = document.getElementById('videoLightboxClose');
  var prevBtn  = document.getElementById('videoLightboxPrev');
  var nextBtn  = document.getElementById('videoLightboxNext');
  var videoEl  = document.getElementById('videoLightboxVideo');
  var counterEl= document.getElementById('videoLightboxCounter');

  if(!overlay || !box) return;

  var items = [];
  var current = 0;

  document.querySelectorAll('.route-thumb-video').forEach(function(thumb){
    var videoSrc = thumb.getAttribute('data-video-src');
    var index = items.length;

    items.push({
      videoSrc: videoSrc || ''
    });

    var inlineVideo = thumb.querySelector('video');

    // Option 1: play inline, inside the small thumbnail box
    var playBtn = thumb.querySelector('.video-play-btn');
    if(playBtn && inlineVideo){
      playBtn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        pauseAllInline();
        inlineVideo.muted = false;
        inlineVideo.controls = true;
        inlineVideo.play();
        thumb.classList.add('playing');
      });

      // Clicking the video itself while playing toggles pause/resume
      inlineVideo.addEventListener('click', function(e){
        e.stopPropagation();
      });

      inlineVideo.addEventListener('ended', function(){
        resetInline(thumb, inlineVideo);
      });
    }

    // Option 2: play fullscreen, in the lightbox
    var expandBtn = thumb.querySelector('.video-expand-btn');
    if(expandBtn){
      expandBtn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        if(inlineVideo) resetInline(thumb, inlineVideo);
        openLightbox(index);
      });
    }
  });

  function resetInline(thumb, video){
    thumb.classList.remove('playing');
    video.pause();
    video.controls = false;
    video.currentTime = 0;
    video.muted = true;
  }

  function pauseAllInline(){
    document.querySelectorAll('.route-thumb-video.playing').forEach(function(t){
      var v = t.querySelector('video');
      if(v) resetInline(t, v);
    });
  }

  function render(){
    var item = items[current];
    videoEl.src = item.videoSrc;
    videoEl.play();
    counterEl.textContent = (current + 1) + ' / ' + items.length;
  }

  function openLightbox(index){
    current = index;
    render();
    overlay.classList.add('open');
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    overlay.classList.remove('open');
    box.classList.remove('open');
    document.body.style.overflow = '';
    videoEl.pause();
    videoEl.src = '';
  }

  function showPrev(){ current = (current - 1 + items.length) % items.length; render(); }
  function showNext(){ current = (current + 1) % items.length; render(); }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  document.addEventListener('keydown', function(e){
    if(!box.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') showPrev();
    if(e.key === 'ArrowRight') showNext();
  });
})();

/* ===== EXPERIENCE COLLAGE PHOTO SLIDESHOW ===== */
(function(){
  var boxes = document.querySelectorAll('.experience-photo-main, .experience-photo-small');
  boxes.forEach(function(box, boxIndex){
    var slides = box.querySelectorAll('.slide-img');
    if(slides.length < 2) return;
    var current = 0;
    setInterval(function(){
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 4500 + boxIndex * 700); // slight offset so both boxes don't switch in perfect sync
  });
})();

/* ===== EXPERIENCE COLLAGE PHOTO LIGHTBOX ===== */
(function(){
  var overlay  = document.getElementById('photoLightboxOverlay');
  var box      = document.getElementById('photoLightbox');
  var closeBtn = document.getElementById('photoLightboxClose');
  var prevBtn  = document.getElementById('photoLightboxPrev');
  var nextBtn  = document.getElementById('photoLightboxNext');
  var imgEl    = document.getElementById('photoLightboxImg');
  var counterEl= document.getElementById('photoLightboxCounter');

  if(!overlay || !box) return;

  var thumbs = [];
  var current = 0;

  document.querySelectorAll('.experience-photo-clickable').forEach(function(thumb){
    var index = thumbs.length;
    thumbs.push(thumb);
    thumb.addEventListener('click', function(){ openLightbox(index); });
  });

  if(thumbs.length === 0) return;

  function activeImg(thumb){
    return thumb.querySelector('.slide-img.active') || thumb.querySelector('img');
  }

  function render(){
    var img = activeImg(thumbs[current]);
    if(!img) return;
    imgEl.setAttribute('src', img.getAttribute('src'));
    imgEl.setAttribute('alt', img.getAttribute('alt'));
    counterEl.textContent = (current + 1) + ' / ' + thumbs.length;
  }

  function openLightbox(index){
    current = index;
    render();
    overlay.classList.add('open');
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    overlay.classList.remove('open');
    box.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showPrev(){ current = (current - 1 + thumbs.length) % thumbs.length; render(); }
  function showNext(){ current = (current + 1) % thumbs.length; render(); }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  document.addEventListener('keydown', function(e){
    if(!box.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') showPrev();
    if(e.key === 'ArrowRight') showNext();
  });
})();

/* ===== ROUTE CARD "EXPLORE THIS ROUTE" LINKS -> BOOKING MODAL ===== */
(function(){
  document.querySelectorAll('.route-card .route-link').forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      if(window.openBookingModal) window.openBookingModal();
    });
  });
})();

/* ===== EXPERIENCE SHOWCASE CTA -> BOOKING MODAL ===== */
(function(){
  var btn = document.getElementById('experienceCtaBtn');
  if(!btn) return;
  btn.addEventListener('click', function(){
    if(window.openBookingModal) window.openBookingModal();
  });
})();
/* ===== PACKAGE TAG CHECKBOXES  LIVE PRICE UPDATE ===== */
(function(){
  var cardsWithPricedTags = [];
  document.querySelectorAll('.package-card').forEach(function(card){
    if(card.querySelector('.package-tags input[type="checkbox"][data-price]')) cardsWithPricedTags.push(card);
  });
  if(!cardsWithPricedTags.length) return;

  function lowestPricedCheckbox(card){
    var allPriced = Array.prototype.slice.call(card.querySelectorAll('.package-tags input[type="checkbox"][data-price]'));
    if(!allPriced.length) return null;
    return allPriced.reduce(function(min, cb){
      return (+cb.getAttribute('data-price') < +min.getAttribute('data-price')) ? cb : min;
    }, allPriced[0]);
  }

  // Ticks the cheapest tag on the card so it's selected (not just shown) by default.
  function selectDefaultTag(card){
    var lowest = lowestPricedCheckbox(card);
    if(lowest) lowest.checked = true;
  }

  function updateCardPrice(card){
    var nowEl = card.querySelector('.package-price .price-now');
    var wasEl = card.querySelector('.package-price .price-was');
    if(!nowEl) return;
    var small = nowEl.querySelector('small');
    var suffix = small ? small.outerHTML : '';

    var allPriced = Array.prototype.slice.call(card.querySelectorAll('.package-tags input[type="checkbox"][data-price]'));
    var checked = allPriced.filter(function(cb){ return cb.checked; });

    var nowTotal, wasTotal;

    if(checked.length){
      // one or more selected: show the combined total (and its combined discount)
      nowTotal = checked.reduce(function(sum, cb){ return sum + (+cb.getAttribute('data-price')); }, 0);
      wasTotal = checked.reduce(function(sum, cb){ return sum + (+(cb.getAttribute('data-was') || cb.getAttribute('data-price'))); }, 0);
    } else {
      // safety fallback if nothing ends up checked: default to the cheapest available option
      var lowest = lowestPricedCheckbox(card);
      nowTotal = lowest ? +lowest.getAttribute('data-price') : 0;
      wasTotal = lowest ? +(lowest.getAttribute('data-was') || nowTotal) : 0;
    }

    nowEl.innerHTML = '$' + nowTotal + suffix;
    if(wasEl){
      if(wasTotal > nowTotal){
        wasEl.textContent = '$' + wasTotal;
        wasEl.style.display = '';
      } else {
        wasEl.style.display = 'none';
      }
    }
  }

  cardsWithPricedTags.forEach(function(card){
    selectDefaultTag(card); // tick the cheapest option by default
    updateCardPrice(card);
    card.querySelectorAll('.package-tags input[type="checkbox"][data-price]').forEach(function(cb){
      cb.addEventListener('change', function(){ updateCardPrice(card); });
    });
  });

  document.querySelectorAll('.package-card .tag-clear-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var card = btn.closest('.package-card');
      if(!card) return;
      card.querySelectorAll('.package-tags input[type="checkbox"]').forEach(function(cb){
        cb.checked = false;
      });
      updateCardPrice(card);
    });
  });
})();

/* ===== CHOOSE YOUR RIDE  SEARCH, SORT, FILTER, VIEW TOGGLE ===== */
(function(){
  var checkboxes = document.querySelectorAll('.rides-filter input[type="checkbox"]');
  var grid = document.getElementById('packageGrid');
  var cards = document.querySelectorAll('#packageGrid .package-card');
  var emptyMsg = document.getElementById('ridesEmptyMsg');
  var resetBtn = document.getElementById('ridesFilterReset');
  var searchInput = document.getElementById('ridesSearchInput');
  var sortSelect = document.getElementById('ridesSortSelect');
  var viewListBtn = document.getElementById('ridesViewList');
  var viewGridBtn = document.getElementById('ridesViewGrid');
  if(!checkboxes.length || !cards.length) return;

  function activeValues(group){
    var vals = [];
    checkboxes.forEach(function(cb){
      if(cb.getAttribute('data-filter-group') === group && cb.checked) vals.push(cb.value);
    });
    return vals;
  }

  function cardSearchText(card){
    if(card._searchText) return card._searchText;
    var h3 = card.querySelector('h3');
    var p = card.querySelector('.package-info > p');
    var tags = card.querySelectorAll('.package-tags span');
    var keywords = card.getAttribute('data-keywords') || '';
    var parts = [h3 ? h3.textContent : '', p ? p.textContent : '', keywords];
    tags.forEach(function(t){ parts.push(t.textContent); });
    card._searchText = parts.join(' ').toLowerCase();
    return card._searchText;
  }

  function applyFilters(){
    var typeVals = activeValues('type');
    var styleVals = activeValues('style');
    var durationVals = activeValues('duration');
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var visibleCount = 0;

    cards.forEach(function(card){
      var matchesType = typeVals.length === 0 || typeVals.indexOf(card.getAttribute('data-type')) !== -1;
      var matchesStyle = styleVals.length === 0 || styleVals.indexOf(card.getAttribute('data-style')) !== -1;
      var matchesDuration = durationVals.length === 0 || durationVals.indexOf(card.getAttribute('data-duration')) !== -1;
      var matchesSearch = !query || cardSearchText(card).indexOf(query) !== -1;
      var show = matchesType && matchesStyle && matchesDuration && matchesSearch;
      card.classList.toggle('filtered-out', !show);
      if(show) visibleCount++;
    });

    if(emptyMsg) emptyMsg.classList.toggle('show', visibleCount === 0);
  }

  function applySort(){
    if(!sortSelect || !grid) return;
    var mode = sortSelect.value;
    var sorted = Array.prototype.slice.call(cards).sort(function(a, b){
      if(mode === 'priceAsc') return (+a.getAttribute('data-price')) - (+b.getAttribute('data-price'));
      if(mode === 'priceDesc') return (+b.getAttribute('data-price')) - (+a.getAttribute('data-price'));
      if(mode === 'popular') return (+b.getAttribute('data-popularity')) - (+a.getAttribute('data-popularity'));
      return (+a.getAttribute('data-order')) - (+b.getAttribute('data-order')); // recent (default)
    });
    sorted.forEach(function(card){ grid.appendChild(card); });
  }

  checkboxes.forEach(function(cb){
    cb.addEventListener('change', applyFilters);
  });

  if(resetBtn){
    resetBtn.addEventListener('click', function(){
      checkboxes.forEach(function(cb){ cb.checked = false; });
      if(searchInput) searchInput.value = '';
      applyFilters();
    });
  }

  if(searchInput){
    searchInput.addEventListener('input', applyFilters);
  }

  if(sortSelect){
    sortSelect.addEventListener('change', applySort);
  }

  if(viewListBtn && viewGridBtn && grid){
    viewListBtn.addEventListener('click', function(){
      grid.classList.remove('view-grid');
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
    });
    viewGridBtn.addEventListener('click', function(){
      grid.classList.add('view-grid');
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
    });
  }
})();

/* ===== BLOG  Load More button (no pagination yet, so just acknowledges the click) ===== */
(function(){
  var btn = document.getElementById('blogLoadMoreBtn');
  if(!btn) return;
  var caughtUpText = {
    en:"You're all caught up!", km:"អ្នកបានអានទាំងអស់ហើយ!", zh:"已经是全部内容啦！",
    ja:"すべて読み終わりました！", ko:"모두 확인하셨습니다!", vi:"Bạn đã xem hết rồi!", th:"อ่านครบทุกโพสต์แล้ว!"
  };
  btn.addEventListener('click', function(){
    var lang = (document.documentElement.getAttribute('lang') || 'en');
    btn.textContent = caughtUpText[lang] || caughtUpText.en;
    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'default';
  });
})();

/* ===== FOOTER  Back to top button ===== */
(function(){
  var btn = document.getElementById('backToTop');
  if(!btn) return;
  btn.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ===== ROLLING REVIEWS (What Riders Say) -- each box rotates independently ===== */
(function(){
  var grid = document.getElementById('reviewGrid');
  if(!grid) return;

  var slots = [
    document.getElementById('reviewSlot0'),
    document.getElementById('reviewSlot1'),
    document.getElementById('reviewSlot2')
  ];
  if(!slots[0] || !slots[1] || !slots[2]) return;

  // Add / edit reviewers here -- no HTML editing needed for new reviews.
  // Reviewer names/avatars stay as-is across languages (they're real people),
  // but every other visible field is pulled from the translations dictionary
  // via its i18n key so the carousel re-renders correctly when the language
  // changes. Add/edit the matching reviewN_text / reviewN_trip / reviewN_date
  // keys in every language block above when you edit a review here.
  var REVIEWS = [
    { id:1, name:"Tola Heab",  seed:"Tola-Heab",  bg:"ffd5b3", rating:5 },
    { id:2, name:"Bunna Rath", seed:"Bunna-Rath", bg:"b6e3f4", rating:5 },
    { id:3, name:"Vatei Soma", seed:"Vatei-Soma", bg:"c0f0d0", rating:5 },
    { id:4, name:"Sok Dara",   seed:"Sok-Dara",   bg:"ffe1a8", rating:5 },
    { id:5, name:"Maly Chan",  seed:"Maly-Chan",  bg:"f4c6d9", rating:5 },
    { id:6, name:"Pisach Ly",  seed:"Pisach-Ly",  bg:"d6c6f4", rating:5 }
  ];

  var AUTOPLAY_MS = 6000;          // how often each slot moves to its next review
  var STAGGER_MS = 2000;           // gap between one slot starting and the next

  function starIcons(n){
    var one = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    return one.repeat(n);
  }

  function escapeHTML(str){
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function cardHTML(r){
    var text = escapeHTML(t('review' + r.id + '_text'));
    var trip = escapeHTML(t('review' + r.id + '_trip'));
    var date = escapeHTML(t('review' + r.id + '_date'));
    var verified = escapeHTML(t('verified'));
    return (
      '<div class="review-card">' +
        '<div class="review-top">' +
          '<div class="stars">' + starIcons(r.rating) + '</div>' +
          '<span class="review-date">' + date + '</span>' +
        '</div>' +
        '<p>"' + text + '"</p>' +
        '<div class="reviewer">' +
          '<img class="avatar-photo" src="https://api.dicebear.com/9.x/avataaars/svg?seed=' + r.seed + '&backgroundColor=' + r.bg + '" alt="' + escapeHTML(r.name) + '">' +
          '<div class="reviewer-info"><strong>' + escapeHTML(r.name) + '</strong><span>' + trip + '</span></div>' +
          '<span class="verified-badge" title="' + verified + '"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>' + verified + '</span>' +
        '</div>' +
      '</div>'
    );
  }

  // One independent rolling carousel per slot/box.
  function makeSlotController(slotEl, startIndex){
    var idx = startIndex % REVIEWS.length;
    var intervalId = null;

    function paint(instant){
      var r = REVIEWS[idx % REVIEWS.length];
      var existingCard = slotEl.querySelector('.review-card');

      if(instant || !existingCard){
        slotEl.innerHTML = cardHTML(r);
        return;
      }

      // 1) roll this box's current card up and out
      existingCard.classList.add('roll-out');

      setTimeout(function(){
        // 2) swap in the new card, parked just below (no transition yet)
        slotEl.innerHTML = cardHTML(r);
        var newCard = slotEl.querySelector('.review-card');
        newCard.classList.add('roll-in-start');
        void newCard.offsetHeight; // force reflow so the class removal animates

        // 3) roll the new card up into place
        newCard.classList.remove('roll-in-start');
      }, 450);
    }

    function advance(){
      idx = (idx + 1) % REVIEWS.length;
      paint(false);
    }

    function start(){
      intervalId = setInterval(advance, AUTOPLAY_MS);
    }
    function stop(){
      clearInterval(intervalId);
    }

    paint(true);

    return { start: start, stop: stop, repaint: function(){ paint(true); } };
  }

  var controllers = [
    makeSlotController(slots[0], 0),
    makeSlotController(slots[1], 1),
    makeSlotController(slots[2], 2)
  ];

  // Stagger each box's autoplay start so they don't move in sync.
  controllers.forEach(function(ctrl, i){
    setTimeout(ctrl.start, i * STAGGER_MS);
  });

  // Re-render the currently visible card in each slot the instant the
  // language changes, instead of waiting for the next autoplay tick (which
  // could leave a card showing the old language for up to AUTOPLAY_MS).
  document.addEventListener('langchange', function(){
    controllers.forEach(function(ctrl){ ctrl.repaint(); });
  });

  // Pause all boxes on hover, resume on mouse-leave.
  var section = document.querySelector('.reviews');
  if(section){
    section.addEventListener('mouseenter', function(){
      controllers.forEach(function(ctrl){ ctrl.stop(); });
    });
    section.addEventListener('mouseleave', function(){
      controllers.forEach(function(ctrl, i){
        setTimeout(ctrl.start, i * STAGGER_MS);
      });
    });
  }
})();

/* ===== Quick contact popup: WhatsApp + Email at the same time ===== */
(function(){
  var WA_NUMBER = window.SR_WA_NUMBER || '85512610269';          // +855 012610269
  var EMAIL_TO  = 'siemride@gmail.com';
  // ---- Email copy for the team (the customer never sees this) ----
  // Pick ONE (first one filled in wins):
  //  1) APPS_SCRIPT_URL  - Google Apps Script web app that emails siemride@gmail.com AND logs every message in a Google Sheet (see Email-Setup/README.txt). Most reliable.
  //  2) WEB3FORMS_KEY    - free key from https://web3forms.com (enter siemride@gmail.com). No activation needed.
  //  3) neither          - FormSubmit fallback (needs a one-time activation click sent to siemride@gmail.com).
  var APPS_SCRIPT_URL = '';
  var WEB3FORMS_KEY = '';
  var ENDPOINT  = APPS_SCRIPT_URL || (WEB3FORMS_KEY ? 'https://api.web3forms.com/submit' : 'https://formsubmit.co/ajax/' + EMAIL_TO);

  var css = '' +
  '.qc-overlay{position:fixed;inset:0;z-index:700;background:rgba(14,28,12,.62);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;padding:14px}' +
  '.qc-overlay.open{display:flex;animation:qcFade .2s ease}' +
  '@keyframes qcFade{from{opacity:0}to{opacity:1}}@keyframes qcPop{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}' +
  '.qc-box{background:#fff;width:100%;max-width:430px;border-radius:22px;position:relative;box-shadow:0 30px 70px rgba(0,0,0,.4);font-family:"Work Sans",system-ui,sans-serif;max-height:94vh;overflow:auto;animation:qcPop .28s cubic-bezier(.2,.8,.2,1)}' +
  '.qc-head{background:linear-gradient(135deg,#3f8a2a 0%,#2C5E1A 55%,#1b3d10 100%);color:#fff;padding:24px 22px 20px;border-radius:22px 22px 0 0;position:relative;overflow:hidden}' +
  '.qc-head:after{content:"";position:absolute;right:-40px;top:-40px;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,.08)}' +
  '.qc-badge{width:46px;height:46px;border-radius:50%;background:#25D366;display:grid;place-items:center;margin-bottom:12px;box-shadow:0 6px 16px rgba(0,0,0,.25)}' +
  '.qc-close{position:absolute;top:10px;right:12px;z-index:2;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.16);border:0;font-size:22px;line-height:1;cursor:pointer;color:#fff;transition:background .2s}.qc-close:hover{background:rgba(255,255,255,.3)}' +
  '.qc-title{font-family:Anton,"Work Sans",sans-serif;font-size:26px;letter-spacing:.5px;margin:0 0 4px;text-transform:uppercase;font-weight:400}' +
  '.qc-sub{font-size:14px;color:rgba(255,255,255,.86);margin:0;line-height:1.4}' +
  '.qc-chips{display:flex;gap:8px;flex-wrap:wrap}.qc-chips span{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.28);border-radius:99px;padding:4px 11px 4px 8px;font-size:12px;font-weight:700}' +
  '.qc-form{padding:8px 22px 22px}' +
  '.qc-box label{display:block;font-size:11px;font-weight:700;color:#3F5C3B;margin:14px 0 5px;text-transform:uppercase;letter-spacing:.6px}' +
  '.qc-box input,.qc-box textarea{width:100%;box-sizing:border-box;border:1.5px solid #dfe6da;background:#f8faf6;border-radius:12px;padding:12px 14px;font:inherit;font-size:15px;color:#241f19;transition:border-color .2s,box-shadow .2s,background .2s}' +
  '.qc-box textarea{min-height:96px;resize:vertical}' +
  '.qc-box input:focus,.qc-box textarea:focus{outline:0;border-color:#2C5E1A;background:#fff;box-shadow:0 0 0 4px rgba(44,94,26,.12)}' +
  '.qc-send{display:flex;align-items:center;justify-content:center;gap:10px;margin:20px 0 0;width:100%;background:linear-gradient(135deg,#2fd06d 0%,#25D366 50%,#1ba84f 100%);color:#fff;border:0;border-radius:99px;padding:14px 24px;font:inherit;font-weight:800;font-size:16px;letter-spacing:.3px;cursor:pointer;box-shadow:0 10px 22px rgba(37,211,102,.4),inset 0 1px 0 rgba(255,255,255,.35);transition:transform .15s,box-shadow .15s}.qc-send:hover{transform:translateY(-2px);box-shadow:0 14px 28px rgba(37,211,102,.5),inset 0 1px 0 rgba(255,255,255,.35)}' +
  '.qc-send:disabled{opacity:.65;cursor:wait;transform:none}' +
  '.qc-note{font-size:12px;color:#7a7f75;margin:12px 0 0;text-align:center;line-height:1.4}' +
  '.qc-msg{font-size:13px;margin:10px 0 0;text-align:center;color:#2C5E1A;font-weight:600}.qc-msg:empty{display:none}.qc-msg a{color:#2E5590;text-decoration:underline}';

  // Strictly enforce that EVERY WhatsApp link, click, and popup across the entire site
  // sends messages ONLY to +855 12 610 269 (85512610269)
  function enforceWhatsAppTargets(){
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach(function(a){
      if(!a.href) return;
      a.href = a.href.replace(/(wa\.me\/)\d+/, '$1' + WA_NUMBER)
                     .replace(/([?&]phone=)\d+/, '$1' + WA_NUMBER);
    });
  }
  enforceWhatsAppTargets();
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', enforceWhatsAppTargets);
  }

  // Intercept any click targeting WhatsApp and guarantee destination is +855 12 610 269
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
    if(!a || !a.href) return;
    a.href = a.href.replace(/(wa\.me\/)\d+/, '$1' + WA_NUMBER)
                   .replace(/([?&]phone=)\d+/, '$1' + WA_NUMBER);
  }, true);

  // Wrap window.open so any programmatic WhatsApp message opens ONLY to +855 12 610 269
  (function(){
    var _origOpen = window.open;
    window.open = function(url, target, features){
      if(typeof url === 'string' && (url.indexOf('wa.me') !== -1 || url.indexOf('whatsapp.com') !== -1)){
        url = url.replace(/(wa\.me\/)\d+/, '$1' + WA_NUMBER)
                 .replace(/([?&]phone=)\d+/, '$1' + WA_NUMBER);
      }
      return _origOpen.call(window, url, target, features);
    };
  })();

  // Logo interactivity: clicking footer logo scrolls smoothly to top
  document.addEventListener('click', function(e){
    var fl = e.target.closest && e.target.closest('.footer-logo');
    if(fl && fl.tagName !== 'A'){
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  });
  

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.className = 'qc-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML =
    '<div class="qc-box">' +
      '<button type="button" class="qc-close" aria-label="Close">&times;</button>' +
      '<div class="qc-head">' +
        '<div class="qc-badge"><svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>' +
        '<h3 class="qc-title" data-i18n="qc_title">Contact SiemRide</h3>' +
        '<p class="qc-sub" data-i18n="qc_sub">Send us your question and we will reply as soon as possible.</p>' +
      '</div>' +
      '<form class="qc-form" novalidate>' +
        '<label for="qc-name" data-i18n="qc_name">Your name</label><input id="qc-name" name="name" type="text" required autocomplete="name">' +
        '<label for="qc-email" data-i18n="qc_email">Your email (optional)</label><input id="qc-email" name="email" type="email" inputmode="email" autocomplete="email">' +
        '<label for="qc-phone" data-i18n="qc_phone">Your phone / WhatsApp (optional)</label><input id="qc-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel">' +
        '<label for="qc-text" data-i18n="qc_message">Message</label><textarea id="qc-text" name="message" required data-i18n-placeholder="qc_ph" placeholder="Tour or rental, date, number of people..."></textarea>' +
        '<button type="submit" class="qc-send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg><span data-i18n="qc_send">Send</span></button>' +
        '<p class="qc-note" data-i18n="qc_note">WhatsApp will open with your message ready. Please press Send there.</p>' +
        '<p class="qc-msg" aria-live="polite"></p>' +
      '</form>' +
    '</div>';
  document.body.appendChild(overlay);
  if(window.SR) SR.refresh(overlay);

  var form = overlay.querySelector('.qc-form');
  var msg = overlay.querySelector('.qc-msg');
  var sendBtn = overlay.querySelector('.qc-send');

  // Pre-fill from what this customer typed last time (saved only on their own device)
  function loadSaved(){
    try{
      var d = JSON.parse(localStorage.getItem('qc_contact') || '{}');
      ['name','email','phone'].forEach(function(k){ if(d[k] && !form[k].value) form[k].value = d[k]; });
    }catch(e){}
  }
  function saveContact(n, em, ph){
    try{ localStorage.setItem('qc_contact', JSON.stringify({name:n, email:em, phone:ph})); }catch(e){}
  }


  // Send the team copy; resolves true when the service accepted it
  function sendEmail(payload){
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function(){ ctrl.abort(); }, 20000) : null;
    var opts = { method: 'POST', signal: ctrl ? ctrl.signal : undefined };
    if(APPS_SCRIPT_URL){
      // Apps Script cannot answer cross-site reads, so send "blind" (text/plain avoids a pre-flight)
      opts.mode = 'no-cors'; opts.headers = { 'Content-Type': 'text/plain;charset=utf-8' }; opts.body = JSON.stringify(payload);
      return fetch(ENDPOINT, opts).then(function(){ return true; }, function(err){ if(window.console) console.warn('Email not sent:', err); return false; })
        .then(function(r){ if(timer) clearTimeout(timer); return r; });
    }
    opts.headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }; opts.body = JSON.stringify(payload);
    return fetch(ENDPOINT, opts).then(function(r){ return r.json().catch(function(){ return {}; }); })
      .then(function(d){
        var ok = !!d && (d.success === true || d.success === 'true');
        if(!ok && window.console) console.warn('Email service said:', d && d.message);
        return ok;
      }, function(err){ if(window.console) console.warn('Email not sent:', err); return false; })
      .then(function(r){ if(timer) clearTimeout(timer); return r; });
  }
  // If sending fails (offline, service hiccup), keep the message on this device and retry on the next visit
  function queueEmail(payload){
    try{ var q = JSON.parse(localStorage.getItem('qc_pending') || '[]'); q.push(payload); localStorage.setItem('qc_pending', JSON.stringify(q.slice(-10))); }catch(e){}
  }
  function flushQueue(){
    var q; try{ q = JSON.parse(localStorage.getItem('qc_pending') || '[]'); }catch(e){ return; }
    if(!q.length) return;
    try{ localStorage.removeItem('qc_pending'); }catch(e){}
    q.reduce(function(chain, pl){ return chain.then(function(){ return sendEmail(pl).then(function(ok){ if(!ok) queueEmail(pl); }); }); }, Promise.resolve());
  }
  setTimeout(flushQueue, 3000);

  function open(){ loadSaved(); overlay.classList.add('open'); msg.textContent = ''; setTimeout(function(){ form.name.focus(); }, 50); }
  function close(){ overlay.classList.remove('open'); }

  overlay.querySelector('.qc-close').addEventListener('click', close);
  overlay.addEventListener('click', function(e){ if(e.target === overlay) close(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });

  // Intercept the top-bar phone button and the green floating bubble
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('.wa-float');
    if(!a) return;
    e.preventDefault();
    e.stopPropagation();
    open();
  }, true);

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = form.name.value.trim();
    var text = form.message.value.trim();
    if(!name || !text){ msg.textContent = t('qc_err'); return; }
    var email = form.email.value.trim();
    var phone = form.phone.value.trim();
    saveContact(name, email, phone);

    var sig = name + (phone ? ' | ' + phone : '') + (email ? ' | ' + email : '');
    var wa = text + '\n\n- ' + sig;

    // Open WhatsApp synchronously (avoids popup blockers)
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(wa), '_blank', 'noopener');

    sendBtn.disabled = true;
    var payload = {
      message: text, name: name, phone: phone || 'not provided', email: email || 'not provided',
      page: location.href,
      _subject: 'SiemRide message from ' + name,
      _template: 'box', _captcha: 'false'
    };
    if(email) payload._replyto = email;
    if(WEB3FORMS_KEY){ payload.access_key = WEB3FORMS_KEY; payload.subject = payload._subject; payload.from_name = 'SiemRide website'; payload.replyto = email || ''; }

    sendEmail(payload).then(function(ok){
      if(ok){ msg.textContent = t('qc_ok'); form.message.value = ''; setTimeout(close, 2500); }
      else { queueEmail(payload); msg.textContent = t('qc_wa_opened'); }
    }).then(function(){ sendBtn.disabled = false; });
  });
})();


// Keep the header fixed and readable on hero pages (home + tour pages)
(function () {
  var header = document.querySelector('header');
  var hero = document.querySelector('.hero');
  if (!header || !hero || !hero.children.length) return;
  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();

/* HDRVAR: keep --hdr-h in sync with the sticky header (sticky tab bars sit right under it) and add a shadow once scrolled */
(function(){
  var h = document.querySelector('header');
  if(!h) return;
  function setH(){ document.documentElement.style.setProperty('--hdr-h', h.offsetHeight + 'px'); }
  function sc(){ h.classList.toggle('scrolled', window.scrollY > 30); }
  setH(); sc();
  window.addEventListener('resize', setH);
  window.addEventListener('load', setH);
  window.addEventListener('scroll', sc, { passive: true });
  if(window.ResizeObserver) new ResizeObserver(setH).observe(h);
})();

/* Contact us (side menu) -> load and open the SiemRide assistant on demand */
(function(){
  var me = document.querySelector('script[src*="JavaScript/script.js"]');
  var base = me ? me.src.replace(/script\.js.*$/, '') : 'JavaScript/';
  function load(src, cb){ var s=document.createElement('script'); s.src=src; s.onload=cb; s.onerror=function(){ window.open('https://wa.me/'+(window.SR_WA_NUMBER||'85512610269'),'_blank','noopener'); }; document.head.appendChild(s); }
  function openAssistant(){
    var panelClose = document.getElementById('panelClose'); if(panelClose) panelClose.click();
    if(window.SR_ASSISTANT) return window.SR_ASSISTANT.open();
    load(base + 'assistant-data.js', function(){ load(base + 'assistant.js', function(){ if(window.SR_ASSISTANT) window.SR_ASSISTANT.open(); }); });
  }
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('.sr-contact-btn'); if(!b) return;
    e.preventDefault(); openAssistant();
  });
})();

/* Specular Flare & Amber Line Cursor Tracking */
(function() {
  function initNavUnderline() {
    var mainNav = document.getElementById('mainNav');
    if (!mainNav) return;

    var navLinks = mainNav.querySelectorAll('ul > li > a');
    var bottomAmberLine = document.getElementById('bottomAmberLine');
    if (!navLinks.length || !bottomAmberLine) return;

    function updatePosition(targetLink) {
      if (!targetLink) return;

      var navRect = mainNav.getBoundingClientRect();
      if (!navRect.width) return;

      var textRect;
      if (document.createRange) {
        try {
          var range = document.createRange();
          range.selectNodeContents(targetLink);
          textRect = range.getBoundingClientRect();
        } catch(e) {
          textRect = targetLink.getBoundingClientRect();
        }
      } else {
        textRect = targetLink.getBoundingClientRect();
      }

      if (!textRect || !textRect.width) {
        textRect = targetLink.getBoundingClientRect();
      }

      var lineWidth = Math.round(textRect.width);
      var lineLeft = Math.round(textRect.left - navRect.left);

      bottomAmberLine.style.width = lineWidth + 'px';
      bottomAmberLine.style.transform = 'translateX(' + lineLeft + 'px)';
      bottomAmberLine.style.opacity = '1';
    }

    function getActiveLink() {
      return mainNav.querySelector('ul > li > a.active') || navLinks[0];
    }

    window.SR_UPDATE_NAV = function() {
      updatePosition(getActiveLink());
    };

    // Initial alignment with multiple fallbacks for font-loading
    setTimeout(window.SR_UPDATE_NAV, 60);
    setTimeout(window.SR_UPDATE_NAV, 260);
    setTimeout(window.SR_UPDATE_NAV, 600);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(window.SR_UPDATE_NAV);
    }

    // Hover & Click listeners
    navLinks.forEach(function(link) {
      link.addEventListener('mouseenter', function(e) {
        updatePosition(e.currentTarget);
      });
      link.addEventListener('click', function(e) {
        var href = e.currentTarget.getAttribute('href') || '';
        if (href.startsWith('#')) {
          navLinks.forEach(function(l) { l.classList.remove('active'); });
          e.currentTarget.classList.add('active');
          updatePosition(e.currentTarget);
        }
      });
    });

    // Reset to active link on mouse leave
    mainNav.addEventListener('mouseleave', function() {
      updatePosition(getActiveLink());
    });

    // Window resize
    window.addEventListener('resize', function() {
      updatePosition(getActiveLink());
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavUnderline);
  } else {
    initNavUnderline();
  }
})();
