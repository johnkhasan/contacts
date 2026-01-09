<template>
  <div class="w-full max-w-md p-8 bg-surface-50 rounded-2xl shadow-auth-login border border-surface-30">
    <div class="mb-8 text-center">
      <h1 class="text-2xl font-bold mb-2">Welcome Back</h1>
      <p class="text-gray-500">Please sign in to continue</p>
    </div>

    <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="username" class="text-sm font-medium">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="Enter your username"
          class="px-4 py-2 rounded-lg border border-surface-30 bg-surface-20 focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="password" class="text-sm font-medium">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
          class="px-4 py-2 rounded-lg border border-surface-30 bg-surface-20 focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? "Signing in..." : "Sign In" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth-layout"
});

const router = useRouter();
const username = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    // Mock login logic
    const token = useCookie("access_token");
    token.value = "mock_token_" + Date.now();

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    router.push("/");
  } catch (error) {
    console.error("Login failed", error);
  } finally {
    loading.value = false;
  }
};
</script>
