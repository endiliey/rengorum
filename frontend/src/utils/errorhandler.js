export const apiErrorHandler = error => {
  try {
    if (!error.response) {
      return 'Error: Network Error';
    } else if (error.response.data) {
      const erd = error.response.data;
      if (erd.detail) {
        if (erd.detail === 'Invalid token.') {
          return 'Invalid Token. Please re-login.';
        }
        return erd.detail;
      }
      if (erd[0]) return erd[0];
      const key = Object.keys(erd)[0];
      const errorString = erd[key][0];
      if (['non_field_errors', 'detail'].indexOf(key) >= 0) {
        return errorString;
      }
      const errorField = String(key).replace('_', ' ');
      return (
        errorField.charAt(0).toUpperCase() +
        errorField.substring(1) +
        ': ' +
        errorString
      );
    }
  } catch (error) {
    console.log(error);
    return 'Something wrong happened. Please report this.';
  }
};
