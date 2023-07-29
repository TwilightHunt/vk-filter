export const age = {
  postProcess: (val) => {
    const regexp = /^[1-9]\d{0,2}$/;
    const valid = regexp.test(val);

    if (val > 120) {
      return 120;
    }
    if (valid) {
      return val;
    }
    return "";
  },
};
