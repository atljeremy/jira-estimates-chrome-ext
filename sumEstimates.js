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
  var swimLanesObjs = collectSwimlaneEstimates()
  for (laneId in swimLanesObjs) {
    var id = `${laneId}-sum-badge`
    var sumBadge = document.getElementById(id)
    if (!sumBadge) {
      var sumBadge = document.createElement('aui-badge')
      sumBadge.id = id
      document.querySelector(`li[data-id="${laneId}"] h2`)
              .parentElement
              .appendChild(sumBadge)
    }
    if (swimLanesObjs[laneId]['containsUnestimated']) {
      applyBgColor(sumBadge)
    }
    sumBadge.innerHTML = swimLanesObjs[laneId]['total']
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

var collectSwimlaneEstimates = () => Array.from(document.querySelectorAll("li[data-column-id]")).reduce((acc, cur) => {
    var estimates = Array.from(cur.querySelectorAll("aui-badge[class=ghx-estimate]"))
    var sum = sumElements(estimates)
    var colId = cur.dataset.columnId
    var currentColSum = 0
    var containsUns = containsUnestimated(estimates)
    if (acc[colId]) {
      currentColSum = acc[colId]['total']
      containsUns = containsUns || acc[colId]['containsUnestimated']
    }
    acc[colId] = {
      total: currentColSum + sum,
      containsUnestimated: containsUns
    }
    return acc
  }, {})

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
