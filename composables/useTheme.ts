export const useTheme = () => {
  const isDark = useCookie<boolean>("theme_is_dark", {
    default: () => false,
    watch: true
  });

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  const updateTheme = () => {
    if (import.meta.client) {
      const html = document.querySelector("html");
      if (html) {
        if (isDark.value) {
          html.classList.add("dark");
        } else {
          html.classList.remove("dark");
        }
      }
    }
  };

  // Initialize theme on mount
  onMounted(() => {
    updateTheme();
  });

  // Watch for changes (in case cookie changes from another tab, though simple watch on cookie might not trigger class update without explicit watch)
  watch(isDark, () => {
    updateTheme();
  });

  return {
    isDark,
    toggleTheme
  };
};
