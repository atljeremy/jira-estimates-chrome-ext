var sumTotal = () => {
  var sum = sumElements(collectEstimates())
  var id = "sum-badge"
  var sumBadge = document.getElementById(id)
  if (!sumBadge) {
    var sumBadge = document.createElement('aui-badge')
    sumBadge.id = id
    document.getElementById("subnav-title").appendChild(sumBadge)
  }
  sumBadge.innerHTML = sum
}

var sumCols = () => {
  var swimLanes = Array.from(document.querySelectorAll("li[data-column-id]"))
  swimLanes = swimLanes.reduce((acc, cur) => {
    var estimates = Array.from(cur.querySelectorAll("aui-badge[class=ghx-estimate]"))
    var sum = sumElements(estimates)
    var currentColSum = acc[cur.dataset.columnId] || 0
    var key = (containsUnestimated(estimates)) ? `${cur.dataset.columnId}?uns` : cur.dataset.columnId
    acc[key] = currentColSum + sum
    return acc
  }, {})
  for (laneId in swimLanes) {
    var cleanLaneId = laneId.replace("?uns", "")
    var id = `${cleanLaneId}-sum-badge`
    var sumBadge = document.getElementById(id)
    if (!sumBadge) {
      var sumBadge = document.createElement('aui-badge')
      sumBadge.id = id
      document.querySelector(`li[data-id="${cleanLaneId}"] h2`)
              .parentElement
              .appendChild(sumBadge)
    }
    if (laneId.includes("?uns")) {
      applyBgColor(sumBadge)
    }
    sumBadge.innerHTML = swimLanes[cleanLaneId]
  }
}

var highlightUnestimated = () => {
  (unestimated(collectEstimates()) || []).forEach((val, i, a) => applyBgColor(val))
}

var containsUnestimated = (elems) => {
  return (unestimated(elems) || []).length > 0
}

var unestimated = (elems) => {
  return elems.filter(e => e.innerHTML == '-')
}

var collectEstimates = () => {
  var estimates = document.querySelectorAll("aui-badge[class=ghx-estimate]") // Sprint Board
  if (estimates.length == 0) {
    var sprintGroup = document.getElementsByClassName("ghx-sprint-group")[0]
    estimates = sprintGroup.querySelectorAll("span[title=\"Story Points\"]") // Backlog
  }
  return Array.from(estimates)
}

var sumElements = (elements) => {
  return elements.map(e => parseInt(e.innerHTML))
                 .filter(Boolean)
                 .reduce((acc, cur) => acc += cur, 0)
}

var applyBgColor = (element, color = "#ffcb05") => {
  element.style.backgroundColor = color
}

window.setTimeout(()=> {
  sumTotal()
  sumCols()
  highlightUnestimated()
}, 2000)
