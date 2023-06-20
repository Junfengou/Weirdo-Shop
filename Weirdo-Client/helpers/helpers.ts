export const transformToDollar = (price: number) => {
    const formattedPrice = price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return '$' + formattedPrice;
  }