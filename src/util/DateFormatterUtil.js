
function ISOToBr(data){
    const [year,month, day] = data.split('-')
    return `${day}/${month}/${year}` 
  }

export {ISOToBr}