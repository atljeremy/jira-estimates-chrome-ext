var sumTotal = () => {
  var estimates = document.querySelectorAll("aui-badge[class=ghx-estimate]") // Sprint Board
  if (estimates.length == 0) {
    var sprintGroup = document.getElementsByClassName("ghx-sprint-group")[0]
    estimates = sprintGroup.querySelectorAll("span[title=\"Story Points\"]") // Backlog
  }
  var sum = sumElements(estimates)
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
    var estimates = cur.querySelectorAll("aui-badge[class=ghx-estimate]")
    var sum = sumElements(estimates)
    var currentColSum = acc[cur.dataset.columnId] || 0
    acc[cur.dataset.columnId] = currentColSum + sum
    return acc
  }, {})
  for (laneId in swimLanes) {
    var id = `${laneId}-sum-badge`
    var sumBadge = document.getElementById(id)
    if (!sumBadge) {
      var sumBadge = document.createElement('aui-badge')
      sumBadge.id = id
      document.querySelector(`li[data-id="${laneId}"] h2`)
              .parentElement
              .appendChild(sumBadge)
    }
    sumBadge.innerHTML = swimLanes[laneId]
  }
}

var sumElements = (elements) => {
  return Array.from(elements)
              .map(e => parseInt(e.innerHTML))
              .filter(Boolean)
              .reduce((acc, cur) => acc += cur, 0)
}

window.setTimeout(()=> {
  sumTotal()
  sumCols()
}, 2000)
