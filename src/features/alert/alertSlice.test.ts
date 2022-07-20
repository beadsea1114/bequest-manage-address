import alertReducer, {
  Alert,
  showAlert,
  hideAlert
} from './alertSlice';

describe('alert reducer', () => {
  const initialState: Alert = {
    type: "success",
    message: "",
    open: false
  };
  it('should handle initial state', () => {
    expect(alertReducer(undefined, { type: 'unknown' })).toEqual({
      type: "success",
      message: "",
      open: false
    });
  });

  it('should handle showAlert', () => {
    const actual = alertReducer(initialState, showAlert({type: "success", message: "success message"}));
    expect(actual).toEqual({
      type: "success",
      message: "success message",
      open: true
    });
  });

  it('should handle hideAlert', () => {
    const actual = alertReducer(initialState, hideAlert());
    expect(actual).toEqual({
      type: "success",
      message: "",
      open: false
    });
  });
});
