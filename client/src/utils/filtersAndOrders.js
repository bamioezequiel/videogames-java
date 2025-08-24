export const filterGames = (arrGames, typeFilter, value) => {
  switch (typeFilter) {
    case "tags":
      return value === "all"
        ? arrGames
        : arrGames.filter((g) => g.tags.includes(value));
    case "platforms":
      return value === "all"
        ? arrGames
        : arrGames.filter((g) => g.platforms.includes(value));

    case "genres":
      return value === "all"
        ? arrGames
        : arrGames.filter((g) => g.genres.includes(value));
  }
};

export const orderings = (
  arrGames,
  typeOrder,
  orderingForm
) => {
  let result = arrGames;

  switch (typeOrder) {
    case "price":
      if (orderingForm === "asc") {
        result.sort((a, b) => b.price - a.price);
      } else {
        result.sort((a, b) => a.price - b.price);
      }
      return result;
    case "rating":
      if (orderingForm === "asc") {
        result.sort((a, b) => b.rating - a.rating);
      } else {
        result.sort((a, b) => a.rating - b.rating);
      }
      return result;
    case "onSale":
      if (orderingForm === "asc") {
        result.sort((a, b) => b.on_sale - a.on_sale);
      } else {
        result.sort((a, b) => a.on_sale - b.on_sale);
      }
      return result;
    case "stock":
      if (orderingForm === "asc") {
        result.sort((a, b) => b.stock - a.stock);
      } else {
        result.sort((a, b) => a.stock - b.stock);
      }
      return result;
    case "date":
      if (orderingForm === "asc") {
        result.sort((a, b) => new Date(b.released).getFullYear() - new Date(a.released).getFullYear());
      } else {
        result.sort((a, b) => new Date(a.released).getFullYear() - new Date(b.released).getFullYear());
      }
      return result;
    case "alpha":
      if (orderingForm === "asc") {
        result.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      } else {
        result.sort((a, b) =>
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
      }
      return result;
    case "active":
      if (orderingForm === "asc") {
        result.sort((a, b) =>
          a.active
            .toString()
            .toLowerCase()
            .localeCompare(b.active.toString().toLowerCase())
        );
      } else {
        result.sort((a, b) =>
          b.active
            .toString()
            .toLowerCase()
            .localeCompare(a.active.toString().toLowerCase())
        );
      }
      return result;
    case "isNew":
      if (orderingForm === "asc") {
        result.sort((a, b) =>
          a.is_new
            .toString()
            .toLowerCase()
            .localeCompare(b.is_new.toString().toLowerCase())
        );
      } else {
        result.sort((a, b) =>
          b.is_new
            .toString()
            .toLowerCase()
            .localeCompare(a.is_new.toString().toLowerCase())
        );
      }
      return result;
    case "featured":
      if (orderingForm === "asc") {
        result.sort((a, b) =>
          a.featured
            .toString()
            .toLowerCase()
            .localeCompare(b.featured.toString().toLowerCase())
        );
      } else {
        result.sort((a, b) =>
          b.featured
            .toString()
            .toLowerCase()
            .localeCompare(a.featured.toString().toLowerCase())
        );
      }
      return result;
      default:
        return arrGames;
  }
};

export const search = (arrGames, value) => {
  let result = [];
  result = arrGames.filter((g) =>
    g.name.toLowerCase().includes(value.toLowerCase())
  );
  return result;
};
