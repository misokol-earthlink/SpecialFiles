<link crossorigin="" href="https://images.shulcloud.com" rel="preconnect" />
<p arial="" font-family:="" style="text-align: justify;"><span style="color:#c0392b;"><span style="font-size:18px;"><strong>In the box below, enter a minimum of three consecutive letters in the name of the deceased and select one of the names displayed in the dropdown list to view the  related Yahrzeit details for allowed individuals as noted below.  Letters are not case sensitive but punctuations and spaces, if included, must exactly match our data base.  Please note that you can only view  the data of individuals for whom  you  are  (or another family member is)   designated as a mourner.</strong></span></span></p>

<div style="display:flex; align-items:center; gap:12px; margin:8px 0;"><span style="color:#003399; font-size:22px; font-weight:bold; white-space:nowrap;">Name of the Deceased:</span>

<div id="typeAheadWrapper" style="position:relative; display:inline-block;"><input autocomplete="off" id="nameInput" placeholder="Enter at least 3 consecutive characters" style="width:420px;" type="text" />
<div class="tt-menu" id="ttMenu"> </div>
</div>
</div>

<div class="tool-tip-container">
<p id="tool-tip-text">Names are not case sensitive. Searches are based on the surname characters of the full name and suffix titles are ignored. Titles in front of the name such as Mr. or Dr. will not cause a problem since the search starts with the first character entered. For example, entering “Vine” or “vine” will find LeVine or LeVine MD, where the period is part of the title. Normal suffixes like Jr. will be ignored if there is a space before the surname. You can also search for a full name. However, if a middle initial or name is included in the database, the search string must match including punctuation and any prefix title. If unsure, use the last name or part of the last name. Regardless of where you start a search string, that entire string must be present.</p>
<button hidden="" id="btyy" style="color:black; background:Yellow; height: 30px">Enter Last Name</button></div>
<!--
<p style="font-family: Arial, Helvetica, sans-serif; margin: 10px 0 1px 0;">Click a button below to select a different panel</p>
-->
<style type="text/css">.tool-tip-container {
  position: relative;
  display: flex;
  justify-content: center; /* center the group by default */
  width: 100%;              /* give the container full width to allow left align */
}

/* push the button to the left inside the full-width container */
.tool-tip-container button {
  margin-right: auto;       /* pushes the button to the left inside the centered container */
  align-self: flex-start;   /* keep vertical alignment if needed */
}

p#tool-tip-text {
  display: none;
  position: absolute;   /* ← CORRECT */
  margin: 0;
  z-index: 10000;

  background: #00732c;
  padding: 8px;
  font-size: 1rem;
  color: #fff;
  border-radius: 2px;
}
#typeAheadWrapper {
    position: relative;
    width: 420px;
    max-width: 100%;
}

#nameInput {
    width: 100%;
    font-size: 18px;
    padding: 6px 8px;
    box-sizing: border-box;
}

.tt-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 9999;
    display: none;
    background: white;
    border: 1px solid #ccc;
    max-height: 200px;
    overflow-y: auto;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    font-size: 18px;
    font-weight: normal;
}

.tt-suggestion {
    padding: 5px 10px;
    color: red;
    cursor: pointer;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tt-suggestion:hover {
    background-color: #f0f0f0;
}

.tt-suggestion.tt-cursor {
    background-color: #b3d7ff;
}
</style>
<script src="https://cdn.jsdelivr.net/gh/misokol-earthlink/SpecialFiles@main/PairedNames.js"></script><script>
/* ================================
   Global variables
   ================================ */

var maxCount = 150;
var userName = "Guest";
var sortedUsers = [];
var newWindow;
var BlueWindow;
var myTimeout;
var ctrlKeystatus = false;
var namecheck = false;
var hd = 25;
var hy = 5749;
var hm = "Kislev";
var yearCount = 15;
var dataarray = [];
var foundarray = [];
var urltoday;
var globalUrl;
var urlforcalendar;
var databasedata = [];
var startyear;
var observancetype;
var datelist = [];
var newdateliststatus;
var transferobject = {};
var masterPanelNumber = 0;
var currentNumber = "1";  // initial load always starts with panel 1
var thisWeekNames = [];
var YzNames = [];
var flameGlyph = "🔥";
var RefList = getWeekData();
var  allowMusic = false;
window.nameDirectory = window.nameDirectory || {};
var fulldata = getNewData();

const nameInput = document.getElementById("nameInput");
const ttMenu = document.getElementById("ttMenu");

let currentSuggestions = [];
let highlightedIndex = -1;
let hasMatches = false;
let suppressBlurAlert = false;

/* ================================
   Calendar / Hebcal utilities
   ================================ */
function getWeekData() {
  var YzListText = null;
  var localList = [];
  var printname = "";
  printname2 = "";
  var req = new XMLHttpRequest();
  req.open('GET', "https://images.shulcloud.com/13721/uploads/AttachmentFiles/YzList.txt?t=" + (new Date()), false);
  req.send();
  YzListText = req.responseText;

  var rawLines = YzListText.split(/\r?\n/);
  var a = rawLines
    .map(line => line.trim())
    .filter(line => line.length > 0);

  for (let iz = 0; iz < a.length; iz++) {
    if (a[iz] === "Julius Ascher") {
      printname = "Julius Ascher";
      a[iz] = "Julius&Miriam Job Ascher";
    }
    if (a[iz] === "Miriam Job Ascher") {
      printname = "Miriam Job Ascher";
      a[iz] = "Julius&Miriam Job Ascher";
    }
    localList.push(a[iz]);
  }
  return localList;
}

function decodeHDOD(HDOD) {
  console.log("in decodeHDODE");
  HDOD = HDOD.trim().replace(/\s+/g, " ");
  const parts = HDOD.split(" ");
  hd = parts[0].trim();
  hy = parts[parts.length - 1];
  let hmonth = parts.slice(1, parts.length - 1).join(" ");
  switch (hmonth) {
    case "Nissan": hm = "Nisan"; break;
    case "Iyar": hm = "Iyyar"; break;
    case "Tammuz": hm = "Tamuz"; break;
    case "Sh'vat": hm = "Shvat"; break;
    case "Adar I": hm = "Adar1"; break;
    case "Adar II": hm = "Adar2"; break;
    default: hm = hmonth; break;
  }
}

async function fetchJSON(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log("fetchJSON");
  return data;
}

async function fetchTEXT(url) {
  const response = await fetch(url);
  const text  = await response.text();
  console.log("In fetchTEXT");
  console.log(text);
  return text;
}

async function yzCalendar() {
  var HDOD = databasedata[2];
  newdateliststatus = 0;
  console.log("yxCalendar");
  decodeHDOD(HDOD);

  let dt = new Date();
  if (dt.getHours() > 19) {
    dt.setDate(dt.getDate() + 1);
  }
  const isoDate = [dt.getFullYear(), pad2(dt.getMonth() + 1), pad2(dt.getDate())].join('-');
  urltoday = "https://www.hebcal.com/converter?cfg=json&date=" + isoDate + "&g2h=1&strict=1";
  globalUrl = urltoday;

  var url = "https://www.hebcal.com/converter?cfg=json&hy=5749&hm=Kislev&hd=25&h2g=1&strict=1";
  urlforcalendar = url;

  await fetchData();

  startyear = hy - 1;
  urlforcalendar = "https://www.hebcal.com/converter?cfg=json&hy=";
  urlforcalendar += hy + "&hm=" + hm + "&hd=" + hd + "&h2g=1&strict=1";

  dataarray.length = 0;
  for (var ii = 0; ii < yearCount; ii++) {
    var htmlstring = "https://www.hebcal.com/converter?cfg=json&hy=";
    var hyy = startyear + ii;
    htmlstring += hyy + "&hm=" + hm + "&hd=" + hd + "&h2g=1&strict=1";
    dataarray.push(htmlstring);
  }

  await async_alldata();
  foundarray.length = 0;
}

async function doCalendar() {
  console.log("doCalendar");
  await yzCalendar();
  await makedataobject();

  // Stop opener audio (and banner)
  if (typeof globalThis.stopOpenerAudio === "function") {
    globalThis.stopOpenerAudio();
  }

  BlueWindow = window.open("https://cjcnspring.shulcloud.com/blueborder4y.html", "BlueWindow");

  BlueWindow.onload = function () {
    BlueWindow.document.getElementById("nameline").textContent = transferobject.name;
    BlueWindow.document.getElementById("header21").textContent = "HDOD: " + transferobject.HDOD;
    BlueWindow.document.getElementById("header22").textContent = "EDOD: " + transferobject.EDOD;

    const startYear = parseInt(transferobject.startyear, 10);
    const datelistLocal = transferobject.datelist || [];

    for (let n = 1; n <= 15; n++) {
      const leftCell = BlueWindow.document.getElementById("cellleft" + n);
      const rightCell = BlueWindow.document.getElementById("cellright" + n);

      const year = startYear + (n - 1);
      const date = datelistLocal[n - 1] || "";

      if (leftCell) leftCell.textContent = year;
      if (rightCell) rightCell.textContent = date;
    }
  };
}

async function makedataobject () {
  var datelistcopy = datelist.slice();
  console.log("makedataobject");
  Object.assign(
    transferobject,
    { name: databasedata[0] },
    { HDOD: databasedata[2] },
    { EDOD: databasedata[3] },
    { YzType: observancetype },
    { startyear: startyear },
    { datelist: datelistcopy }
  );
}

const async_alldata = async () => { await alldata(); };

const fetchYzs = async () => {
  for (const url of dataarray) {
    await getJSONdata(url);
  }
};

const getJSONdata = async globalUrl => {
  const res = await fetch(globalUrl);
  const data = await res.json();
  var alertstring = data.gm + "/" + data.gd + "/" + data.gy;
  foundarray.push(alertstring);
};

const alldata = async () => {
  await fetchYzs();
  dataMessage = "ALL DONE: " + foundarray;
  datelist.length = 0;
  datelist = foundarray.slice();
  newdateliststatus = 1;
  window.parent.focus();
  window.parent.displayAlertMessage(dataMessage);
};

function pad2(number) {
  console.log("in pad2");
  if (number < 10) return '0' + number;
  return '' + number;
}

async function fetchData() {
  console.log("in fetchData");
  try {
    const response = await fetch(globalUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    if (data.hasOwnProperty('hy')) {
      const found = data.hy;
      hy = data.hy;
      return found;
    } else {
      throw new Error('The "hy" property was not found in the JSON response');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

/* ================================
   “Within this week?” logic
   ================================ */
function inWeek(dName, HDOD, gregDateString) {
  const nYears = "3";
  const thisHebYear = getHebrewYear();
  const startHyr = thisHebYear - 1;
  console.log("inWeek");

  if (gregDateString.includes("/")) {
    let [m, d, y] = gregDateString.split("/");
    m = m.padStart(2, "0");
    d = d.padStart(2, "0");
    gregDateString = `${y}-${m}-${d}`;
  }

  let [sunsetFlag, statusFlag] = checkSunset(HDOD, gregDateString);

  const nextObservance = getNextObservance(
    dName,
    gregDateString,
    nYears,
    startHyr,
    sunsetFlag
  );

  const validTypes = ["earlyweek", "laterweek", "today"];
  return validTypes.includes(nextObservance?.dateType);
}

function formatDateToYMD(date) {
  console.log("In formatDateToYMD");
  return date.getFullYear() + "_" +
    String(date.getMonth() + 1).padStart(2, '0') + "_" +
    String(date.getDate()).padStart(2, '0');
}

function getNextObservance(name, gDateString, numberYears, startHyr, sunsetFlag) {
  console.log("getNextObservance");
  const allObservances = fetchHebrewAnniversaries(
    name,
    gDateString,
    numberYears,
    startHyr,
    sunsetFlag
  );
  return processObservanceDates(allObservances);
}

function fetchHebrewAnniversaries(name, gregorianDateString, numberYears, startHyr, sunsetFlag) {
  console.log("fetchHebrewAnniversaries");
  let year, month, day;

  if (gregorianDateString.includes("-")) {
    [year, month, day] = gregorianDateString.split('-').map(Number);
  } else {
    [month, day, year] = gregorianDateString.split('/').map(Number);
  }

  const data = makeSyncYzObservance(
    name,
    day,
    month,
    year,
    numberYears,
    startHyr,
    sunsetFlag
  );
  return (data && data.items && data.items.length > 0) ? data : null;
}

function makeSyncYzObservance(name, day, month, year, numberYears, startHyr, sunsetFlag) {
  const xhr = new XMLHttpRequest();
  const params = new URLSearchParams({
    cfg: 'json',
    v: 'yahrzeit',
    n1: name,
    t1: 'Yahrzeit',
    d1: String(day).padStart(2, '0'),
    m1: String(month).padStart(2, '0'),
    y1: year,
    years: numberYears,
    hebdate: 'off',
    start: startHyr,
    s1: sunsetFlag
  }).toString();

  xhr.open('POST', 'https://www.hebcal.com/yahrzeit', false);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);

  return (xhr.status === 200) ? JSON.parse(xhr.responseText) : null;
}

function processObservanceDates(YzObservances) {
  console.log("IN processObservanceDates");
  const today = new Date();
  let HebrewDate = "";

  const todayFormatted =
    today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');

  const weekStart = new Date(today);
  const weekEnd = new Date(today);
  const dayOfWeek = today.getDay();
  weekStart.setDate(today.getDate() - dayOfWeek);
  weekEnd.setDate(today.getDate() + (6 - dayOfWeek));

  const weekStartStr = formatDateToYMD(weekStart);
  const weekEndStr = formatDateToYMD(weekEnd);
  const todayStr = formatDateToYMD(today);

  let firstObservance = null;
  let secondObservance = "none";
  let dateType = "future";

  if (YzObservances?.items?.length > 0) {
    const items = YzObservances.items;
    for (let i = 0; i < items.length; i++) {
      const itemDate = parseLocalYMD(items[i].date);
      const itemDateStr = formatDateToYMD(itemDate);
      if (itemDateStr >= weekStartStr) {
        firstObservance = items[i].date;
        HebrewDate = items[i].hdate;
        if (i + 1 < items.length) {
          secondObservance = items[i + 1].date;
        }
        if (itemDateStr === todayStr) {
          dateType = "today";
        } else if (itemDateStr < todayStr && itemDateStr >= weekStartStr) {
          dateType = "earlyweek";
        } else if (itemDateStr > todayStr && itemDateStr <= weekEndStr) {
          dateType = "laterweek";
        } else {
          dateType = "future";
        }
        break;
      }
    }
  }

  return {
    firstObservance: firstObservance ? firstObservance : "None",
    secondObservance: secondObservance ? secondObservance : "",
    todayDate: todayFormatted,
    hebDate: HebrewDate,
    dateType: dateType
  };
}

function getHebrewYear() {
  console.log("IN getHebrewYear");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const url = `https://www.hebcal.com/converter?cfg=json&gy=${yyyy}&gm=${mm}&gd=${dd}&g2h=1`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
    return response.hy;
  } else {
    console.error("Failed to fetch Hebrew year:", xhr.statusText);
    return null;
  }
}

function checkSunset(HDOD, gregDateString) {
  console.log("In checkSunset");
  const parts = HDOD.trim().split(" ");
  if (parts.length !== 3) return ["off", "error"];
  const [hday, hmonth, hyear] = parts;
  const url = `https://www.hebcal.com/converter?cfg=json&hy=${hyear}&hm=${hmonth}&hd=${hday}&h2g=1`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  if (xhr.status !== 200) return ["off", "error"];
  const result = JSON.parse(xhr.responseText);
  const convertedDate = `${result.gy}-${String(result.gm).padStart(2, '0')}-${String(result.gd).padStart(2, '0')}`;
  const targetDate = new Date(gregDateString);
  const converted = new Date(convertedDate);
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round((targetDate - converted) / msPerDay);
  if (diffDays === 0) return ["off", "ok"];
  else if (diffDays === -1) return ["on", "shift"];
  else return ["off", "error"];
}


/* ================================
   Data load from YzListFull CSV
   ================================ */
function getNewData() {
    
  window.nameDirectory = {};
  console.log("In getNewData");
  var YzFullText = null;
  var reqFull = new XMLHttpRequest();

  reqFull.open(
    'GET',
    'https://images.shulcloud.com/13721/uploads/AttachmentFiles/YzListFullXXX.csv?t=' + Date.now(),
    false
  );

  reqFull.send();
  YzFullText = reqFull.responseText;
 var localCount ;
  var fulldataLocal = [];
  var rows = YzFullText.split("\r\n");
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].split(",");
    fulldataLocal.push(cells);
    localCount = fulldataLocal.length-1;
   window.nameDirectory[cells[0]] = localCount;
   if (localCount > -1  ) {
  YzNames.push( fulldataLocal[localCount][0] );
   }
  }
  return fulldataLocal;
}

/* ================================
   “This week’s Yahrzeits” button
   ================================ */

async function continueClick(founddata, calltype) {
  console.log("in continueClick");

  // Audio attempt inside gesture stack is handled by attachPanelListener().
  // Here, we only ensure audio is ON if needed later (weekly list rule below).

  var localfounddata = founddata.slice();
  databasedata.length = 0;
  databasedata = localfounddata.slice();

  var isBadDate = "False";
  var replaceDate = "";
  var returnV = moreClick(founddata);
  var badtag = "";
  var badalert = "";
  const SHOW_AUDIO_CONTROLS = false;

  const badDateList = [
    "Arlene Bookbinder", "Myrna Axel", "Rose Scheon", "Mr Arthur Levine",
    "Fanny Cohen Behar", "Thelma Levinson",
    "Barbara Tarlton", "Martin Elliott Lambert"
  ];

  var yzType = (founddata[5] == "Y") ? "English" : "Hebrew";
  observancetype = yzType;
  var today = new Date();

  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  var mseconds = today.getMilliseconds();

  if (badDateList.includes(founddata[0]) & (yzType === "Hebrew")) {
    isBadDate = "True";
    badtag = "&#9431";
    replaceDate = getDatebyName(founddata[0]);
    founddata[3] = replaceDate;
    badalert = "You have requested Yahrzeit information for " + founddata[0] + ".  The English DOD and the Hebrew DOD ";
    badalert += "in the database are inconsistent. Since the observation is based upon the Hebrew date of passing, ";
    badalert += "this date was used to calculate the next Yahrzeit occurence and the corresponding English DOD is displayed replacing the value from the database. ";
    badalert += "Dismiss this message to continue";
    alert(badalert);
  }

  var sundownFlag = founddata[6];
  var ispast = false;
  var observancedatet = founddata[4];
  decodeHDOD(founddata[2]);

  if (yzType === "Hebrew") {
    observancedatet = await makeYzFetch(founddata[0], 3, founddata[3], founddata[2], sundownFlag);
    founddata[4] = observancedatet;
    if (calltype === "local") namecheck = true;
  }
  if (yzType === "English") {
    observancedatet = getNextEnglishDate(founddata[3]);
    founddata[4] = observancedatet;
  }

  observancedatet = observancedatet.split("/");
  var obsdate = new Date(observancedatet[2], observancedatet[0] - 1, observancedatet[1], hours, minutes, seconds, mseconds);

  if (obsdate < today) ispast = true;

  var mourner = founddata[7];
  var mlength = (mourner.length);
  var numberm = 0;
  if (mlength > 0) {
    mourner = mourner.split(";");
    numberm = mourner.length;
  }

    const mcRect = document.getElementById("maincontent").getBoundingClientRect();
  const newLeft = Math.round(mcRect.left + 50);

  newWindow = window.open(
    "about:blank",
    "Plaque Image",
    `width=800,height=600,scrollbars=1,resizable=1,left=${newLeft},top=200`
  );

 
  newWindow.focus();

  
const thisName = founddata[0];

  var imageName = founddata[1];
  var html = '<html>';
  html += '<head><Title>Yahrzeit Data for Selected Individual</Title></head>';
  html += '<body> <STRONG>' + founddata[0] + '</STRONG></br>';
  html += "&nbsp&nbsp&nbsp&nbsp&nbsp Plaque Location: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + founddata[1] + "</br>";
  html += "&nbsp&nbsp&nbsp&nbsp&nbsp Hebrew Date of Death: &nbsp" + founddata[2] + "</br>";
  html += "&nbsp&nbsp&nbsp&nbsp&nbsp English  Date of Death: &nbsp" + founddata[3] + "</br>";
  html += "&nbsp&nbsp&nbsp&nbsp&nbsp After Sunset: &nbsp" + founddata[6] + "</br>";
  html += "&nbsp&nbsp&nbsp&nbsp&nbsp Observance: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + founddata[4] + "</br>";
  html += "&nbsp&nbsp&nbsp&nbsp&nbsp Observance Type: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + yzType + "</br></br>";

  if (numberm > 0) {
    html += "&nbsp&nbsp&nbsp&nbsp&nbsp Relationship and Remembered By: </br>";
    for (let jj = 1; jj < numberm; jj++) {
      html += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + mourner[jj - 1] + "</br>";
    }
  }

  if (ispast) {
    html += "The observance date is the last observed date which occured recently in the past.  The subsequent Yahrzeit observation date is not available</br>";
  }

  html += "</br></br>";

  var imagefilename = 'https://images.shulcloud.com/13721/uploads/AttachmentFiles/Plaques/' + imageName + '.jpg';
  var noimagefilename = 'https://images.shulcloud.com/13721/uploads/AttachmentFiles/Plaques/NoImage.jpg';
  var html3 = '<p><img src="' + imagefilename + '" alt="Image Not Available" ';
  html3 += 'id="myImage" onerror="this.onerror=null; this.src=\'' + noimagefilename + '\';" ';
  html3 += 'align="left" style="margin: 10px 10px; width: 720px; height: 128px;"></p>';

  html = "<body>" + html3 + "</body>";

  newWindow.document.write(html);
  var html6 = '<script src="https://images.shulcloud.com/13721/uploads/attachmentfiles/MyCode1.txt" type="text/javascript"></' + 'script>';
  newWindow.document.write(html6);
  newWindow.document.close();

  const h2a = document.createElement("h2");
  const textNode = document.createTextNode("\nYahrzeit Data for Selected Individual:");
  h2a.appendChild(textNode);
  newWindow.document.body.appendChild(h2a);

  const h2 = document.createElement("h3");

  // Weekly list rule: play audio + show banner only if thisName is in RefList
 // const thisName = founddata[0];
  let textNode2;

 if (RefList.includes(thisName) === true) {
    textNode2 = document.createTextNode(flameGlyph + " " + thisName + "\n\n");

    if (allowMusic && typeof globalThis.playOpenerAudio === "function") {
        globalThis.playOpenerAudio();   // do NOT await
    }

} else {
    textNode2 = document.createTextNode(thisName + "\n\n");

    if (typeof globalThis.stopOpenerAudio === "function") {
        globalThis.stopOpenerAudio();
    }
}

  h2.appendChild(textNode2);
  newWindow.document.body.appendChild(h2);

  const div11 = document.createElement("div");
  div11.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspPlaque Location:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + founddata[1];
  newWindow.document.body.appendChild(div11);

  const div12 = document.createElement("div");
  div12.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspHebrew Date of Death:&nbsp " + founddata[2];
  newWindow.document.body.appendChild(div12);

  const div13 = document.createElement("div");
  div13.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspEnglish Date of Death:&nbsp&nbsp" + founddata[3];
  newWindow.document.body.appendChild(div13);

  const div131 = document.createElement("div");
  div131.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspAfter Sunset:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + founddata[6];
  newWindow.document.body.appendChild(div131);

  var observanceDate = founddata[4];
  const div14 = document.createElement("div");
  div14.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspObservance:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + observanceDate + "&nbsp" + badtag;
  newWindow.document.body.appendChild(div14);

  const div15 = document.createElement("div");
  div15.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspObservance Type:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + yzType + "</br>";
  newWindow.document.body.appendChild(div15);

  if (numberm > 0) {
    const div20 = document.createElement("div");
    var htmllist = "</br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbspRelationship and Rembembered By:</br>";
    for (let jj = 1; jj < numberm; jj++) {
      htmllist += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + mourner[jj - 1] + "</br>";
    }
    htmllist += "</br></br></br>";
    div20.innerHTML = htmllist;
    newWindow.document.body.appendChild(div20);
  }

  if (ispast) {
    var htmlwarning = "</br> The observance date is the last observed date which occured recently in the past.  The subsequent Yahrzeit observation date is not available</br></br></br>";
    const div21 = document.createElement("div");
    div21.innerHTML = htmlwarning;
    newWindow.document.body.appendChild(div21);
  }

  if (namecheck) {
    const yzButton = document.createElement("button");
    yzButton.innerText = "15 year Yahrzeit Calendar";

    yzButton.onclick = function () {
     
      window.parent.doCalendar();
    };

    if (observancetype == "Hebrew") {
      newWindow.document.body.appendChild(yzButton);
    }

    if (observancetype == "English") {
      var EnglishYz = "</br>Future observances fall on the anniversary day and month of ";
      EnglishYz += "</br>the deceased's English date of passing.</br>";
      const div23 = document.createElement("div");
      div23.innerHTML = EnglishYz;
      newWindow.document.body.appendChild(div23);
    }
  }

  if (isBadDate == "True") {
    var badmessage = " </br><small>The symbol " + badtag + " following the observance date indicates that the Hebrew and English DOD in the database are inconsistent.";
    badmessage += " The observance date is based upon the Hebrew date and the displayed English DOD is the English date corresponding to the Hebrew.  The recorded English DOD ";
    badmessage += "in the database is not displayed. </small></br>";
    const div24 = document.createElement("div");
    div24.innerHTML = badmessage;
    newWindow.document.body.appendChild(div24);
  }

  // (Popup-local audio UI kept but hidden — your opener audio/banner is the real signal now)
 
  my_code1();
}

/* ================================
   Misc helpers
   ================================ */
function my_code1() {
  console.log("in my_code1");
  return 0;
}

function moreClick(founddata) {
  console.log("In moreClick");
  var returnval = 1;
  var datasize = founddata.length;
  console.log(founddata);
  console.log(datasize);
  return returnval;
}

/* ================================
   Name search logic
   ================================ */
function enterName() {
    var nogo = 0;
  console.log("in enterName");
  if (typeof newWindow !== 'undefined' && newWindow && !newWindow.closed) {
    newWindow.close();
    setTimeout(function () {}, 1000);
  }

  namecheck = true;
  var tooltip = document.getElementById("tool-tip-text");
  if (tooltip) tooltip.style.display = 'none';

  var countMax = fulldata.length;
  var promptstring = "Enter last name of the deceased";
  var nameanswer = window.prompt(promptstring);
  if (nameanswer === null) {
    namecheck = false;
    ctrlKeystatus = false;
    return;
  }

  var testName = nameanswer;
  var trimlen = -testName.length;
  var currentName = "";
  var tempName = "";
  var iiistring = "";
  var listedName = [];
  var isFoundLocal = false;
  listedName = [];
  cleanName = [];

  for (let iii = 1; iii < countMax; iii++) {
    currentName = fulldata[iii][0];
    tempName = currentName;

    var titleStrings = [" Jr.", " Sr.", " Ph.D.", " PhD", " M.D.", " MD", " Esq", " II", "III", "IV"];
    var foundString = "";

    for (let substring of titleStrings) {
      if (tempName.endsWith(substring)) {
        foundString = substring;
        break;
      }
    }
    if (foundString.length > 0) {
      tempName = tempName.slice(0, -foundString.length);
    }

    iiistring = iii.toString();
    var lctempName = tempName.toLowerCase();
    lctestName = testName.toLowerCase();

    isFoundLocal = lctempName.includes(lctestName);
    if (isFoundLocal) {
      var xtendedName = lctempName.slice(trimlen);
      if (xtendedName === lctestName) {
        listedName.push(iiistring + "_" + currentName);
        cleanName.push(currentName);
      }
    }
  }

  var chosenName = "";
  var dataName = "";
  var nameIndex = -1;
  var nameCount = cleanName.length;
  var isnull = false;
  var nameprompt = "There are " + nameCount + " names from which to choose.\n Type Yes to select this person\nDo you want information about the Yahrzeit of ";

  for (let jjj = 0; jjj < cleanName.length; jjj++) {
    promptstring = nameprompt + cleanName[jjj];
    var answer = window.prompt(promptstring, "no");
    if (answer === null) {
      isnull = true;
      namecheck = false;
      ctrlKeystatus = false;
      break;
    }
    if (answer.toUpperCase() === "YES") {
      chosenName = cleanName[jjj];
      dataName = listedName[jjj];
      nameIndex = jjj;
      break;
    }
  }

  if (!isnull) {
    var chosenData = dataName;
    var recordLineStr = chosenData.substring(0, chosenData.indexOf("_"));
    var recordLine = Number(recordLineStr);
    var localdata = fulldata[recordLine];
    var tempName1
    var tempName2
    if (chosenName == "") {
      namecheck = false;
      ctrlKeystatus = false;
      alert("No more matches in database or no matches to name provided");
    } else {
        // check for allowable user 
        var trimmedName = dataName.replace(/^[^_]+_/, '');
     // alert ( "User: " + userName + " wants info on " + trimmedName);
           for (let jj = 0;  jj < sortedUsers.length -1; jj++) {
           //console.log  (jj) ;
           tempName2 = sortedUsers[jj][7] ;
           tempName1 = sortedUsers[jj][0] ;
       
          if ((userName ===  tempName2 ) && (trimmedName ===  tempName1 ) ){
              nogo = nogo + 1;
              break;
          } 
       }
     //  if ( userName === "Assistant Treasurer"){
       //    nogo = 1;
       //}
       
        if (nogo > 0 ) {
      continueClick(localdata, "local");
    } else {
        alert( "You do not have permission to search for " + trimmedName);
    }
      
    }
  }

  namecheck = false;
  ctrlKeystatus = false;
}

/* ================================
   Close windows & messaging
   ================================ */
function closePopup() {
  console.log("In closePopup");
  stopPopupCloseWatcher();

  try {
    if (typeof globalThis.stopOpenerAudio === "function") {
      globalThis.stopOpenerAudio();
    }
  } catch (e) {}

  if (newWindow && !newWindow.closed) {
    newWindow.close();
  }
}

function closeBlueWindow() {
  console.log("in closeBlueWindwo");
  if (BlueWindow && !BlueWindow.closed) {
    BlueWindow.close();
  }
}

function displayAlertMessage (dataTransfer) {
  // placeholder — used by parent
}

window.onunload = function() {
  try { stopOpenerAudio(); } catch(e) {}
  if (newWindow && !newWindow.closed) newWindow.close();
  if (BlueWindow && !BlueWindow.closed) BlueWindow.close();
};

/* ================================
   Async Hebcal Yahrzeit fetch
   ================================ */
async function makeYzFetch(name, years, dateString, hDateString, sunDown) {
  console.log("in makeYzFetch");
  const [month, day, year] = dateString.split("/").map(Number);
  var s1Value = "off";
  if (sunDown === "Y") s1Value = "on";

  let response = await fetch('https://www.hebcal.com/yahrzeit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      cfg: 'json',
      v: 'yahrzeit',
      n1: name,
      t1: 'Yahrzeit',
      hd1: hd,
      hm1: hm,
      hy1: hy,
      hs1: s1Value,
      hebdate: 'on',
      years: years
    })
  });

  const data = await response.json();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  let foundDate = null;
  let returnVar = null;

  data.items.forEach((item, index) => {
    const rawEnglishDate = item.date;
    const [year2, month2, day2] = rawEnglishDate.split('-');
    const englishDate = new Date(Date.UTC(year2, month2 - 1, day2));

    if (!foundDate && englishDate > oneWeekAgo) {
      foundDate = `${(month2).padStart(2, '0')}/${(day2).padStart(2, '0')}/${year2}`;
      returnVar = foundDate;
    }
  });

  return returnVar;
}

/* ================================
   Panel swapping & text replacement
   ================================ */
function replaceTextInNode(node, search, replace) {
  console.log("In replaceTextInNode");
  let nodeType = node.nodeType;
  let nodeText = node.textContent || "";

  if (nodeType === Node.TEXT_NODE) {
    node.textContent = nodeText.replace(search, replace);
  } else if (node.childNodes) {
    node.childNodes.forEach(child => replaceTextInNode(child, search, replace));
  }
}


function getNextEnglishDate(inputDate) {
  console.log("In getNextEnglishDate");
  const [inputMonth, inputDay, inputYear] = inputDate.split('/').map(Number);

  const today = new Date();
  const currentYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  let targetYear = currentYear;

  if (inputMonth < todayMonth || (inputMonth === todayMonth && inputDay < todayDay)) {
    targetYear++;
  }

  const nextDate = `${String(inputMonth).padStart(2, '0')}/${String(inputDay).padStart(2, '0')}/${targetYear}`;
  return nextDate;
}


function getDatebyName (nametoFind) {
  console.log("In getDatebyName");
  const nameDateMap = {
    "Arlene Bookbinder": "09/16/1993",
    "Myrna Axel": "12/09/2004",
    "Rose Scheon": "11/14/1984",
    "Mr Arthur Levine": "01/20/3026",
    "Anna Klibanoff": "02/02/1973",
    "Fanny Cohen Behar": "12/01/1992",
    "Thelma Levinson": "10/25/1981",
    "Barbara Tarlton": "12/09/1972",
    "Martin Elliott Lambert": "01/18/2005"
  };
  return nameDateMap[nametoFind] || null;
}

/* ================================
   Global exports (used by HTML & popups)
   ================================ */

globalThis.enterName = enterName;
globalThis.doCalendar = doCalendar;
globalThis.yzCalendar = yzCalendar;
globalThis.makedataobject = makedataobject;
globalThis.displayAlertMessage = displayAlertMessage;

/* ================================
   Bulletproof initialization
   ================================ */


  

 
function setupTooltipAndNameButton(target, tooltip) {
  if (!target || !tooltip) return;

  const GAP = 10;

  target.addEventListener('mouseover', () => {
    tooltip.style.display = 'block';

    const btnRect = target.getBoundingClientRect();
    const tipRect = tooltip.getBoundingClientRect();
    const container = tooltip.offsetParent || document.body;
    const containerRect = container.getBoundingClientRect();

    tooltip.style.left = (btnRect.left - containerRect.left) + 'px';

    let top = btnRect.top - containerRect.top - tipRect.height - GAP;
    if (top < GAP) {
      top = btnRect.bottom - containerRect.top + GAP;
    }
    tooltip.style.top = top + 'px';
  });

  target.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });

  target.addEventListener('click', async () => {
    tooltip.style.display = 'none';
    namecheck = false;
    await new Promise(r => setTimeout(r, 1000));
    enterName();
  });

  target.addEventListener('touchstart', () => {
    namecheck = false;
    enterName();
  });
}

function waitForCoreElementsAndInit() {
   var nameBtn = document.getElementById("btyy");
  var tooltipEl = document.getElementById("tool-tip-text");

  if ( !nameBtn || !tooltipEl) {
    setTimeout(waitForCoreElementsAndInit, 50);
    return;
  }

  console.log('Core elements ready — running initialization');
  namecheck = false;
    setupTooltipAndNameButton(nameBtn, tooltipEl);
}

(function startInit() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      console.log('Running listener on document load');
      waitForCoreElementsAndInit();
    });
  } else {
    console.log('Document already loaded — starting init immediately');
    waitForCoreElementsAndInit();
  }
})();

function openCleanCalendarPopup(imageDataUrl) {
  if (!imageDataUrl) {
    alert("No image received from calendar window.");
    return;
  }

  let w = window.open("", "CalendarImage", "width=900,height=1200");

  w.document.open();
  w.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Yahrzeit Calendar</title>
      <style>
        body { margin: 0; padding: 20px; display: flex; justify-content: center; background: white; }
        img  { max-width: 100%; height: auto; border: 1px solid #444; box-shadow: 0 0 10px rgba(0,0,0,0.4); }
      </style>
    </head>
    <body>
      <img src="${imageDataUrl}">
    </body>
    </html>
  `);

  w.document.close();
}

 
function parseLocalYMD(dateStr) {
  const [yyyy, mm, dd] = dateStr.split('-').map(Number);
  return new Date(yyyy, mm - 1, dd);
}

function detectLoginStatus() {
    const headerLoginButton = document.getElementById('header_login_button');
    const notLoggedInLabel = document.getElementById("loginLabel");
    const loggedInLabel = document.getElementById("userDropDownBtn");
    const headerDiv = document.getElementById("header_buttons");
    var isLoggedIn = false;            // reset each check
    var loggedinName = "Guest";        // default

    // --- OLD TEMPLATE ---
    if (headerLoginButton) {
        const txt = headerLoginButton.textContent || headerLoginButton.innerText || "";
        if (txt.indexOf("Welcome") > -1) {
            loggedinName = txt.replace("Welcome", "")
                               .replace(/[\n\r\t]/g, "")
                               .replace(/\s+/g, " ")
                               .trim();
            isLoggedIn = true;
            return loggedinName;
        }
    }

    // --- NEW TEMPLATE: NOT LOGGED IN ---
    if (notLoggedInLabel) {
        const txt = (notLoggedInLabel.textContent || "").trim().toLowerCase();
        if (txt === "log in" || txt === "login") {
            isLoggedIn = false;
            return loggedinName;
        }
    }

    // --- NEW TEMPLATE: LOGGED IN ---
    if (loggedInLabel) {
        let raw = loggedInLabel.textContent || "";
        let cleaned = raw.replace(/[\n\r\t]/g, "").trim();
        loggedinName = cleaned;
        isLoggedIn = true;
        return loggedinName;
    }
    
   if (headerDiv) {
    const strongTag = headerDiv.querySelector("strong");

    if (strongTag) {
        const txt = (strongTag.textContent || "").trim();
        loggedinName = txt;
        return loggedinName;
    }
} 
    
}



function expandConcatenatedNames(sourceArray) {
    let outputArray = [];

    for (let i = 1; i < sourceArray.length; i++) {  //exclude header
        let row = sourceArray[i];
        let field7 = row[7] || "";

        let rawParts = field7.split(";");

        for (let j = 0; j < rawParts.length; j++) {
            let part = rawParts[j].trim();

            if (part !== "") {
                let newRow = row.slice(0, 7);
                newRow.push(part);
                outputArray.push(newRow);
            }
        }
    }

   for (let k = 0;  k < outputArray.length; k++) {
    outputArray[k][7] = outputArray[k][7].replace(/^.*?\bof\s+/, "");
      }
   
   outputArray.sort(function(a, b) {
    return a[7].localeCompare(b[7]);
   });
   
    return outputArray;
}



document.addEventListener("DOMContentLoaded", function () {
  
  userName = detectLoginStatus();
  if (userName != "Guest" ) {
   sortedUsers = expandConcatenatedNames(fulldata) ;
  }
 });
function displayNameForMenu(name) {
    return name.replace(/ {2,}/g, function(spaces) {
        return "\u00A0".repeat(spaces.length);
    });
}

function hideDropdown() {
    ttMenu.style.display = "none";
    ttMenu.innerHTML = "";
    currentSuggestions = [];
    highlightedIndex = -1;
    hasMatches = false;
}

function refreshHighlight() {
    const items = ttMenu.querySelectorAll(".tt-suggestion");

    items.forEach(function(item, index) {
        if (index === highlightedIndex) {
            item.classList.add("tt-cursor");
            item.scrollIntoView({ block: "nearest" });
        } else {
            item.classList.remove("tt-cursor");
        }
    });
}

function showDropdown(matches) {
    ttMenu.innerHTML = "";
    currentSuggestions = matches;
    highlightedIndex = -1;
    hasMatches = matches.length > 0;

    if (!hasMatches) {
        hideDropdown();
        return;
    }

    matches.forEach(function(item, index) {
        const row = document.createElement("div");
        row.className = "tt-suggestion";
        row.textContent = item.displayName;

        row.addEventListener("mousedown", function(e) {
            e.preventDefault();
            suppressBlurAlert = true;
            selectSuggestion(index);
        });

        ttMenu.appendChild(row);
    });

    ttMenu.style.display = "block";
}

function getMatches(query) {
    const q = query.trim().toLowerCase();

    if (q.length < 3) return [];

    return YzNames
        .map(function(name, index) {
            return {
                originalName: name,
                displayName: displayNameForMenu(name),
                index: index
            };
        })
        .filter(function(item) {
            return typeof item.originalName === "string" &&
                   item.originalName.toLowerCase().includes(q);
        })
        .slice(0, 25);
}

function selectSuggestion(index) {
    if (index < 0 || index >= currentSuggestions.length) return;

    const selected = currentSuggestions[index];

    nameInput.value = selected.originalName;
    hideDropdown();

    processName(selected.originalName, selected.index);
}

function processName(selectedName, selectedIndex) {
   
    
    let foundRow = findDataName(selectedName);

if (foundRow) {
    console.log(foundRow[0]);   // name
    console.log(foundRow);      // entire row
    //alert("Processing the selected name:\n" + selectedName   + " returned the following:\n "  + foundRow  );
   //var isAllowed = sortedUsers.some(row => row[7] === userName && row[0] === selectedName);
   
   
   var relatedNames = pairedNames[userName] || "";

var allowedMourners = [userName].concat(
    relatedNames
        .split(',')
        .map(name => name.trim())
        .filter(Boolean)
);

var isAllowed = sortedUsers.some(row =>
    row[0] === selectedName && allowedMourners.includes(row[7])
);
   
   
    //alert("finished processing returned " + isAllowed);
    if (userName === "Assistant Treasurer") {
        isAllowed = true;   // admin override
    }
    if (isAllowed === true) {
     continueClick(foundRow, "local");
    } else {
    alert ("You do not have permission to search data for the deceased " + foundRow[0]);
}
    
} else {
    alert("Name not found");
}
    
    
    
    resetName();
}

function resetName() {
    nameInput.value = "";
    nameInput.placeholder = "Enter at least 3 consecutive characters";
    hideDropdown();
    suppressBlurAlert = false;
    nameInput.focus();
}

nameInput.addEventListener("input", function() {
    const value = nameInput.value;
    const matches = getMatches(value);

    showDropdown(matches);

    if (value.trim().length >= 10 && matches.length === 0) {
        alert("After 10 characters entered, no names found.");
        resetName();
    }
});

nameInput.addEventListener("focus", function() {
    const matches = getMatches(nameInput.value);
    showDropdown(matches);
});

nameInput.addEventListener("blur", function() {
    if (suppressBlurAlert) {
        suppressBlurAlert = false;
        return;
    }

    const value = nameInput.value.trim();

    if (value.length >= 3 && !hasMatches) {
        alert("Please enter a valid name; no matches found.");
        resetName();
    }
});

nameInput.addEventListener("keydown", function(e) {
    if (ttMenu.style.display !== "block") return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        if (highlightedIndex < currentSuggestions.length - 1) {
            highlightedIndex++;
            refreshHighlight();
        }
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (highlightedIndex > 0) {
            highlightedIndex--;
            refreshHighlight();
        }
    } else if (e.key === "Enter") {
        if (highlightedIndex >= 0) {
            e.preventDefault();
            selectSuggestion(highlightedIndex);
        }
    } else if (e.key === "Escape") {
        hideDropdown();
    }
});

document.addEventListener("click", function(e) {
    if (e.target !== nameInput && !ttMenu.contains(e.target)) {
        hideDropdown();
    }
});
function findDataName(testName) {
    const idx = window.nameDirectory[testName];
    return (idx !== undefined) ? fulldata[idx] : null;
}

function insertHelpButton(){

    const menu = document.getElementById("nav_section");
    if (!menu) return false;

    if (document.getElementById("YzHelpMenuItem")) return true;

    const li = document.createElement("li");
    li.className = "no_subcontent";
    li.id = "YzHelpMenuItem";

    const link = document.createElement("a");
    link.href = "https://cjcnspring.shulcloud.com/yzhelpc.html?v=" + Date.now();
link.addEventListener("click", function(e){

    e.preventDefault();

    const url = "https://cjcnspring.shulcloud.com/yzhelpc.html?v=" + Date.now();

    const width  = Math.floor(window.screen.width  * 0.80);
    const height = Math.floor(window.screen.height * 0.80);

    const left = Math.floor((window.screen.width  - width)  / 2);
    const top  = Math.floor((window.screen.height - height) / 2);

    window.open(
        url,
        "YzHelpWindow",
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

});
    const img = document.createElement("img");
    img.src = "https://images.shulcloud.com/13721/uploads/AttachmentFiles/YzHelpImages/YzHelpButton.jpg?v=20260309";
    img.style.height = "22px";
    img.style.verticalAlign = "middle";
    img.title = "Yahrzeit Page Help";

    link.appendChild(img);
    li.appendChild(link);
    menu.appendChild(li);

    return true;
}

function waitForMenu(){
    if (!insertHelpButton()){
        setTimeout(waitForMenu, 100);
    }
}

document.addEventListener("DOMContentLoaded", waitForMenu);

</script>
<p> </p>
