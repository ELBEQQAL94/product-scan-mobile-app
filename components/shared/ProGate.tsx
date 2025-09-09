import { useSubscription } from "@/hooks/useSubscription";
import { FC } from "react";
import Loading from "./Loading";
import { Screens } from "@/constants/screens";
import { useCustomRouter } from "@/hooks/useCustomRouter";

interface ProGateProps {
  children: React.ReactNode;
}

const ProGate: FC<ProGateProps> = ({ children }) => {
  // Custom hooks
  const { isSubscribed, isLoading } = useSubscription();
  const { redirect_to } = useCustomRouter();

  if (isLoading) return <Loading />;

  if (!isSubscribed) redirect_to(Screens.PRICING_SCREEN);

  return <>{children}</>;
};

export default ProGate;
