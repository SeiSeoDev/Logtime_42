/*
If the click was on a link, send a message to the background page.
The message contains the link's URL.
*/
function notifyExtension(e) {
  let target = e.target;
  l = []
  userloc = document.getElementById("user-locations")
  for (i = 1; i < 9; i++) {
    const n = userloc.childNodes[userloc.childElementCount - i]
    if (n.nodeName == 'g')
      l.push(n)
  }
  b = new Date()
  b = (b.getDay() - 1)
  if (b < 0) b = 6;

  function findh(strtime) {
      i = 0
      while (strtime[i] != 'h')
          i++;
      return i
  }
  function tominutes(strtime) {
      h = findh(strtime)
      return parseInt(strtime.slice(0, h)) * 60 + parseInt(strtime.slice(h+1))
  }
  totaltime = 0
  for(let i = 0; i <= b; i++) {
    totaltime += tominutes(l[i].dataset.originalTitle)
  }
  ret = parseInt(totaltime / 60) + "h" + totaltime % 60
  if (target.firstChild.data == "\nLogtime\n")
    browser.runtime.sendMessage({"url": ret});
}

/*
Add notifyExtension() as a listener to click events.
*/
window.addEventListener("click", notifyExtension);
