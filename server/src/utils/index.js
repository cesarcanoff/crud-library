module.exports = {
  isUndefined: function (object) {
    let { isbn, title, author, pages, category, year, language, cover } =
      object;

    if (
      !isbn ||
      !title ||
      !author ||
      !pages ||
      !category ||
      !year ||
      !language ||
      !cover
    ) {
      return false;
    }

    return true;
  },
};
