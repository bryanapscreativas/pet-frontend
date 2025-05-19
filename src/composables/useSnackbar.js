import { ref } from 'vue';

export function useSnackbar() {
  const snackbar = ref({
    show: false,
    color: 'success',
    message: '',
    timeout: 3000
  });

  const showMessage = (message, color = 'success', timeout = 3000) => {
    snackbar.value = {
      show: true,
      message,
      color,
      timeout
    };
  };

  const showSuccess = (message) => {
    showMessage(message, 'success');
  };

  const showError = (message) => {
    showMessage(message, 'error');
  };

  const showWarning = (message) => {
    showMessage(message, 'warning');
  };

  const showInfo = (message) => {
    showMessage(message, 'info');
  };

  return {
    snackbar,
    showMessage,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}
