export const mutatePenerimaan = (data, type) => {
  data.push(getTotal(data))
  for(let i = 0; i < data.length; i++){
    let capaian
    if(type === 'tagging'){
      capaian = getCapaianTagging(data[i])
    } else {
      capaian = getCapaian(data[i], type)
    }
    data[i] = { ...data[i], ...capaian }
  }
  return data
}

export const getCapaianTagging = datum => {
  const SMT1 = { TARGET: 0, REALISASI: 0 }
  const SMT2 = { TARGET: 0, REALISASI: 0 }
  for(let e of Object.entries(datum)){
    if(!!e[0].match(/SMT1/i)){
      let key = e[0].split('_')[0]
      SMT1[key] += e[1]
    }
    if(!!e[0].match(/SMT2/i)){
      let key = e[0].split('_')[0]
      SMT2[key] += e[1]
    }
  }
  SMT1.capaian1 = SMT1.REALISASI / SMT1.TARGET * 100
  SMT1.capaian2 = SMT1.capaian1 > 100 ? 60.00 : SMT1.capaian1 * 60 / 100
  SMT2.capaian1 = SMT2.REALISASI / SMT2.TARGET * 100
  SMT2.capaian2 = SMT2.capaian1 * 40 / 100

  let capaian, capaianColor
  capaian = SMT1.capaian2 + SMT2.capaian2
  if(capaian >= 100) capaianColor = 'green'
  else if(capaian >= 90) capaianColor = 'blue'
  else if(capaian >= 80) capaianColor = 'orange'
  else capaianColor = 'red'
  return { SMT1, SMT2, capaian, capaianColor }
} 

export const getCapaian = (datum, type) => {
  let realisasi = 0
  let capaian = 0
  let capaianColor = ''
  for(let e of Object.entries(datum)){
    if(typeof e[1] === 'number' && e[0] !== 'TARGET' && e[0] !== 'TOTAL'){
      if(type === 'penambahanWp'){
        if(e[0] === 'BADAN' || e[0] === 'OP_NK'){
          realisasi += e[1]
        }
      } else {
        realisasi += e[1]
      }
    }
  }
  capaian = (realisasi / datum.TARGET * 100)
  if(capaian >= 100) capaianColor = 'green'
  else if(capaian >= 90) capaianColor = 'blue'
  else if(capaian >= 80) capaianColor = 'orange'
  else capaianColor = 'red'
  return { realisasi, capaian, capaianColor }
}

export const getTotal = data => {
  const total = { NAMA_KPP: 'Kanwil DJP Jakarta Barat' }
  for(let datum of data){
    for(let d of Object.entries(datum)){
      if(typeof d[1] === 'number'){
        if(!total[d[0]]) total[d[0]] = 0
        total[d[0]] += d[1]
      }
    }
  }
  return total
}