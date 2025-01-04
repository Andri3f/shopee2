export const getPrice = (price) => {
   let newPrice = price ? price.toFixed(2) : ''
   newPrice = newPrice.replace('.', ',')
   return newPrice
}
