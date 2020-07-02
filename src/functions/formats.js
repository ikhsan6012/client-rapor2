export const formatUpdate = date => {
  const options = {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  }
  return new Date(date).toLocaleDateString('ID', options)
}

export const formatNumber = (num, fixed = 0) => {
  return num.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const capitalizedEachWord = str => {
  let strResult = ''
  for(let i = 0; i < str.length; i++){
    strResult += (i === 0 || str[i - 1] === ' ') ? str[i].toUpperCase() : str[i].toLowerCase()
  }
  return strResult
}