/* Sport Endorse - brands.html "try it" opportunity-wizard section
   (carved from sport-endorse-homepage_v14; only section#try ships).
   Applicant headshots live in images/pitch/ - never embedded. */
(function(){"use strict";

const A=[
["Cian Doyle","Rugby","Ireland","Olympic / Pro",148,5.8,3800,["Fitness & running","Families","Business / B2B"],0],
["Róisín Murphy","Camogie","Ireland","Rising star",74,8.1,1600,["Families","Gen Z / students","Health & nutrition"],3],
["Seán Byrne","Gaelic Football","Ireland","Olympic / Pro",210,6.4,4500,["Families","Business / B2B"],null],
["Aoife Walsh","Leichtathletik","Ireland","Olympic / Pro",96,7.2,2800,["Fitness & running","Health & nutrition"],null],
["Niamh Kelly","Hockey","Ireland","College / NIL",22,11.3,600,["Gen Z / students","Fitness & running"],null],
["Darragh Ryan","Boxen","Ireland","Rising star",58,9.0,1400,["Fitness & running","Gen Z / students"],null],
["Ellen O'Neill","Rudern","Ireland","Olympic / Pro",64,6.9,2200,["Outdoor & adventure","Health & nutrition"],null],
["Amara Kellett","Leichtathletik","UK","Olympic / Pro",312,5.1,6000,["Fitness & running","Health & nutrition","Gen Z / students"],1],
["Jack Holloway","Football","UK","Olympic / Pro",540,3.9,12000,["Gen Z / students","Families"],null],
["Priya Shah","Cricket","UK","Rising star",88,7.7,2100,["Families","Business / B2B"],null],
["Lena Brooks","Triathlon","UK","Rising star",41,9.6,1200,["Fitness & running","Outdoor & adventure","Health & nutrition"],null],
["Ollie Grant","Rugby","UK","Olympic / Pro",175,5.5,4200,["Fitness & running","Business / B2B"],null],
["Maya Fenwick","Klettern","UK","College / NIL",19,12.4,500,["Outdoor & adventure","Gen Z / students"],null],
["Harry Pike","Tennis","UK","Rising star",66,6.8,1900,["Families","Business / B2B"],null],
["Tom Reyes","Golf","USA","Olympic / Pro",96,4.9,4500,["Business / B2B","Families"],2],
["Jordan Miles","Basketball","USA","College / NIL",134,10.2,3000,["Gen Z / students","Fitness & running"],null],
["Kayla Brooks","Soccer","USA","College / NIL",78,11.0,1800,["Gen Z / students","Health & nutrition"],null],
["Marcus Lee","Leichtathletik","USA","Olympic / Pro",420,4.4,9000,["Fitness & running","Health & nutrition"],null],
["Tyler Ward","American Football","USA","College / NIL",205,8.7,4200,["Gen Z / students","Families"],null],
["Sofia Alvarez","Tennis","USA","Rising star",150,6.3,3500,["Health & nutrition","Families"],null],
["Chloe Grant","Surfing","USA","Rising star",92,8.9,2400,["Outdoor & adventure","Gen Z / students"],null],
["Jonas Weber","Leichtathletik","Germany","Olympic / Pro",188,5.6,4200,["Fitness & running","Health & nutrition"],null],
["Lea Hoffmann","Triathlon","Germany","Rising star",54,8.8,1500,["Fitness & running","Outdoor & adventure"],null],
["Felix Braun","Football","Germany","Rising star",230,4.8,5200,["Gen Z / students","Families"],null],
["Mia Schneider","Handball","Germany","Olympic / Pro",61,7.4,1900,["Families","Business / B2B"],null],
["Paul Richter","Radsport","Germany","Olympic / Pro",120,6.1,3300,["Outdoor & adventure","Fitness & running"],null],
["Hannah Vogel","Schwimmen","Germany","College / NIL",28,10.6,700,["Health & nutrition","Gen Z / students"],null],
["Sipho Ndlovu","Rugby","South Africa","College / NIL",45,12.1,900,["Gen Z / students","Families"],null],
["Thabo Mokoena","Rugby","South Africa","Olympic / Pro",260,5.3,5000,["Fitness & running","Families","Business / B2B"],null],
["Zanele Dube","Leichtathletik","South Africa","Rising star",72,8.5,1700,["Fitness & running","Health & nutrition"],null],
["Kyle van Wyk","Cricket","South Africa","Olympic / Pro",310,4.6,6500,["Families","Business / B2B"],null],
["Lerato Khumalo","Netball","South Africa","Rising star",39,9.9,1000,["Families","Gen Z / students"],null],
["Ruan Botha","Surfing","South Africa","Rising star",57,9.3,1400,["Outdoor & adventure","Gen Z / students"],null],
["Ciara Doherty","Golf","Ireland","Rising star",33,8.2,1100,["Business / B2B","Health & nutrition"],null],
["Ethan Clarke","Radsport","UK","Rising star",47,8.4,1300,["Outdoor & adventure","Fitness & running"],null],
["Grace Liu","Schwimmen","USA","Olympic / Pro",280,5.0,7000,["Health & nutrition","Families"],null],
].map(([name,sport,market,tier,reach,eng,fee,aud,img],i)=>({id:i,name,sport,market,tier,reach,eng,fee,aud,img}));
const GOAL_AUD={"Product launch":["Fitness & running","Gen Z / students"],"Brand awareness":["Families","Gen Z / students"],"Staff wellbeing":["Business / B2B","Health & nutrition"],"Student recruitment":["Gen Z / students"]};
const sports=[...new Set(A.map(a=>a.sport))].sort();
/* Only the #try section ships on brands.html; other v14 widgets' wiring must
   no-op instead of crashing, so $ returns an absorbing stub for missing nodes. */
const NOOP=new Proxy(function(){return NOOP},{get:(t,k)=>k===Symbol.toPrimitive?()=>"":NOOP,set:()=>true,apply:()=>NOOP,has:()=>true});
const $=s=>document.querySelector(s)||NOOP,$$=s=>[...document.querySelectorAll(s)];
const eur=n=>"€"+n.toLocaleString("de-DE");
const ini=n=>n.split(" ").map(w=>w[0]).join("");
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("show");clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove("show"),2600)}

// hero counters
$$("[data-count]").forEach(el=>{const t=+el.dataset.count;let s=null;const f=ts=>{s??=ts;const p=Math.min((ts-s)/1400,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3))).toLocaleString()+(p===1?"+":"");if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)});

// ---------- DIRECTORY ----------
const DIRCOUNTS=[["All sports","9,214",""],["Football","1,240","Football"],["Rugby","860","Rugby"],["Leichtathletik","790","Leichtathletik"],["Tennis","610","Tennis"],["Golf","420","Golf"],["Other 270+","5,294","other"]];
let dirSel="";
function renderDir(){
  $("#sportlist").innerHTML=DIRCOUNTS.map(([l,c,k])=>`<div class="row ${k===dirSel?"on":""}" data-k="${k}"><span>${l}</span><b>${c}</b></div>`).join("");
  $$("#sportlist .row").forEach(r=>r.onclick=()=>{dirSel=r.dataset.k;renderDir()});
  const main=["Football","Rugby","Leichtathletik","Tennis","Golf"];
  let rows=A.filter(a=>!dirSel||(dirSel==="other"?!main.includes(a.sport):a.sport===dirSel)).sort((a,b)=>b.reach-a.reach).slice(0,7);
  $("#dirbody").innerHTML=rows.map(a=>`<tr><td><div class="who"><span class="av">${ini(a.name)}</span><b>${a.name}</b></div></td><td>${a.sport}</td><td>${a.market}</td><td>${a.reach}k</td><td>${a.eng}%</td><td><span class="tag">✓ Verifiziert</span></td></tr>`).join("");
}
renderDir();

// ---------- OLD WAY ----------
const bits=["Instagram DMs","Email","WhatsApp","Social media","PDFs","Spreadsheets","Links","Reports"];
const pos=[[10,5],[260,20],[60,90],[300,110],[20,190],[210,200],[120,270],[330,280]];
$("#scatter").innerHTML=bits.map((b,i)=>{const r=(i%2?1:-1)*(6+i*2);return `<span style="left:${pos[i][0]}px;top:${pos[i][1]}px;transform:rotate(${r}deg) translate(${(i%3-1)*14}px,0)">${b}</span>`}).join("");
let tidy=false;
$("#tidybtn").onclick=()=>{tidy=!tidy;$$("#scatter span").forEach((s,i)=>{if(tidy){s.dataset.o=s.getAttribute("style");s.style.left=(i%2?210:10)+"px";s.style.top=(Math.floor(i/2)*62+40)+"px";s.style.transform="none";s.style.borderColor="#FFCE00";s.style.width="190px";s.textContent="✓ "+bits[i]}else{s.setAttribute("style",s.dataset.o);s.textContent=bits[i]}});$("#tidybtn").textContent=tidy?"Show the old way ←":"Put it in one place →"};

// ---------- STEPS ----------
const ST=[["Discover","Search 12,000+ verified athletes by sport, market and audience."],["Match","Fit scores rank talent against your brief."],["Connect","Message athletes and reps directly in-app."],["Agree","Deliverables, rights and approvals signed digitally."],["Pay","Funds held until delivery. Multi-currency payouts."],["Measure","Campaign results measured through our integrated measurement partner."]];
$("#steps").innerHTML=ST.map(([t,d],i)=>`<div class="step ${i===0?"on":""}"><small>0${i+1}</small><h3>${t}</h3><p>${d}</p></div>`).join("");
let si=0;const stepTimer=setInterval(()=>{si=(si+1)%6;$$(".step").forEach((s,i)=>s.classList.toggle("on",i===si))},1800);
$$(".step").forEach((s,i)=>s.onmouseenter=()=>{clearInterval(stepTimer);$$(".step").forEach((x,j)=>x.classList.toggle("on",i===j))});

// ---------- TRY IT: real flow · Details → Target → Athletes apply → Applicants → Deals ----------
const COMM=0.18; // platform example: $25,000 budget → $20,500 athlete fee
const COUNTRIES=["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Côte d'Ivoire", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "DR Congo", "Ecuador", "Egypt", "El Salvador", "England", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Northern Ireland", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Saudi Arabia", "Scotland", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "São Tomé and Príncipe", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Wales", "Yemen", "Zambia", "Zimbabwe"];
const MK={"United States":"USA","United Kingdom":"UK"}; // sample-pool market names
const CITY={"Argentina": ["Buenos Aires", "Córdoba", "La Plata", "Mar del Plata", "Mendoza", "Rosario", "Salta", "Santa Fe", "Tucumán"], "Australia": ["Adelaide", "Brisbane", "Canberra", "Darwin", "Geelong", "Gold Coast", "Hobart", "Melbourne", "Newcastle", "Perth", "Sydney", "Townsville"], "Austria": ["Graz", "Innsbruck", "Klagenfurt", "Linz", "Salzburg", "Vienna"], "Belgium": ["Antwerp", "Bruges", "Brussels", "Charleroi", "Ghent", "Leuven", "Liège"], "Brazil": ["Belo Horizonte", "Brasília", "Curitiba", "Fortaleza", "Manaus", "Porto Alegre", "Recife", "Rio de Janeiro", "Salvador", "São Paulo"], "Bulgaria": ["Burgas", "Plovdiv", "Ruse", "Sofia", "Varna"], "Canada": ["Calgary", "Edmonton", "Halifax", "Hamilton", "Montreal", "Ottawa", "Quebec City", "Toronto", "Vancouver", "Victoria", "Winnipeg"], "Chile": ["Antofagasta", "Concepción", "Santiago", "Valparaíso", "Viña del Mar"], "China": ["Beijing", "Chengdu", "Chongqing", "Guangzhou", "Hangzhou", "Nanjing", "Shanghai", "Shenzhen", "Wuhan", "Xi'an"], "Croatia": ["Dubrovnik", "Osijek", "Rijeka", "Split", "Zadar", "Zagreb"], "Czech Republic": ["Brno", "Olomouc", "Ostrava", "Plzeň", "Prague"], "Denmark": ["Aalborg", "Aarhus", "Copenhagen", "Esbjerg", "Odense"], "Egypt": ["Alexandria", "Cairo", "Giza", "Luxor", "Port Said", "Sharm El Sheikh"], "Fiji": ["Labasa", "Lautoka", "Nadi", "Suva"], "Finland": ["Espoo", "Helsinki", "Oulu", "Tampere", "Turku"], "France": ["Bordeaux", "Lille", "Lyon", "Marseille", "Montpellier", "Nantes", "Nice", "Paris", "Rennes", "Strasbourg", "Toulouse"], "Germany": ["Berlin", "Bremen", "Cologne", "Dortmund", "Dresden", "Düsseldorf", "Frankfurt", "Hamburg", "Hanover", "Leipzig", "Munich", "Stuttgart"], "Ghana": ["Accra", "Cape Coast", "Kumasi", "Takoradi", "Tamale"], "Greece": ["Athens", "Heraklion", "Larissa", "Patras", "Thessaloniki"], "Hungary": ["Budapest", "Debrecen", "Győr", "Pécs", "Szeged"], "Iceland": ["Akureyri", "Hafnarfjörður", "Kópavogur", "Reykjavík"], "India": ["Ahmedabad", "Bengaluru", "Chennai", "Delhi", "Hyderabad", "Jaipur", "Kolkata", "Lucknow", "Mumbai", "Pune"], "Ireland": ["Athlone", "Cork", "Drogheda", "Dublin", "Dundalk", "Galway", "Kilkenny", "Killarney", "Limerick", "Sligo", "Waterford"], "Israel": ["Beersheba", "Haifa", "Jerusalem", "Netanya", "Tel Aviv"], "Italy": ["Bari", "Bologna", "Florence", "Genoa", "Milan", "Naples", "Palermo", "Rome", "Turin", "Venice", "Verona"], "Jamaica": ["Kingston", "Montego Bay", "Ocho Rios", "Portmore", "Spanish Town"], "Japan": ["Fukuoka", "Hiroshima", "Kobe", "Kyoto", "Nagoya", "Osaka", "Sapporo", "Sendai", "Tokyo", "Yokohama"], "Kenya": ["Eldoret", "Iten", "Kisumu", "Mombasa", "Nairobi", "Nakuru"], "Malawi": ["Blantyre", "Lilongwe", "Mzuzu", "Zomba"], "Mexico": ["Cancún", "Guadalajara", "León", "Mexico City", "Monterrey", "Mérida", "Puebla", "Tijuana"], "Morocco": ["Agadir", "Casablanca", "Fez", "Marrakesh", "Rabat", "Tangier"], "Netherlands": ["Amsterdam", "Eindhoven", "Groningen", "Rotterdam", "The Hague", "Tilburg", "Utrecht"], "New Zealand": ["Auckland", "Christchurch", "Dunedin", "Hamilton", "Napier", "Tauranga", "Wellington"], "Nigeria": ["Abuja", "Benin City", "Enugu", "Ibadan", "Kano", "Lagos", "Port Harcourt"], "Norway": ["Bergen", "Oslo", "Stavanger", "Tromsø", "Trondheim"], "Poland": ["Gdańsk", "Katowice", "Kraków", "Poznań", "Warsaw", "Wrocław", "Łódź"], "Portugal": ["Braga", "Coimbra", "Faro", "Funchal", "Lisbon", "Porto"], "Qatar": ["Al Rayyan", "Al Wakrah", "Doha", "Lusail"], "Romania": ["Brașov", "Bucharest", "Cluj-Napoca", "Constanța", "Iași", "Timișoara"], "Samoa": ["Apia", "Salelologa"], "Saudi Arabia": ["Dammam", "Jeddah", "Khobar", "Mecca", "Medina", "Riyadh"], "Scotland": ["Aberdeen", "Dundee", "Edinburgh", "Glasgow", "Inverness", "Perth", "Stirling"], "Serbia": ["Belgrade", "Kragujevac", "Niš", "Novi Sad"], "Singapore": ["Singapore"], "Slovakia": ["Bratislava", "Košice", "Prešov", "Žilina"], "Slovenia": ["Celje", "Koper", "Ljubljana", "Maribor"], "South Africa": ["Bloemfontein", "Cape Town", "Durban", "East London", "Johannesburg", "Polokwane", "Port Elizabeth (Gqeberha)", "Pretoria", "Stellenbosch"], "South Korea": ["Busan", "Daegu", "Daejeon", "Gwangju", "Incheon", "Seoul"], "Spain": ["Alicante", "Barcelona", "Bilbao", "Las Palmas", "Madrid", "Málaga", "Palma", "San Sebastián", "Seville", "Valencia", "Zaragoza"], "Sweden": ["Gothenburg", "Malmö", "Stockholm", "Uppsala", "Västerås", "Örebro"], "Switzerland": ["Basel", "Bern", "Geneva", "Lausanne", "Lucerne", "Zurich"], "Tonga": ["Neiafu", "Nuku'alofa"], "Turkey": ["Adana", "Ankara", "Antalya", "Bursa", "Istanbul", "Izmir"], "Uganda": ["Entebbe", "Gulu", "Jinja", "Kampala", "Mbarara"], "Ukraine": ["Dnipro", "Kharkiv", "Kyiv", "Lviv", "Odesa", "Zaporizhzhia"], "United Arab Emirates": ["Abu Dhabi", "Ajman", "Al Ain", "Dubai", "Sharjah"], "United Kingdom": ["Belfast", "Birmingham", "Brighton", "Bristol", "Cardiff", "Edinburgh", "Glasgow", "Leeds", "Leicester", "Liverpool", "London", "Manchester", "Newcastle", "Nottingham", "Sheffield", "Southampton"], "United States": ["Atlanta", "Austin", "Boston", "Charlotte", "Chicago", "Columbus", "Dallas", "Denver", "Detroit", "Houston", "Indianapolis", "Jacksonville", "Las Vegas", "Los Angeles", "Miami", "Minneapolis", "Nashville", "New Orleans", "New York", "Philadelphia", "Phoenix", "Portland", "Salt Lake City", "San Antonio", "San Diego", "San Francisco", "Seattle", "Washington DC"], "Uruguay": ["Montevideo", "Paysandú", "Punta del Este", "Salto"], "Wales": ["Bangor", "Cardiff", "Newport", "Swansea", "Wrexham"], "Zimbabwe": ["Bulawayo", "Gweru", "Harare", "Mutare"], "Afghanistan": ["Kabul"], "Albania": ["Tirana"], "Algeria": ["Algiers"], "Andorra": ["Andorra la Vella"], "Angola": ["Luanda"], "Antigua and Barbuda": ["St. John's"], "Armenia": ["Yerevan"], "Azerbaijan": ["Baku"], "Bahamas": ["Nassau"], "Bahrain": ["Manama"], "Bangladesh": ["Chittagong", "Dhaka"], "Barbados": ["Bridgetown"], "Belarus": ["Minsk"], "Belize": ["Belize City", "Belmopan"], "Benin": ["Cotonou", "Porto-Novo"], "Bhutan": ["Thimphu"], "Bolivia": ["Cochabamba", "La Paz", "Santa Cruz"], "Bosnia and Herzegovina": ["Banja Luka", "Sarajevo"], "Botswana": ["Francistown", "Gaborone"], "Brunei": ["Bandar Seri Begawan"], "Burkina Faso": ["Ouagadougou"], "Burundi": ["Bujumbura", "Gitega"], "Cabo Verde": ["Praia"], "Cambodia": ["Phnom Penh", "Siem Reap"], "Cameroon": ["Douala", "Yaoundé"], "Central African Republic": ["Bangui"], "Chad": ["N'Djamena"], "Colombia": ["Barranquilla", "Bogotá", "Cali", "Cartagena", "Medellín"], "Comoros": ["Moroni"], "Congo": ["Brazzaville", "Pointe-Noire"], "Costa Rica": ["Limón", "San José"], "Côte d'Ivoire": ["Abidjan", "Yamoussoukro"], "Cuba": ["Havana", "Santiago de Cuba"], "Cyprus": ["Larnaca", "Limassol", "Nicosia"], "DR Congo": ["Kinshasa", "Lubumbashi"], "Djibouti": ["Djibouti"], "Dominica": ["Roseau"], "Dominican Republic": ["Santiago", "Santo Domingo"], "Ecuador": ["Cuenca", "Guayaquil", "Quito"], "El Salvador": ["San Salvador"], "England": ["Birmingham", "Bristol", "Leeds", "Liverpool", "London", "Manchester", "Newcastle", "Sheffield"], "Equatorial Guinea": ["Malabo"], "Eritrea": ["Asmara"], "Estonia": ["Tallinn", "Tartu"], "Eswatini": ["Mbabane"], "Ethiopia": ["Addis Ababa"], "Gabon": ["Libreville"], "Gambia": ["Banjul"], "Georgia": ["Batumi", "Tbilisi"], "Grenada": ["St. George's"], "Guatemala": ["Guatemala City"], "Guinea": ["Conakry"], "Guinea-Bissau": ["Bissau"], "Guyana": ["Georgetown"], "Haiti": ["Port-au-Prince"], "Honduras": ["San Pedro Sula", "Tegucigalpa"], "Indonesia": ["Bali (Denpasar)", "Bandung", "Jakarta", "Surabaya"], "Iran": ["Isfahan", "Mashhad", "Tehran"], "Iraq": ["Baghdad", "Basra", "Erbil"], "Kazakhstan": ["Almaty", "Astana"], "Kiribati": ["Tarawa"], "Kosovo": ["Pristina"], "Kuwait": ["Kuwait City"], "Kyrgyzstan": ["Bishkek"], "Laos": ["Vientiane"], "Latvia": ["Riga"], "Lebanon": ["Beirut"], "Lesotho": ["Maseru"], "Liberia": ["Monrovia"], "Libya": ["Benghazi", "Tripoli"], "Liechtenstein": ["Vaduz"], "Lithuania": ["Kaunas", "Vilnius"], "Luxembourg": ["Luxembourg City"], "Madagascar": ["Antananarivo"], "Malaysia": ["George Town", "Johor Bahru", "Kuala Lumpur"], "Maldives": ["Malé"], "Mali": ["Bamako"], "Malta": ["Sliema", "Valletta"], "Marshall Islands": ["Majuro"], "Mauritania": ["Nouakchott"], "Mauritius": ["Port Louis"], "Micronesia": ["Palikir"], "Moldova": ["Chișinău"], "Monaco": ["Monaco"], "Mongolia": ["Ulaanbaatar"], "Montenegro": ["Podgorica"], "Mozambique": ["Beira", "Maputo"], "Myanmar": ["Naypyidaw", "Yangon"], "Namibia": ["Walvis Bay", "Windhoek"], "Nauru": ["Yaren"], "Nepal": ["Kathmandu", "Pokhara"], "Nicaragua": ["Managua"], "Niger": ["Niamey"], "North Korea": ["Pyongyang"], "North Macedonia": ["Skopje"], "Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newry"], "Oman": ["Muscat"], "Pakistan": ["Islamabad", "Karachi", "Lahore"], "Palau": ["Ngerulmud"], "Palestine": ["Gaza", "Ramallah"], "Panama": ["Panama City"], "Papua New Guinea": ["Port Moresby"], "Paraguay": ["Asunción"], "Peru": ["Arequipa", "Cusco", "Lima"], "Philippines": ["Cebu", "Davao", "Manila", "Quezon City"], "Russia": ["Kazan", "Moscow", "Saint Petersburg", "Sochi"], "Rwanda": ["Kigali"], "Saint Kitts and Nevis": ["Basseterre"], "Saint Lucia": ["Castries"], "Saint Vincent and the Grenadines": ["Kingstown"], "San Marino": ["San Marino"], "São Tomé and Príncipe": ["São Tomé"], "Senegal": ["Dakar"], "Seychelles": ["Victoria"], "Sierra Leone": ["Freetown"], "Solomon Islands": ["Honiara"], "Somalia": ["Mogadishu"], "South Sudan": ["Juba"], "Sri Lanka": ["Colombo", "Kandy"], "Sudan": ["Khartoum"], "Suriname": ["Paramaribo"], "Syria": ["Aleppo", "Damascus"], "Taiwan": ["Kaohsiung", "Taichung", "Taipei"], "Tajikistan": ["Dushanbe"], "Tanzania": ["Arusha", "Dar es Salaam", "Dodoma"], "Thailand": ["Bangkok", "Chiang Mai", "Phuket"], "Timor-Leste": ["Dili"], "Togo": ["Lomé"], "Trinidad and Tobago": ["Port of Spain"], "Tunisia": ["Sfax", "Tunis"], "Turkmenistan": ["Ashgabat"], "Tuvalu": ["Funafuti"], "Uzbekistan": ["Samarkand", "Tashkent"], "Vanuatu": ["Port Vila"], "Vatican City": ["Vatican City"], "Venezuela": ["Caracas", "Maracaibo"], "Vietnam": ["Da Nang", "Hanoi", "Ho Chi Minh City"], "Yemen": ["Aden", "Sana'a"], "Zambia": ["Lusaka", "Ndola"]};
const citiesOf=c=>(CITY[c]||[]).slice().sort((a,b)=>a.localeCompare(b));
const EURO=new Set(["Ireland","Germany","France","Spain","Italy","Netherlands","Belgium","Austria","Portugal","Finland","Greece","Slovakia","Slovenia","Croatia"]);
const cur=()=>$("#o-curr").value;
const curFor=c=>c==="United Kingdom"||c==="England"||c==="Scotland"||c==="Wales"||c==="Northern Ireland"?"£":c==="South Africa"?"R":EURO.has(c)?"€":"$";
const money=n=>{const c=cur();return (c==="R"?"R ":c)+Math.round(n).toLocaleString("de-DE")};
const SPORTLIST=["3x3 Basketball","American Football","Archery","Leichtathletik","Australian Rules Football","Badminton","Baseball","Basketball","Beach Volleyball","Boxen","Camogie","Canoeing","Cheerleading","Klettern","Cricket","CrossFit","Radsport","Darts","Diving","Equestrian","Esports","Fencing","Feldhockey","Figure Skating","Fußball","Gaelic Football","Golf","Turnen","Handball","Hurling","Eishockey","Judo","Karate","Kayaking","Kickboxing","Lacrosse","Mixed Martial Arts","Motorsport","Mountain Biking","Netball","Padel","Paralympic Athletics","Pickleball","Powerlifting","Rudern","Rugby League","Rugby Sevens","Rugby Union","Running","Segeln","Skateboarding","Skiing","Snooker","Snowboarding","Softball","Squash","Surfing","Schwimmen","Tischtennis","Taekwondo","Tennis","Track Cycling","Triathlon","Ultra Running","Volleyball","Water Polo","Gewichtheben","Wheelchair Basketball","Ringen","Yoga"];
const SPORTMAP={"Rugby":"Rugby Union","Football":"Fußball","Hockey":"Feldhockey"};
A.forEach(a=>{a.sport=SPORTMAP[a.sport]||a.sport});
const FN={Male:["Jordan","Liam","Marcus","Daniel","Luca","Noah","Ethan","Sam","Ryan","Kai","Mateo","Josh","Owen","Callum","Theo"],Female:["Maya","Ava","Chloe","Sofia","Erin","Zoe","Hannah","Leah","Isla","Nina","Kayla","Grace","Amelie","Sienna","Freya"],Other:["Alex","Jamie","Riley","Robin","Sasha","Charlie","Morgan","Quinn"]};
const LN=["Miles","Carter","Reid","Novak","Hughes","Silva","Bennett","Okafor","Lindqvist","Moreau","Rossi","Walsh","Tanaka","Brennan","Kowalski","Duarte","Fischer","Adeyemi","Larsen","Murphy"];
// ensure sample pool fields
A.forEach(a=>{a.gender=a.gender||(/^(Róisín|Aoife|Niamh|Ellen|Amara|Priya|Lena|Lea|Mia|Hannah|Zanele|Lerato|Ciara|Grace|Maya|Brianna|Kayla|Sophie|Emma|Chloe|Olivia|Isabella|Ava|Megan)/.test(a.name)?"Female":"Male");a.age=a.age||22+(a.id*7)%12;a.act=a.id%6===5?"Retired":"Competing";a.tt=Math.round(a.reach*(.5+(a.id%5)*.25));a.fb=Math.round(a.reach*(.15+(a.id%4)*.08))});
const EXTRA=[["Jalen Brooks","Basketball","USA",64,"Male",20,2],["Maya Thompson","Basketball","USA",88,"Female",21,null],["Tyrese Coleman","Basketball","USA",41,"Male",19,null],["Brianna Hayes","Basketball","USA",126,"Female",23,null],["Andre Wallace","Basketball","USA",29,"Male",20,null]];
EXTRA.forEach(([name,sport,market,reach,gender,age,img])=>{if(!A.some(a=>a.name===name)){const id=A.length;A.push({id,name,sport,market,reach,eng:9,fee:15000,aud:["Gen Z / students"],img,gender,age,act:"Competing",tt:Math.round(reach*1.3),fb:Math.round(reach*.2)})}});
const COLLEGE=["St. John's","Gonzaga","Duke","UConn","Villanova","Baylor","Kentucky"];
const LETTER=[
 a=>`Hallo, ich bin ${a.age<23&&(a.market==="USA"||a.market==="United States")?"D1-":""}${a.sport}-${a.act==="Retired"?"Athlet (Karriereende)":"Athlet"}. Ich würde sehr gern mit ${brandName()} arbeiten 👍`,
 a=>`Hallo! Musik ist ein riesiger Teil meiner Pre-Game-Routine, das passt also perfekt. Ich würde ${brandName()} gern in meinen Trainings-Content einbauen.`,
 a=>`Hallo, ich poste schon jede Woche Trainings-Content. Gern mache ich ein Shooting plus regelmäßige Posts und Stories über die gesamte Partnerschaft.`,
 a=>`Ich freue mich riesig! Ich habe schon zwei Partnerschaften über Sport Endorse umgesetzt - beide pünktlich geliefert.`,
 a=>`Hallo! Ich bin seit Langem Fan der Marke. Meine Follower sind sehr nah an meinem ${a.sport}-Alltag dran und würden das lieben.`];
const brandName=()=>{const v=$("#o-name").value.trim();if(v.includes("|"))return v.split("|")[0].trim()||"Motion Audio";return (!v||v==="Collegiate Sports Brand Ambassador")?"Motion Audio":v};
const fmtDate=v=>{const d=new Date(v||Date.now());return d.toLocaleDateString("de-DE",{day:"numeric",month:"short",year:"numeric"})};
// preset questions (applicants) — answers built per athlete
const QA=[
 ["Wo sind Ihre Follower zu Hause?",a=>{const home=OPP.country;const o=a.market==="USA"||a.market==="United States"?"Kanada und Großbritannien":"Großbritannien und die USA";return `Rund ${55+a.id%25} % sind in ${home}, der Rest vor allem ${o}. Gern teile ich einen Screenshot meiner Audience-Insights.`}],
 ["Wie lange brauchen Sie normalerweise für Ihren Content?",a=>[`Meist 3–5 Tage vom Briefing zum ersten Entwurf, plus ein Tag für Anpassungen.`,`Etwa eine Woche für ein komplettes Shooting mit Schnitt. Stories schaffe ich in 24 Stunden.`,`2–3 Tage für Posts. Für ein richtiges Shooting bräuchte ich eine Woche Vorlauf.`][a.id%3]],
 ["Sind Sie an diesem Termin für das Shooting / Event verfügbar?",a=>a.id%4===3?`Am ${fmtDate(OPP.start)} habe ich ein Spiel, aber am Tag davor oder danach bin ich frei. Passt das?`:`Ja, am ${fmtDate(OPP.start)} bin ich frei. Ich blocke den Termin.`]];
// preset messages (deals)
const DQA=[
 ["Können Sie uns vor dem Start einen Content-Plan schicken?",a=>`Natürlich! Bis Freitag schicke ich einen Entwurf: Shooting-Ideen, Captions und Posting-Termine.`],
 ["Wohin sollen wir das Produkt schicken?",a=>`Bitte an meine Adresse in ${a.city}. Die vollständigen Daten hinterlege ich in meinen Profileinstellungen.`],
 ["Bitte bestätigen Sie Datum und Uhrzeit des Shootings.",a=>`Bestätigt für den ${fmtDate(OPP.start)}. Vormittags passt es am besten, ab 9 Uhr.`]];
let selSports=new Set(["Basketball"]),OPP=null,apps=[],sel=null,dsel=null,feedT=null;

// ---- step 1 details
$("#o-country").innerHTML=COUNTRIES.map(c=>`<option ${c==="United States"?"selected":""}>${c}</option>`).join("");$("#t-country").innerHTML=COUNTRIES.map(c=>`<option ${c==="United States"?"selected":""}>${c}</option>`).join("");$("#t-country").addEventListener("change",()=>{$("#o-country").value=$("#t-country").value;onCountry()});$("#dl-countries").innerHTML=COUNTRIES.map(c=>`<option value="${c}">`).join("");
$("#dl-num").innerHTML=Array.from({length:30},(_,i)=>`<option value="${i+1}">`).join("");
const country=()=>COUNTRIES.find(c=>c.toLowerCase()===$("#o-country").value.trim().toLowerCase())||$("#o-country").value.trim()||"United States";
function onCountry(){const c=country();const oc=$("#o-city"),keep=oc.value||"Chicago";const cs=citiesOf(c);oc.innerHTML=cs.map(x=>`<option ${x===keep?"selected":""}>${x}</option>`).join("");$("#dl-cities").innerHTML=cs.map(x=>`<option value="${x}">`).join("");$("#t-country").value=c;if(typeof fillTCity==="function")fillTCity();$("#o-curr").value=curFor(c);calcFee();elig()}
const num=()=>Math.max(1,Math.min(100,parseInt($("#o-num").value)||1));
function calcFee(){const b=+$("#o-budget").value||0;$("#tfee").textContent=money(b/num()*(1-COMM))}
$("#o-country").addEventListener("change",onCountry);$("#o-country").addEventListener("input",()=>{if(COUNTRIES.includes($("#o-country").value))onCountry()});
$("#o-budget").oninput=calcFee;$("#o-curr").onchange=calcFee;$("#o-num").oninput=()=>{calcFee();elig()};
$("#o-start").onclick=$("#o-end").onclick=e=>{try{e.target.showPicker()}catch(_){}};
// ---- step 2 target
function renderSports(){const q=$("#sp-q").value.toLowerCase().trim();
 $("#sp-sel").innerHTML=[...selSports].map(s=>`<button class="opt on" data-s="${s}">✓ ${s} ✕</button>`).join("");
 const list=SPORTLIST.filter(s=>!selSports.has(s)&&(!q||s.toLowerCase().includes(q)));const show=list.slice(0,q?24:12);
 $("#sp-list").innerHTML=show.map(s=>`<button class="opt" data-s="${s}">+ ${s}</button>`).join("")+(list.length>show.length?`<span class="sp-more">+${list.length-show.length} weitere · zum Suchen tippen</span>`:"")+(!list.length?`<span class="sp-more">Keine Sportart passt zu "${q}"</span>`:"");
 $$("#sp-sel .opt,#sp-list .opt").forEach(b=>b.onclick=()=>{const s=b.dataset.s;selSports.has(s)?selSports.delete(s):selSports.add(s);renderSports();elig()})}
$("#sp-q").oninput=renderSports;
["#t-city","#t-gender","#t-act","#t-a1","#t-a2","#t-country"].forEach(s=>$(s).addEventListener("input",elig));
$("#t-city").outerHTML=`<select id="t-city"><option value="">Alle Städte</option></select>`;
function fillTCity(){const c=COUNTRIES.find(x=>x.toLowerCase()===$("#t-country").value.trim().toLowerCase());const el=$("#t-city");const keep=el.value;el.innerHTML=`<option value="">Alle Städte</option>`+(c?citiesOf(c).map(x=>`<option ${x===keep?"selected":""}>${x}</option>`).join(""):"");}
["input","change"].forEach(ev=>$("#t-country").addEventListener(ev,fillTCity));
const target=()=>({country:$("#t-country").value.trim()||country(),city:$("#t-city").value.trim(),sports:[...selSports],gender:$("#t-gender").value,act:$("#t-act").value,a1:+$("#t-a1").value||0,a2:+$("#t-a2").value||99});
const inMarket=(a,c)=>a.market===c||a.market===MK[c];
const eligible=t=>A.filter(a=>inMarket(a,t.country)&&(!t.sports.length||t.sports.includes(a.sport))&&(t.gender==="All"||a.gender===t.gender)&&(t.act==="All"||a.act===t.act)&&a.age>=t.a1&&a.age<=t.a2);
function elig(){if(!$("#elig"))return;const n=eligible(target()).length;$("#elig").textContent=Math.max(Math.round(n*37+n*n*3),(num()+3)*21+selSports.size*13).toLocaleString()}
// synthetic athletes so applicants never fall below the number required
const NB={"United States":[["Jordan","Tyler","Marcus","Caleb","Logan","Austin","Devin","Mason"],["Madison","Kayla","Taylor","Brooke","Jasmine","Hailey","Morgan","Alyssa"],["Johnson","Carter","Mitchell","Reynolds","Bailey","Turner","Hayes","Parker"]],"United Kingdom":[["Oliver","Harry","George","Jack","Alfie","Charlie","Freddie"],["Amelia","Isla","Poppy","Ella","Lily","Sophie","Freya"],["Thompson","Wright","Clarke","Hughes","Edwards","Turner","Harris"]],Ireland:[["Conor","Oisín","Cillian","Darragh","Fionn","Eoin","Ronan"],["Saoirse","Aoife","Clodagh","Siobhán","Caoimhe","Orla","Emer"],["O'Brien","Byrne","Kavanagh","Doyle","Gallagher","Brennan","Quinn"]],Germany:[["Lukas","Leon","Jonas","Maximilian","Finn","Niklas"],["Lena","Anna","Leonie","Johanna","Marie","Laura"],["Müller","Schmidt","Wagner","Becker","Hoffmann","Schulz"]],"South Africa":[["Sipho","Thabo","Pieter","Bongani","Ruan","Lwazi"],["Naledi","Ayanda","Liezl","Thandi","Anika","Zinhle"],["Nkosi","van der Merwe","Dlamini","Botha","Mahlangu","Pretorius"]],France:[["Lucas","Hugo","Théo","Louis","Mathis"],["Léa","Chloé","Manon","Camille","Inès"],["Martin","Bernard","Dubois","Lefèvre","Moreau"]],Spain:[["Pablo","Hugo","Álvaro","Javier","Sergio"],["Lucía","Paula","Carmen","Marta","Elena"],["García","Fernández","López","Martínez","Sánchez"]],Italy:[["Lorenzo","Matteo","Alessandro","Leonardo","Davide"],["Giulia","Sofia","Chiara","Martina","Aurora"],["Rossi","Russo","Ferrari","Esposito","Bianchi"]],Japan:[["Haruto","Sota","Yuto","Ren","Kaito"],["Yui","Hina","Sakura","Aoi","Mio"],["Sato","Suzuki","Takahashi","Tanaka","Watanabe"]],Australia:[["Jack","Lachlan","Cooper","Riley","Mitchell"],["Charlotte","Matilda","Chloe","Zoe","Ruby"],["Smith","Jones","Kelly","Wilson","Campbell"]],Brazil:[["Gabriel","Lucas","Matheus","Rafael","Thiago"],["Ana","Beatriz","Larissa","Camila","Juliana"],["Silva","Santos","Oliveira","Souza","Costa"]],Nigeria:[["Chidi","Tunde","Emeka","Femi","Ifeanyi"],["Adaeze","Ngozi","Funmi","Chiamaka","Temitope"],["Okafor","Adeyemi","Eze","Balogun","Okonkwo"]],"New Zealand":[["Tama","Liam","Nikau","Hunter","Ollie"],["Aroha","Isla","Mia","Ruby","Ana"],["Williams","Ngata","Parata","Brown","Taylor"]],Canada:[["Liam","Ethan","Owen","Nathan","Félix"],["Emma","Olivia","Chloé","Avery","Sarah"],["Tremblay","MacDonald","Roy","Campbell","Gagnon"]],Netherlands:[["Daan","Sem","Bram","Lars","Thijs"],["Emma","Sanne","Fleur","Lotte","Noor"],["de Jong","Jansen","de Vries","Bakker","Visser"]],India:[["Arjun","Rohan","Vikram","Aditya","Karan"],["Priya","Ananya","Isha","Kavya","Meera"],["Sharma","Patel","Singh","Reddy","Iyer"]],Scotland:[["Callum","Euan","Fraser","Ruaridh","Lewis"],["Eilidh","Isla","Kirsty","Morven","Skye"],["MacLeod","Campbell","Stewart","Fraser","Murray"]],Wales:[["Rhys","Dafydd","Gethin","Iwan","Owain"],["Cerys","Seren","Ffion","Nia","Megan"],["Jones","Davies","Evans","Thomas","Llewellyn"]]};
function synth(t,i){const g=t.gender==="All"?(i%2?"Female":"Male"):(FN[t.gender]?t.gender:"Other");const nm=FN[g]||FN.Other;const sp=t.sports.length?t.sports[i%t.sports.length]:SPORTLIST[(i*7)%SPORTLIST.length];
 const lo=Math.max(14,t.a1),hi=Math.max(lo,Math.min(80,t.a2));const id=1000+i;const reach=18+(i*37)%160;
 const bk=NB[t.country]||NB["United States"];const fl=g==="Female"?bk[1]:g==="Male"?bk[0]:(i%2?bk[1]:bk[0]);
 return {id,name:fl[(i*3)%fl.length]+" "+bk[2][(i*3+i%2+1)%bk[2].length],sport:sp,market:t.country,reach,img:null,gender:g==="Other"&&t.gender!=="All"?t.gender:g,age:lo+(i*3)%(hi-lo+1),act:t.act==="All"?(i%5===4?"Retired":"Competing"):t.act,tt:Math.round(reach*(.6+(i%4)*.3)),fb:Math.round(reach*(.15+(i%3)*.1))}}
// ---- tabs
function go(s){$$(".tb").forEach(t=>t.classList.toggle("on",+t.dataset.s===s));[1,2,3,4,5].forEach(i=>$("#s"+i).hidden=i!==s);if(s===4){renderList();renderProf();renderChat()}if(s===5)renderDeals()}
$$(".tb").forEach(t=>t.onclick=()=>!t.disabled&&go(+t.dataset.s));
$("#to2").onclick=()=>{if(!$("#t-country").value)$("#t-country").value=country();go(2)};$("#back1").onclick=()=>go(1);$("#to4").onclick=()=>go(4);
// ---- publish
$("#run").onclick=()=>{
 const t=target();clearInterval(feedT);
 OPP={name:$("#o-name").value||"New opportunity",type:$("#o-type").value,num:num(),budget:+$("#o-budget").value||0,city:t.city||"",country:country(),start:$("#o-start").value};
 OPP.fee=OPP.budget/OPP.num*(1-COMM);
 const need=Math.max(10,OPP.num>3?OPP.num*3:0);
 let pool=eligible(t).slice(0,need);let i=0;while(pool.length<need)pool.push(synth(t,i++));
 apps=[];sel=null;dsel=null;
 const cities=citiesOf(t.country);
 const queue=pool.map((a,k)=>{const city=t.city||cities[(k+1)%Math.max(1,cities.length)]||(OPP.city&&OPP.city!==t.country?OPP.city:"");return {...a,id:a.id,city,region:`${city?city+", ":""}${t.country}`,college:COLLEGE[k%COLLEGE.length],status:"new",asked:[],dasked:[],chat:[],dchat:[],letter:LETTER[k%LETTER.length](a),at:now()}});
 queue.forEach(a=>a.chat=[{t:"them",x:a.letter,at:a.at}]);
 $$(".h-name").forEach(e=>e.textContent=OPP.name);$("#oloc").textContent=[OPP.city,OPP.country].filter(Boolean).join(", ");$("#obud").textContent=money(OPP.budget);
 $$(".tb").forEach(x=>x.disabled=false);$("#to4").disabled=true;$("#feed").innerHTML="";$("#oapps").textContent="0";
 go(4);renderSlots();
 $("#h-feed").textContent=`Veröffentlicht · Athleten werden benachrichtigt…`;
 $("#h-feed").textContent=$("#h-feed4").textContent="Published · waiting for applications…";setTimeout(()=>{
   let j=0;const add=()=>{const a=queue[j++];apps.push(a);$("#oapps").textContent=apps.length;
     $("#feed").insertAdjacentHTML("afterbegin",`<div class="fi">${avatar(a)}<div><b>${a.name}</b> hat sich beworben<small>${a.sport} · ${a.region} · "${a.letter.slice(0,58)}…"</small></div></div>`);
     $("#h-feed4").textContent=`● ${a.name} hat sich gerade beworben`;renderList();if(sel===a.id||apps.length===1){renderProf();renderChat()}$("#to4").disabled=false;
     if(j>=queue.length){clearInterval(feedT);setTimeout(()=>$("#h-feed4").textContent="",1200)}};
   add();feedT=setInterval(add,queue.length>20?250:queue.length>10?400:600)},700);
};
function phoneDemo(a,done){
 const P=$("#phone"),f=money(OPP.fee);
 const card=hi=>`<div class="ph-card ${hi?"hi":""}"><span class="lg">SE</span><div><small>Sport Endorse</small><b>${OPP.name}</b><small><b style="display:inline">${f}</b> · ${[OPP.city,OPP.country].filter(Boolean).join(", ")}</small></div></div>`;
 const feedv=hi=>`<div class="ph-top"><span>Suchen</span><span>⚲</span></div><div style="font-size:.68rem;letter-spacing:.08em;color:#51617D;margin:8px 0;font-weight:700">KAMPAGNEN · MARKEN</div>${card(hi)}<div class="ph-card"><span class="lg">GR</span><div><small>Greyhound Racing Ireland</small><b>Erster Blick auf unser neues Erdgeschoss</b><small><b style="display:inline">€125</b> · Cork</small></div></div><div class="ph-card"><span class="lg">OA</span><div><small>Orbis Africa</small><b>Begleiten Sie eine Rugby-Expedition nach Malawi</b><small><b style="display:inline">$20,500</b> · Lilongwe</small></div></div>`;
 const detail=press=>`<div class="ph-top"><span>‹ Zurück</span><span>Kampagnen</span></div><b style="margin-top:10px;font-size:.9rem">${OPP.name}</b><div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px"><span class="ph-fee">${f}</span><span style="font-size:.65rem;padding:2px 8px;border-radius:6px;background:#DDE0D2">Offen</span></div><small style="color:#51617D">zzgl. Steuern</small><div style="margin-top:10px;display:grid;gap:4px;color:#51617D;font-size:.74rem"><span>◆ ${OPP.type}</span><span>⌖ ${[OPP.city,OPP.country].filter(Boolean).join(", ")}</span><span>▣ ${fmtDate(OPP.start)}</span></div><div style="margin-top:10px;font-weight:800;font-size:.72rem">DESCRIPTION</div><div style="font-size:.72rem;color:#51617D;overflow:hidden;max-height:140px">${$("#o-desc").value.replace(/</g,"&lt;").replace(/\n/g,"<br>")}</div><div class="ph-btn ${press?"press":""}">Bewerben</div>`;
 const letter=txt=>`<div class="ph-top"><span>‹ Zurück</span><span>Kampagnen</span></div><b style="margin-top:12px;font-size:1rem">Anschreiben</b><small style="color:#51617D">Fügen Sie Kommentare, besondere Konditionen oder Ihr Anschreiben hinzu.</small><div class="ph-input">${txt}</div><div class="ph-btn">Bewerbung senden</div>`;
 const okv=`<div class="ph-ok"><div class="tick">✓</div><b>Beworben!</b><small style="color:#51617D">${a.name.split(" ")[0]}</b>: Die Bewerbung<br>ist unterwegs zu ${brandName()}.</small></div>`;
 const steps=[[feedv(false),900],[feedv(true),900],[detail(false),1300],[detail(true),500]];
 let k=0;const run=()=>{if(k<steps.length){P.innerHTML=steps[k][0];setTimeout(run,steps[k++][1]);return}
   const full=a.letter;let n=0;const ty=setInterval(()=>{n+=2;P.innerHTML=letter(full.slice(0,n));if(n>=full.length){clearInterval(ty);setTimeout(()=>{P.innerHTML=okv;done();setTimeout(()=>P.innerHTML=feedv(false)+`<div style="margin-top:auto;padding:8px;border-radius:8px;background:#0A1424;color:#FFCE00;font-size:.72rem;text-align:center">✓ Beworben · ${OPP.name.slice(0,28)}…</div>`,2200)},500)}},35)};
 run();
}
const now=()=>new Date().toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"});
const HEADS_Y={"athletics_f": ["../images/pitch/p000-5478b24c7a.jpg", "../images/pitch/p001-c394cbfca9.jpg", "../images/pitch/p002-fd6fca78ef.jpg", "../images/pitch/p003-3251369f06.jpg"], "athletics_m": ["../images/pitch/p004-d55a476691.jpg", "../images/pitch/p005-336712aff6.jpg", "../images/pitch/p006-607e43585f.jpg", "../images/pitch/p007-cb83de4cf3.jpg"], "basketball_f": ["../images/pitch/p008-ef5d6f1f79.jpg", "../images/pitch/p009-c4e1f86180.jpg", "../images/pitch/p010-a358c2b5ca.jpg", "../images/pitch/p011-6cb2f4b96d.jpg"], "basketball_m": ["../images/pitch/p012-4ff2b24b7d.jpg", "../images/pitch/p013-688fdb9821.jpg", "../images/pitch/p014-c341cdcd7e.jpg", "../images/pitch/p015-3f3580b144.jpg"], "boxing_f": ["../images/pitch/p016-919e8652b5.jpg", "../images/pitch/p017-d6b1b6d6f1.jpg", "../images/pitch/p018-25c755dadd.jpg", "../images/pitch/p019-cb4ee6fb9c.jpg"], "boxing_m": ["../images/pitch/p020-87809583d1.jpg", "../images/pitch/p021-1985d6a8ee.jpg", "../images/pitch/p022-e42149e340.jpg", "../images/pitch/p023-0fcdfca3cd.jpg"], "cricket_f": ["../images/pitch/p024-06516f7a18.jpg", "../images/pitch/p025-d53753902a.jpg", "../images/pitch/p026-7571430f74.jpg", "../images/pitch/p027-fdf5479ef4.jpg"], "cricket_m": ["../images/pitch/p028-1bf759fc9a.jpg", "../images/pitch/p029-100409a8de.jpg", "../images/pitch/p030-722bd32b58.jpg", "../images/pitch/p031-c56e399332.jpg"], "cycling_f": ["../images/pitch/p032-4e718e7afd.jpg", "../images/pitch/p033-af3fec8ade.jpg", "../images/pitch/p034-742fe0cdb9.jpg", "../images/pitch/p035-cbe7bd499f.jpg"], "cycling_m": ["../images/pitch/p036-18e8769ae7.jpg", "../images/pitch/p037-c0b926482c.jpg", "../images/pitch/p038-44bdbea886.jpg", "../images/pitch/p039-3c9d7d5b36.jpg"], "gaelic_f": ["../images/pitch/p040-8bb07bda29.jpg", "../images/pitch/p041-ce01dfd0ee.jpg", "../images/pitch/p042-fb01899de8.jpg", "../images/pitch/p043-34c8326d98.jpg"], "gaelic_m": ["../images/pitch/p044-9e71cc35ff.jpg", "../images/pitch/p045-80664a7805.jpg", "../images/pitch/p046-30b1d13be4.jpg", "../images/pitch/p047-8a2ae238e8.jpg"], "generic_f": ["../images/pitch/p048-bd3d94b1a9.jpg", "../images/pitch/p049-f66b159275.jpg", "../images/pitch/p050-cccbe7b918.jpg", "../images/pitch/p051-f5dc89cb56.jpg"], "generic_m": ["../images/pitch/p052-ef09c4ae48.jpg", "../images/pitch/p053-0371815a95.jpg", "../images/pitch/p054-81ffa0e616.jpg", "../images/pitch/p055-8e3dccdc6e.jpg"], "golf_f": ["../images/pitch/p056-3e47effe3c.jpg", "../images/pitch/p057-4bf132a46c.jpg", "../images/pitch/p058-e19a5c7014.jpg", "../images/pitch/p059-9061ea43da.jpg"], "golf_m": ["../images/pitch/p060-fbd634b5d1.jpg", "../images/pitch/p061-dab34dabcf.jpg", "../images/pitch/p062-d1bd493f24.jpg", "../images/pitch/p063-4a789a4aec.jpg"], "hockey_f": ["../images/pitch/p064-e271362783.jpg", "../images/pitch/p065-9a0e6ce425.jpg", "../images/pitch/p066-8797fb4090.jpg", "../images/pitch/p067-14e4a237a4.jpg"], "hockey_m": ["../images/pitch/p068-67e17f9b7a.jpg", "../images/pitch/p069-21a5b28cbc.jpg", "../images/pitch/p070-2e718901f4.jpg", "../images/pitch/p071-396e66d715.jpg"], "hurling_f": ["../images/pitch/p072-fc034271af.jpg", "../images/pitch/p073-969b2b3211.jpg", "../images/pitch/p074-dffd47eafb.jpg", "../images/pitch/p075-a2039b89e8.jpg"], "hurling_m": ["../images/pitch/p076-cdd5eb6f46.jpg", "../images/pitch/p077-922028e488.jpg", "../images/pitch/p078-87f4aa04d4.jpg", "../images/pitch/p079-2f66d3e06d.jpg"], "netball_f": ["../images/pitch/p080-25bed4251c.jpg", "../images/pitch/p081-66926776c0.jpg", "../images/pitch/p082-34da61634c.jpg", "../images/pitch/p083-bc96f95df1.jpg"], "netball_m": ["../images/pitch/p084-81b1a7e8a8.jpg", "../images/pitch/p085-37808431d0.jpg", "../images/pitch/p086-b0baf48d6e.jpg"], "rowing_f": ["../images/pitch/p087-e8e10178d1.jpg", "../images/pitch/p088-ebefc57bdc.jpg", "../images/pitch/p089-ddcf17d082.jpg", "../images/pitch/p090-6aca33d0cc.jpg"], "rowing_m": ["../images/pitch/p091-6cd52c4fca.jpg", "../images/pitch/p092-b986aac03c.jpg", "../images/pitch/p093-0dd9512e8e.jpg", "../images/pitch/p094-7e41fe6e64.jpg"], "rugby_f": ["../images/pitch/p095-832127c557.jpg", "../images/pitch/p096-d05cdcf34f.jpg", "../images/pitch/p097-31acbbd520.jpg", "../images/pitch/p098-69f9f7ab89.jpg"], "rugby_m": ["../images/pitch/p099-ea0dbc0919.jpg", "../images/pitch/p100-29ba96dd1b.jpg", "../images/pitch/p101-5ff43aac84.jpg", "../images/pitch/p102-e6bc9df350.jpg"], "running_f": ["../images/pitch/p103-5bb4978d6a.jpg", "../images/pitch/p104-33cd2919a7.jpg", "../images/pitch/p105-707f146666.jpg", "../images/pitch/p106-4559dac6b9.jpg"], "running_m": ["../images/pitch/p107-faed87d802.jpg", "../images/pitch/p108-1b810da144.jpg", "../images/pitch/p109-29ccf3fc6d.jpg", "../images/pitch/p110-91137d84d2.jpg"], "soccer_f": ["../images/pitch/p111-de2d1a63b4.jpg", "../images/pitch/p112-1082df9135.jpg", "../images/pitch/p113-8cc89ac1e9.jpg", "../images/pitch/p114-6b3b58305a.jpg"], "soccer_m": ["../images/pitch/p115-fcdcb102fa.jpg", "../images/pitch/p116-23d1651bf3.jpg", "../images/pitch/p117-884c467d27.jpg", "../images/pitch/p118-a60d3da286.jpg"], "swimming_f": ["../images/pitch/p119-ab929bcbf6.jpg", "../images/pitch/p120-2fc1fa3f7f.jpg", "../images/pitch/p121-da3a9f1732.jpg", "../images/pitch/p122-95fe149928.jpg"], "swimming_m": ["../images/pitch/p123-2455c259e8.jpg", "../images/pitch/p124-20d8dcec7d.jpg", "../images/pitch/p125-aa3d175129.jpg", "../images/pitch/p126-6593edffbf.jpg"], "tennis_f": ["../images/pitch/p127-704e82f7b5.jpg", "../images/pitch/p128-9553c15841.jpg", "../images/pitch/p129-17e96697ba.jpg", "../images/pitch/p130-3e0b147fe9.jpg"], "tennis_m": ["../images/pitch/p131-2e1012ffdf.jpg", "../images/pitch/p132-7c09a2e1bc.jpg", "../images/pitch/p133-167f5d4461.jpg", "../images/pitch/p134-f684278328.jpg"], "volleyball_f": ["../images/pitch/p135-291b56f400.jpg", "../images/pitch/p136-3a68e81c80.jpg", "../images/pitch/p137-51097cafa6.jpg", "../images/pitch/p138-aed8aeefba.jpg"], "volleyball_m": ["../images/pitch/p139-be5900ff90.jpg", "../images/pitch/p140-307004ddff.jpg", "../images/pitch/p141-18eabc2032.jpg", "../images/pitch/p142-820236c183.jpg"]};const HEADS_O={"athletics_f": ["../images/pitch/p143-04d56d838d.jpg"], "athletics_m": ["../images/pitch/p144-0b8947249e.jpg"], "basketball_f": ["../images/pitch/p145-a2c4dba780.jpg"], "basketball_m": ["../images/pitch/p146-b6f83ce45d.jpg"], "boxing_f": ["../images/pitch/p147-db47469a7b.jpg"], "boxing_m": ["../images/pitch/p148-51f2ac43ef.jpg"], "cricket_f": ["../images/pitch/p149-0ef293caf2.jpg"], "cricket_m": ["../images/pitch/p150-5be539e071.jpg"], "cycling_f": ["../images/pitch/p151-d296ed441d.jpg"], "cycling_m": ["../images/pitch/p152-c35fb1f436.jpg"], "gaelic_f": ["../images/pitch/p153-986f684b78.jpg"], "gaelic_m": ["../images/pitch/p154-827abfa8f2.jpg"], "generic_f": ["../images/pitch/p155-a047a90870.jpg", "../images/pitch/p156-e908119cc8.jpg"], "generic_m": ["../images/pitch/p157-a250042fc8.jpg", "../images/pitch/p158-abc85e199d.jpg"], "golf_f": ["../images/pitch/p159-65c7420ace.jpg"], "golf_m": ["../images/pitch/p160-803daaeef3.jpg"], "hockey_f": ["../images/pitch/p161-8e217fe20a.jpg"], "hockey_m": ["../images/pitch/p162-377d9a1e78.jpg"], "hurling_f": ["../images/pitch/p163-bc97f07381.jpg"], "hurling_m": ["../images/pitch/p164-16c89d2dc0.jpg"], "netball_f": ["../images/pitch/p165-a23425e934.jpg"], "netball_m": ["../images/pitch/p166-6d81200e17.jpg"], "rowing_f": ["../images/pitch/p167-9e29e52286.jpg"], "rowing_m": ["../images/pitch/p168-aca25f5546.jpg"], "rugby_f": ["../images/pitch/p169-5c24eca37b.jpg"], "rugby_m": ["../images/pitch/p170-4dc2426199.jpg"], "running_f": ["../images/pitch/p171-7c655c5309.jpg"], "running_m": ["../images/pitch/p172-126de1d7fb.jpg"], "soccer_f": ["../images/pitch/p173-60957b2250.jpg"], "soccer_m": ["../images/pitch/p174-c598e62589.jpg"], "swimming_f": ["../images/pitch/p175-50943b155a.jpg"], "swimming_m": ["../images/pitch/p176-c3ac739305.jpg"], "tennis_f": ["../images/pitch/p177-607e82b598.jpg"], "tennis_m": ["../images/pitch/p178-46c16d59e5.jpg"], "volleyball_f": ["../images/pitch/p179-0433663e59.jpg"], "volleyball_m": ["../images/pitch/p180-5184e373a6.jpg"]};
const SPORTKEY={"Basketball":"basketball","3x3 Basketball":"basketball","Wheelchair Basketball":"basketball","Fußball":"soccer","American Football":"rugby","Rugby Union":"rugby","Rugby League":"rugby","Rugby Sevens":"rugby","Australian Rules Football":"rugby","Leichtathletik":"athletics","Paralympic Athletics":"athletics","Tennis":"tennis","Padel":"tennis","Squash":"tennis","Badminton":"tennis","Pickleball":"tennis","Tischtennis":"tennis","Golf":"golf","Gaelic Football":"gaelic","Hurling":"hurling","Camogie":"hurling","Cricket":"cricket","Baseball":"cricket","Softball":"cricket","Boxen":"boxing","Kickboxing":"boxing","Mixed Martial Arts":"boxing","Schwimmen":"swimming","Diving":"swimming","Water Polo":"swimming","Radsport":"cycling","Track Cycling":"cycling","Mountain Biking":"cycling","Running":"running","Ultra Running":"running","Triathlon":"running","Feldhockey":"hockey","Lacrosse":"hockey","Eishockey":"hockey","Rudern":"rowing","Canoeing":"rowing","Kayaking":"rowing","Volleyball":"volleyball","Beach Volleyball":"volleyball","Netball":"netball","Handball":"volleyball"};
/* Unique face allocation: each applicant in a run gets a headshot nobody else
   in the list is using. Starts in the sport+gender pool, overflows into the
   full same-gender library (90+ faces per gender), and is memoised on the
   applicant so the same person keeps the same face across list, profile,
   chat and deals. The ledger resets when a new opportunity is published. */
const HS_ALL=(()=>{const g={f:new Set(),m:new Set()};for(const src of [HEADS_Y,HEADS_O])for(const k in src){const gg=k.endsWith("_f")?"f":"m";src[k].forEach(p=>g[gg].add(p));}return {f:[...g.f],m:[...g.m]}})();
const HS_USED=new Set();
const headshot=a=>{
 if(typeof a.img==="string")return a.img;
 if(!apps.length)HS_USED.clear();
 const g=a.gender==="Female"||(a.gender!=="Male"&&a.id%2)?"f":"m";
 let k=SPORTKEY[a.sport]||"generic";k=HEADS_Y[k+"_"+g]?k:"generic";
 const base=((a.age>=36?HEADS_O[k+"_"+g]:HEADS_Y[k+"_"+g])||[]).concat(HEADS_Y["generic_"+g]||[]);
 const start=(a.id*7+3)%Math.max(1,base.length);
 const seq=base.slice(start).concat(base.slice(0,start),HS_ALL[g]);
 a.img=seq.find(p=>!HS_USED.has(p))||HS_ALL[g][(a.id*7+3)%HS_ALL[g].length];
 HS_USED.add(a.img);
 return a.img;
};
const avatar=(a,lg)=>`<span class="av ${lg?"lg":""}"><img src="${headshot(a)}" alt="${a.name}" onerror="this.remove()"></span>`;
const cur_=()=>apps.find(a=>a.id===sel);
const deals=()=>apps.filter(a=>a.status==="deal");
const committed=()=>apps.filter(a=>a.status==="deal"||a.status==="offer").reduce((t,a)=>t+a.price,0);
function renderSlots(){const d=deals().length;const t=`${d} / ${OPP.num}`;$$(".h-slots").forEach(e=>e.textContent=t+" Athleten bestätigt");$(".h-slots2").textContent=t;$("#oc").textContent=d?1:0;$("#dealn").textContent=d||"";
 const act=apps.filter(a=>a.status!=="declined").length;$("#appn").textContent=act||"";$("#appn3").textContent=apps.length||"";
 const full=d>=OPP.num;[$("#h-done"),$("#h-st")].forEach(h=>{h.textContent=full?"Confirmed":"Open";h.className="pill "+(full?"done":"live")})}
const socials=a=>`<div class="socials"><div><i>IG</i>Instagram<b>${a.reach}k</b></div><div><i>TT</i>TikTok<b>${a.tt}k</b></div><div><i>FB</i>Facebook<b>${a.fb}k</b></div></div>`;
function renderList(){
 if(!sel&&apps.length)sel=apps[0].id;
 const act=apps.filter(a=>a.status!=="declined"),dec=apps.filter(a=>a.status==="declined");
 const lab={new:"NEU",accepted:"ANGENOMMEN",offer:"ANGEBOT GESENDET",deal:"✓ BESTÄTIGT"};
 const row=a=>`<div class="ai ${a.id===sel?"on":""} ${a.status==="declined"?"dec":""}" data-id="${a.id}">${avatar(a)}<div><b style="font-size:.86rem">${a.name}</b><small>${a.status==="deal"?money(a.price):a.sport}</small></div><span class="st">${lab[a.status]||""}</span></div>`;
 $("#alist").innerHTML=act.map(row).join("");$("#dlist").innerHTML=dec.map(row).join("");
 $("#ac").textContent=act.length;$("#dc").textContent=dec.length;$("#dech").hidden=!dec.length;
 $$("#alist .ai,#dlist .ai").forEach(r=>r.onclick=()=>{sel=+r.dataset.id;const a=cur_();if(a.status==="new")a.status="seen";renderList();renderProf();renderChat()});
 renderSlots();
}
function renderProf(){
 const a=cur_(),P=$("#aprof");if(!a){P.innerHTML=`<div class="empty"><div><div class="big">…</div><p>Warten auf Bewerbungen.</p></div></div>`;$("#adbtns").hidden=true;$("#qs").innerHTML="";return}
 P.innerHTML=`<div style="display:flex;gap:14px;align-items:center">${avatar(a,1)}<div><h3>${a.name}</h3><span class="tag">✓ Verifiziert</span></div></div>
 <div class="facts"><div><span class="muted">Sportart</span> ${a.sport}</div><div><span class="muted">Ort / Region</span> ${a.region}</div></div>
 ${socials(a)}
 ${a.status==="deal"||a.status==="offer"?`<div class="dealamt"><b>${money(a.price)}</b> <span class="muted" style="font-size:.78rem">zzgl. MwSt. / Steuern</span><div class="muted" style="font-size:.8rem">Der Athlet erhält ${money(a.price*(1-COMM))} nach Provision.</div>${a.cond?`<p style="margin-top:8px;font-size:.85rem">${a.cond}</p>`:""}</div>`:""}
 ${a.status==="deal"?`<button class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:14px" data-godeal="${a.id}">In Deals ansehen →</button>`:""}
 ${a.status==="offer"?`<div class="acts2"><button class="offer" disabled>Angebot gesendet · warten auf ${a.name.split(" ")[0]}…</button></div>`:""}
 ${a.status==="declined"?`<div class="acts2"><button id="decb">Bewerber wiederherstellen</button></div>`:""}
 ${["new","seen","accepted"].includes(a.status)?`<div class="acts2"><button id="decb">Ablehnen</button><div class="r"><span class="muted">Finales Honorar</span><input id="feei" type="number" min="50" step="50" value="${Math.round(OPP.budget/OPP.num)}"></div><div class="muted" style="font-size:.76rem" id="feenote"></div><button class="offer" id="accb">Deal anbieten →</button></div>`:""}`;
 const fi=$("#feei");if(fi){const up=()=>{const p=+fi.value||0,left=OPP.budget-committed()-p;$("#feenote").innerHTML=`zzgl. MwSt. · Athlet erhält ${money(p*(1-COMM))} · Restbudget ${money(Math.max(0,left))}`+(left<0?` <span style="color:#FF8A7A">▲ über Budget</span>`:"")};fi.oninput=up;up()}
 if($("#decb"))$("#decb").onclick=decline;if($("#accb"))$("#accb").onclick=offer;
  const open=a.status!=="declined"&&a.status!=="deal"&&a.status!=="offer";
 $("#qs").innerHTML=open?`<span class="ql">Frage stellen · noch ${3-a.asked.length}</span>`+QA.map(([q],i)=>`<button data-q="${i}" ${a.asked.includes(i)?"disabled":""}>${q}</button>`).join(""):"";
 $$("#qs [data-q]").forEach(b=>b.onclick=()=>ask(a,+b.dataset.q,"chat",QA,"asked",()=>{if(sel===a.id){renderProf();renderChat()}}));
}
function ask(a,i,key,set,list,after){if(a[list].includes(i))return;a[list].push(i);a[key].push({t:"me",x:set[i][0],at:now()});after();
 const M=key==="chat"?$("#msgs"):$("#dmsgs");M.insertAdjacentHTML("beforeend",`<div class="typing">${a.name.split(" ")[0]} schreibt…</div>`);M.scrollTop=M.scrollHeight;
 setTimeout(()=>{a[key].push({t:"them",x:set[i][1](a),at:now()});after()},1200)}
const bubbles=(a,arr)=>arr.map(m=>m.t==="sys"?`<div class="msg sys">${m.x}</div>`:`<div class="msg ${m.t}"><time>${m.t==="them"?a.name.split(" ")[0]:"Sie"} · ${m.at}</time>${m.x}</div>`).join("");
function renderChat(){const a=cur_(),M=$("#msgs");if(!a){M.innerHTML="";return}
 M.innerHTML=`<div class="msg sys">${a.name} hat sich auf die Kampagne beworben</div>`+bubbles(a,a.chat);M.scrollTop=M.scrollHeight}
const decline=()=>{const a=cur_();if(!a)return;
 if(a.status==="declined"){a.status="seen"}else{
   const left=apps.filter(x=>x.status!=="declined"&&x.id!==a.id).length;
   if(left<OPP.num){toast(`Sie brauchen mindestens ${OPP.num} Bewerber${OPP.num>1?"s":""} für diese Kampagne - dieser kann daher noch nicht abgelehnt werden.`);return}
   a.status="declined";a.chat.push({t:"sys",x:"You declined this application"})}
 renderList();renderProf();renderChat()};
const offer=()=>{const a=cur_();if(!a)return;const p=+$("#feei").value;if(!p){toast("Enter a fee first");return}
 if(deals().length>=OPP.num){toast(`Alle ${OPP.num} Plätze sind belegt${OPP.num>1?"":""}. Stornieren Sie einen bestätigten Athleten, um einen Platz freizugeben.`);return}
 $("#fcp").value=p;$("#fcc").value="";$("#fcok").click()};
function openFC(a){$$(".fccur").forEach(e=>e.textContent=cur());$("#fcp").value=Math.round(OPP.budget/OPP.num);$("#fcc").value="";$("#fc").hidden=false;updFC();$("#fcp").focus()}
function updFC(){const p=+$("#fcp").value||0,left=OPP.budget-committed()-p;
 $("#fcnote").textContent=`Der Athlet erhält ${money(p*(1-COMM))} nach der Provision von 18 %.`;
 $("#fcleft").innerHTML=`Restbudget: <b>${money(Math.max(0,left))}</b>`+(left<0?` <span style="color:#FF8A7A">▲ Budget um ${money(-left)} überschritten</span>`:"")}
$("#fcp").oninput=updFC;
$("#fcx").onclick=$("#fccancel").onclick=()=>$("#fc").hidden=true;
$("#fcok").onclick=()=>{const a=cur_(),p=+$("#fcp").value;if(!a||!p)return;$("#fc").hidden=true;a.chat.push({t:"sys",x:"✓ You accepted this applicant"});
 a.price=p;a.cond=$("#fcc").value.replace(/</g,"&lt;");a.status="offer";
 a.chat.push({t:"deal",x:`FINALE KONDITIONEN<b>${money(p)}</b><small>zzgl. MwSt. / Steuern</small>`,at:now()});
 renderList();renderProf();renderChat();
 const id=a.id;setTimeout(()=>{a.status="deal";a.stage="confirmed";a.chat=a.chat.map(m=>m.t==="deal"?{...m,x:m.x.replace("FINAL CONDITIONS","FINALE KONDITIONEN <span class='cf'>Bestätigt</span>")}:m);a.chat.push({t:"sys",x:`✓ ${a.name} hat die finalen Konditionen bestätigt`});
   a.dchat=[{t:"sys",x:`Deal zu ${money(p)} bestätigt. Zahlen Sie, um ihn zu fixieren.`}];
   renderList();if(sel===id){renderProf();renderChat()}toast(`${a.name} bestätigt. Jetzt unter Deals.`)},1800)};
// ---- deals
function renderDeals(){
 const d=deals();$("#dlc").textContent=d.length;
 if(!d.length){$("#dealist").innerHTML="";$("#dprof").innerHTML=`<div class="empty"><div><div class="big">0</div><p>Noch keine bestätigten Athleten.<br>Öffnen Sie einen Bewerber, klicken Sie auf <b style="color:var(--gold)">Annehmen</b> und bestätigen Sie die finalen Konditionen.</p></div></div>`;$("#dmsgs").innerHTML="";$("#dqs").innerHTML="";return}
 if(!d.some(a=>a.id===dsel))dsel=d[0].id;
 const CTA={eye:"Kampagne abgeschlossen",h:"So funktioniert Athletenmarketing auf Sport Endorse.",p:"Vom Briefing zur bezahlten Kampagne in Minuten. Stellen Sie sich das jetzt mit über 12.000 echten verifizierten Athleten vor.",demo:"Demo buchen &rarr;",pricing:"Preise ansehen"};
 const RL={rate:"Bewerten: ",opt:"Kommentar hinzufügen (optional)",submit:"Bewertung senden",rated:"Bewertet",sys:"Sie haben diesen Athleten bewertet",thanks:"Bewertung gesendet. Vielen Dank!"};
 const lab={confirmed:"BESTÄTIGT",paid:"BEZAHLT",done:"ABGESCHLOSSEN",rated:"★ BEWERTET"};
 $("#dealist").innerHTML=d.map(a=>`<div class="ai ${a.id===dsel?"on":""}" data-id="${a.id}">${avatar(a)}<div><b style="font-size:.86rem">${a.name}</b><small>${money(a.price)}</small></div><span class="st">${lab[a.stage]}</span></div>`).join("");
 $$("#dealist .ai").forEach(r=>r.onclick=()=>{dsel=+r.dataset.id;renderDeals()});
 const a=d.find(x=>x.id===dsel),st=a.stage;
 const btn=st==="confirmed"?`<button class="pri" id="dpay">${money(a.price)} zahlen →</button><button class="cx" id="dcancel">Bestätigten Athleten stornieren</button>`:st==="paid"?`<button class="pri" id="ddone">Arbeit als abgeschlossen markieren</button>`:st==="done"?`<div class="rateblk"><span class="ql">${RL.rate}${a.name.split(" ")[0]}</span><div class="stars">${[1,2,3,4,5].map(i=>`<button class="star${(a.rtmp||0)>=i?" on":""}" data-r="${i}" aria-label="${i}/5">★</button>`).join("")}</div><textarea id="dcomment" rows="2" placeholder="${RL.opt}">${a.rtmpc||""}</textarea><button class="pri" id="drate" ${a.rtmp?"":"disabled"}>${RL.submit}</button></div>`:`<div class="rateblk"><div><b class="ratedstars">${"★".repeat(a.rating||5)}<span class="dim">${"☆".repeat(5-(a.rating||5))}</span></b> <span class="tag">${RL.rated}</span></div>${a.review?`<p class="muted" style="margin:6px 0 0;font-size:.85rem">&ldquo;${a.review}&rdquo;</p>`:""}</div>`;
 $("#dprof").innerHTML=`<div style="display:flex;gap:14px;align-items:center">${avatar(a,1)}<div><h3>${a.name}</h3><span class="tag">${lab[st]}</span></div></div>
  <div class="dealamt"><b>${money(a.price)}</b> <span class="muted" style="font-size:.78rem">zzgl. MwSt. / Steuern</span><div class="muted" style="font-size:.8rem">Der Athlet erhält ${money(a.price*(1-COMM))} nach Provision.</div>${a.cond?`<p style="margin-top:8px;font-size:.85rem">${a.cond}</p>`:""}</div>
  <div class="tl"><div class="ok">Mit Anschreiben beworben</div><div class="ok">Finale Konditionen bestätigt</div><div class="${st!=="confirmed"?"ok":""}">Bezahlt</div><div class="${st==="done"||st==="rated"?"ok":""}">Arbeit abgeschlossen · Athlet ausgezahlt</div><div class="${st==="rated"?"ok":""}">Bewertet</div></div>
  <div class="dbtns">${btn}</div>`;
 const q=s=>$("#dprof").querySelector(s);
 if(q("#dpay"))q("#dpay").onclick=()=>openPay(a);
 if(q("#dcancel"))q("#dcancel").onclick=()=>{a.status="accepted";a.stage=null;a.chat.push({t:"sys",x:"Confirmed athlete cancelled. The slot is open again."});renderSlots();renderDeals();toast(`${a.name} ist zurück bei Bewerbern.`)};
 if(q("#ddone"))q("#ddone").onclick=()=>{a.stage="done";a.dchat.push({t:"sys",x:"✓ Work marked complete. Payment released to the athlete."});renderDeals();toast(`Zahlung an ${a.name} freigegeben.`)};
 const qa=s=>[...$("#dprof").querySelectorAll(s)];
 qa(".star").forEach(b=>b.onclick=()=>{a.rtmp=+b.dataset.r;qa(".star").forEach(s2=>s2.classList.toggle("on",+s2.dataset.r<=a.rtmp));const sb=q("#drate");if(sb)sb.disabled=false;});
 if(q("#dcomment"))q("#dcomment").oninput=e=>{a.rtmpc=e.target.value};
 if(q("#drate"))q("#drate").onclick=()=>{if(!a.rtmp)return;a.rating=a.rtmp;a.review=(a.rtmpc||"").trim().replace(/</g,"&lt;").slice(0,300);delete a.rtmp;delete a.rtmpc;a.stage="rated";a.dchat.push({t:"sys",x:`${"★".repeat(a.rating)}${"☆".repeat(5-a.rating)} ${RL.sys}`+(a.review?` &mdash; &ldquo;${a.review}&rdquo;`:"")});renderDeals();toast(RL.thanks)};
 const M=$("#dmsgs");M.innerHTML=bubbles(a,a.dchat);M.scrollTop=M.scrollHeight;
 $("#dqs").innerHTML=st==="rated"?`<div class="simcta"><span class="ql">${CTA.eye}</span><h3>${CTA.h}</h3><p class="muted">${CTA.p}</p><div class="ctabtns"><a class="btn btn-gold" href="demo.html">${CTA.demo}</a><a class="btn btn-ghost" href="subscription.html">${CTA.pricing}</a></div></div>`:`<span class="ql">Nachricht senden · noch ${3-a.dasked.length}</span>`+DQA.map(([m],i)=>`<button data-q="${i}" ${a.dasked.includes(i)?"disabled":""}>${m}</button>`).join("");
 $$("#dqs [data-q]").forEach(b=>b.onclick=()=>ask(a,+b.dataset.q,"dchat",DQA,"dasked",()=>{if(dsel===a.id)renderDeals()}));
}
// ---- pay simulation
let payFor=null;
function openPay(a){payFor=a;["#p-name","#p-card","#p-exp","#p-cvc"].forEach(s=>$(s).value="");$("#pwho").textContent=`${a.name} · ${OPP.name.slice(0,34)}`;$("#pamt").textContent=money(a.price);$("#pgo").innerHTML=`${money(a.price)} zahlen`;$("#pgo").disabled=false;$("#pay").hidden=false}
$("#payx").onclick=()=>$("#pay").hidden=true;
function typeInto(sel,txt,cb){let n=0;const el=$(sel);const t=setInterval(()=>{el.value=txt.slice(0,++n);if(n>=txt.length){clearInterval(t);cb&&cb()}},28)}
$("#pfill").onclick=()=>typeInto("#p-name","Motion Audio Ltd",()=>typeInto("#p-card","4242 4242 4242 4242",()=>typeInto("#p-exp","12 / 28",()=>typeInto("#p-cvc","123"))));
$("#pgo").onclick=()=>{if(!$("#p-card").value){$("#pfill").click();return}
 const b=$("#pgo");b.disabled=true;b.innerHTML=`<span class="spin"></span>Wird verarbeitet…`;
 setTimeout(()=>{b.innerHTML="✓ Paid";setTimeout(()=>{$("#pay").hidden=true;const a=payFor;a.stage="paid";a.dchat.push({t:"sys",x:`✓ Zahlung über ${money(a.price)} eingegangen. Die Mittel werden bis zum Abschluss der Arbeit verwahrt.`});renderDeals();toast("Zahlung erfolgreich")},700)},1500)};
fillAll();function fillAll(){onCountry();renderSports()}
$("#c-sport").innerHTML+=SPORTLIST.map(x=>`<option>${x}</option>`).join("");

// close form → feeds TRY IT
$("#closego").onclick=()=>{
  const m=$("#c-market").value;$("#o-country").value=({USA:"United States",UK:"United Kingdom"})[m]||m;onCountry();
  const s=$("#c-sport").value;if(s){selSports=new Set([s]);renderSports()}
  $("#o-budget").value=$("#c-budget").value;calcFee();go(1);
  $("#try").scrollIntoView({behavior:"smooth"});
};

// ---------- JOURNEY ----------
const J=[["9,214","Profiles scanned",100],["184","Matching athletes",62],["31","Applications received",40],["12","Shortlisted & agreed",26],["12","Payments completed",26],["1.84M","Reach · measured with our partner",88]];
$("#journey").innerHTML=J.map(([n,l,w])=>`<div class="jstep rv"><div class="top"><span class="muted">${l}</span><b>${n}</b></div><div class="bar"><i data-w="${w}" style="width:0"></i></div></div>`).join("");

// ---------- REGIONS ----------
const RG=[["USA","NIL + pro talent","College NIL programmes and pro athletes across 50 states, with compliant contracts built in."],["Ireland","GAA, rugby + more","Our home market — GAA, rugby, athletics and 40+ sports, from inter-county to Olympians."],["UK","Multi-sport","Football, rugby, cricket, athletics and fast-growing women's sport audiences."],["Europe","Multi-market","Run one campaign across DE, FR, ES, NL and more with local talent in each."],["South Africa","Schools rugby + pro","Local platform presence, schools rugby and national-team athletes."],["Global","85+ countries","Multi-currency payouts and verified talent in 85+ countries."]];
let rsel=1;function renderReg(){$("#regions").innerHTML=RG.map(([n,d],i)=>`<div class="card reg ${i===rsel?"on":""}" data-i="${i}"><b>${n}</b><p class="muted">${d}</p></div>`).join("");$("#regdetail").innerHTML=`<b>${RG[rsel][0]}:</b> <span class="muted">${RG[rsel][2]}</span> <a href="#try" style="color:#9A7B00;font-weight:600;margin-left:8px">Find athletes here →</a>`;$$(".reg").forEach(r=>r.onclick=()=>{rsel=+r.dataset.i;renderReg()})}renderReg();

// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");e.target.querySelectorAll("[data-w]").forEach(b=>b.style.width=b.dataset.w+"%")}}),{threshold:.2});
$$("#sepitch .srv").forEach(el=>io.observe(el));

document.addEventListener("click",function(e){var t=e.target.closest("[data-godeal]");if(t){dsel=+t.dataset.godeal;go(5);}});
})();
