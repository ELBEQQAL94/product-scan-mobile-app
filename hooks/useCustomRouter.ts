import { useRouter } from "expo-router";

export const useCustomRouter = () => {
  const router = useRouter();

  const redirect_to = (screen: string) => router.push(screen);

  return { redirect_to };
};
