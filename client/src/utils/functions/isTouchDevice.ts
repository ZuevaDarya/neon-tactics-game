const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  const hasTouchEvents = "ontouchstart" in window;
  const hasMaxTouchPoints = navigator.maxTouchPoints > 0;
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isMobileScreen = window.innerWidth <= 768;

  return hasTouchEvents || hasMaxTouchPoints || isMobileUserAgent || isMobileScreen;
};

export default isTouchDevice;
