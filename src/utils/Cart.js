

export const changeCart = (newCart) => {
  localStorage.setItem("cart", JSON.stringify(newCart))
  window.dispatchEvent( new Event('storage') )
}


export const getCart = () => {
  const cartRaw = localStorage.getItem("cart") || "[]"
  return JSON.parse(cartRaw)
}